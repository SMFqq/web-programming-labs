var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 200;
car1.driver = {
    name: "Vasyl Studentiak",
    category: "C",
    personal_limitations: "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

var car2 = {
    color: "black",
    maxSpeed: 180,
    driver: {
        name: "Vasyl Studentiak",
        category: "B",
        personal_limitations: null
    },
    tuning: false,
    "number of accidents": 2
};

car1.drive = function() {
    console.log("I am not driving at night");
};
car1.drive();

car2.drive = function() {
    console.log("I can drive anytime");
};
car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

Truck.prototype.trip = function() {
    if (!this.driver) {
        console.log("No driver assigned");
    } else {
        var msg = "Driver " + this.driver.name;
        msg += this.driver.nightDriving ? " drives at night" : " does not drive at night";
        msg += " and has " + this.driver.experience + " years of experience";
        console.log(msg);
    }
};

var truck1 = new Truck("white", 5000, 90, "Volvo", "FH16");
var truck2 = new Truck("blue", 4500, 85, "MAN", "TGX");

truck1.AssignDriver("Petro", true, 10);
truck2.AssignDriver("Ivan", false, 2);

truck1.trip();
truck2.trip();

const toRad = (deg) => deg * (Math.PI / 180);

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: геометрична фігура, у якої всі сторони рівні і всі кути прямі.");
    }

    length() {
        console.log("Периметр Square: " + (4 * this.a));
    }

    square() {
        console.log("Площа Square: " + (this.a * this.a));
    }

    info() {
        console.log("--- Info for Square ---");
        console.log(`Сторони: усі по ${this.a}`);
        console.log("Кути: усі по 90°");
        this.length();
        this.square();
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle: чотирикутник, у якого всі кути прямі, а протилежні сторони рівні.");
    }

    length() {
        console.log("Периметр Rectangle: " + (2 * (this.a + this.b)));
    }

    square() {
        console.log("Площа Rectangle: " + (this.a * this.b));
    }

    info() {
        console.log("--- Info for Rectangle ---");
        console.log(`Сторони: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log("Кути: усі по 90°");
        this.length();
        this.square();
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Rhombus: паралелограм, у якого всі сторони рівні.");
    }

    length() {
        console.log("Периметр Rhombus: " + (4 * this.a));
    }

    square() {
        console.log("Площа Rhombus: " + (this.a * this.a * Math.sin(toRad(this.beta))).toFixed(2));
    }

    info() {
        console.log("--- Info for Rhombus ---");
        console.log(`Сторони: усі по ${this.a}`);
        console.log(`Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }
    
    get aSide() { return this.a; }
    set aSide(val) { this.a = val; }
    
    get alphaAngle() { return this.alpha; }
    set alphaAngle(val) { this.alpha = val; }

    get betaAngle() { return this.beta; }
    set betaAngle(val) { this.beta = val; }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram: чотирикутник, у якого протилежні сторони попарно паралельні.");
    }

    length() {
        console.log("Периметр Parallelogram: " + (2 * (this.a + this.b)));
    }

    square() {
        console.log("Площа Parallelogram: " + (this.a * this.b * Math.sin(toRad(this.beta))).toFixed(2));
    }

    info() {
        console.log("--- Info for Parallelogram ---");
        console.log(`Сторони: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Кути: ${this.alpha}°, ${this.beta}°, ${this.alpha}°, ${this.beta}°`);
        this.length();
        this.square();
    }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

const sq = new Square(5);
sq.info();

const rect = new Rectangle(4, 6);
rect.info();

const rhomb = new Rhombus(5, 120, 60);
rhomb.info();

const para = new Parallelogram(4, 6, 120, 60);
para.info();

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

const tr1 = Triangular();
const tr2 = Triangular(5, 12, 13);
const tr3 = Triangular(10, 10, 10);
console.log(tr1);
console.log(tr2);
console.log(tr3);

function PiMultiplier(num) {
    return function() {
        return Math.PI * num;
    };
}

const multiplyBy2 = PiMultiplier(2);
const multiplyBy3_2 = PiMultiplier(3/2);
const divideBy2 = PiMultiplier(0.5);

console.log(multiplyBy2());
console.log(multiplyBy3_2());
console.log(divideBy2());

function Painter(color) {
    return function(obj) {
        if (obj && obj.type) {
            console.log(`Color: ${color}, Type: ${obj.type}`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");

const obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const obj2 = { type: "Truck", "avg speed": 90, "load capacity": 2400 };
const obj3 = { maxSpeed: 180, color: "purple", isCar: true };

PaintBlue(obj1);
PaintRed(obj1);
PaintYellow(obj1);

PaintBlue(obj2);

PaintRed(obj3);