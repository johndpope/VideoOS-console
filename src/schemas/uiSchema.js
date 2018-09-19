import React, { Fragment } from "react";
import { Input } from "reactstrap";
import { Feedback } from "@icedesign/base";

const uiSchema = ({
  addMaterialFile,
  isRead,
  isUpdate,
  setSwitcher,
  uiSchemaConf,
  saveFormData
}) => {
  const schema = {
    interactionTypeId: {
      "ui:disabled": [""]
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
    avatar: {
      "ui:emptyValue": "",
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
                />
                {isUpdate ? (
                  <button
                    type="button"
                    class="btn btn-danger array-item-remove"
                    style={{
                      flex: "1 1 0%",
                      padding: "6px 8px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {
                      setSwitcher({ avatarSwitcher: true });
                    }}
                  >
                    <i class="glyphicon glyphicon-remove" />
                  </button>
                ) : null}
              </div>
            ) : (
              <Input
                type="file"
                onChange={e => {
                  addMaterialFile({ file: e.target.files[0], type: "avatar" });
                }}
              />
            )}
          </Fragment>
        );
      }
    },
    imageUrl: {
      "ui:emptyValue": "",
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
                />
                {isUpdate ? (
                  <button
                    type="button"
                    class="btn btn-danger array-item-remove"
                    style={{
                      flex: "1 1 0%",
                      padding: "6px 8px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {
                      setSwitcher({ avatarSwitcher: true });
                    }}
                  >
                    <i class="glyphicon glyphicon-remove" />
                  </button>
                ) : null}
              </div>
            ) : (
              <Input
                type="file"
                onChange={e => {
                  addMaterialFile({ file: e.target.files[0], type: "avatar" });
                }}
              />
            )}
          </Fragment>
        );
      }
    },
    videoUrl: {
      "ui:emptyValue": "",
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
                {isUpdate ? (
                  <button
                    type="button"
                    class="btn btn-danger array-item-remove"
                    style={{
                      flex: "1 1 0%",
                      padding: "6px 8px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {
                      setSwitcher({ adVideoSwitcher: true });
                    }}
                  >
                    <i class="glyphicon glyphicon-remove" />
                  </button>
                ) : null}
              </div>
            ) : (
              <Input
                type="file"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  if (file.size > 20 * 1024 * 1024) {
                    Feedback.toast.error("视频大小超出上限50MB");
                    return;
                  }
                  addMaterialFile({
                    file,
                    type: "ad_video"
                  });
                }}
              />
            )}
          </Fragment>
        );
      }
    },
    ad_video: {
      "ui:emptyValue": "",
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
                {isUpdate ? (
                  <button
                    type="button"
                    class="btn btn-danger array-item-remove"
                    style={{
                      flex: "1 1 0%",
                      padding: "6px 8px",
                      fontWeight: "bold"
                    }}
                    onClick={() => {
                      setSwitcher({ adVideoSwitcher: true });
                    }}
                  >
                    <i class="glyphicon glyphicon-remove" />
                  </button>
                ) : null}
              </div>
            ) : (
              <Input
                type="file"
                onChange={e => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  if (file.size > 20 * 1024 * 1024) {
                    Feedback.toast.error("视频大小超出上限50MB");
                    return;
                  }
                  addMaterialFile({
                    file,
                    type: "ad_video"
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
    }
  };
  if (isRead) {
    schema["ui:disabled"] = [];
  }
  return schema;
};

export default uiSchema;
