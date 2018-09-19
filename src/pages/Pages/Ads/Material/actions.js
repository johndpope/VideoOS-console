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

// import { push } from 'react-router-redux';
import { Feedback } from "@icedesign/base";
import * as api from "./api";
import {
  SHOW_ADD_MATERIAL,
  HIDE_ADD_MATERIAL,
  SHOW_DELETE_MATERIAL_MODAL,
  HIDE_DELETE_MATERIAL_MODAL,
  SHOW_NEW_MATERIAL_DROPDOWN,
  HIDE_NEW_MATERIAL_DROPDOWN,
  GET_AD_METERIALS_REQUEST,
  GET_AD_METERIALS_SUCCESS,
  GET_AD_METERIALS_FAILURE,
  GET_AD_METERIAL_BYID_REQUEST,
  GET_AD_METERIAL_BYID_SUCCESS,
  GET_AD_METERIAL_BYID_FAILURE,
  GET_IATYPE_BYID_REQUEST,
  GET_IATYPE_BYID_SUCCESS,
  GET_IATYPE_BYID_FAILURE,
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE,
  ADD_METERIAL_REQUEST,
  ADD_METERIAL_SUCCESS,
  ADD_METERIAL_FAILURE,
  UPDATE_METERIAL_REQUEST,
  UPDATE_METERIAL_SUCCESS,
  UPDATE_METERIAL_FAILURE,
  DELETE_METERIAL_REQUEST,
  DELETE_METERIAL_SUCCESS,
  DELETE_METERIAL_FAILURE,
  ADD_MATERIAL_FILE_REQUEST,
  ADD_MATERIAL_FILE_SUCCESS,
  ADD_MATERIAL_FILE_FAILURE,
  SAVE_FORM_DATA,
  GET_MATERIAL_INFO_REQUEST,
  GET_MATERIAL_INFO_SUCCESS,
  GET_MATERIAL_INFO_FAILURE,
  SET_CURRENT_PAGE,
  SET_FILE_DATA,
  SET_SWITCHER
} from "./constants";

let newMaterialDropDownSwitch = false;
let addMaterialSwitch = false;
let deleteMaterialModalSwitch = false;

const showNewMaterialDropDown = () => {
  return {
    type: SHOW_NEW_MATERIAL_DROPDOWN,
    shouldOpen: true
  };
};

const hideNewMaterialDropDown = () => {
  return {
    type: HIDE_NEW_MATERIAL_DROPDOWN,
    shouldOpen: false
  };
};

const showAddMaterial = payload => {
  return {
    type: SHOW_ADD_MATERIAL,
    payload,
    shouldOpen: true
  };
};

const hideAddMaterial = () => {
  return {
    type: HIDE_ADD_MATERIAL,
    shouldOpen: false
  };
};

const showDeleteMaterialModal = payload => {
  return {
    type: SHOW_DELETE_MATERIAL_MODAL,
    payload,
    shouldOpen: true
  };
};

const hideDeleteMaterialModal = () => {
  return {
    type: HIDE_DELETE_MATERIAL_MODAL,
    shouldOpen: false
  };
};

const getAdMaterialsRequest = () => {
  return {
    type: GET_AD_METERIALS_REQUEST,
    isLoading: true
  };
};

const getAdMaterialsSuccess = payload => {
  return {
    type: GET_AD_METERIALS_SUCCESS,
    isLoading: false,
    payload
  };
};

const getAdMaterialsFailure = () => {
  return {
    type: GET_AD_METERIALS_FAILURE,
    isLoading: false
  };
};

const getAdMaterialInfoRequest = () => {
  return {
    type: GET_MATERIAL_INFO_REQUEST,
    isLoading: true
  };
};

const getAdMaterialInfoSuccess = payload => {
  return {
    type: GET_MATERIAL_INFO_SUCCESS,
    isLoading: false,
    payload
  };
};

const getAdMaterialInfoFailure = () => {
  return {
    type: GET_MATERIAL_INFO_FAILURE,
    isLoading: false
  };
};

