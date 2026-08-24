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

func TestCreateRecordEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CreateRecord(nil)
		if ent == nil {
			t.Fatal("expected non-nil CreateRecordEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := create_recordBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "create_record." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set AIRTABLE_TEST_CREATE_RECORD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		createRecordRef01Ent := client.CreateRecord(nil)
		createRecordRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "create_record"}, setup.data), "create_record_ref01"))
		createRecordRef01Data["base_id"] = setup.idmap["base01"]
		createRecordRef01Data["table_id"] = setup.idmap["table01"]

		createRecordRef01DataResult, err := createRecordRef01Ent.Create(createRecordRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		createRecordRef01Data = core.ToMapAny(entityData(createRecordRef01DataResult))
		if createRecordRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func create_recordBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "create_record", "CreateRecordTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read create_record test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse create_record test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"create_record01", "create_record02", "create_record03", "base01", "table01"},
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
	entidEnvRaw := os.Getenv("AIRTABLE_TEST_CREATE_RECORD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AIRTABLE_TEST_CREATE_RECORD_ENTID": idmap,
		"AIRTABLE_TEST_LIVE":      "FALSE",
		"AIRTABLE_TEST_EXPLAIN":   "FALSE",
		"AIRTABLE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["AIRTABLE_TEST_CREATE_RECORD_ENTID"])
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
