/*
 * AARole reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import * as constants from "./constants";

// The initial state of the account
const initialState = {
  formData: {},
  roleAuthorities: {
    应用管理: {
      read: 13,
      write: 11
    },
    模板管理: {
      read: 14,
      write: 12
    },
    投放计划管理: {
      read: 24,
      write: 21
    },
    投放素材管理: {
      read: 25,
      write: 22
    },
    投放审核管理: {
      read: 26,
      write: 23
    },
    license管理: {
      read: 32,
      write: 31
    },
    数据信息管理: {
      read: 42,
      write: 41
    },
    账号管理: {
      read: 63,
      write: 61
    },
    角色管理: {
      read: 64,
      write: 62
    },
    日志管理: {
      read: 51
    }
  }
};

function aaRoleReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_ROLES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.GET_ROLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roleResult: action.payload.roleInfoList || [],
        total: action.payload.totalRecord
      };
    case constants.GET_ROLES_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.QUERY_ALL_ROLETYPES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.QUERY_ALL_ROLETYPES_SUCCESS:
      return {
        ...state,
        roleTypes: action.payload,
        isLoading: false
      };
    case constants.QUERY_ALL_ROLETYPES_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.ADD_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.ADD_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.ADD_ROLE_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.UPDATE_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.UPDATE_ROLE_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.DELETE_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case constants.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case constants.DELETE_ROLE_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case constants.SHOW_ADDROLE_MODAL:
    case constants.HIDE_ADDROLE_MODAL:
      return {
        ...state,
        record: action.payload,
        shouldAddRoleModalOpen: action.shouldOpen
      };
    case constants.SHOW_DELETEROLE_MODAL:
    case constants.HIDE_DELETEROLE_MODAL:
      return {
        ...state,
        record: { roleId: (action.payload && action.payload.roleId) || "" },
        shouldDeleteRoleModalOpen: action.shouldOpen
      };
    case constants.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.currentPage };
    case constants.SET_FORM_DATA:
      const payload = action.payload;
      if (typeof payload === "object") {
        if (Object.keys(payload).length === 0) {
          state.formData = payload;
        } else {
          Object.keys(payload).forEach(key => {
            state.formData[key] = payload[key];
          });
        }
      }
      return { ...state };
    case constants.QUERY_USER_ROLE_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.QUERY_USER_ROLE_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
        userRoleInfo: action.payload
      };
    case constants.QUERY_USER_ROLE_FAILURE:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case constants.SET_NODE_ID_LIST:
      return {
        ...state,
        userRoleInfo: action.payload
      };
    default:
      return state;
  }
}

export default aaRoleReducer;
