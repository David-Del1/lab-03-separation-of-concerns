const { Router } = require('express');
const Order  = require('../models/Order');

// export default Router
module.exports = Router() // same thing as app.post(...)
  .post('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.insert(req.body.quantity);
      res.send(order);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.select();
      res.send(order);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.selectId(req.params.id);
      res.send(order);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  .put('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.update(req.body, req.params.id);
      res.send(order);
    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.delete(req.params.id);
      res.send(order);
    }
    catch(err) {
      res.status(500).send(err);
    }
  });
