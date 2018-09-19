import React, { Fragment } from "react";
import { Input } from "reactstrap";
import { Icon } from "@icedesign/base";

const uiSchema = ({
  addMaterialFile,
  isRead,
  isUpdate,
  setSwitcher,
  uiSchemaConf
}) => {
  const schema = {
    interactionTypeId: {
      "ui:disabled": [""]
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
        return (
          <Input
            type="file"
            onChange={e => {
              addMaterialFile({ file: e.target.files[0], type: "avatar" });
            }}
          />
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
                    maxHeight: "120px"
                  }}
                />
                {isUpdate ? (
                  <Icon
                    type="ashbin"
                    onClick={() => {
                      setSwitcher({ switcher: true });
                    }}
                  />
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
                  <Icon
                    type="ashbin"
                    onClick={() => {
                      setSwitcher({ videoSwitcher: true });
                    }}
                  />
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
