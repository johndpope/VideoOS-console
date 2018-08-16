/*
 * IAModalConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const GET_IAMODEL_REQUEST = 'OS/GET_IAMODEL_REQUEST';
export const GET_IAMODEL_FAILURE = 'OS/GET_IAMODEL_FAILURE';
export const GET_IAMODEL_SUCCESS = 'OS/GET_IAMODEL_SUCCESS';

export const SHOW_ADDMODEL_MODAL = 'OS/SHOW_ADDMODEL_MODAL';
export const HIDE_ADDMODEL_MODAL = 'OS/HIDE_ADDMODEL_MODAL';

export const ADD_MODEL_REQUEST = 'OS/ADD_MODEL_REQUEST';
export const ADD_MODEL_SUCCESS = 'OS/ADD_MODEL_SUCCESS';
export const ADD_MODEL_FAILURE = 'OS/ADD_MODEL_FAILURE';

export const DELETE_MODEL_REQUEST = 'OS/DELETE_MODEL_REQUEST';
export const DELETE_MODEL_SUCCESS = 'OS/DELETE_MODEL_SUCCESS';
export const DELETE_MODEL_FAILURE = 'OS/DELETE_MODEL_FAILURE';

export const UPLOAD_MODEL_FILE_REQUEST = 'OS/UPLOAD_MODEL_FILE_REQUEST';
export const UPLOAD_MODEL_FILE_SUCCESS = 'OS/UPLOAD_MODEL_FILE_SUCCESS';
export const UPLOAD_MODEL_FILE_FAILURE = 'OS/UPLOAD_MODEL_FILE_FAILURE';

export const QUERY_ALL_MODELTYPES_REQUEST = 'OS/QUERY_ALL_MODELTYPES_REQUEST';
export const QUERY_ALL_MODELTYPES_SUCCESS = 'OS/QUERY_ALL_MODELTYPES_SUCCESS';
export const QUERY_ALL_MODELTYPES_FAILURE = 'OS/QUERY_ALL_MODELTYPES_FAILURE';