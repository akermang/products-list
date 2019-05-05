import createAsyncAction from '../../../utils/createAsyncAction';
import HttpService from '../../services/http.service';
import ApiService from '../../services/api.service';

export const FETCH_PRODUCTS_LIST = 'FETCH_PRODUCTS_LIST';
export const FETCH_CTEGORIES_LIST = 'FETCH_CTEGORIES_LIST';
export const FETCH_ADD_PRODUCT = 'FETCH_ADD_PRODUCT';
export const FETCH_UPDATE_PRODUCT = 'FETCH_UPDATE_PRODUCT';
export const FETCH_DELETE_PRODUCT = 'FETCH_DELETE_PRODUCT';

export const FetchProductsListAction = createAsyncAction(FETCH_PRODUCTS_LIST, () => {
  const options = ApiService.getOptions('fetchProductsList');
  return HttpService.fetch(options);
});

export const FetchCategoriesListAction = createAsyncAction(FETCH_CTEGORIES_LIST, () => {
  const options = ApiService.getOptions('fetchCategoriesList');
  return HttpService.fetch(options);
});

export const FetchAddProductAction = createAsyncAction(FETCH_ADD_PRODUCT, (product) => {
  const options = ApiService.getOptions('fetchAddProduct');
  options.body = JSON.stringify(product);
  return HttpService.fetch(options);
});

export const FetchUpdateProductAction = createAsyncAction(FETCH_UPDATE_PRODUCT, (product) => {
  const options = ApiService.getOptions('fetchUpdateProduct');
  options.body = JSON.stringify(product);
  return HttpService.fetch(options);
});

export const FetchDeleteProductAction = createAsyncAction(FETCH_DELETE_PRODUCT, (id) => {
  const options = ApiService.getOptions('fetchDeleteProduct');
  return HttpService.fetch({ ...options, url: options.url(id) });
});
