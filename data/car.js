
class Car{
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails){
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    
  }

  displayInfo(){

    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.brand}, ${this.model} - Speed: ${this.speed} km/hr and Trunk: ${trunkStatus}` );
    
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
    else{
      console.log('Cannot open as car is moving');
    }
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }

  go(){
    if(!this.isTrunkOpen){
      this.speed += 5;
    }
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

 car1.displayInfo(); // istrunk = false and speed = 0
 car1.go(); // speed = 5
 car1.brake(); // speed = 0 now
 car1.openTrunk(); // can open the trunk as car is not moving 
 car1.go(); // cannot implement go() as trunk is open
 car1.displayInfo();  // open

 car2.displayInfo(); // close
 car2.go();
 car2.go();
 car2.go();
 car2.go(); // speed = 20
 car2.brake();
 car2.brake(); // speed = 10
 car2.openTrunk(); // cannot open as speed = 10, i.e car is moving
 car2.displayInfo(); // close
 car2.brake();
 car2.brake(); //  speed = 0 
 car2.openTrunk(); // can open now
 car2.displayInfo(); // open





