import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import { TextField, Button, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './edit-product.module.scss';

const isValidName = name => name.length < 50;

const formOptions = {
  mapPropsToValues: (props) => {
    const { product } = props;
    return {
      name: (product && product.name) || '',
      price: (product && product.price) || '',
      category: (product && product.category) || ''
    };
  },
  validate: (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (!isValidName(values.name)) {
      errors.name = 'Name must be less than 50 characters';
    } else if (!values.price && values.price !== 0) {
      errors.price = 'Required';
    } else if (values.price <= 0) {
      errors.price = 'Price must be greater than 0';
    } else if (!values.category) {
      errors.category = 'Required';
    }
    return errors;
  },
  handleSubmit: (newVal, callback) => {
    const { onConfirm, product } = callback.props;
    onConfirm({ ...product, ...newVal });
  }
};

const EditProductComponent = (props) => {
  const {
    handleSubmit, values, touched, errors, isSubmitting, onCancel, categories
  } = props;
  return (
    <Grid container spacing={32} className={styles.container}>
      <Grid item xs={12} md={6}>
        <Field type="name" name="name">
          {({ field, form }) => (
            <TextField
              fullWidth
              type="text"
              label="name"
              {...field}
              placeholder="name"
            />
          )}
        </Field>
        {touched.name && errors.name && <div style={{ color: 'orange' }}>{errors.name}</div>}
      </Grid>
      <Grid item xs={12} md={6}>
        <Field type="price" name="price">
          {({ field, form }) => (
            <TextField
              fullWidth
              type="number"
              label="price"
              {...field}
              placeholder="price"
            />
          )}
        </Field>
        {touched.price && errors.price && <div style={{ color: 'orange' }}>{errors.price}</div>}
      </Grid>
      <Grid item xs={12}>
        <Field type="category" name="category">
          {({ field, form }) => (
            <React.Fragment>
              <InputLabel>category</InputLabel>
              <Select fullWidth className={styles.select} value={values.category} {...field}>
                {categories.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </React.Fragment>
          )}
        </Field>
        {touched.category && errors.category && (
          <div style={{ color: 'orange' }}>{errors.category}</div>
        )}
      </Grid>
      <Grid item xs={6}>
        <Button color="primary" disabled={isSubmitting} onClick={() => handleSubmit()} fullWidth>
          save
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button color="secondary" onClick={() => onCancel()} fullWidth>
          cancel
        </Button>
      </Grid>
    </Grid>
  );
};

EditProductComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withFormik(formOptions)(EditProductComponent);
