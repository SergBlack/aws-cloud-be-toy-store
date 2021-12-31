export class ProductService {
  private client;

  constructor(client) {
    this.client = client;
  }

  async getAll() {
    try {
      const { rows: products } = await this.client.query(
        'SELECT p.id, title, description, price, image_src, count FROM products p JOIN stocks s ON p.id = s.product_id;',
      );

      return products;
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
  }

  async findById(productId: string) {
    try {
      const { rows: product } = await this.client.query(
        'SELECT p.id, title, description, price, image_src, s.count FROM products p, stocks s WHERE p.id = s.product_id and p.id = $1;',
        [productId],
      );

      return product;
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
  }

  async create({
    title,
    price,
    count,
    description = '',
    image_src = '',
  }: {
    title: string;
    price: number;
    count: number;
    description?: string;
    image_src?: string;
  }) {
    try {
      await this.client.query('begin');

      const { rows: product } = await this.client.query(
        'INSERT INTO products (title, price, description, image_src) VALUES ($1, $2, $3, $4) RETURNING id, title, description, price, image_src;',
        [title, price, description, image_src],
      );

      const { rows: stock } = await this.client.query(
        'INSERT INTO stocks (product_id, count) VALUES ($1, $2) RETURNING count;',
        [product[0].id, count],
      );

      await this.client.query('commit');

      return { ...product[0], ...stock[0] };
    } catch (e) {
      await this.client.query('rollback');
      console.log(e.stack);
      throw e;
    }
  }
}
