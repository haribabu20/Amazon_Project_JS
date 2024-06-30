export let cart = JSON.parse(localStorage.getItem('cart')); // converts from string to array uising parse() as output from JSON will be string 

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
  let quantity;

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  quantity = Number(quantitySelector.value);  
      
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantity;
  }
  else{
    cart.push({
      productId,      
      quantity,
      deliveryOptionID: '1'
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