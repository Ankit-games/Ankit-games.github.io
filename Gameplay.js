function Gameplay()
{
	const playBtn = document.querySelector('#playbtn');
	const ctx = document.querySelector('canvas').getContext('2d');
	
	playBtn.remove();
	hasLeftBtnPress  = false;
	hasRightBtnPress = false;
	
	const width = ctx.canvas.width = 1080;
	const height = ctx.canvas.height = 1920;
	
	const frameRate = 41.6667;
	
	const player = new Rect(width/2-15, height-800, 20, 0, 30, 100, 'blue');
	const enemies = new Array();
		
	let score = 0;
	
	const enemySpawnTime = 500;
	
	ScoreManager();
	EnemiesGenerator();
	const gameInterval = setInterval(function()
	{
		ctx.clearRect(0, 0, width, height);
		
		for(let i=0; i<enemies.length; i++)
		{
			enemies[i].Render(ctx);
			
			if(enemies[i].y > height)
				enemies.splice(i, 1);
				
			if(enemies[i].DetectCollision(player))
			{
				clearInterval(gameInterval);
				alert('Game Over');
				document.body.appendChild(playBtn);
			}
			
			enemies[i].y += enemies[i].speedY;
		}
		
		player.Render(ctx);
		
		Text(ctx, 'Score : '+score, 50, 100);
		
		if(hasLeftBtnPress)
			player.x -= player.speedX;

		if(hasRightBtnPress)
			player.x += player.speedX;
		
		if(player.x < 1)
			player.x = 1;
			
		if(player.x+player.width > width)
			player.x = width-player.width;	
		
	}, frameRate);
	
	function ScoreManager()
	{
		score += 5;
		
		setTimeout(ScoreManager, 500);
	}
	
	function EnemiesGenerator()
	{
		let enemyWidth = Random(30, 100);
		let enemyHeight = Random(100, 100);
		
		let red = Random(0, 255);
		let green = Random(0, 255);
		let blue = Random(0, 255);
		let color = 'rgb('+red+','+green+','+blue+')';
		
		let speedY = Random(10, 50);
		
		let xRandom = Random(0, width-enemyWidth);
		
		let enemy = new Rect(xRandom, -enemyHeight, 0, speedY, enemyWidth, enemyHeight, color);
		enemies.push(enemy);
		
		setTimeout(EnemiesGenerator, enemySpawnTime);
	}
}