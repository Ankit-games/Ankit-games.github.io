class Rect
{
	constructor(x, y, speedX, speedY, width, height, color)
	{
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	
	Render(ctx)
	{
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
	
	DetectCollision(rect)
	{
		if(this.x+this.width > rect.x && this.x < rect.x+rect.width &&
			this.y+this.height > rect.y && this.y < rect.y+rect.height)
		{
			return true;
		}
		
		return false;
	}
};


