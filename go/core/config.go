package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Airtable",
			"slug": "airtable",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.airtable.com/v0",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"base": map[string]any{},
				"create_record": map[string]any{},
				"get_record": map[string]any{},
				"list_record": map[string]any{},
				"table": map[string]any{},
			},
		},
		"entity": map[string]any{
			"base": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "permissionLevel",
						"type": "`$STRING`",
					},
				},
				"name": "base",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/meta/bases",
								"parts": []any{
									"meta",
									"bases",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.bases`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"create_record": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "records",
						"type": "`$ARRAY`",
					},
				},
				"name": "create_record",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "base_id",
											"orig": "base_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "table_id",
											"orig": "table_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/{baseId}/{tableId}",
								"parts": []any{
									"{base_id}",
									"{table_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"baseId": "base_id",
										"tableId": "table_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base_id",
										"table_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_record": map[string]any{
				"fields": []any{},
				"name": "get_record",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "base_id",
											"orig": "base_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "record_id",
											"orig": "record_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "table_id",
											"orig": "table_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{baseId}/{tableId}/{recordId}",
								"parts": []any{
									"{base_id}",
									"{table_id}",
									"{record_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"baseId": "base_id",
										"recordId": "record_id",
										"tableId": "table_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base_id",
										"record_id",
										"table_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.fields`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"list_record": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdTime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fields",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"name": "list_record",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "base_id",
											"orig": "base_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "table_id",
											"orig": "table_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{baseId}/{tableId}",
								"parts": []any{
									"{base_id}",
									"{table_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"baseId": "base_id",
										"tableId": "table_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base_id",
										"table_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.records`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"table": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "primaryFieldId",
						"type": "`$STRING`",
					},
				},
				"name": "table",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "base_id",
											"orig": "base_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/meta/bases/{baseId}/tables",
								"parts": []any{
									"meta",
									"bases",
									"{base_id}",
									"tables",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"baseId": "base_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "base_id",
											"orig": "base_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/meta/bases/{baseId}/tables",
								"parts": []any{
									"meta",
									"bases",
									"{base_id}",
									"tables",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"baseId": "base_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"base_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tables`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"base",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
