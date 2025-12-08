// 👉 Import the default exported product object
import product from "./product.js";

// 👉 Destructure name and price from the product object
const { name, price } = product;

// 👉 Display product details using template literals
console.log(`Product Name: ${name}, Price: ₹${price}`);
