//alert("Spaceship span manager...");
class SpawnManager
{
	constructor()
	{
		this.obstaclesImage = document.querySelectorAll(".obstacles");	
		this.obstacleSpawn = true;
		this.obstacleSpawnTime = 0;
		this.deltaObstacleSpawnTime = 0;
		this.minObstacleSize = 50;
		this.maxObstacleSize = 100;
		this.obstacles = new Array();

		this.playerHealth = new EmptyObject(0, 0, 50, 50, document.querySelector('#lifeLine'));
		this.playerHealth.isActive = false;
		this.playerHealthSpawnTime = this.RandomRange(50, 100);
		this.deltaplayerHealthSpawnTime = 0;
	}
 
 	RandomRange(min, max)
	{
		return Math.floor(Math.random()*(max-min-1)+min);
	}
	
	ObstaclesSpawner(ctx)
	{
		if(this.obstacleSpawn)
		{
			this.obstacleSpawn = false;
			
			let obstaclesImageIndex = this.RandomRange(0, this.obstaclesImage.length);
			let obstacleWidth = this.RandomRange(this.minObstacleSize, this.maxObstacleSize);
			let obstacleHeight = this.RandomRange(this.minObstacleSize, this.maxObstacleSize);
		
			let xPos = this.RandomRange(0, ctx.canvas.width - obstacleWidth);
			let yPos = 200;

			let obstacle = new EmptyObject(xPos, yPos, obstacleWidth, obstacleHeight, this.obstaclesImage[obstaclesImageIndex]);
		
			this.obstacles.push(obstacle);
		}
		else 
		{
			if(this.deltaObstacleSpawnTime > this.obstacleSpawnTime)
			{
				this.obstacleSpawn = true;
				this.deltaObstacleSpawnTime = 0;
				this.obstacleSpawnTime = this.RandomRange(10, 150);
			}
			else
			{
				this.deltaObstacleSpawnTime += 1;
			}
		}
	}
	
	RenderObstacles(ctx, spaceship, lasers, player)
	{
		for(let i=0; i<this.obstacles.length; i++)
		{
			this.obstacles[i].Render(ctx);

			if(this.obstacles[i].Collision(spaceship))
			{
				player.Health -= 1;
				this.obstacles[i].isActive = false;
				soundEffects.Burst.play();
			}
			
			for(let j=0; j<lasers.length; j++)
			{
				if(this.obstacles[i].Collision(lasers[j]))
				{
					//console.log('obstacle burst');
					player.Score += 5;
					lasers[j].isActive = false;
					this.obstacles[i].isActive = false;
					soundEffects.Burst.play();
				}
			}
			
			this.obstacles[i].y += 10;
			
			if(this.obstacles[i].y >= ctx.canvas.height)
			{
				this.obstacles.shift()
			}
			
		}
	}

	PlayerHealthSpawner(ctx, spaceship, player)
	{
		if(this.playerHealth.isActive) 
		{
			this.playerHealth.Render(ctx);

			if(this.playerHealth.y > ctx.canvas.height) 
			{
				this.playerHealth.isActive = false;
			}
			else if(this.playerHealth.Collision(spaceship))
			{
				player.Health += 1;
				this.playerHealth.isActive = false;
				soundEffects.HealthUp.play();
			}

			this.playerHealth.y += 5;
		}
		else 
		{
			if(this.deltaplayerHealthSpawnTime > this.playerHealthSpawnTime)
			{
				this.playerHealth.isActive = true;
				this.playerHealth.x = this.RandomRange(0, ctx.canvas.width-this.playerHealth.width);
				this.playerHealth.y = -this.playerHealth.height;

				this.deltaplayerHealthSpawnTime = 0;
				this.playerHealthSpawnTime = this.RandomRange(150, 250);
			}
			else 
			{
				this.deltaplayerHealthSpawnTime += 1;
			}
		}
	}
};