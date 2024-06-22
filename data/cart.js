export let cart = [];


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
      quantity
    });

  }
}