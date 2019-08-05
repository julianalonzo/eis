import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  formTitleContainer: {
    marginBottom: '16px'
  },
  formTitle: {
    fontWeight: 700,
    letterSpacing: '1.3px',
    textTransform: 'uppercase'
  },
  textFieldContainer: {
    width: '600px'
  },
  formControl: {
    minWidth: '600px',
    marginTop: '16px'
  }
});

export default function ItemDetailsForm({
  itemDetailsFormData: { itemName, itemCategory, itemCondition, itemThumbnail }
}) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.formTitleContainer}>
        <Typography className={classes.formTitle} component="span">
          Item Details
        </Typography>
      </div>
      <div className={classes.textFieldContainer}>
        <TextField
          label="Item Name"
          value={itemName}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className={classes.textFieldContainer}>
        <TextField
          label="Category"
          value={itemCategory}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      </div>
      
    </div>
  );
}

ItemDetailsForm.propTypes = {
  itemDetailsFormData: PropTypes.shape({
    itemName: PropTypes.string,
    itemCategory: PropTypes.string,
    itemCondition: PropTypes.string,
    itemThumbnail: PropTypes.string
  })
};

ItemDetailsForm.defaultProps = {
  itemDetailsFormData: {
    name: '',
    category: '',
    condition: 'In Stock',
    thumbnail:
      'https://www.google.com.ph/url?sa=i&source=images&cd=&ved=2ahUKEwjqpsGHjtTjAhULIIgKHZmNCS8QjRx6BAgBEAQ&url=https%3A%2F%2Fpngimage.net%2Fitem-png-3%2F&psig=AOvVaw2j8RocU6J3Sq8Dqk4rbAvR&ust=1564282898139938'
  }
};
