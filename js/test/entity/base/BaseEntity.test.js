
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


describe('BaseEntity', async () => {

  test('instance', async () => {
    const testsdk = AirtableSDK.test()
    const ent = testsdk.Base()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let base_ref01_data = Object.values(setup.data.existing.base)[0]

    // LIST
    const base_ref01_ent = client.Base()
    const base_ref01_match = {}

    const base_ref01_list = (await base_ref01_ent.list(base_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/base/BaseTestData.json')

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
    ['base01','base02','base03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AIRTABLE_TEST_BASE_ENTID': idmap,
    'AIRTABLE_TEST_LIVE': 'FALSE',
    'AIRTABLE_TEST_EXPLAIN': 'FALSE',
    'AIRTABLE_APIKEY': 'NONE',
  })

  idmap = env['AIRTABLE_TEST_BASE_ENTID']

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
  
