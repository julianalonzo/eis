import React, { useState, useEffect } from "react";

import Button from "../UI/Button";
import Dialog from "../UI/Dialog";
import DialogTitle from "../UI/Dialog/DialogTitle";
import DialogContent from "../UI/Dialog/DialogContent";
import DialogActions from "../UI/Dialog/DialogActions";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export default function MoveDialog({
  isOpen,
  onClose,
  onSubmit,
  submitting,
  folders,
  currentFolder,
  isRequired = false
}) {
  const [currentValue, setCurrentValue] = useState(null);
  const [isErrorShown, setIsErrorShown] = useState(false);

  const options = folders.map(folder => {
    const firstLetter = folder.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...folder
    };
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentValue(null);
    }
  }, [isOpen]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogTitle onClose={onClose}>Move</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={options.sort((a, b) => a.name.localeCompare(b.name))}
          groupBy={option => option.firstLetter}
          getOptionLabel={option => option.name}
          getOptionDisabled={option => option._id === currentFolder._id}
          style={{ width: "400px" }}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              placeholder="Folder Destination"
              error={isErrorShown}
              helperText={isErrorShown ? "Folder must not be empty" : ""}
            />
          )}
          onChange={(event, value) => {
            setCurrentValue(value);
          }}
          onOpen={event => {
            setIsErrorShown(false);
          }}
          value={currentValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={async () => {
            if (isRequired && currentValue === null) {
              setIsErrorShown(true);
            } else {
              await onSubmit(currentValue);
              onClose();
            }
          }}
          disabled={submitting}
        >
          {submitting ? "Moving..." : "Move"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
