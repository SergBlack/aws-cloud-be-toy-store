import { v4 as uuidv4 } from 'uuid';

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
    const id = uuidv4();

    try {
      await this.client.query(
        `insert into products (id, description, price, title, image_src) 
          values ('${id}', '${description}', ${price}, '${title}', '${image_src}');`,
      );
      await this.client.query(
        `insert into stocks (product_id, count) 
          values ('${id}', ${count});`,
      );

      return await this.findById(id);
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
  }
}
