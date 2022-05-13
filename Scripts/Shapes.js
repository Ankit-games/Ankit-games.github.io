class Shape 
{
	constructor(x, y, color='white')
	{
		this.x = x;
		this.y = y;
		this.color = color;
	}
};

class Triangle extends Shape
{
	constructor(x=0, y=0, color='white', scale=1)
	{
		super(x, y, color);
		this.scale = scale;
	}
	
	Render(context)
	{
		context.beginPath();
		context.fillStyle = this.color;
		// vertice A
		context.moveTo(this.x, this.y);
		// vertice B
		context.lineTo(this.x+this.scale, this.y+1.7320581*this.scale); 
		// vertice C
		context.lineTo(this.x-this.scale, this.y+1.7320581*this.scale); 
		// vertice A
		context.lineTo(this.x, this.y);
		context.fill();
		context.closePath();
	}
};

class Circle extends Shape
{
	constructor(x=0, y=0, color='white', radius=1)
	{
		super(x, y, color);
		this.radius = radius;
	}
	
	Render(context)
	{
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		context.fill();
		context.closePath();
	}
}

class Rectangle extends Shape
{
	constructor(x=0, y=0, color='white', width=1, height=1)
	{
		super(x, y, color);
		this.width = width;
		this.height = height;
	}
	
	Render(context)
	{
		context.beginPath();
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
		context.closePath();
	}
}

class Line extends Shape
{
	constructor(x=0, y=0, color='white', x1=1, y1=1)
	{
		super(x, y, color);
		this.x1 = x1;
		this.y1 = y1;
	}
	
	Render(context)
	{
		context.beginPath();
		context.strokeStyle = this.color;
		context.lineWidth = 5;
		context.moveTo(this.x, this.y);
		context.lineTo(this.x1, this.y1);
		context.stroke();
		context.closePath();
	}
};
