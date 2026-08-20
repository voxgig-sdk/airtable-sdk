
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AirtableSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AirtableSDK.test()
    equal(null !== testsdk, true)
  })

})
