package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBaseEntityFunc func(client *AirtableSDK, entopts map[string]any) AirtableEntity

var NewCreateRecordEntityFunc func(client *AirtableSDK, entopts map[string]any) AirtableEntity

var NewGetRecordEntityFunc func(client *AirtableSDK, entopts map[string]any) AirtableEntity

var NewListRecordEntityFunc func(client *AirtableSDK, entopts map[string]any) AirtableEntity

var NewTableEntityFunc func(client *AirtableSDK, entopts map[string]any) AirtableEntity

