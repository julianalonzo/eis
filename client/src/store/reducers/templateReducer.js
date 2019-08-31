import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  templates: [],
  creatingTemplate: false
};

const createTemplateStart = (state, action) => {
  return updateObject(state, { creatingTemplate: true });
};

const createTemplateFail = (state, action) => {
  return updateObject(state, { creatingTemplate: false });
};

const createTemplateSuccess = (state, action) => {
  const newTemplate = action.template;

  return updateObject(state, {
    loading: false,
    templates: state.templates.concat(newTemplate)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_TEMPLATE_START:
      return createTemplateStart(state, action);
    case actionTypes.CREATE_TEMPLATE_SUCCESS:
      return createTemplateSuccess(state, action);
    case actionTypes.CREATE_TEMPLATE_FAIL:
      return createTemplateFail(state, action);
    default:
      return state;
  }
};

export default reducer;
