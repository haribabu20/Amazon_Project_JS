import { loadProducts } from '../data/products.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummay.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});


