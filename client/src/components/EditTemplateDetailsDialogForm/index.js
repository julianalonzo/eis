import React, { useEffect } from "react";

import { Form } from "react-final-form";

import Button from "../UI/Button";
import Dialog from "../UI/Dialog";
import DialogTitle from "../UI/Dialog/DialogTitle";
import DialogContent from "../UI/Dialog/DialogContent";
import DialogActions from "../UI/Dialog/DialogActions";
import TemplateDetailsForm from "../TemplateDetailsForm";

function EditTemplateDetailsDialogForm({
  isOpen,
  onClose,
  onSubmit,
  submitting,
  template: { name, description }
}) {
  let editTemplateDetailsForm;

  useEffect(() => {
    if (isOpen) {
      editTemplateDetailsForm.initialize({
        templateName: name,
        templateDescription: description
      });
    }
  }, [name, description, isOpen, editTemplateDetailsForm]);

  const submitHandler = async values => {
    const updatedTemplateData = {
      templateName: values.templateName,
      templateDescription: values.templateDescription || ""
    };

    await onSubmit(updatedTemplateData, [], []);

    onClose();
  };

  return (
    <Form
      onSubmit={values => {
        submitHandler(values);
      }}
      render={({ handleSubmit, form }) => {
        editTemplateDetailsForm = form;

        return (
          <form onSubmit={handleSubmit}>
            <Dialog isOpen={isOpen} onClose={onClose}>
              <DialogTitle onClose={onClose}>Edit Template Details</DialogTitle>
              <DialogContent>
                <TemplateDetailsForm />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" disabled={submitting}>
                  {submitting ? "Saving..." : "Save"}
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    />
  );
}

export default EditTemplateDetailsDialogForm;
