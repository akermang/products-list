import PropTypes from 'prop-types';

const productModel = {
  id: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  createdDate: PropTypes.string // stringified timestamp
};

export default productModel;
