/*
 * Material Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { goBack as _goBack, push } from "react-router-redux";
import { Feedback } from "@icedesign/base";
import * as api from "./api";
import * as constants from "./constants";

let deleteMaterialModalSwitch = false;

const showDeleteMaterialModal = payload => {
  return {
    type: constants.SHOW_DELETE_MATERIAL_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideDeleteMaterialModal = () => {
  return {
    type: constants.HIDE_DELETE_MATERIAL_MODAL,
    shouldOpen: false
  };
};

const getAdMaterialInfoRequest = () => {
  return {
    type: constants.GET_MATERIAL_INFO_REQUEST,
    isLoading: true
  };
};

const getAdMaterialInfoSuccess = payload => {
  return {
    type: constants.GET_MATERIAL_INFO_SUCCESS,
    isLoading: false,
    payload
  };
};

const getAdMaterialInfoFailure = () => {
  return {
    type: constants.GET_MATERIAL_INFO_FAILURE,
    isLoading: false
  };
};

const getIaTypeByIdRequest = () => {
  return {
    type: constants.GET_IATYPE_BYID_REQUEST,
    isLoading: true
  };
};

const getIaTypeByIdSuccess = payload => {
  return {
    type: constants.GET_IATYPE_BYID_SUCCESS,
    payload,
    isLoading: false
  };
};

const getIaTypeByIdFailure = payload => {
  return {
    type: constants.GET_IATYPE_BYID_FAILURE,
    payload,
    isLoading: false
  };
};

const addMaterialRequest = () => {
  return {
    type: constants.ADD_METERIAL_REQUEST,
    isLoading: true
  };
};

const addMaterialSuccess = () => {
  return {
    type: constants.ADD_METERIAL_SUCCESS,
    isLoading: false
  };
};

const addMaterialFailure = () => {
  return {
    type: constants.ADD_METERIAL_FAILURE,
    isLoading: false
  };
};

const updateMaterialRequest = () => {
  return {
    type: constants.UPDATE_METERIAL_REQUEST,
    isLoading: true
  };
};

const updateMaterialSuccess = () => {
  return {
    type: constants.UPDATE_METERIAL_SUCCESS,
    isLoading: false
  };
};

const updateMaterialFailure = () => {
  return {
    type: constants.UPDATE_METERIAL_FAILURE,
    isLoading: false
  };
};

const addMaterialFileRequest = () => {
  return {
    type: constants.ADD_MATERIAL_FILE_REQUEST
    // isLoading: true
  };
};

const addMaterialFileSuccess = payload => {
  return {
    type: constants.ADD_MATERIAL_FILE_SUCCESS,
    // isLoading: false,
    payload
  };
};

const addMaterialFileFailure = () => {
  return {
    type: constants.ADD_MATERIAL_FILE_FAILURE
    // isLoading: false
  };
};

const _setSwitcher = payload => {
  return {
    type: constants.SET_SWITCHER,
    payload
  };
};

export const getIaTypeById = params => {
  return async dispatch => {
    dispatch(getIaTypeByIdRequest());
    dispatch(
      saveFormData({
        interactionTypeId: params && params.interactionId
      })
    );
    try {
      const response = await Promise.all([
        api.getIaTypeById(params),
        api.getIaModels({
          interactionTypeId: params && params.interactionId
        })
      ]);
      if (
        response[1] &&
        response[1].status === 200 &&
        response[1].data.resCode === "00"
      ) {
        let template =
          response[0] &&
          response[0].data &&
          response[0].data.configInfo &&
          JSON.parse(response[0].data.configInfo);
        const { templateInfoList } = response[1].data;
        template.properties.interactionTemplateId.enumNames = [];
        template.properties.interactionTemplateId.enum = [];

        if (Array.isArray(templateInfoList)) {
          templateInfoList.forEach(ti => {
            template.properties.interactionTemplateId.enumNames.push(
              ti.templateName
            );
            template.properties.interactionTemplateId.enum.push(ti.templateId);
          });
        }
        dispatch(getIaTypeByIdSuccess(template));
      } else {
        dispatch(getIaTypeByIdFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getIaTypeByIdFailure(error));
    }
  };
};

export const deleteMaterialModalToggle = payload => {
  return dispatch => {
    deleteMaterialModalSwitch = !deleteMaterialModalSwitch;
    if (deleteMaterialModalSwitch) {
      dispatch(showDeleteMaterialModal(payload));
    } else {
      dispatch(hideDeleteMaterialModal());
    }
  };
};

export const addMaterial = params => {
  return async dispatch => {
    dispatch(addMaterialRequest());
    try {
      delete params.currentPage;
      const response = await api.addMaterial(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(addMaterialSuccess(response.data));
        Feedback.toast.show(response.data && response.data.resMsg);
        dispatch(push("/tf/material"));
      } else {
        dispatch(addMaterialFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(addMaterialFailure());
    }
  };
};

export const updateMaterial = params => {
  return async dispatch => {
    dispatch(updateMaterialRequest());
    try {
      delete params.currentPage;
      const response = await api.updateMaterial(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(updateMaterialSuccess(response.data));
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(updateMaterialFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(updateMaterialFailure());
    }
  };
};

export const addMaterialFile = params => {
  return async dispatch => {
    dispatch(addMaterialFileRequest());
    try {
      const response = await api.addMaterialFile({
        file: params && params.file
      });

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(
          addMaterialFileSuccess({
            ...response.data,
            _type: params && params.type
          })
        );
        if (params && params.type === "videoUrl") {
          dispatch(setSwitcher({ adVideoSwitcher: false }));
        }
        if (params && params.type === "imageUrl") {
          dispatch(setSwitcher({ avatarSwitcher: false }));
        }
        // Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(addMaterialFileFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(addMaterialFileFailure());
    }
  };
};

export const saveFormData = payload => {
  return {
    type: constants.SAVE_FORM_DATA,
    payload
  };
};

export const getAdMaterialInfo = params => {
  return async dispatch => {
    dispatch(getAdMaterialInfoRequest());
    try {
      const response = await api.getAdMaterialInfo(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(getAdMaterialInfoSuccess(response.data || {}));
      } else {
        dispatch(getAdMaterialInfoFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getAdMaterialInfoFailure(error));
    }
  };
};

export const setFileData = payload => {
  return {
    type: constants.SET_FILE_DATA,
    payload
  };
};

export const setSwitcher = payload => {
  return async dispatch => {
    dispatch(_setSwitcher(payload));
    dispatch(saveFormData("refresh"));
    setTimeout(() => {
      dispatch(saveFormData("recover"));
    }, 0);
  };
};

export const setMaterialSchema = payload => {
  return {
    type: constants.SET_MATERIAL_SCHEMA,
    payload
  };
};

export const goBack = () => {
  return dispatch => {
    dispatch(_goBack());
  };
};
