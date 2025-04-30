export default class ProductDTO {
  constructor(product) {
    this.nameProd = product.name;
    this.descriptionProd = product.description;
    this.priceProd = product.price;
    this.stockProd = product.stock;
  }
}
