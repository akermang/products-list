import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
    <Form style={{ color: '#000', padding: 32 }}>
      <FormControl>
        <Field type="name" name="name">
          {({ field, form }) => (
            <TextField
              type="text"
              label="name"
              {...field}
              placeholder="name"
              style={{ margin: '8px' }}
            />
          )}
        </Field>
        {touched.name && errors.name && <div style={{ color: 'orange' }}>{errors.name}</div>}
      </FormControl>
      <FormControl>
        <Field type="price" name="price">
          {({ field, form }) => (
            <TextField
              type="number"
              label="price"
              {...field}
              placeholder="price"
              style={{ margin: '8px' }}
            />
          )}
        </Field>
        {touched.price && errors.price && <div style={{ color: 'orange' }}>{errors.price}</div>}
      </FormControl>
      <div style={{ marginBottom: '28px' }}>
        <FormControl>
          <Field type="category" name="category">
            {({ field, form }) => (
              <div style={{ marginLeft: '8px' }}>
                <InputLabel style={{ marginLeft: '8px' }} htmlFor="category-selection">
                  category
                </InputLabel>
                <Select
                  style={{ minWidth: '186px' }}
                  input={<Input name="category" label="category" id="category" />}
                  label="category"
                  value={values.category}
                  {...field}
                >
                  {categories.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          </Field>
          {touched.category && errors.category && (
            <div style={{ color: 'orange' }}>{errors.category}</div>
          )}
        </FormControl>
      </div>
      <Field type="submit" name="submit">
        {() => (
          <div>
            <Button color="primary" disabled={isSubmitting} onClick={() => handleSubmit()}>
              save
            </Button>
            <Button color="secondary" onClick={() => onCancel()}>
              cancel
            </Button>
          </div>
        )}
      </Field>
      <div />
    </Form>
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
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withFormik(formOptions)(EditProductComponent);
