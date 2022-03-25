//alert('Spaceship Controller link Sucessesfully...');
function SpaceshipController(ctx, spaceship, speed)
{
	spaceship.x += horizontalInput * speed;
	
	if(spaceship.x <= 1)
	{
		spaceship.x = 1;
	}
	else if(spaceship.x+spaceship.width >= ctx.canvas.width)
	{
		spaceship.x = ctx.canvas.width - spaceship.width;
	}

};

