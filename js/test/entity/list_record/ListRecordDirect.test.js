
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { AirtableSDK } = require('../../..')

const {
  envOverride,
} = require('../../utility')


describe('ListRecordDirect', async () => {

  test('direct-exists', async () => {
    const sdk = new AirtableSDK({
      // Concrete base: a live construction must satisfy any server
      // variables a templated base URL declares; overriding base with a
      // literal (as the direct flow tests do) sidesteps the requirement.
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-list-list_record', async () => {
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    const { client, calls } = setup

    const params = {}
    if (setup.live) {
      params.base_id = setup.idmap['base01']
      params.table_id = setup.idmap['table01']
    } else {
      params.base_id = 'direct01'
      params.table_id = 'direct02'
    }

    const result = await client.direct({
      path: '{base_id}/{table_id}',
      method: 'GET',
      params,
    })

    assert(result.ok === true)
    assert(result.status === 200)
    assert(Array.isArray(result.data))

    if (!setup.live) {
      assert(result.data.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
      assert(calls[0].url.includes('direct02'))
    }
  })

})



function directSetup(mockres) {
  const calls = []

  const env = envOverride({
    'AIRTABLE_TEST_LIST_RECORD_ENTID': {},
    'AIRTABLE_TEST_LIVE': 'FALSE',
    'AIRTABLE_APIKEY': 'NONE',
  })

  const live = 'TRUE' === env.AIRTABLE_TEST_LIVE

  if (live) {
    const client = new AirtableSDK({
      apikey: env.AIRTABLE_APIKEY,
    })

    let idmap = env['AIRTABLE_TEST_LIST_RECORD_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url, init) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new AirtableSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} }
}
  
