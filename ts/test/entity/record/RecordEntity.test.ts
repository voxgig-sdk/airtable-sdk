
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { AirtableSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('RecordEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AIRTABLE_TEST_LIVE=TRUE.
  afterEach(liveDelay('AIRTABLE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AirtableSDK.test()
    const ent = testsdk.Record()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AIRTABLE_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'record.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set AIRTABLE_TEST_RECORD_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const record_ref01_ent = client.Record()
    let record_ref01_data = setup.data.new.record['record_ref01']
    record_ref01_data['base_id'] = setup.idmap['base01']
    record_ref01_data['table_id'] = setup.idmap['table01']

    record_ref01_data = (await record_ref01_ent.create(record_ref01_data)).data()
    assert(null != record_ref01_data.id)


    // LIST
    const record_ref01_match: any = {}
    record_ref01_match['base_id'] = setup.idmap['base01']
    record_ref01_match['table_id'] = setup.idmap['table01']

    const record_ref01_list = (await record_ref01_ent.list(record_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(record_ref01_list, { id: record_ref01_data.id })))


    // LOAD
    const record_ref01_match_dt0: any = {}
    record_ref01_match_dt0.id = record_ref01_data.id
    const record_ref01_data_dt0 = (await record_ref01_ent.load(record_ref01_match_dt0)).data()
    assert(record_ref01_data_dt0.id === record_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/record/RecordTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AirtableSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['record01','record02','record03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['AIRTABLE_TEST_RECORD_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'AIRTABLE_TEST_RECORD_ENTID': idmap,
    'AIRTABLE_TEST_LIVE': 'FALSE',
    'AIRTABLE_TEST_EXPLAIN': 'FALSE',
    'AIRTABLE_APIKEY': 'NONE',
  })

  idmap = env['AIRTABLE_TEST_RECORD_ENTID']

  const live = 'TRUE' === env.AIRTABLE_TEST_LIVE

  if (live) {
    client = new AirtableSDK(merge([
      {
        apikey: env.AIRTABLE_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.AIRTABLE_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