const getIaTypeByIdRequest = () => {
  return {
    type: GET_IATYPE_BYID_REQUEST,
    isLoading: true
  };
};

const getIaTypeByIdSuccess = payload => {
  return {
    type: GET_IATYPE_BYID_SUCCESS,
    payload,
    isLoading: false
  };
};

const getIaTypeByIdFailure = payload => {
  return {
    type: GET_IATYPE_BYID_FAILURE,
    payload,
    isLoading: false
  };
};

const queryAllModelTypesRequest = () => {
  return {
    type: QUERY_ALL_MODELTYPES_REQUEST,
    isLoading: true
  };
};

const queryAllModelTypesSuccess = payload => {
  return {
    type: QUERY_ALL_MODELTYPES_SUCCESS,
    payload,
    isLoading: false
  };
};

const queryAllModelTypesFailure = () => {
  return {
    type: QUERY_ALL_MODELTYPES_FAILURE,
    isLoading: false
  };
};

const getAdMaterialByIdRequest = () => {
  return {
    type: GET_AD_METERIAL_BYID_REQUEST,
    isLoading: true
  };
};

const getAdMaterialByIdSuccess = () => {
  return {
    type: GET_AD_METERIAL_BYID_SUCCESS,
    isLoading: false
  };
};

const getAdMaterialByIdFailure = () => {
  return {
    type: GET_AD_METERIAL_BYID_FAILURE,
    isLoading: false
  };
};

const addMaterialRequest = () => {
  return {
    type: ADD_METERIAL_REQUEST,
    isLoading: true
  };
};

const addMaterialSuccess = () => {
  return {
    type: ADD_METERIAL_SUCCESS,
    isLoading: false
  };
};

const addMaterialFailure = () => {
  return {
    type: ADD_METERIAL_FAILURE,
    isLoading: false
  };
};

const updateMaterialRequest = () => {
  return {
    type: UPDATE_METERIAL_REQUEST,
    isLoading: true
  };
};

const updateMaterialSuccess = () => {
  return {
    type: UPDATE_METERIAL_SUCCESS,
    isLoading: false
  };
};

const updateMaterialFailure = () => {
  return {
    type: UPDATE_METERIAL_FAILURE,
    isLoading: false
  };
};

const deleteMaterialRequest = () => {
  return {
    type: DELETE_METERIAL_REQUEST,
    isLoading: true
  };
};

const deleteMaterialSuccess = () => {
  return {
    type: DELETE_METERIAL_SUCCESS,
    isLoading: false
  };
};

const deleteMaterialFailure = () => {
  return {
    type: DELETE_METERIAL_FAILURE,
    isLoading: false
  };
};

const addMaterialFileRequest = () => {
  return {
    type: ADD_MATERIAL_FILE_REQUEST,
    isLoading: true
  };
};

const addMaterialFileSuccess = payload => {
  return {
    type: ADD_MATERIAL_FILE_SUCCESS,
    isLoading: false,
    payload
  };
};

const addMaterialFileFailure = () => {
  return {
    type: ADD_MATERIAL_FILE_FAILURE,
    isLoading: false
  };
};

const _setSwitcher = payload => {
  return {
    type: SET_SWITCHER,
    payload
  };
};

