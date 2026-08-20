
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Airtable',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.airtable.com/v0",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      base: {
      },

      record: {
      },

      table: {
      },

    }
  }


  entity = {
    "base": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "permissionLevel",
          "type": "`$STRING`"
        }
      ],
      "name": "base",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/meta/bases",
              "parts": [
                "meta",
                "bases"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.bases`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "record": {
      "fields": [
        {
          "name": "createdTime",
          "type": "`$STRING`"
        },
        {
          "name": "fields",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "records",
          "type": "`$ARRAY`"
        }
      ],
      "name": "record",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "base_id",
                    "orig": "base_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "table_id",
                    "orig": "table_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/{baseId}/{tableId}",
              "parts": [
                "{base_id}",
                "{table_id}"
              ],
              "rename": {
                "param": {
                  "baseId": "base_id",
                  "tableId": "table_id"
                }
              },
              "select": {
                "exist": [
                  "base_id",
                  "table_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "base_id",
                    "orig": "base_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "table_id",
                    "orig": "table_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{baseId}/{tableId}",
              "parts": [
                "{base_id}",
                "{table_id}"
              ],
              "rename": {
                "param": {
                  "baseId": "base_id",
                  "tableId": "table_id"
                }
              },
              "select": {
                "exist": [
                  "base_id",
                  "table_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.records`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "base_id",
                    "orig": "base_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "record_id",
                    "orig": "record_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "table_id",
                    "orig": "table_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{baseId}/{tableId}/{recordId}",
              "parts": [
                "{base_id}",
                "{table_id}",
                "{record_id}"
              ],
              "rename": {
                "param": {
                  "baseId": "base_id",
                  "recordId": "record_id",
                  "tableId": "table_id"
                }
              },
              "select": {
                "exist": [
                  "base_id",
                  "record_id",
                  "table_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.fields`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "table": {
      "fields": [
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "primaryFieldId",
          "type": "`$STRING`"
        }
      ],
      "name": "table",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "base_id",
                    "orig": "base_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/meta/bases/{baseId}/tables",
              "parts": [
                "meta",
                "bases",
                "{base_id}",
                "tables"
              ],
              "rename": {
                "param": {
                  "baseId": "base_id"
                }
              },
              "select": {
                "exist": [
                  "base_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "base_id",
                    "orig": "base_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/meta/bases/{baseId}/tables",
              "parts": [
                "meta",
                "bases",
                "{base_id}",
                "tables"
              ],
              "rename": {
                "param": {
                  "baseId": "base_id"
                }
              },
              "select": {
                "exist": [
                  "base_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.tables`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "base"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

