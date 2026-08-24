// Typed models for the Airtable SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Base {
  id?: string
  name?: string
  permissionLevel?: string
}

export interface BaseListMatch {
  id?: string
  name?: string
  permissionLevel?: string
}

export interface CreateRecord {
  records?: any[]
}

export interface CreateRecordCreateData {
  base_id: string
  table_id: string
  records?: any[]
}

export interface GetRecord {
}

export interface GetRecordLoadMatch {
  base_id: string
  record_id: string
  table_id: string
}

export interface ListRecord {
  createdTime?: string
  fields?: Record<string, any>
  id?: string
}

export interface ListRecordListMatch {
  base_id: string
  table_id: string
}

export interface Table {
  description?: string
  id?: string
  name?: string
  primaryFieldId?: string
}

export interface TableListMatch {
  base_id: string
}

export interface TableCreateData {
  base_id: string
  description?: string
  id?: string
  name?: string
  primaryFieldId?: string
}

