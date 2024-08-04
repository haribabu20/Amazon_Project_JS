
class Car{
  brand;
  model;
  speed = 0;

  constructor(carDetails){
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    
  }

  displayInfo(){
    console.log(`${this.brand}, ${this.model} - Speed: ${this.speed} km/hr`);
  }

  go(){
    this.speed += 5;
    if(this.speed > 200){
      this.speed = 200;
    }
  }

  brake(){
    this.speed -= 5;
    if(this.speed < 0){
      this.speed = 0;
    }
  }
}

const car1 = new Car({
  brand: 'Toyato',
  model: 'Corolla',
  
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3',
  
});

 car1.displayInfo();
 car1.go();
 car1.go();
 car1.go();
 car1.go();
 car1.brake();
 car1.displayInfo();

 car2.displayInfo();
 car2.go();
 car2.go();
 car2.go();
 car2.go();
 car2.brake();
 car2.brake();
 car2.displayInfo();



 /*

Toyato, Corolla - Speed: 0 km/hr
Toyato, Corolla - Speed: 15 km/hr
Tesla, Model 3 - Speed: 0 km/hr
Tesla, Model 3 - Speed: 10 km/hr

 */

