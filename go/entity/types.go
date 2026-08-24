// Typed models for the Airtable SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/airtable-sdk/go/core"
)

// Base is the typed data model for the base entity.
type Base struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PermissionLevel *string `json:"permissionLevel,omitempty"`
}

// BaseListMatch is the typed request payload for Base.ListTyped.
type BaseListMatch struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PermissionLevel *string `json:"permissionLevel,omitempty"`
}

// CreateRecord is the typed data model for the create_record entity.
type CreateRecord struct {
	Records *[]any `json:"records,omitempty"`
}

// CreateRecordCreateData is the typed request payload for CreateRecord.CreateTyped.
type CreateRecordCreateData struct {
	BaseId string `json:"base_id"`
	TableId string `json:"table_id"`
	Records *[]any `json:"records,omitempty"`
}

// GetRecord is the typed data model for the get_record entity.
type GetRecord struct {
}

// GetRecordLoadMatch is the typed request payload for GetRecord.LoadTyped.
type GetRecordLoadMatch struct {
	BaseId string `json:"base_id"`
	RecordId string `json:"record_id"`
	TableId string `json:"table_id"`
}

// ListRecord is the typed data model for the list_record entity.
type ListRecord struct {
	CreatedTime *string `json:"createdTime,omitempty"`
	Fields *map[string]any `json:"fields,omitempty"`
	Id *string `json:"id,omitempty"`
}

// ListRecordListMatch is the typed request payload for ListRecord.ListTyped.
type ListRecordListMatch struct {
	BaseId string `json:"base_id"`
	TableId string `json:"table_id"`
}

// Table is the typed data model for the table entity.
type Table struct {
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PrimaryFieldId *string `json:"primaryFieldId,omitempty"`
}

// TableListMatch is the typed request payload for Table.ListTyped.
type TableListMatch struct {
	BaseId string `json:"base_id"`
}

// TableCreateData is the typed request payload for Table.CreateTyped.
type TableCreateData struct {
	BaseId string `json:"base_id"`
	Description *string `json:"description,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	PrimaryFieldId *string `json:"primaryFieldId,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
