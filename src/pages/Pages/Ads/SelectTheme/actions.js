import { Feedback } from "@icedesign/base";
import { goBack as _goBack, push } from "react-router-redux";
import * as api from "./api";
import {
  QUERY_ALL_MODELTYPES_REQUEST,
  QUERY_ALL_MODELTYPES_SUCCESS,
  QUERY_ALL_MODELTYPES_FAILURE
} from "./constants";

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

export const goBack = () => {
  return dispatch => {
    dispatch(_goBack());
  };
};

export const gotoCRUD = ({ interactionId, interactionTypeName }) => {
  return dispatch => {
    dispatch(
      push(
        `/tf/material/crud?id=${interactionId}&interactionTypeName=${interactionTypeName}`
      )
    );
  };
};
