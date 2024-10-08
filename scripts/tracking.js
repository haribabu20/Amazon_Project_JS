import {getOrder} from '../data/orders.js';
 import {getProduct, loadProductsFetch} from '../data/products.js';
 import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function loadPage(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);


  // Go through the notes of 18.3. Attached the order SS there which will
  // helps us to understand the field.

  // Else we can't understand the code

  // code for fetching the product details from the order[response].
  // Here I'm comparing the productId received from response [order.products.productId] with product from which we got it from the URL parameter as productId
  let productDetails;
  order.products.forEach((details) => {
    if(details.productId = product.id){
      productDetails = details;
    }
  });


  // tracking order bar

  // const today = dayjs().format('D');
  const today = dayjs().format('D');
  const orderTime = dayjs(order.orderTime).format('D');
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime).format('D');
  const percentProgress = ((today-orderTime)/(deliveryTime-orderTime)) * 100;

  

  const trackingHTML = 
    `
    <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>  

    <div class="delivery-date">
      Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        (percentProgress > 100) ? 'current-status' : ''
      }">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%"></div>
    </div>
    `;


    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
    console.log(today);
    console.log(orderTime);
    console.log(deliveryTime);
    console.log(percentProgress);
}


loadPage();