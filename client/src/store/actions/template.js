import * as actionTypes from './actionTypes';

import axios from 'axios';

export const createTemplateStart = () => {
  return {
    type: actionTypes.CREATE_TEMPLATE_START
  };
};

export const createTemplateSuccess = template => {
  return {
    type: actionTypes.CREATE_TEMPLATE_SUCCESS,
    template: template
  };
};

export const createTemplateFail = error => {
  return {
    type: actionTypes.CREATE_TEMPLATE_FAIL
  };
};

export const createTemplate = template => {
  return dispatch => {
    dispatch(createTemplateStart());
    axios
      .post('/api/templates/new', template)
      .then(response => {
        dispatch(createTemplateSuccess(response.data.template));
      })
      .catch(error => {
        dispatch(createTemplateFail(error));
      });
  };
};
