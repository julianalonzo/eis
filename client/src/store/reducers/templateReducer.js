import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  templates: [],
  creatingTemplate: false,
  removingTemplate: false,
  removingTemplateError: null,
  fetchingTemplates: false,
  fetchingTemplatesErrors: null,
  template: {
    name: '',
    description: '',
    item: {
      name: '',
      description: '',
      category: '',
      thumbnails: [],
      properties: [],
      attachments: []
    }
  },
  fetchingTemplate: false,
  fetchingTemplateErrors: null
};

const fetchTemplatesStart = (state, action) => {
  return updateObject(state, { fetchingTemplates: true });
};

const fetchTemplatesFail = (state, action) => {
  return updateObject(state, {
    fetchingTemplatesErrors: action.error,
    fetchingTemplates: false
  });
};

const fetchTemplatesSuccess = (state, action) => {
  return updateObject(state, {
    templates: action.templates,
    fetchingTemplates: false,
    fetchingTemplatesErrors: null
  });
};

const resetTemplates = (state, action) => {
  return updateObject(state, {
    templates: []
  });
};

const fetchTemplateStart = (state, action) => {
  return updateObject(state, { fetchingTemplate: true });
};

const fetchTemplateFail = (state, action) => {
  return updateObject(state, {
    fetchingTemplateErrors: action.error,
    fetchingTemplate: false
  });
};

const fetchTemplateSuccess = (state, action) => {
  return updateObject(state, {
    template: action.template,
    fetchingTemplate: false,
    fetchingTemplateError: null
  });
};

const resetTemplate = (state, action) => {
  return updateObject(state, {
    template: {
      name: '',
      description: '',
      item: {
        name: '',
        description: '',
        category: '',
        thumbnails: [],
        properties: [],
        attachments: []
      }
    }
  });
};

const createTemplateStart = (state, action) => {
  return updateObject(state, { creatingTemplate: true });
};

const createTemplateFail = (state, action) => {
  return updateObject(state, { creatingTemplate: false });
};

const createTemplateSuccess = (state, action) => {
  return updateObject(state, {
    creatingTemplate: false
  });
};

const removeTemplateStart = (state, action) => {
  return updateObject(state, { removingTemplate: true });
};

const removeTemplateFail = (state, action) => {
  return updateObject(state, {
    removingTemplate: false,
    removingTemplateError: action.error
  });
};

const removeTemplateSuccess = (state, action) => {
  return updateObject(state, {
    removingTemplate: false,
    templates: state.templates.filter(
      template => template._id !== action.templateId
    )
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_START:
      return fetchTemplatesStart(state, action);
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return fetchTemplatesSuccess(state, action);
    case actionTypes.FETCH_TEMPLATES_FAIL:
      return fetchTemplatesFail(state, action);
    case actionTypes.RESET_TEMPLATES:
      return resetTemplates(state, action);
    case actionTypes.FETCH_TEMPLATE_START:
      return fetchTemplateStart(state, action);
    case actionTypes.FETCH_TEMPLATE_SUCCESS:
      return fetchTemplateSuccess(state, action);
    case actionTypes.FETCH_TEMPLATE_FAIL:
      return fetchTemplateFail(state, action);
    case actionTypes.RESET_TEMPLATE:
      return resetTemplate(state, action);
    case actionTypes.CREATE_TEMPLATE_START:
      return createTemplateStart(state, action);
    case actionTypes.CREATE_TEMPLATE_SUCCESS:
      return createTemplateSuccess(state, action);
    case actionTypes.CREATE_TEMPLATE_FAIL:
      return createTemplateFail(state, action);
    case actionTypes.REMOVE_TEMPLATE_START:
      return removeTemplateStart(state, action);
    case actionTypes.REMOVE_TEMPLATE_SUCCESS:
      return removeTemplateSuccess(state, action);
    case actionTypes.REMOVE_TEMPLATE_FAIL:
      return removeTemplateFail(state, action);
    default:
      return state;
  }
};

export default reducer;
