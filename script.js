let option = 1;
var space;
let slider;
var words = '';
let val;
let stringbox;
let splitString = [];
var currentKey = '';
var typedKey = '';
var printWords = '';
var lastWord = '';
var limitLength = 0;
var emoji = "😷🤮↔️";

var emojiArray = Array.from(emoji);

let particles = [];

let res = 8;
var img;
var packed;
var maybe;
var secured;
var imgDisplay;


function preload() {
  img = loadImage("logo.png");
  packed = loadImage("packed.png");
  maybe = loadImage("maybe.png");
  secured = loadImage("secured.png");
}



function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	// slider = createSlider(0, 100, 50, 10);
	// slider.position(275, 28);
	// slider.style('width', '100px');
	pixelDensity(1);
    noStroke();
    placeParticles();
}

function draw() {
	background(0);
	textFont('Courier');
	textSize(35);
	fill(255, 197, 5);


	


	// if(option == 1) {
	// 	loadPixels();

	// 	for (var y = 0; y < height; y++) {
	// 		for (var x = 0; x < width; x++) {
	// 			var index = (x + y * width)*4;
	// 			pixels[index] = 0;
	// 			pixels[index + 1] = 0;
	// 			pixels[index + 2] = 0;
	// 			pixels[index + 3] = 255;

	// 		}
	// 	}

	// 	updatePixels();
	// } else if(option == 2) {
	// 	loadPixels();

	// 	for (var y = 0; y < height; y+=5) {
	// 		for (var x = 0; x < width; x+=5) {
	// 			var index = (x + y * width)*4;
	// 			pixels[index] = 0;
	// 			pixels[index + 1] = 0;
	// 			pixels[index + 2] = 0;
	// 			pixels[index + 3] = random(100, 255);

	// 		}
	// 	}

	// 	updatePixels();
	// } else if(option == 3) {
	// 	loadPixels();

	// 	for (var y = 0; y < height; y+=2) {
	// 		for (var x = 0; x < width; x+=2) {
	// 			var index = (x + y * width)*4;
	// 			pixels[index] = 0;
	// 			pixels[index + 1] = 0;
	// 			pixels[index + 2] = 0;
	// 			pixels[index + 3] = random(150, 255);

	// 		}
	// 	}

	// 	updatePixels();
	// }

	textSize(15);

	// for(var i=0; i<emojiArray.length; i++) {
	// 	text(emojiArray[i], random(0, width), random(0, height));
	// }

	
	

	

	textSize(20);
	text('after covid', 42.5, 40);
	fill(255);

	textWrap(CHAR);
	textLeading(36);

	// if(words.length < limitLength/2) {
	// 	fill(255);
	// 	option = 1;
	// } else if(words.length > limitLength/2 && words.length < limitLength/4*3) {
	// 	fill(247, 222, 139);
	// 	option = 2;
	// 	if(val < 10) {
	// 		val = 10;
	// 	}
	// } else if(words.length > limitLength || words.length > limitLength/4*3) {
	// 	fill(255, 197, 5);
	// 	option = 3;
	// 	if(val < 15) {
	// 		val = 15;
	// 	}
	// }
	textSize(60);
	text(emojiArray[2], mouseX-18, mouseY+15);


	for(var i=0; i<particles.length; i++) {

		particles[i].update();
		particles[i].draw();
	}
  
    // image(img, 0, 0, width, height);


	// text(words, 42.5, 80, width-85, height-80);
	// image(img, 0, 0, width, height);

	
}

function keyPressed() {
	
  if(keyCode == 37 || keyCode == 39) {
    if(keyCode == 37) {
      if(option > 1) {
        option--;
      }
      if(res > 8) {
        res--;
      }
    } else if(keyCode == 39) {
      if(option < 12) {
        option++;
      }
      if(res < 19) {
        res++;
      }
    }
    placeParticles();
  }

	

}

function placeParticles() {
  
  particles = [];
  
  if(option >= 1 && option <=4) {
    imgDisplay = packed;
  } else if(option >= 5 && option <= 8) {
    imgDisplay = maybe;
  } else if(option >= 9 && option <= 12) {
    imgDisplay = secured;
  }

	for(var i = 0; i<width; i+=res) {
      for(var j=100; j<height-80; j+=res) {
        let x = (i/width) *imgDisplay.width;
        let y = (j/height) * imgDisplay.height;
        let c = imgDisplay.get(x, y);
        
        if(c[3] != 0) {
          particles.push(new Particle(i,j))
        }
      }
    }
}

class Particle {
	constructor(x,y) {
		this.x = x;
		this.y = y;


		this.homeX = x;
		this.homeY = y;

		this.emoji = 0;
	}

	update() {
		let mouseD = dist(this.x, this.y, mouseX, mouseY);
		let mouseA = atan2(this.y - mouseY, this.x - mouseX);

		let homeD = dist(this.x, this.y, this.homeX, this.homeY);
		let homeA = atan2(this.homeY - this.y, this.homeX - this.x);

		let mouseF = constrain(map(mouseD, 0, 150, 15, 0), 0, 10);
		let homeF = map(homeD, 0, 150, 0, 15);

		let vx = cos(mouseA) * mouseF;
		vx += cos(homeA) * homeF;

		let vy = sin(mouseA) * mouseF;
		vy += sin(homeA) * homeF;

		if(mouseD <= 90) {
			this.emoji = 0;
		} else {
			this.emoji = 1;
		}


		this.x += vx;
		this.y += vy;

		
	}

	draw() {
		textSize(10);
        text(emojiArray[this.emoji], this.x, this.y);

	}
}

// function mousePressed() {
// 	for(var i=0; i<5; i++) {
// 		particles.push(new Particle(Math.floor(random(42.5, width-42.5)), Math.floor(random(80, height-80))));
// 	}
	



// 	print(Math.floor(random(42.5, width-42.5)), Math.floor(random(80, height-80)));
// 	print(width, height);
// 	print(particles.length);
// }


// function reverseString(str) {
// 	var newString = '';

// 	for (var i=str.length-1; i=0; i--) {
// 		newString += str[i];
// 	}

// 	return newString;
// }

// function mousePressed() {
// 	option++;

// 	if(option > 3) {
// 		option = 1;
// 	}
// }