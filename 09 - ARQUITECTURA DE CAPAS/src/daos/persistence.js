import { productDaoFS } from "./filesystem/product-dao.js";
import { productDaoMongo } from "./mongodb/product-dao.js";
import { initMongoDB } from "./mongodb/connection.js";

let productDao = null;
// let userDao = null;
let persistence = process.argv[2] || "mongo";  //process.env.PERSISTENCE

switch (persistence) {
    case "fs":
        productDao = productDaoFS;
        // userDao = userDaoFS;
        break;
    case "mongo":
        initMongoDB().then(()=>console.log('conectado a la db')).catch((error)=>console.log(error));
        productDao = productDaoMongo;
        // userDao = userDaoMongo;
    default:
        break;
}

export default { 
    productDao,
    // userDao
 };