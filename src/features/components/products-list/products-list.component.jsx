import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TreeTableComponent from '../tree-table/tree-table.component.jsx';
import Container from './styles';
import productModel from '../../../common/state/products/product.model.js';
import DateUtils from '../../../utils/date-utils.js';

const ProductsListComponent = ({ list, onDeleteProduct, onRowClicked }) => {
  const formatedList = list.map(product => ({
    ...product,
    createdDate: DateUtils.getFormattedDate(product.createdDate)
  }));

  return (
    <Container>
      <TreeTableComponent
        sizeColumnsToFit
        onSelection={onRowClicked}
        treeData={formatedList}
        columnDefs={[
          {
            field: 'name',
            headerName: 'name'
          },
          {
            field: 'category',
            headerName: 'categories'
          },
          {
            field: 'price',
            headerName: 'price'
          },
          {
            field: 'createdDate',
            headerName: 'created date'
          },
          {
            field: '',
            headerName: '',
            cellRendererFramework: params => (
              <Button color="secondary" onClick={() => onDeleteProduct(params.data)}>
                DELETE
              </Button>
            )
          }
        ]}
      />
    </Container>
  );
};
ProductsListComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(productModel)).isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onRowClicked: PropTypes.func.isRequired
};

export default ProductsListComponent;
