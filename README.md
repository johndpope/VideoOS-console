# OS 开源控制台

## 环境要求

```
Nodejs 8 以上
React v16.4+
```

## 本地启动

```bash
$ npm install
$ npm start         # visit http://localhost:3000
```

## jsonschema/uischema 配置手册

1. jsonchema

---

```javascript {.line-numbers .class1 .class}
{
  "definitions": {
    "Person": {
      "type": "object",
      "properties": {
        "name": {
          "title": "姓名",
          "type": "string",
          "default": "张三",
        },
        "age": {
          "title": "年龄",
          "type": "integer",
        }
      }
    }
  },
  "title": "",
  "description": "",
  "type": "",
  "required": [],
  "properties": {
    "stringField": {
      "type": "string",
      "title": ""
    },
    "integerField": {
      "type": "integer",
      "title": ""
    },
    "booleanField": {
      "type": "boolean",
      "title": ""
    },
    "numberField": {
      "type": "number",
      "title": ""
    },
    "timeField": {
      "type": "string",
      "format": "date-time"
    },
    "dateField": {
      "type": "string",
      "format": "date"
    },
    "fileField": {
      "type": "string",
      "format": "data-url",
      "title": ""
    },
    "multiFileField": {
      "type": "array",
      "title": "",
      "items": {
        "type": "string",
        "format": "data-url"
      }
    },
    "passwordField": {
      "type": "string",
      "title": "",
    },
    "telphoneField": {
      "type": "string",
      "title": ""
    },
    "textareaField": {
      "type": "string",
      "title": ""
    },
    "selectField": {
      "type": "string/integer/boolean/number",
      "title": "",
      "enum": [],
      "enumNames": []
    },
    "secretField": {
      "type": "string",
      "title": ""
    },
    "disableField": {
      "type": "string",
      "title": ""
    },
    "readonlyField": {
      "type": "string",
      "title": ""
    },
    "radioFiled": {
      "type": "number/string",
      "title": "",
      "enum": [
        1,
        2,
        3
      ]
    },
    "rangeField": {
      "type": "integer",
      "title": "",
      "minimum": 0,
      "maximum": 100
    },
    "rangeStepField": {
      "type": "integer",
      "title": "",
      "minimum": 0,
      "maximum": 100,
      "multipleOf": 10
    },
    "arrayField": {
      "type": "array",
      "title": "",
      "items": {
        "type": "string"
      }
    },
    "arrayField2": {
      "type": "array",
      "title": "",
      "items": [
        {
          "title": "",
          "type": "string"
        },
        {
          "title": "",
          "type": "boolean",
          "default": false
        }
      ]
    },
    "arrayField3": {
      "type": "array",
      "title": "",
      "items": {
        "$ref": "#/definitions/Person"
      }
    },
    "customWidgetComponentsField": {
      "type": "string/integer/number/boolean/...",
      "title": ""
    },
    "propertyDependencyField": {
      "title": "",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "age": {
          "type": "integer"
        }
      },
      "dependencies": {
        "name": [
          "age"
        ]
      }
    },
    "schemaDependencyField": {
      "title": "",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      },
      "dependencies": {
        "name": {
          "properties": {
            "age": {
              "type": "integer"
            }
          },
          "required": [
            "age"
          ]
        }
      }
    }
  }
}
```

2. uischema

---

```javascript {.line-numbers .class1 .class}
{
  "passwordField": {
    "ui:widget": "password"
  },
  "textareaField": {
    "ui:widget": "textarea"
  },
  "dateField": {
    "ui:widget": "alt-date"
  },
  "timeField": {
    "ui:widget": "alt-datetime"
  },
  "telphoneField": {
    "ui:widget": "tel"
  },
  "selectField": {
    "ui:widget": "select"
  },
  "secretField: {
    "ui:widget": "hidden"
  },
  "disableField: {
    "ui:disable": true
  },
  "readonlyField": {
    "ui:readonly": true
  },
  "radioFiled": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  },
  "rangeField": {
    "ui:widget": "range"
  },
  "rangeStepField": {
    "ui:widget": "range"
  },
  "customWidgetComponentsField": {
    "ui:widget": (props) => {
      return (
        <input type="text"
          className="custom"
          value={props.value}
          required={props.required}
          onFocus={props.focused}
          onChange={(event) => props.onChange(event.target.value)} />
      );
    }
  }
}
```
