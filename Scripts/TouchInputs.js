var hasTouch = false;
var Touch = {
	'Start': { 'x': 0, 'y': 0 },
	'End': { 'x': 0, 'y': 0 },
};

context.canvas.addEventListener('touchstart', function(event)
{
	hasTouch = true;
	Touch.Start.x = event.touches[0].clientX;
	Touch.Start.y = event.touches[0].clientY;
});

context.canvas.addEventListener('touchmove', function(event)
{
	Touch.End.x = event.touches[0].clientX;
	Touch.End.y = event.touches[0].clientY;
});

context.canvas.addEventListener('touchend', function(event)
{
	hasTouch = false;
	Touch.End.x = event.touches[0].clientX;
	Touch.End.y = event.touches[0].clientY;
});

moniter.addEventListener('touchstart', function(event)
{
	hasTouch = true;
	Touch.Start.x = event.touches[0].clientX;
	Touch.Start.y = event.touches[0].clientY;
});

moniter.addEventListener('touchmove', function(event)
{
	Touch.End.x = event.touches[0].clientX;
	Touch.End.y = event.touches[0].clientY;
});

moniter.addEventListener('touchend', function(event)
{
	hasTouch = false;
	Touch.End.x = event.touches[0].clientX;
	Touch.End.y = event.touches[0].clientY;
});