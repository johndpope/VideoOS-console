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
    // closeAfter: {
    //   "ui:widget": props => {
    //     return (<Fragment>
    //       {
    //         formData && formData.isShowClose ? (
    //           <input type="tel"
    //             className="custom"
    //             value={props.value}
    //             required={props.required}
    //             onChange={(event) => props.onChange(event.target.value)}
    //           />
    //         ) : null
    //       }
    //     </Fragment>)
    //   }
    // }
    // linkUrl: {
    //   "ui:autofocus": true,
    //   "ui:widget": props => {
    //     return (
    //       <Fragment>
    //         <input
    //           type="text"
    //           autoFocus={props && props.value ? "true" : false}
    //           className="custom"
    //           value={props.value}
    //           required={props.required}
    //           disabled={props.disabled}
    //           onChange={event => props.onChange(event.target.value)}
    //         />
    //         {props &&
    //         props.value &&
    //         /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/gi.test(
    //           props.value
    //         ) ? (
    //           <a
    //             style={{ display: "inline-block", marginLeft: "8px" }}
    //             href={props.value}
    //             target="_blank"
    //           >
    //             点击查看详情
    //           </a>
    //         ) : null}
    //       </Fragment>
    //     );
    //   }
    // }
  };
  if (isRead) {
    schema["ui:disabled"] = [];
  }
  return schema;
};

export default uiSchema;
