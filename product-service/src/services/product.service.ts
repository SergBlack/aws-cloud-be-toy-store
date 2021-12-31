export class ProductService {
  private client;

  constructor(client) {
    this.client = client;
  }

  async getAll() {
    try {
      const { rows: products } = await this.client.query(
        'select * from products inner join stocks on products.id = stocks.product_id',
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
        `select p.*, s.count from products p, stocks s where p.id = s.product_id and p.id = '${productId}'`,
      );

      return product;
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
  }
}
