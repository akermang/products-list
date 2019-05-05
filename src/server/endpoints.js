export default {
  fetchProductsList: {
    url: '/api/products-list',
    method: 'GET',
    contentType: 'application/json'
  },
  fetchCategoriesList: {
    url: '/api/categories-list',
    method: 'GET',
    contentType: 'application/json'
  },
  fetchAddProduct: {
    url: '/api/product/add',
    method: 'POST',
    contentType: 'application/json'
  },
  fetchDeleteProduct: {
    url: id => `/api/product/delete/${id}`,
    method: 'POST',
    contentType: 'application/json'
  },
  fetchUpdateProduct: {
    url: '/api/product/update',
    method: 'PUT',
    contentType: 'application/json'
  }
};
