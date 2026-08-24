-- Airtable SDK exists test

local sdk = require("airtable_sdk")

describe("AirtableSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
