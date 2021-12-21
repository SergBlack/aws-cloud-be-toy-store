import { ProductService } from '@services/product.service';

const productService = new ProductService();

export const getAllProducts = async () => {
  try {
    return await productService.getAll();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getProduct = async (id: string) => {
  try {
    return await productService.findById(id);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
