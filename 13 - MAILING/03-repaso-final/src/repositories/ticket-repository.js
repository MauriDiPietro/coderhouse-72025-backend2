import { ticketDaoMongo } from "../daos/mongodb/ticket-dao.js";
import CustomError from "../utils/custom-error.js";
import { cartRepository } from "./cart-repository.js";
import { productRepository } from "./product-repository.js";

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  generateTicket = async (user) => {
    try {
      const cart = await cartRepository.getById(user.cart);
      let acmountAcc = 0;
      for (const prod of cart.products) {
        const idProd = prod.product;
        const prodDB = await productRepository.getById(idProd);
        if (prod.quantity > prodDB.stock)
          throw new CustomError(
            "la cantidad supera el stock del producto",
            404
          );
        const amount = prod.quantity * prodDB.price;
        acmountAcc += amount;
        // ---> RESTAR STOCK DEL PRODUCTO (prodDB.stock)
        // await producRepository.restarStockAlprod(prod.quantity)
      }
      const ticket = await this.dao.create({
        code: `${Math.random() * 1000}`,
        purchase_datetime: new Date().toLocaleString(),
        amount: acmountAcc,
        purchaser: user.email
      })

      await cartRepository.clearCart(user.cart)
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const ticketRepository = new TicketRepository(ticketDaoMongo);
