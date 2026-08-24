-- Typed models for the Airtable SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Base
---@field id? string
---@field name? string
---@field permissionLevel? string

---@class BaseListMatch
---@field id? string
---@field name? string
---@field permissionLevel? string

---@class CreateRecord
---@field records? table

---@class CreateRecordCreateData
---@field base_id string
---@field table_id string
---@field records? table

---@class GetRecord

---@class GetRecordLoadMatch
---@field base_id string
---@field record_id string
---@field table_id string

---@class ListRecord
---@field createdTime? string
---@field fields? table
---@field id? string

---@class ListRecordListMatch
---@field base_id string
---@field table_id string

---@class Table
---@field description? string
---@field id? string
---@field name? string
---@field primaryFieldId? string

---@class TableListMatch
---@field base_id string

---@class TableCreateData
---@field base_id string
---@field description? string
---@field id? string
---@field name? string
---@field primaryFieldId? string

local M = {}

return M
