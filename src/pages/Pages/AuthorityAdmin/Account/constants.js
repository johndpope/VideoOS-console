/*
 * AAAccount Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_ACCOUNTS_REQUEST = 'OS/GET_ACCOUNTS_REQUEST';
export const GET_ACCOUNTS_SUCCESS = 'OS/GET_ACCOUNTS_SUCCESS';
export const GET_ACCOUNTS_FAIL = 'OS/GET_ACCOUNTS_FAIL';

export const SHOW_ADDACCOUNT_MODAL = 'OS/SHOW_ADDACCOUNT_MODAL';
export const HIDE_ADDACCOUNT_MODAL = 'OS/HIDE_ADDACCOUNT_MODAL';

export const SHOW_DELETEACCOUNT_MODAL = 'OS/SHOW_DELETEACCOUNT_MODAL';
export const HIDE_DELETEACCOUNT_MODAL = 'OS/HIDE_DELETEACCOUNT_MODAL';

export const ADD_ACCOUNT_REQUEST = 'OS/ADD_ACCOUNT_REQUEST';
export const ADD_ACCOUNT_SUCCESS = 'OS/ADD_ACCOUNT_SUCCESS';
export const ADD_ACCOUNT_FAIL = 'OS/ADD_ACCOUNT_FAIL';

export const UPDATE_ACCOUNT_REQUEST = 'OS/UPDATE_ACCOUNT_REQUEST';
export const UPDATE_ACCOUNT_SUCCESS = 'OS/UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'OS/UPDATE_ACCOUNT_FAILURE';

export const DELETE_ACCOUNT_REQUEST = 'OS/DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS = 'OS/DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'OS/DELETE_ACCOUNT_FAILURE';

export const QUERY_ALL_ACCOUNTTYPES_REQUEST = 'OS/QUERY_ALL_ACCOUNTTYPES_REQUEST';
export const QUERY_ALL_ACCOUNTTYPES_SUCCESS = 'OS/QUERY_ALL_ACCOUNTTYPES_SUCCESS';
export const QUERY_ALL_ACCOUNTTYPES_FAILURE = 'OS/QUERY_ALL_ACCOUNTTYPES_FAILURE';

export const SET_CURRENT_PAGE = 'OS/SET_CURRENT_PAGE';