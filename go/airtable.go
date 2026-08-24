package voxgigairtablesdk

import (
	"github.com/voxgig-sdk/airtable-sdk/go/core"
	"github.com/voxgig-sdk/airtable-sdk/go/entity"
	"github.com/voxgig-sdk/airtable-sdk/go/feature"
	_ "github.com/voxgig-sdk/airtable-sdk/go/utility"
)

// Type aliases preserve external API.
type AirtableSDK = core.AirtableSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AirtableEntity = core.AirtableEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AirtableError = core.AirtableError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBaseEntityFunc = func(client *core.AirtableSDK, entopts map[string]any) core.AirtableEntity {
		return entity.NewBaseEntity(client, entopts)
	}
	core.NewCreateRecordEntityFunc = func(client *core.AirtableSDK, entopts map[string]any) core.AirtableEntity {
		return entity.NewCreateRecordEntity(client, entopts)
	}
	core.NewGetRecordEntityFunc = func(client *core.AirtableSDK, entopts map[string]any) core.AirtableEntity {
		return entity.NewGetRecordEntity(client, entopts)
	}
	core.NewListRecordEntityFunc = func(client *core.AirtableSDK, entopts map[string]any) core.AirtableEntity {
		return entity.NewListRecordEntity(client, entopts)
	}
	core.NewTableEntityFunc = func(client *core.AirtableSDK, entopts map[string]any) core.AirtableEntity {
		return entity.NewTableEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAirtableSDK = core.NewAirtableSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAirtableSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AirtableSDK  { return NewAirtableSDK(nil) }
func Test() *AirtableSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
