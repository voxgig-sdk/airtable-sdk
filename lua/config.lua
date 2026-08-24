-- Airtable SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Airtable",
      slug = "airtable",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.airtable.com/v0",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["base"] = {},
        ["create_record"] = {},
        ["get_record"] = {},
        ["list_record"] = {},
        ["table"] = {},
      },
    },
    entity = {
      ["base"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "permissionLevel",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "base",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meta/bases",
                ["parts"] = {
                  "meta",
                  "bases",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.bases`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["create_record"] = {
        ["fields"] = {
          {
            ["name"] = "records",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "create_record",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "base_id",
                      ["orig"] = "base_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "table_id",
                      ["orig"] = "table_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/{baseId}/{tableId}",
                ["parts"] = {
                  "{base_id}",
                  "{table_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["baseId"] = "base_id",
                    ["tableId"] = "table_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "base_id",
                    "table_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_record"] = {
        ["fields"] = {},
        ["name"] = "get_record",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "base_id",
                      ["orig"] = "base_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "record_id",
                      ["orig"] = "record_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "table_id",
                      ["orig"] = "table_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{baseId}/{tableId}/{recordId}",
                ["parts"] = {
                  "{base_id}",
                  "{table_id}",
                  "{record_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["baseId"] = "base_id",
                    ["recordId"] = "record_id",
                    ["tableId"] = "table_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "base_id",
                    "record_id",
                    "table_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.fields`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["list_record"] = {
        ["fields"] = {
          {
            ["name"] = "createdTime",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "fields",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "list_record",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "base_id",
                      ["orig"] = "base_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "param",
                      ["name"] = "table_id",
                      ["orig"] = "table_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{baseId}/{tableId}",
                ["parts"] = {
                  "{base_id}",
                  "{table_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["baseId"] = "base_id",
                    ["tableId"] = "table_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "base_id",
                    "table_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.records`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["table"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "primaryFieldId",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "table",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "base_id",
                      ["orig"] = "base_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/meta/bases/{baseId}/tables",
                ["parts"] = {
                  "meta",
                  "bases",
                  "{base_id}",
                  "tables",
                },
                ["rename"] = {
                  ["param"] = {
                    ["baseId"] = "base_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "base_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "base_id",
                      ["orig"] = "base_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meta/bases/{baseId}/tables",
                ["parts"] = {
                  "meta",
                  "bases",
                  "{base_id}",
                  "tables",
                },
                ["rename"] = {
                  ["param"] = {
                    ["baseId"] = "base_id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "base_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.tables`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "base",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
