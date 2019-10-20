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

export const resetTemplates = () => {
  return {
    type: actionTypes.RESET_TEMPLATES
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
  return async dispatch => {
    dispatch(createTemplateStart());

    try {
      const response = await axios.post('api/templates', template);
      dispatch(createTemplateSuccess(response.data.template));
    } catch (err) {
      dispatch(createTemplateFail(err));
    }
  };
};

export const updateTemplateStart = () => {
  return {
    type: actionTypes.UPDATE_TEMPLATE_START
  };
};

export const updateTemplateSuccess = template => {
  return {
    type: actionTypes.UPDATE_TEMPLATE_SUCCESS,
    template: template
  };
};

export const updateTemplateFail = error => {
  return {
    type: actionTypes.UPDATE_TEMPLATE_FAIL
  };
};

export const updateTemplate = (templateId, template) => {
  return async dispatch => {
    dispatch(updateTemplateStart());

    try {
      const response = await axios.put(`api/templates/${templateId}`, template);
      dispatch(updateTemplateSuccess(response.data.template));
    } catch (err) {
      dispatch(updateTemplateFail(err));
    }
  };
};

export const removeTemplateStart = () => {
  return {
    type: actionTypes.REMOVE_TEMPLATE_START
  };
};

export const removeTemplateFail = error => {
  return {
    type: actionTypes.REMOVE_TEMPLATE_FAIL
  };
};

export const removeTemplateSuccess = templateId => {
  return {
    type: actionTypes.REMOVE_TEMPLATE_SUCCESS,
    templateId: templateId
  };
};

export const removeTemplate = templateId => {
  return async dispatch => {
    dispatch(removeTemplateStart());

    try {
      const response = await axios.delete(`api/templates/${templateId}`);
      dispatch(removeTemplateSuccess(response.data.templateId));
    } catch (err) {
      dispatch(removeTemplateFail(err));
    }
  };
};
