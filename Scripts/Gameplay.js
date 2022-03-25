//alert('Gameplay file link sucessesfully...');
function Gameplay()
{
	//alert('Game staet...');
	const ctx = document.querySelector('#canvas').getContext('2d');
	
	let width = ctx.canvas.width = 1920;
	let height = ctx.canvas.height = 1080;	

	const spawnManager = new SpawnManager();

	const spaceshipSpeed = 20;
	const spaceship = new EmptyObject(width/2 - 50, height-300, 100, 100, spaceshipImage);

	const laserSpeed = 10;
	const lasers = new Array();
	const laserLoadDelay = 2;

	let laserLoad = false;
	let laserLoadInterval = 0;

	const laserImage = document.querySelector("#laser");	

	const player = 
	{
		'Score': 0,
		'Health': 3
	};
	
	gameInterval = setInterval(function()
	{
		// make canvas resolution for smartphones
		if(screen.width > screen.height) 
		{
			width = ctx.canvas.width = 1920;
			height = ctx.canvas.height = 1080;
		}
		else 
		{
			width = ctx.canvas.width = 1080;
			height = ctx.canvas.height = 1920;
		}

		spaceship.y = height - 350;
		
		// clear canvas per frame
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		spaceship.Render(ctx);	
		SpaceshipController(ctx, spaceship, spaceshipSpeed);
		
		spawnManager.ObstaclesSpawner(ctx);	
		spawnManager.RenderObstacles(ctx, spaceship, lasers, player);
		spawnManager.PlayerHealthSpawner(ctx, spaceship, player);

		for(let i=0; i<lasers.length; i++)
		{
			lasers[i].Render(ctx);
			lasers[i].y -= laserSpeed;
			
			if(lasers[i].y < 1) 
			{
				lasers.shift();
			}
		}

		RenderScoreBoard(ctx, player, 50, 100);

		if(isShooterActive)
		{
			if(laserLoad)
			{
				laserLoad = false;
				const laserOnLeft = new EmptyObject(spaceship.x+5, spaceship.y, 20, 30, laserImage);
				const laserOnRight = new EmptyObject(spaceship.x+70, spaceship.y, 20, 30, laserImage);
				lasers.push(laserOnLeft);
				lasers.push(laserOnRight);
				soundEffects.MissileLaunch.play();
			}
			else 
			{
				if(laserLoadInterval > laserLoadDelay)
				{
					laserLoad = true;
					laserLoadInterval = 0;
				}
				else 
				{
					laserLoadInterval += 1;
				}
			}
		}

		if(player.Health < 1)
		{
			soundEffects.Burst.pause();
			soundEffects.GameOver.play();
			alert('Game Over\nPress OK to continue.');
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			MenuBtnClick();
		}

	}, 41.6667);
}

function RenderScoreBoard(ctx, player, x, y)
{
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.font = 'bold 50px arial';
	ctx.fillText('Score : '+player.Score, x, y);
	ctx.fillText('Health : '+player.Health, x, y+60);
	ctx.closePath();
}
