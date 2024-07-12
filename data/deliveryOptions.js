import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];


export function getdeliveryOption(deliveryOptionId){

  let deliveryOption;     

  deliveryOptions.forEach((option) => {
  if(deliveryOptionId === option.id){
    deliveryOption = option;
  }
  });

  return deliveryOption || deliveryOptions[0]; // Default operator is used and if we didn't select anything, then first array would be checked as deliveryOption
}


export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}