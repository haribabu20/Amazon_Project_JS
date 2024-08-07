import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {deliveryOptions, getdeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummay.js';
import {renderCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary(){

  let cartSummaryHTML=''; 

  cart.forEach((cartItem) => {

  // productID
  let productId = cartItem.productId;
  const matchingProduct = getProduct(productId);

  // deliveryOptionID
  let deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getdeliveryOption(deliveryOptionId);
  
  const dateString = calculateDeliveryDate(deliveryOption);

  cartSummaryHTML += `

  <div class="cart-item-container
    js-cart-item-container
    js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
      ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${matchingProduct.getPrice()}
      </div>
      <div class="product-quantity js-product-quantity-${matchingProduct.id}">
        <span>
          Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link"
          data-product-id = "${matchingProduct.id}">
          Update
        </span>
        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
        <span class="save-quantity-link link-primary js-save-link"
          data-product-id = "${matchingProduct.id}">
          Save
        </span>
        <span class="delete-quantity-link link-primary js-delete-link 
          js-delete-link-${matchingProduct.id}" 
          data-product-id = "${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      ${deliveryOptionsHTML(matchingProduct, cartItem)}
    </div>
  </div>
  </div>
  `;
  });


  function deliveryOptionsHTML(matchingProduct, cartItem) {

  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
  //DateString
  const dateString = calculateDeliveryDate(deliveryOption);

  //PriceString
  const priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;

  //RadioButton
  let isChecked = deliveryOption.id === cartItem.deliveryOptionId;  // We only want to be checked if this deliveryOption id matched with the delivery option id in the cart


  html += 
  `
    <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id=${deliveryOption.id}>
      <input type="radio" 
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
  `
  })

  return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
  link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    
    
  })
  });

  document.querySelectorAll('.js-update-link')
  .forEach((link) => {
  link.addEventListener('click', () => {
    let productId = link.dataset.productId; 

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');  // This class main motive is to add the 2 element [input and save] in page when we clicked update link
  });
  });

  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      
      let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      if(newQuantity < 0 || newQuantity >= 1000){
        alert('Quantity must be atleast 0 and less than 1000');
        return;     // Early Return
      }

      updateQuantity(productId, newQuantity);  // else part


      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');  

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
    });
  });

  function updateCartQuantity(){

  let cartQuantity = calculateCartQuantity();  
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }


  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  })


}






