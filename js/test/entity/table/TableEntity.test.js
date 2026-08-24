
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


describe('TableEntity', async () => {

  test('instance', async () => {
    const testsdk = AirtableSDK.test()
    const ent = testsdk.Table()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const table_ref01_ent = client.Table()
    let table_ref01_data = setup.data.new.table['table_ref01']
    table_ref01_data['base_id'] = setup.idmap['base01']

    table_ref01_data = (await table_ref01_ent.create(table_ref01_data)).data()
    assert(null != table_ref01_data.id)


    // LIST
    const table_ref01_match = {}
    table_ref01_match['base_id'] = setup.idmap['base01']

    const table_ref01_list = (await table_ref01_ent.list(table_ref01_match)).map((e) => e.data())

    assert(!isempty(select(table_ref01_list, { id: table_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/table/TableTestData.json')

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
    ['table01','table02','table03','base01','base02','base03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AIRTABLE_TEST_TABLE_ENTID': idmap,
    'AIRTABLE_TEST_LIVE': 'FALSE',
    'AIRTABLE_TEST_EXPLAIN': 'FALSE',
    'AIRTABLE_APIKEY': 'NONE',
  })

  idmap = env['AIRTABLE_TEST_TABLE_ENTID']

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
  
