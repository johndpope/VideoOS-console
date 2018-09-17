import React, { Fragment } from "react";
import { Input } from "reactstrap";

const uiSchema = ({ addMaterialFile }) => {
  return {
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
        return (
          <Fragment>
            <Input
              type="file"
              onChange={e => {
                addMaterialFile({
                  file: e.target.files[0],
                  type: "imageUrl"
                });
              }}
            />
          </Fragment>
        );
      }
    },
    videoUrl: {
      "ui:widget": props => {
        return (
          <Fragment>
            <Input
              type="file"
              onChange={e => {
                addMaterialFile({
                  file: e.target.files[0],
                  type: "videoUrl"
                });
              }}
            />
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
};

export default uiSchema;
