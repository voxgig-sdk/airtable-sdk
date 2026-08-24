-- Airtable SDK error

local AirtableError = {}
AirtableError.__index = AirtableError


function AirtableError.new(code, msg, ctx)
  local self = setmetatable({}, AirtableError)
  self.is_sdk_error = true
  self.sdk = "Airtable"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AirtableError:error()
  return self.msg
end


function AirtableError:__tostring()
  return self.msg
end


return AirtableError
