
class Cart {
  cartItems = undefined;
  localStorageKey = undefined;


  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }


  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)); // converts from string to array uising parse() as output from JSON will be string 
  
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
  }

  saveToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }
  
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
  }

  removeFromCart(productId){
    let newCart=[];
    this.cartItems.forEach((cartItem) => {
      if(productId !== cartItem.productId){
        newCart.push(cartItem);
      }
    })
    this.cartItems = newCart;
    this.saveToStorage();
  }


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


}



const cart = new Cart('cart-oop');
const businesscart = new Cart('cart-business');


console.log(cart);
console.log(businesscart);

console.log(businesscart instanceof Cart);








