import { goBack as _goBack, push } from "react-router-redux";

export const goBack = () => {
  return dispatch => {
    dispatch(_goBack());
  };
};
