<?php
declare(strict_types=1);

// GetRecord entity test

require_once __DIR__ . '/../airtable_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GetRecordEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AirtableSDK::test(null, null);
        $ent = $testsdk->GetRecord(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = get_record_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "get_record." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set AIRTABLE_TEST_GET_RECORD_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $get_record_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.get_record")));
        $get_record_ref01_data = null;
        if (count($get_record_ref01_data_raw) > 0) {
            $get_record_ref01_data = Helpers::to_map($get_record_ref01_data_raw[0][1]);
        }

        // LOAD
        $get_record_ref01_ent = $client->GetRecord(null);
        $get_record_ref01_match_dt0 = [];
        $get_record_ref01_data_dt0_loaded = $get_record_ref01_ent->load($get_record_ref01_match_dt0, null);
        $this->assertNotNull($get_record_ref01_data_dt0_loaded);

    }
}

function get_record_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/get_record/GetRecordTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AirtableSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["get_record01", "get_record02", "get_record03", "base01", "table01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("AIRTABLE_TEST_GET_RECORD_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AIRTABLE_TEST_GET_RECORD_ENTID" => $idmap,
        "AIRTABLE_TEST_LIVE" => "FALSE",
        "AIRTABLE_TEST_EXPLAIN" => "FALSE",
        "AIRTABLE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AIRTABLE_TEST_GET_RECORD_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["AIRTABLE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["AIRTABLE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new AirtableSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["AIRTABLE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["AIRTABLE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
