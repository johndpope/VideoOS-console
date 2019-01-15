/*
 * PlanCRUD Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SET_FORM_DATA = "OS/SET_FORA_DATA_P_CRUD";

export const QUERY_ALL_MODELTYPES_REQUEST = "OS/QUERY_ALL_MODELTYPES_REQUEST";
export const QUERY_ALL_MODELTYPES_SUCCESS = "OS/QUERY_ALL_MODELTYPES_SUCCESS";
export const QUERY_ALL_MODELTYPES_FAILURE = "OS/QUERY_ALL_MODELTYPES_FAILURE";

export const GET_AD_METERIALS_REQUEST = "OS/GET_AD_METERIALS_REQUEST_P_CRUD";
export const GET_AD_METERIALS_SUCCESS = "OS/GET_AD_METERIALS_SUCCESS_P_CRUD";
export const GET_AD_METERIALS_FAILURE = "OS/GET_AD_METERIALS_FAILURE_P_CRUD";

export const GET_AD_PLAN_BYID_REQUEST = "OS/GET_AD_PLAN_BYID_REQUEST";
export const GET_AD_PLAN_BYID_SUCCESS = "OS/GET_AD_PLAN_BYID_SUCCESS";
export const GET_AD_PLAN_BYID_FAILURE = "OS/GET_AD_PLAN_BYID_FAILURE";

export const ADD_PLAN_REQUEST = "OS/ADD_PLAN_REQUEST";
export const ADD_PLAN_SUCCESS = "OS/ADD_PLAN_SUCCESS";
export const ADD_PLAN_FAILURE = "OS/ADD_PLAN_FAILURE";

export const UPDATE_PLAN_REQUEST = "OS/UPDATE_PLAN_REQUEST";
export const UPDATE_PLAN_SUCCESS = "OS/UPDATE_PLAN_SUCCESS";
export const UPDATE_PLAN_FAILURE = "OS/UPDATE_PLAN_FAILURE";

export const QUERY_INTERACTION_INFO_REQUEST =
  "OS/QUERY_INTERACTION_INFO_REQUEST";
export const QUERY_INTERACTION_INFO_SUCCESS =
  "OS/QUERY_INTERACTION_INFO_SUCCESS";
export const QUERY_INTERACTION_INFO_FAILURE =
  "OS/QUERY_INTERACTION_INFO_FAILURE";

export const SET_EDIT_STATE = "OS/SET_EDIT_STATE";

export const SET_WHICH_STEP = "OS/SET_WHICH_STEP";
