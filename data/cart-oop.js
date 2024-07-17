
const cart = {

  cartItems: undefined,


  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop')); // converts from string to array uising parse() as output from JSON will be string 
  
    if(!this.cartItems){    // initally it will be null for cart before we select any product, so at that time cart will provide null value. to avoid such scenario, we use default values if the cart is null
      this.cartItems = [
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
  },


  saveToStorage(){
    localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
  },
  

  removeFromCart(productId){
    let newCart=[];
    this.cartItems.forEach((cartItem) => {
      if(productId !== cartItem.productId){
        newCart.push(cartItem);
      }
    })
    this.cartItems = newCart;
    this.saveToStorage();
  },


  addToCart(productId){

    let matchingItem;
    // let quantity;
  
    // console.log(quantity);
  
    // const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    // quantity = Number(quantitySelector.value);  
  
    // console.log(quantity);
    // console.log(quantitySelector);
        
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity += 1;
    //matchingItem.quantity += quantity;
    }
    else{
      this.cartItems.push({
        productId,      
        quantity: 1,
        //quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  },


  calculateCartQuantity(){
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
    
    return cartQuantity;
  },


  updateQuantity(productId, newQuantity){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
    
    this.saveToStorage();
  },



updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  this.saveToStorage();
  } 

};

cart.loadFromStorage();

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')

console.log(cart);







