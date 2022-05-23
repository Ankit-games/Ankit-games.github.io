const context = document.querySelector('canvas').getContext('2d');
const moniter = document.querySelector('#moniter');
const colorPicker = document.querySelector('#color_picker');

var SCREEN_WIDTH, SCREEN_HEIGHT;

const frameRate = 41.66667 /* 60 FPS */

const total = {
	'Line': 0,
	'Circle': 0,
	'Triangle': 0,
	'Rectangle': 0
};

let selectedShape = "none";
let hasShapeObjectCreated = false;

const shapes = new Array();

UpdateMoniter();

/* Render Loop ------------- */
const firstInterval = setInterval(function()
{
	// resize screen width and height
	SCREEN_WIDTH  = context.canvas.width  = screen.width;
	SCREEN_HEIGHT = context.canvas.height = screen.height;
	
	RenderShapes();
	CreateShapeObject();
	ResizeShape();
	
}, frameRate);

function ResizeShape()
{
	if(hasShapeObjectCreated)
	{
		switch(selectedShape)
		{
			case 'Line':
			{
				shapes[shapes.length-1].x1 = Touch.End.x;
				shapes[shapes.length-1].y1 = Touch.End.y;
				break;
			}
			case 'Circle':
			{
				let x = Touch.End.x - Touch.Start.x;
				let y = Touch.End.y - Touch.Start.y;
				shapes[shapes.length-1].radius = Math.sqrt(x*x + y*y);
				break;
			}
			case 'Triangle':
			{
				let x = Touch.End.x - Touch.Start.x;
				let y = Touch.End.y - Touch.Start.y;
				shapes[shapes.length-1].scale = Math.sqrt(x*x + y*y);
				break;
			}
			case 'Rectangle':
			{
				shapes[shapes.length-1].width  = Math.abs(Touch.End.x - Touch.Start.x);
				shapes[shapes.length-1].height = Math.abs(Touch.End.y - Touch.Start.y);
				break;
			}
			default: {
				alert('Please Select any Shape');
				hasShapeObjectCreated = false;
			}
		}
	}
}

function CreateShapeObject()
{
	if(hasTouch && !hasShapeObjectCreated)
	{
		switch(selectedShape)
		{
			case 'Line':
			{
				shapes[shapes.length] = new Line(Touch.Start.x, Touch.Start.y, colorPicker.value);
				break;
			}
			case 'Circle':
			{
				shapes[shapes.length] = new Circle(Touch.Start.x, Touch.Start.y, colorPicker.value);
				break;
			}
			case 'Triangle':
			{
				shapes[shapes.length] = new Triangle(Touch.Start.x, Touch.Start.y, colorPicker.value);
				break;
			}
			case 'Rectangle':
			{
				shapes[shapes.length] = new Rectangle(Touch.Start.x, Touch.Start.y, colorPicker.value);
				break;
			}
			default: {
				alert('Please Select any Shape');
				hasTouch = false;
			}
		}
		
		total[selectedShape]++;
		UpdateMoniter();
		hasShapeObjectCreated = true;
	}
	
	if(!hasTouch && hasShapeObjectCreated) {
		hasShapeObjectCreated = false;
	}
}

function RenderShapes()
{
	context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
	for(let i=0; i<shapes.length; i++) 
		shapes[i].Render(context);
}

function SelectShape(shape)
{
	selectedShape = shape;
	UpdateMoniter();
}

function ClearScreen()
{
	total.Line = 0;
	total.Circle = 0;
	total.Triangle = 0;
	total.Rectangle = 0;
	
	shapes.length = 0;
	UpdateMoniter();	
}

function UpdateMoniter()
{
	moniter.innerHTML = "Line : "+total.Line+"<br>";
	moniter.innerHTML += "Circle : "+total.Circle+"<br>";
	moniter.innerHTML += "Triangle : "+total.Triangle+"<br>";
	moniter.innerHTML += "Rectangle : "+total.Rectangle+"<br>";
	moniter.innerHTML += "Total Shapes : "+shapes.length+"<br>";
	moniter.innerHTML += "Selected Shape : "+selectedShape+"<br>";
	moniter.innerHTML += "Selected Color : "+colorPicker.value+"<br>";
}
