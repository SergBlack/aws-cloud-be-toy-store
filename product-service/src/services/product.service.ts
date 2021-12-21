/* eslint-disable class-methods-use-this */
const data = require('@mocks/data.json');

export class ProductService {
  getAll() {
    return data;
  }

  findById(productId: string) {
    const foundedProduct = data.filter(product => product.id === productId);

    return foundedProduct.length ? foundedProduct[0] : null;
  }
}