export const getAdMaterials = (
  params = {
    currentPage: 1,
    pageSize: 20
  }
) => {
  return async dispatch => {
    dispatch(getAdMaterialsRequest());
    try {
      const response = await api.getAdMaterials(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(getAdMaterialsSuccess(response.data));
      } else {
        dispatch(getAdMaterialsFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(getAdMaterialsFailure(error));
    }
  };
};

export const queryAllModelTypes = params => {
  return async dispatch => {
    dispatch(queryAllModelTypesRequest());
    try {
      const response = await api.queryAllModelTypes(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(
          queryAllModelTypesSuccess(
            response.data && response.data.interactionInfoList
          )
        );
      } else {
        dispatch(queryAllModelTypesFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(queryAllModelTypesFailure(error));
    }
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
        Array.isArray(templateInfoList) &&
          templateInfoList.forEach(ti => {
            template.properties.interactionTemplateId.enumNames.push(
              ti.templateName
            );
            template.properties.interactionTemplateId.enum.push(ti.templateId);
          });
        template.properties.interactionTypeId.enum = [params.interactionId];
        template.properties.interactionTypeId.enumNames = [
          params.interactionTypeName
        ];
        dispatch(getIaTypeByIdSuccess(template));
        // dispatch(updateFormSchema(params));
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

export const addMaterial = params => {
  return async dispatch => {
    dispatch(addMaterialRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.addMaterial(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(addMaterialSuccess(response.data));
        dispatch(addMaterialToggle());
        dispatch(
          getAdMaterials({
            currentPage,
            pageSize: 20
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
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
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.updateMaterial(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(updateMaterialSuccess(response.data));
        dispatch(addMaterialToggle());
        dispatch(
          getAdMaterials({
            currentPage,
            pageSize: 20
          })
        );
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

export const deleteMaterial = params => {
  return async dispatch => {
    dispatch(deleteMaterialRequest());
    try {
      const currentPage = (params && params.currentPage) || 1;
      delete params.currentPage;
      const response = await api.deleteMaterial(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(deleteMaterialSuccess(response.data));
        dispatch(deleteMaterialModalToggle());
        dispatch(
          getAdMaterials({
            currentPage,
            pageSize: 10
          })
        );
        Feedback.toast.show(response.data && response.data.resMsg);
      } else {
        dispatch(deleteMaterialFailure(response.data));
        Feedback.toast.error(response.data && response.data.resMsg);
      }

      return response.data;
    } catch (error) {
      dispatch(deleteMaterialFailure());
    }
  };
};

export const addMaterialToggle = payload => {
  return dispatch => {
    addMaterialSwitch = !addMaterialSwitch;
    if (payload && ["read", "update"].includes(payload.opType)) {
      dispatch(
        getAdMaterialInfo({ creativeId: payload && payload.creativeId })
      );
    }
    if (addMaterialSwitch) {
      dispatch(
        getIaTypeById({
          interactionId:
            (payload && payload.interactionTypeId) || payload.interactionId,
          interactionTypeName: payload.interactionTypeName
        })
      );
      dispatch(showAddMaterial(payload));
    } else {
      dispatch(saveFormData({}));
      dispatch(setFileData({}));
      dispatch(hideAddMaterial());
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

export const newMaterialDropDownToggle = () => {
  return dispatch => {
    newMaterialDropDownSwitch = !newMaterialDropDownSwitch;
    if (newMaterialDropDownSwitch) {
      dispatch(showNewMaterialDropDown());
    } else {
      dispatch(hideNewMaterialDropDown());
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
        Feedback.toast.show(response.data && response.data.resMsg);
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
    type: SAVE_FORM_DATA,
    payload
  };
};

export const getAdMaterialInfo = params => {
  return async dispatch => {
    dispatch(getAdMaterialInfoRequest());
    try {
      const response = await api.getAdMaterialInfo(params);

      if (response.status === 200 && response.data.resCode === "00") {
        dispatch(
          getAdMaterialInfoSuccess(
            response.data &&
              response.data.creativeContent &&
              JSON.parse(response.data.creativeContent)
          ) || {}
        );
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

export const setCurrentPage = payload => {
  return {
    type: SET_CURRENT_PAGE,
    payload
  };
};

export const setFileData = payload => {
  return {
    type: SET_FILE_DATA,
    payload
  };
};

export const setSwitcher = payload => {
  return async dispatch => {
    dispatch(_setSwitcher(payload));
    dispatch(saveFormData("refresh"));
    // dispatch(saveFormData('recover'));
    setTimeout(() => {
      dispatch(saveFormData("recover"));
    }, 0);
  };
};
