// Typed models for the Airtable SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Base
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [permissionLevel]
 */

/**
 * @typedef {Object} BaseListMatch
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [permissionLevel]
 */

/**
 * @typedef {Object} CreateRecord
 * @property {Array} [records]
 */

/**
 * @typedef {Object} CreateRecordCreateData
 * @property {string} base_id
 * @property {string} table_id
 * @property {Array} [records]
 */

/**
 * @typedef {Object} GetRecord
 */

/**
 * @typedef {Object} GetRecordLoadMatch
 * @property {string} base_id
 * @property {string} record_id
 * @property {string} table_id
 */

/**
 * @typedef {Object} ListRecord
 * @property {string} [createdTime]
 * @property {Object} [fields]
 * @property {string} [id]
 */

/**
 * @typedef {Object} ListRecordListMatch
 * @property {string} base_id
 * @property {string} table_id
 */

/**
 * @typedef {Object} Table
 * @property {string} [description]
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [primaryFieldId]
 */

/**
 * @typedef {Object} TableListMatch
 * @property {string} base_id
 */

/**
 * @typedef {Object} TableCreateData
 * @property {string} base_id
 * @property {string} [description]
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [primaryFieldId]
 */

