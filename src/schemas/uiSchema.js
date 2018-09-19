import React, { Fragment } from "react";
import { Input } from "reactstrap";

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
    display_img: {
      "ui:widget": props => {
        return (
          <Input
            type="file"
            onChange={e => {
              addMaterialFile({ file: e.target.files[0], type: "display_img" });
            }}
          />
        );
      }
    },
    award_img: {
      "ui:widget": props => {
        return (
          <Input
            type="file"
            onChange={e => {
              addMaterialFile({ file: e.target.files[0], type: "award_img" });
            }}
          />
        );
      }
    },
    countdown_img: {
      "ui:widget": props => {
        return (
          <Input
            type="file"
            onChange={e => {
              addMaterialFile({
                file: e.target.files[0],
                type: "countdown_img"
              });
            }}
          />
        );
      }
    },
    imageUrl: {
      "ui:widget": props => {
        let switcher = Boolean(uiSchemaConf && uiSchemaConf.switcher);
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
                      setSwitcher({ switcher: true });
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
        let switcher = Boolean(uiSchemaConf && uiSchemaConf.videoSwitcher);
        const { value } = props;
        return (
          <Fragment>
            {Boolean(value) && !switcher ? (
              <div>
                <video
                  controls
                  src={value}
                  style={{
                    maxHeight: "160px"
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
                      setSwitcher({ videoSwitcher: true });
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
                  addMaterialFile({
                    file: e.target.files[0],
                    type: "videoUrl"
                  });
                }}
              />
            )}
          </Fragment>
        );
      }
    },
    ad_video: {
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
                  addMaterialFile({
                    file: e.target.files[0],
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
