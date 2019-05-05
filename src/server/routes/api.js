const express = require('express');
const uuid = require('uuid/v1');

const time = () => new Date().toISOString();

const router = express.Router();

// Mock data
let productsList = require('../mock/products_list.json');
const categoriesList = require('../mock/categories_list.json');

const serverResponseTime = 1;

// Simulate server delayed response
function send (res, data) {
  setTimeout(() => {
    res.send(data);
  }, serverResponseTime);
}

/**
 * Api routes
 */

// Get Products list
router.get('/products-list', (req, res) => send(res.status(200), productsList));

// Get Categories list
router.get('/categories-list', (req, res) => send(res.status(200), categoriesList));

// Post  Product add
router.post('/product/add', (req, res) => {
  const { price } = req.body;
  productsList.unshift({
    ...req.body,
    price: parseInt(price, 10),
    id: uuid(),
    createdDate: time()
  });
  send(res.status(200), productsList);
});

// Post  Product delete
router.post('/product/delete/:id', (req, res) => {
  const { id } = req.params;
  const newList = productsList.filter(obj => obj.id !== id);
  productsList = newList;
  send(res.status(200), productsList);
});

// Put Product update
router.put('/product/update', (req, res) => {
  const { id, price } = req.body;
  const product = productsList.find(p => p.id === id);
  if (product) {
    const index = productsList.indexOf(product);
    productsList[index] = { ...req.body, price: parseInt(price, 10) };
  }
  send(res.status(200), productsList);
});

module.exports = router;
