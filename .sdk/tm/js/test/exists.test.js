
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { AirtableSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AirtableSDK.test()
    equal(null !== testsdk, true)
  })

})
