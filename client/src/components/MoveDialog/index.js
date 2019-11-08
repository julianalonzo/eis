import React, { useState, useEffect } from "react";

import Breadcrumbs from "../UI/Breadcrumbs";
import Button from "../UI/Button";
import Dialog from "../UI/Dialog";
import DialogTitle from "../UI/Dialog/DialogTitle";
import DialogContent from "../UI/Dialog/DialogContent";
import DialogActions from "../UI/Dialog/DialogActions";
import Thumbnail from "../UI/Thumbnail";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Typography } from "@material-ui/core";
import { Folder as FolderIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  result: {
    display: "flex",
    alignItems: "center"
  },
  mainText: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default function MoveDialog({
  title,
  isOpen,
  onClose,
  onSubmit,
  submitting,
  options,
  isRequired = false
}) {
  const classes = useStyles();

  const [currentValue, setCurrentValue] = useState(null);
  const [isErrorShown, setIsErrorShown] = useState(false);

  let optionsWithFirstLetter = options.map(folder => {
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
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={optionsWithFirstLetter.sort((a, b) =>
            a.name.localeCompare(b.name)
          )}
          groupBy={option => option.firstLetter}
          getOptionLabel={option => option.name}
          style={{ width: "400px" }}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              placeholder="Folder Destination"
              error={isErrorShown}
              helperText={
                !isRequired
                  ? "If a destination is not specified, the folder will be moved to the root directory"
                  : isErrorShown
                  ? "Folder must not be empty"
                  : ""
              }
            />
          )}
          renderOption={option => (
            <div className={classes.result}>
              <div>
                <Thumbnail
                  noBorder
                  variant="icon"
                  icon={<FolderIcon />}
                  marginRight={2}
                />
              </div>
              <div>
                <Typography variant="body2" className={classes.mainText}>
                  {option.name}
                </Typography>
                <Breadcrumbs
                  disabled
                  breadcrumbs={option.hierarchy.map(o => {
                    return { label: o.name };
                  })}
                />
              </div>
            </div>
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
