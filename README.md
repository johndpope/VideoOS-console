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

## 发布生产

- 默认端口

```bash
$ npm run start-prod-remote
```

- 指定端口

```bash
$ export OS_CONSOLE_SERVER_PORT = [端口号, eg: 4444] && npm run start-prod-remote
```

## jsonschema/uischema 配置手册

1. jsonschema

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
          "default": "张三"
        },
        "age": {
          "title": "年龄",
          "type": "integer"
        }
      }
    }
  },
  "title": "jsonschema配置案例",
  "description": "这是一份jsonschema配置案例",
  "type": "object",
  "required": [],
  "properties": {
    "stringField": {
      "type": "string",
      "title": "文本输入框"
    },
    "integerField": {
      "type": "integer",
      "title": "整数输入框"
    },
    "booleanField": {
      "type": "boolean",
      "title": "布尔选择框"
    },
    "numberField": {
      "type": "number",
      "title": "数值输入框"
    },
    "timeField": {
      "type": "string",
      "title": "时间选择",
      "format": "date-time"
    },
    "dateField": {
      "type": "string",
      "title": "日期选择",
      "format": "date"
    },
    "fileField": {
      "type": "string",
      "format": "data-url",
      "title": "单文件上传"
    },
    "multiFileField": {
      "type": "array",
      "title": "多文件上传",
      "items": {
        "type": "string",
        "format": "data-url"
      }
    },
    "passwordField": {
      "type": "string",
      "title": "密码输入框"
    },
    "telphoneField": {
      "type": "string",
      "title": "号码输入框"
    },
    "textareaField": {
      "type": "string",
      "title": "文本框"
    },
    "selectField": {
      "type": "integer",
      "title": "下拉选择",
      "enum": [1, 2, 3],
      "enumNames": ["一", "二", "三"]
    },
    "secretField": {
      "type": "string",
      "title": "隐藏输入框"
    },
    "disableField": {
      "type": "string",
      "title": "输入框禁用"
    },
    "readonlyField": {
      "type": "string",
      "title": "只读输入框"
    },
    "radioFiled": {
      "type": "integer",
      "title": "单选",
      "enum": [
        1,
        2,
        3
      ]
    },
    "rangeField": {
      "type": "integer",
      "title": "范围选择",
      "minimum": 0,
      "maximum": 100
    },
    "rangeStepField": {
      "type": "integer",
      "title": "步进选择",
      "minimum": 0,
      "maximum": 100,
      "multipleOf": 10
    },
    "arrayField": {
      "type": "array",
      "title": "列表",
      "items": {
        "type": "string"
      }
    },
    "arrayField2": {
      "type": "array",
      "title": "多属性值数组项",
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
      "title": "引用类型数组",
      "items": {
        "$ref": "#/definitions/Person"
      }
    },
    "customWidgetComponentsField": {
      "type": "string",
      "title": "自定义定制组件项"
    },
    "fieldWithDescription": {
      "type": "string",
      "title": "带有描述/副标题输入项",
      "description": "这是一个带有描述/副标题的输入框"
    },
    "fieldWithPlaceholder": {
      "type": "string",
      "title": "这是一个带有placeholder的输入框"
    },
    "arrayItemOrderable": {
      "type": "array",
      "title": "可/不可排序的列表",
      "items": {
        "type": "string"
      }
    },
    "arrayItemAddable": {
      "type": "array",
      "title": "可/不可添加数据的输入项",
      "items": {
        "type": "string"
      }
    },
    "arrayItemRemovable": {
      "type": "array",
      "title": "可/不可删除数据的输入项",
      "items": {
        "type": "string"
      }
    },
    "customFieldCss": {
      "type": "string",
      "title": "自定义输入框样式类名"
    },
    "disableEnumAttributeFields": {
      "type": "string",
      "title": "禁用枚举值",
      "enum": ["one", "two", "three"]
    },
    "multipleChoiceList": {
      "type": "array",
      "title": "多选项",
      "items": {
        "type": "string",
        "enum": ["foo", "bar", "fuzz", "qux"]
      },
      "uniqueItems": true
    },
    "fieldHelpText": {
      "type": "string",
      "title": "带有提示帮助信息输入框"
    },
    "fieldTitleText": {
      "type": "string",
      "title": "自定义输入框label标题"
    },
    "fieldAutoFocus": {
      "type": "string",
      "title": "输入框焦点状态"
    },
    "fieldTextareaRow": {
      "type": "string",
      "title": "文本框行数"
    },
    "propertyDependencyField": {
      "title": "属性值依赖，某属性非空，关联属性亦非空",
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
      "title": "模版项依赖，指定属性非空，其关联属性自动动态添加至表单模版",
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
  "secretField": {
    "ui:widget": "hidden"
  },
  "disableField": {
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
  },
  "fieldWithPlaceholder": {
    "ui:placeholder": "placeholder展示"
  },
  "arrayItemOrderable": {
    "ui:options": {
      "orderable": true/false
    }
  },
  "arrayItemAddable": {
    "ui:options":  {
      addable: true/false
    }
  },
  "arrayItemRemovable": {
    "ui:options":  {
      removable: true/false
    }
  },
  "customFieldCss": {
    "classNames": ""
  },
  "disableEnumAttributeFields": {
    "ui:enumDisabled": ["two"]
  },
  "multipleChoiceList": {
    "ui:widget": "checkboxes"
  },
  "fieldHelpText": {
    "ui:help": ""
  },
  "fieldTitleText": {
    "ui:title": ""
  },
  "fieldAutoFocus": {
    "ui:autofocus": true/false
  },
  "fieldTextareaRow": {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 15
    }
  }
}
```

3. 预览图片

@import "jsonschema_form.png" {width="200px" title="渲染后的表单" alt="渲染后的表单"}
