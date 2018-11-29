import React, { Fragment } from "react";
import { Input } from "reactstrap";
import { Feedback } from "@icedesign/base";

const uiSchema = ({
  addMaterialFile,
  isRead,
  setSwitcher,
  uiSchemaConf,
  formData,
  saveFormData
}) => {
  const schema = {
    interactionTypeId: {
      "ui:disabled": [""]
    },
    interactionTemplateId: {
      "ui:placeholder": "请选择"
    },
    show_close_btn: {
      "ui:description": "单位：秒"
    },
    monitorLinks: {
      "ui:options": {
        orderable: false
      },
      items: {
        "ui:emptyValue": ""
      }
    },
    repeatTimes: {
      "ui:widget": "hidden"
    },
    imageUrl: {
      "ui:widget": props => {
        let switcher = Boolean(uiSchemaConf && uiSchemaConf.avatarSwitcher);
        const { value } = props;
        return (
          <Fragment>
            {Boolean(value) && !switcher ? (
              <div>
                <img
                  src={value}
                  style={{
                    maxWidth: "400px"
                  }}
                  alt=""
                />
                {!isRead ? (
                  <button
                    type="button"
                    className="btn btn-danger array-item-remove"
                    style={{
                      flex: "1 1 0%",
                      padding: "6px 8px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {
                      formData.imageUrl = "";
                      saveFormData({ ...formData });
                      setSwitcher({ avatarSwitcher: true });
                    }}
                  >
                    <i className="glyphicon glyphicon-remove" />
                  </button>
                ) : null}
              </div>
            ) : (
              <Input
                type="file"
                accept="image/*"
                // value={props.value}
                required={props.required}
                onChange={e => {
                  addMaterialFile({
                    file: e.target.files[0],
                    type: "imageUrl"
                  });
                }}
              />
            )}
          </Fragment>
        );
      }
    },
    videoUrl: {
      "ui:widget": props => {
        let switcher = Boolean(uiSchemaConf && uiSchemaConf.adVideoSwitcher);
        const { value } = props;
        return (
          <Fragment>
            {Boolean(value) && !switcher ? (
              <div>
                <video
                  controls
                  src={value}
                  style={{
                    maxWidth: "400px"
                  }}
                />
                {!isRead ? (
                  <button
                    type="button"
                    className="btn btn-danger array-item-remove"
                    style={{
                      flex: "1 1 0%",
                      padding: "6px 8px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {
                      formData.videoUrl = "";
                      saveFormData({ ...formData });
                      setSwitcher({ adVideoSwitcher: true });
                    }}
                  >
                    <i className="glyphicon glyphicon-remove" />
                  </button>
                ) : null}
              </div>
            ) : (
              <Input
                type="file"
                accept="video/*"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  if (file.size > 20 * 1024 * 1024) {
                    Feedback.toast.error("视频大小超出上限20MB");
                    return;
                  }
                  addMaterialFile({
                    file,
                    type: "videoUrl"
                  });
                }}
              />
            )}
          </Fragment>
        );
      }
    },
    exposureLinks: {
      "ui:options": {
        orderable: false
      }
    },
    closeAfter: {
      "ui:description":
        "该时间需要小于中插视频时间；如果填0，则表示该广告随时可关闭",
      "ui:placeholder": "请填写数字，单位：秒"
    }
  };
  if (isRead) {
    schema["ui:disabled"] = [];
  }
  return schema;
};

export default uiSchema;
