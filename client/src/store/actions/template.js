import * as actionTypes from './actionTypes';

import axios from 'axios';

export const fetchTemplatesStart = () => {
  return {
    type: actionTypes.FETCH_TEMPLATES_START
  };
};

export const fetchTemplatesSuccess = templates => {
  return {
    type: actionTypes.FETCH_TEMPLATES_SUCCESS,
    templates: templates
  };
};

export const fetchTemplatesFail = error => {
  return {
    type: actionTypes.FETCH_TEMPLATES_FAIL,
    error: error
  };
};

export const fetchTemplates = () => {
  return dispatch => {
    dispatch(fetchTemplatesStart());
    axios
      .get('/api/templates')
      .then(res => {
        dispatch(fetchTemplatesSuccess(res.data.templates));
      })
      .catch(error => {
        dispatch(fetchTemplatesFail(error));
      });
  };
};

export const fetchTemplateStart = () => {
  return {
    type: actionTypes.FETCH_TEMPLATE_START
  };
};

export const fetchTemplateSuccess = template => {
  return {
    type: actionTypes.FETCH_TEMPLATE_SUCCESS,
    template: template
  };
};

export const fetchTemplateFail = error => {
  return {
    type: actionTypes.FETCH_TEMPLATE_FAIL,
    error: error
  };
};

export const fetchTemplate = templateId => {
  return dispatch => {
    dispatch(fetchTemplateStart());
    axios
      .get(`/api/templates/${templateId}`)
      .then(res => {
        dispatch(fetchTemplateSuccess(res.data.template));
      })
      .catch(error => {
        dispatch(fetchTemplateFail(error));
      });
  };
};

export const resetTemplate = () => {
  return {
    type: actionTypes.RESET_TEMPLATE
  };
};

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
