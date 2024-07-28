import { loadProducts } from '../data/products.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummay.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';


new Promise((resolve) => {
  console.log('start promise');
  loadProducts(() => {
    console.log('finished loading');
    resolve();
  });
}).then(() => {
  console.log('next step');
})

//Console:

/*
start promise
load products
finished loading
next step

*/




// loadProducts(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// });


