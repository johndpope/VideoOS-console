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

## 启动测试

```bash
$ npm run test
```

## 发布生产

- 默认端口

```bash
$ npm install
$ npm run start-prod-remote
```

- 指定端口

```bash
$ npm install
$ export OS_CONSOLE_SERVER_PORT = [端口号, eg: 4444] && npm run start-prod-remote
```

## 修改配置

进入/src/config 目录  修改相应文件即可

- dev.js 开发环境
- test.js 测试环境
- prod.js 生成环境

## jsonschema/uischema 配置手册

jsonschema 的作用简明表述即将数据对象转化成表单描述对象。数据对象中核心的组成为  对象属性，jsonschema 提供将对象属性描述成表单项的  语法标准。下面将以某系统中的“新增家庭”为例，说明一下如何通过 jsonschema 来实现这一功能。

 家庭数据模型：

```javascript {.line-numbers}
{
  id: "",
  name: "",
  address: "",
  members: []
}
```

成员数据模型：

```javascript {.line-numbers}
{
  id: "",
  name: "",
  gender: 0/1,
  age: "",
  height: ""
}
```

地址数据模型：

```javascript {.line-numbers}
{
  id: "",
  province: "",
  city: "",
  street: "",
  detail: "",
  code: "",
}
```

带有“参见 uischema” 标注的，即表明该项的实现需要 uishcema 配合。

- 定义一个值类型为 string 的属性

```javascript {.line-numbers}
"name": {
  "title": "姓名",
  "type": "string"
}
```

- 定义一个值类型为 integer 的属性

```javascript {.line-numbers}
"age": {
  "title": "年龄",
  "type": "integer"
}
```

- 定义一个值类型为 boolean 的属性

```javascript {.line-numbers}
"gender": {
  "title": "性别",
  "type": "boolean"
}
```

- 定义一个值类型为 number 的属性

```javascript {.line-numbers}
"height": {
  "title": "身高",
  "type": "number",
  "description": "单位：m，精度：cm"
}
```

- 定义  引用类型

```javascript {.line-numbers}
{
  "definitions": {
    "member": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "gender: {
          "type": "boolean"
        },
        "age": {
          "type": "integer"
        },
        "height": {
          "type": "number"
        }
      }
    }
  }
}
```

- 定义一个值类型为 array 的属性

```javascript {.line-numbers}
"members": {
  "title": "家庭成员",
  "type": "array",
  "items": {
    "$ref": "#/definitions/member"
  }
}
```

- 定义一个值为文本块（文件上传）的属性

```javascript {.line-numbers}
"file": {
  "type": "string",
  "format": "data-url"
}
```

- 定义一个值为日期的属性

```javascript {.line-numbers}
"date": {
 "type": "string",
 "format": "date"
}
```

- 完整家庭 jsonschema 定义

```javascript {.line-numbers}
{
  "definitions": {
    "member": {
      "type": "object",
       "properties": {
         "id": {
           "type": "string"
         },
         "name": {
           "type": "string"
         },
         "gender: {
           "type": "boolean"
         },
         "age": {
           "type": "integer"
         },
         "height": {
           "type": "number"
         }
       }
    }
  },
  "title": "",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "province": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "street": {
          "type": "string"
        },
        "code": {
          "type": "integer"
        }
    },
    "members": {
      "$ref": "#/definitions/member"
    }
  }
}
```

1. jsonschema

---

