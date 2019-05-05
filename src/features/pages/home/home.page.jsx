/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DateUtils from '../../../utils/date-utils.js';
import ProductsListComponent from '../../components/products-list/products-list.component.jsx';
import FilterComponent from '../../components/filter/filter.component.jsx';
import {
  OpenDialogAction,
  CloseDialogAction
} from '../../../common/state/dialog/dialog.actions.js';

import EditProductComponent from '../../components/edit-product/edit-product.component.jsx';
import {
  StartLoaderAction,
  StopLoaderAction
} from '../../../common/state/shared/shared.actions.js';
import {
  FetchUpdateProductAction,
  FetchDeleteProductAction,
  FetchAddProductAction
} from '../../../common/state/products/products.actions.js';

const HomePage = ({
  categories,
  products,
  history,
  openDialog,
  closeDialog,
  startLoader,
  stopLoader,
  updateProduct,
  deleteProduct,
  addProduct
}) => {
  const getProductById = id => products.find(p => p.id === id);
  const [sortBy, setSortBy] = useState('');

  const sortListbyPrice = (list) => {
    const newList = [...list];
    return newList.sort((a, b) => a.price - b.price);
  };

  const sortList = (list, key) => {
    switch (key) {
      case 'createdDate':
        return DateUtils.sortListByCreatedDate(list);
      case 'price':
        return sortListbyPrice(list);
      default:
        return list;
    }
  };

  const sortedList = sortList(products, sortBy);

  const onEditProduct = (data) => {
    startLoader();
    updateProduct(data)
      .then(() => stopLoader())
      .then(() => closeDialog());
  };

  const fetchDeleteProduct = (id) => {
    startLoader();
    deleteProduct(id)
      .then(() => stopLoader())
      .then(() => closeDialog());
  };

  const onDeleteProduct = (product) => {
    openDialog(
      `Delete ${product.name}?`,
      <div>
        <Button color="primary" type="button" onClick={() => fetchDeleteProduct(product.id)}>
          delete
        </Button>
        <Button color="secondary" type="button" onClick={() => closeDialog()}>
          cancel
        </Button>
      </div>
    );
  };

  const fetchAddProduct = (data) => {
    startLoader();
    addProduct(data)
      .then(() => stopLoader())
      .then(() => closeDialog());
  };

  const onAdd = () => {
    openDialog(
      'Add product',
      <EditProductComponent
        product={{ name: '', category: '', price: '' }}
        onConfirm={(name, price) => fetchAddProduct(name, price)}
        onCancel={closeDialog}
        categories={categories}
      />
    );
  };

  const select = (productId) => {
    if (!productId) {
      return;
    }

    const selected = getProductById(productId);
    if (selected) {
      openDialog(
        'edit product',
        <EditProductComponent
          product={selected}
          onConfirm={onEditProduct}
          onCancel={closeDialog}
          categories={categories}
        />
      );
    }
  };

  const setSelectedByPath = () => {
    const splitted = history.location.pathname.split('/');
    const productId = splitted[splitted.length - 1];
    const isHomePage = splitted[splitted.length - 2];
    isHomePage && productId ? select(productId) : select('');
  };

  useEffect(() => {
    const listen = history.listen(() => {
      setSelectedByPath();
    });
    setSelectedByPath();
    return () => listen;
  }, []);

  return (
    <div style={{ height: '100%', maxWidth: '1010px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          maxWidth: '1000px'
        }}
      >
        <Button color="primary" type="button" onClick={() => onAdd()}>
          ADD
        </Button>
        <FormControl style={{ marginBottom: '12px' }}>
          <InputLabel style={{ color: '#3f51b5' }} htmlFor="category-selection">
            sort
          </InputLabel>
          <Select
            style={{ minWidth: '64px' }}
            input={<Input name="name" />}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <MenuItem value="">off</MenuItem>
            <MenuItem value="createdDate">created date</MenuItem>
            <MenuItem value="price">price</MenuItem>
          </Select>
        </FormControl>
      </div>
      <FilterComponent array={sortedList}>
        {filtered => (
          <ProductsListComponent
            list={filtered}
            onDeleteProduct={product => onDeleteProduct(product)}
            onRowClicked={productId => select(productId)}
          />
        )}
      </FilterComponent>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products.productsList,
  categories: state.products.categoriesList
});

const mapDispatchToProps = dispatch => ({
  openDialog: bindActionCreators(OpenDialogAction, dispatch),
  closeDialog: bindActionCreators(CloseDialogAction, dispatch),
  startLoader: bindActionCreators(StartLoaderAction, dispatch),
  stopLoader: bindActionCreators(StopLoaderAction, dispatch),
  updateProduct: bindActionCreators(FetchUpdateProductAction, dispatch),
  deleteProduct: bindActionCreators(FetchDeleteProductAction, dispatch),
  addProduct: bindActionCreators(FetchAddProductAction, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
