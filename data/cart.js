export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')); // converts from string to array uising parse() as output from JSON will be string 

  if(!cart){    // initally it will be null for cart before we select any product, so at that time cart will provide null value. to avoid such scenario, we use default values if the cart is null
    cart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1, 
        deliveryOptionId: '2'
      }
    ];
  }  
}


export function removeFromCart(productId){
  let newCart=[];
  cart.forEach((cartItem) => {
    if(productId !== cartItem.productId){
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToStorage();
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){

  let matchingItem;
  // let quantity;

  // console.log(quantity);

  // const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  // quantity = Number(quantitySelector.value);  

  // console.log(quantity);
  // console.log(quantitySelector);
      
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += 1;
  //matchingItem.quantity += quantity;
  }
  else{
    cart.push({
      productId,      
      quantity: 1,
      //quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}


export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  });
  
  return cartQuantity;
}


export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  
  saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
} 




export function loadCart(fun){

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    fun();
  });
  xhr.open('Get','https://supersimplebackend.dev/cart');
  xhr.send();
}


export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}




