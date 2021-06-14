const pool = require('pool');

//1. We define the shape of our data, then
// 2. We define methods to access that data (CRUD)

class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity_of_items;
  }

  // Two types of class methods:
  // 1. Static method
  // 2. Instance method
  static async insert(quantity) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity_of_items) VALUES ($1) RETURNING *',
      [quantity]
    );

    // rows = [{ id: '1', quantity_of_items: 10 }]
    return new Order(rows[0]);
    
  }
  static async select() {
    const { rows } = await pool.query(
      'SELECT * FROM orders',
    );
    return new Order(rows);
  }
  static async selectId(id) {
    const { rows } = await pool.query(
      ` SELECT * 
        FROM orders 
        WHERE id = ($1)
      `,
      [id]
    );
    return new Order(rows[0]);
  }
  static async update(quantity, id) {
    const { rows } = await pool.query(
      ` UPDATE orders
        SET quantity_of_items = $1
        WHERE id = $2
        RETURNING *
        `,
      [quantity, id]
    );
    return new Order(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      ` DELETE id
        FROM orders
        WHERE id = $1
        RETURNING *`,
      [id]
    );
    return new Order(rows[0]);
  }
}

module.exports = Order;