```javascript {.line-numbers .class1 .class}
{
  "definitions": {                                   // ->定义引用schema
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
  "title": "jsonschema配置案例",                      // ->表单标题
  "description": "这是一份jsonschema配置案例",         // ->表单说明/介绍
  "type": "object",                                 // ->表单数据类型
  "required": ["stringField"],                      // ->设置必填表单项
  "properties": {                                   // ->定义数据属性
    "stringField": {
      "type": "string",                             // ->字符串
      "title": "文本输入框"
    },
    "integerField": {
      "type": "integer",                            // ->整型
      "title": "整数输入框"
    },
    "booleanField": {
      "type": "boolean",                            // ->布尔
      "title": "布尔选择框"
    },
    "numberField": {
      "type": "number",                             // ->数值，含小数
      "title": "数值输入框"
    },
    "timeField": {
      "type": "string",                             // ->参见uischema
      "title": "时间选择",
      "format": "date-time"
    },
    "dateField": {
      "type": "string",                             // ->参见uischema
      "title": "日期选择",
      "format": "date"
    },
    "fileField": {
      "type": "string",                             // ->但文件上传
      "format": "data-url",
      "title": "单文件上传"
    },
    "multiFileField": {
      "type": "array",                              // ->多文件上传
      "title": "多文件上传",
      "items": {
        "type": "string",
        "format": "data-url"
      }
    },
    "passwordField": {
      "type": "string",                             // ->参见uischema
      "title": "密码输入框"
    },
    "telphoneField": {
      "type": "string",                             // ->参见uischema
      "title": "号码输入框"
    },
    "textareaField": {
      "type": "string",                             // ->参见uischema
      "title": "文本框"
    },
    "selectField": {
      "type": "integer",                            // ->下拉选择
      "title": "下拉选择",
      "enum": [1, 2, 3],
      "enumNames": ["一", "二", "三"]
    },
    "secretField": {
      "type": "string",                             // ->参见uischema
      "title": "隐藏输入框"
    },
    "disableField": {
      "type": "string",                             // ->参见uischema
      "title": "输入框禁用"
    },
    "readonlyField": {
      "type": "string",                             // ->参见uischema
      "title": "只读输入框"
    },
    "radioFiled": {
      "type": "integer",                            // ->参见uischema
      "title": "单选",
      "enum": [
        1,
        2,
        3
      ]
    },
    "rangeField": {
      "type": "integer",                            // ->参见uischema
      "title": "范围选择",
      "minimum": 0,
      "maximum": 100
    },
    "rangeStepField": {
      "type": "integer",                            // ->参见uischema
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
      "type": "array",                              // ->参见uischema
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
        "$ref": "#/definitions/Person"              // ->引用schema定义
      }
    },
    "customWidgetComponentsField": {
      "type": "string",                             // ->参见uischema
      "title": "自定义定制组件项"
    },
    "fieldWithDescription": {
      "type": "string",
      "title": "带有描述/副标题输入项",
      "description": "这是一个带有描述/副标题的输入框"   // ->带描述表单项
    },
    "fieldWithPlaceholder": {
      "type": "string",
      "title": "这是一个带有placeholder的输入框"       // ->参见uischema
    },
    "arrayItemOrderable": {
      "type": "array",                             // ->参见uischema
      "title": "可/不可排序的列表",
      "items": {
        "type": "string"
      }
    },
    "arrayItemAddable": {
      "type": "array",                             // ->参见uischema
      "title": "可/不可添加数据的输入项",
      "items": {
        "type": "string"
      }
    },
    "arrayItemRemovable": {
      "type": "array",                             // ->参见uischema
      "title": "可/不可删除数据的输入项",
      "items": {
        "type": "string"
      }
    },
    "customFieldCss": {
      "type": "string",                            // ->参见uischema
      "title": "自定义输入框样式类名"
    },
    "disableEnumAttributeFields": {
      "type": "string",                            // ->参见uischema
      "title": "禁用枚举值",
      "enum": ["one", "two", "three"]
    },
    "multipleChoiceList": {
      "type": "array",                             // ->参见uischema
      "title": "多选项",
      "items": {
        "type": "string",
        "enum": ["foo", "bar", "fuzz", "qux"]
      },
      "uniqueItems": true
    },
    "fieldHelpText": {
      "type": "string",                            // ->参见uischema
      "title": "带有提示帮助信息输入框"
    },
    "fieldTitleText": {
      "type": "string",                            // ->参见uischema
      "title": "自定义输入框label标题"
    },
    "fieldAutoFocus": {
      "type": "string",                            // ->参见uischema
      "title": "输入框焦点状态"
    },
    "fieldTextareaRow": {
      "type": "string",                            // ->参见uischema
      "title": "文本框行数"
    },
    "propertyDependencyField": {
      "title": "属性值依赖，某属性非空，关联属性亦非空",
      "type": "object",                            // ->属性依赖
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
      "type": "object",                            // ->schema依赖
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
    "ui:widget": "password"               // ->指明为密码框
  },
  "textareaField": {
    "ui:widget": "textarea"               // ->指明为文本框
  },
  "dateField": {
    "ui:widget": "alt-date"               // ->指明为日期选择
  },
  "timeField": {
    "ui:widget": "alt-datetime"           // ->指明为时间选择
  },
  "telphoneField": {
    "ui:widget": "tel"                    // ->指明为号码输入
  },
  "selectField": {
    "ui:widget": "select"                 // ->指明为下拉列表选择
  },
  "secretField": {
    "ui:widget": "hidden"                 // ->指明为隐藏表单项
  },
  "disableField": {
    "ui:disable": true                    // ->指明为表单项禁用
  },
  "readonlyField": {
    "ui:readonly": true                   // ->指明为只读表单项
  },
  "radioFiled": {
    "ui:widget": "radio",                 // ->指明为单选
    "ui:options": {
      "inline": true
    }
  },
  "rangeField": {
    "ui:widget": "range"                  // ->指明为范围选择
  },
  "rangeStepField": {                     // ->指明为步进选择
    "ui:widget": "range"
  },
  "customWidgetComponentsField": {        // ->自定义输入项组件
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
    "ui:placeholder": "placeholder展示"    // ->指明为带有placeholder输入框
  },
  "arrayItemOrderable": {
    "ui:options": {                       // ->指明为可排序
      "orderable": true/false
    }
  },
  "arrayItemAddable": {
    "ui:options":  {                      // ->指明为可添加
      addable: true/false
    }
  },
  "arrayItemRemovable": {
    "ui:options":  {                      // ->指明为可删除
      removable: true/false
    }
  },
  "customFieldCss": {
    "classNames": ""                      // ->自定义表单项样式类名
  },
  "disableEnumAttributeFields": {
    "ui:enumDisabled": ["two"]            // ->指明为不可选择值项
  },
  "multipleChoiceList": {
    "ui:widget": "checkboxes"             // ->指明为多选
  },
  "fieldHelpText": {
    "ui:help": ""                         // ->指明为输入框提示
  },
  "fieldTitleText": {
    "ui:title": ""                        // ->自定义表单项label标题
  },
  "fieldAutoFocus": {
    "ui:autofocus": true/false            // ->设置输入框焦点状态
  },
  "fieldTextareaRow": {
    "ui:widget": "textarea",              // ->设置文本框行数
    "ui:options": {
      rows: 15
    }
  }
}
```

3. 预览图片

@import "jsonschema_form.png" {width="200px" title="渲染后的表单" alt="渲染后的表单"}

---

title: "READ ME"
author: "Justin Zhang\<zhangjian@videopls.com\>"
date: Sept. 29, 2018
output:
pdf_document
toc: true
toc_depth: 2

---
