import {getProduct, loadProductsFetch} from '../data/products.js';
 import {orders} from '../data/orders.js';
 import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 import formatCurrency from './utils/money.js';
 import {addToCart} from '../data/cart.js'



async function loadPage(){
  await loadProductsFetch();

  let orderHtml = '';

  orders.forEach((order)=>{
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    orderHtml +=
      `
      <div class="order-container">  
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
        
      </div> 
      `;
    });
    

    function productsListHTML(order){
      let productListHtml = '';

      order.products.forEach((productDetails)=>{
        let product = getProduct(productDetails.productId);
        
        productListHtml +=
        `
        <div class="product-image-container">
          <img src="${product.image}">
          </div>
      
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: 
            ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
            data-product-id = "${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
      
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
        `;
      });
      return productListHtml;
    }

  document.querySelector('.js-orders-grid').innerHTML = orderHtml;

  document.querySelectorAll('.js-buy-again-button')
      .forEach((button) => {
        button.addEventListener('click',() => {
          addToCart(button.dataset.productId);

          button.innerHTML = 'Added';

          setTimeout(() => {
            button.innerHTML = 
            `
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            `;
          },1000);
        });
      });
}
loadPage();


