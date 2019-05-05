import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import ControledSelectComponent from '../controled-select/controled.select.componet.jsx';

const AddProductComponent = ({ onConfirm, onCancel, categories }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  return (
    <form>
      <div>
        <TextField
          style={{ margin: '8px' }}
          label="name"
          type="string"
          value={name || ''}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          style={{ margin: '8px' }}
          label="price"
          type="number"
          value={price || ''}
          onChange={e => setPrice(e.target.value)}
        />
        <ControledSelectComponent
          callback={setCategory}
          title="category"
          productCategory={category}
          categories={categories}
        />
      </div>
      <div>
        <Button color="primary" onClick={() => onConfirm({ name, price, category })}>add</Button>
        <Button color="secondary" onClick={() => onCancel()}>cancel</Button>
      </div>
    </form>
  );
};

AddProductComponent.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default AddProductComponent;
