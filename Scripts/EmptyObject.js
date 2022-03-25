//alert("Spaceship class...");
class EmptyObject
{
	constructor(x=0, y=0, width=0, height=0, renderImage)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.renderImage = renderImage;
		this.isActive = true;
	}
	
	Render(ctx)
	{
		if(ctx && this.isActive)
		{
			ctx.drawImage(this.renderImage, this.x, this.y, this.width, this.height);
		}
	}

	Collision(gameObject)
	{
		if(this.isActive && 
			(this.x+this.width > gameObject.x && this.x < gameObject.x+gameObject.width) &&
			(this.y+this.height > gameObject.y && this.y < gameObject.y+gameObject.height))
		{
			return true;
		}

		return false;
	}
}

