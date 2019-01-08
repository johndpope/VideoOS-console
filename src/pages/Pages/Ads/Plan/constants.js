/*
 * AdPlan Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const SHOW_ADD_PLAN = "OS/SHOW_ADD_PLAN";
export const HIDE_ADD_PLAN = "OS/HIDE_ADD_PLAN";

export const SHOW_DELETE_PLAN = "OS/SHOW_DELETE_PLAN";
export const HIDE_DELETE_PLAN = "OS/HIDE_DELETE_PLAN";

export const SHOW_NEW_PLAN_DROPDOWN = "OS/SHOW_NEW_PLAN_DROPDOWN";
export const HIDE_NEW_PLAN_DROPDOWN = "OS/HIDE_NEW_PLAN_DROPDOWN";

export const GET_AD_PLANS_REQUEST = "OS/GET_AD_PLANS_REQUEST";
export const GET_AD_PLANS_SUCCESS = "OS/GET_AD_PLANS_SUCCESS";
export const GET_AD_PLANS_FAILURE = "OS/GET_AD_PLANS_FAILURE";

export const QUERY_ALL_MODELTYPES_REQUEST = "OS/QUERY_ALL_MODELTYPES_REQUEST";
export const QUERY_ALL_MODELTYPES_SUCCESS = "OS/QUERY_ALL_MODELTYPES_SUCCESS";
export const QUERY_ALL_MODELTYPES_FAILURE = "OS/QUERY_ALL_MODELTYPES_FAILURE";

export const ADD_PLAN_REQUEST = "OS/ADD_PLAN_REQUEST";
export const ADD_PLAN_SUCCESS = "OS/ADD_PLAN_SUCCESS";
export const ADD_PLAN_FAILURE = "OS/ADD_PLAN_FAILURE";

export const DELETE_PLAN_REQUEST = "OS/DELETE_PLAN_REQUEST";
export const DELETE_PLAN_SUCCESS = "OS/DELETE_PLAN_SUCCESS";
export const DELETE_PLAN_FAILURE = "OS/DELETE_PLAN_FAILURE";

export const UPDATE_PLAN_REQUEST = "OS/UPDATE_PLAN_REQUEST";
export const UPDATE_PLAN_SUCCESS = "OS/UPDATE_PLAN_SUCCESS";
export const UPDATE_PLAN_FAILURE = "OS/UPDATE_PLAN_FAILURE";

export const SET_FORM_DATA = "OS/SET_FORA_DATA_P";

export const GET_AD_METERIALS_REQUEST = "OS/GET_AD_METERIALS_REQUEST_P";
export const GET_AD_METERIALS_SUCCESS = "OS/GET_AD_METERIALS_SUCCESS_P";
export const GET_AD_METERIALS_FAILURE = "OS/GET_AD_METERIALS_FAILURE_P";

export const SET_CURRENT_PAGE = "OS/SET_CURRENT_PAGE_P";
