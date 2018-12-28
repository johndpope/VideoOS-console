/*
 * Material Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SHOW_DELETE_MATERIAL_MODAL = "OS/SHOW_DELETE_MATERIAL_MODAL";
export const HIDE_DELETE_MATERIAL_MODAL = "OS/HIDE_DELETE_MATERIAL_MODAL";

export const SHOW_NEW_MATERIAL_DROPDOWN = "OS/SHOW_NEW_MATERIAL_DROPDOWN";
export const HIDE_NEW_MATERIAL_DROPDOWN = "OS/HIDE_NEW_MATERIAL_DROPDOWN";

export const GET_AD_METERIALS_REQUEST = "OS/GET_AD_METERIALS_REQUEST";
export const GET_AD_METERIALS_SUCCESS = "OS/GET_AD_METERIALS_SUCCESS";
export const GET_AD_METERIALS_FAILURE = "OS/GET_AD_METERIALS_FAILURE";

export const DELETE_METERIAL_REQUEST = "OS/DELETE_METERIAL_REQUEST";
export const DELETE_METERIAL_SUCCESS = "OS/DELETE_METERIAL_SUCCESS";
export const DELETE_METERIAL_FAILURE = "OS/DELETE_METERIAL_FAILURE";

export const SET_CURRENT_PAGE = "OS/SET_CURRENT_PAGE";
