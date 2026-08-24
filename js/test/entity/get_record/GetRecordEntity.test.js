
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { AirtableSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('GetRecordEntity', async () => {

  test('instance', async () => {
    const testsdk = AirtableSDK.test()
    const ent = testsdk.GetRecord()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_record_ref01_data = Object.values(setup.data.existing.get_record)[0]

    // LOAD
    const get_record_ref01_ent = client.GetRecord()
    const get_record_ref01_match_dt0 = {}
    const get_record_ref01_data_dt0 = (await get_record_ref01_ent.load(get_record_ref01_match_dt0)).data()
    assert(null != get_record_ref01_data_dt0)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/get_record/GetRecordTestData.json')

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
    ['get_record01','get_record02','get_record03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AIRTABLE_TEST_GET_RECORD_ENTID': idmap,
    'AIRTABLE_TEST_LIVE': 'FALSE',
    'AIRTABLE_TEST_EXPLAIN': 'FALSE',
    'AIRTABLE_APIKEY': 'NONE',
  })

  idmap = env['AIRTABLE_TEST_GET_RECORD_ENTID']

  if ('TRUE' === env.AIRTABLE_TEST_LIVE) {
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
    now: Date.now(),
  }

  return setup
}
  
