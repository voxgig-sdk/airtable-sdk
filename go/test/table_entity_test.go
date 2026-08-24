package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/airtable-sdk/go"
	"github.com/voxgig-sdk/airtable-sdk/go/core"

	vs "github.com/voxgig-sdk/airtable-sdk/go/utility/struct"
)

func TestTableEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Table(nil)
		if ent == nil {
			t.Fatal("expected non-nil TableEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"table": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Table(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Table(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := tableBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "table." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AIRTABLE_TEST_TABLE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		tableRef01Ent := client.Table(nil)
		tableRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "table"}, setup.data), "table_ref01"))
		tableRef01Data["base_id"] = setup.idmap["base01"]

		tableRef01DataResult, err := tableRef01Ent.Create(tableRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		tableRef01Data = core.ToMapAny(entityData(tableRef01DataResult))
		if tableRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if tableRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		tableRef01Match := map[string]any{
			"base_id": setup.idmap["base01"],
		}

		tableRef01ListResult, err := tableRef01Ent.List(tableRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		tableRef01List, tableRef01ListOk := tableRef01ListResult.([]any)
		if !tableRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", tableRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(tableRef01List), map[string]any{"id": tableRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func tableBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "table", "TableTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read table test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse table test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"table01", "table02", "table03", "base01", "base02", "base03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AIRTABLE_TEST_TABLE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AIRTABLE_TEST_TABLE_ENTID": idmap,
		"AIRTABLE_TEST_LIVE":      "FALSE",
		"AIRTABLE_TEST_EXPLAIN":   "FALSE",
		"AIRTABLE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["AIRTABLE_TEST_TABLE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AIRTABLE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["AIRTABLE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewAirtableSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AIRTABLE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AIRTABLE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
