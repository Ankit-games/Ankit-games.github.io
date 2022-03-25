//alert('Button script link sucessesfully...');
let toolBar;
let homeScreen;
let playerController;
let spaceshipSelector;

let pauseBtn;
let volumeOnBtn;
let volumeOffBtn;

let spaceshipImage;

let horizontalInput = 0;
let isShooterActive = false;

let gameInterval;

const soundEffects = 
{
	'Background': new Audio('./Sound-Effects/BackgroundMusic.mp3'),
	'MissileLaunch': new Audio('./Sound-Effects/MissileLaunch.wav'),
	'Burst': new Audio('./Sound-Effects/Burst.wav'),
	'HealthUp': new Audio('./Sound-Effects/HealthUp.wav'),
	'GameOver': new Audio('./Sound-Effects/GameOver.wav')
}

window.onload = function()
{
	toolBar				= document.querySelector('#toolBar');
	homeScreen			= document.querySelector('#homeScreen');
	playerController	= document.querySelector('#playerController');
	spaceshipSelector	= document.querySelector('#spaceshipSelector');

	playBtn  	 = document.querySelector('#play');
	pauseBtn 	 = document.querySelector('#pause');
	volumeOnBtn	 = document.querySelector('#volumeOn');
	volumeOffBtn = document.querySelector('#volumeOff');

	spaceshipImage = document.querySelector('#spaceship');

	soundEffects.Background.loop = true;
}

function StartBtnClick()
{
	// alert('start button clicked...');
	toolBar.style.display 			= 'flex';
	homeScreen.style.display 		= 'none';

	if(screen.width < 780) {
		playerController.style.display 	= 'flex';
	}
	
	Gameplay();
}
function SelectBtnClick()
{
	// alert('select button clicked...');
	homeScreen.style.display		= 'none';
	spaceshipSelector.style.display = 'flex';
}
function CancelBtnClick()
{
	// alert('Cancel button clicked...');
	homeScreen.style.display 		= 'flex';
	spaceshipSelector.style.display = 'none';
}
function MenuBtnClick()
{
	// alert('menu button clicked...');
	toolBar.style.display 			= 'none';
	homeScreen.style.display 		= 'flex';
	playerController.style.display	= 'none';

	if(gameInterval) 
	{
		clearInterval(gameInterval);
	}
}
function PauseBtnClick()
{
	alert('Game Pause.\nPress OK to Continue.');
}
function VolumeOn()
{
	// alert('Volume On...');
	volumeOnBtn.style.display = 'none';
	volumeOffBtn.style.display = 'inline';
	soundEffects.Background.play();
}
function VolumeOff()
{
	// alert('Volume Off...');
	volumeOnBtn.style.display = 'inline';
	volumeOffBtn.style.display = 'none';
	soundEffects.Background.pause();
}
function ChooseSpaceship(src)
{
	// alert('Choose spaceship work...');
	spaceshipImage.src = src;
	CancelBtnClick();
}
function LeftBtnPress()
{
 	// console.log('Left Button Press...');
 	horizontalInput = -1;
}
function LeftBtnRelese()
{
	// console.log('Left Button Relese...');
	horizontalInput = 0;
}
function RightBtnPress()
{
 	// console.log('Right Button Press...');
 	horizontalInput = 1;
}
function RightBtnRelese()
{
	// console.log('Right Button Relese...');
	horizontalInput = 0;
}
function ShooterPress()
{
 	// console.log('Shooter 1 Button Press...');
	 isShooterActive = true;
}
function ShooterRelese()
{
	// console.log('Shooter 1 Button Relese...');
	isShooterActive = false;
}

// Detect keyboard event
window.addEventListener('keydown', function(Input)
{
	if(Input.key === 'ArrowLeft' || Input.key === 'a' || Input.key === 'A')
	{
		// console.log("Left arrow");
		LeftBtnPress();
	}
	else if(Input.key === 'ArrowRight' || Input.key === 'd' || Input.key === 'D')
	{
		// console.log("right arrow");
		RightBtnPress();

	}
	else if(Input.key === ' ')
	{
		isShooterActive = true;
	}
});
window.addEventListener('keyup', function(Input)
{
	if(Input.key === 'ArrowLeft' || Input.key === 'a' || Input.key === 'A')
	{
		// console.log("Left arrow");
		LeftBtnRelese();
	}
	else if(Input.key === 'ArrowRight' || Input.key === 'd' || Input.key === 'D')
	{
		// console.log("right arrow");
		RightBtnRelese();

	}
	else if(Input.key === ' ')
	{
		isShooterActive = false;
	}
});

