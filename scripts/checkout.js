import { loadCart } from '../data/cart.js';
import { loadProductsFetch } from '../data/products.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummay.js';
import '../data/car.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';


/*

// Using call Back

loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  })
});

*/



/*

// Promise
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });

}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

*/



/*

// Promise All

Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
  console.log(values);
})

*/



async function loadPage(){

  try{

    //throw 'error1';
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      loadCart(() => {
        //reject('error3');
        resolve('value3');
      });
    });
  
  } catch(error){
    console.log('Unexpected error. Please try later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();

}

loadPage();



