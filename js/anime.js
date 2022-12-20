var PageAnime = anime({
  	targets: '#main-container',
  	delay: 400,
  	top: '0px',
  	easing: 'easeOutExpo',
	opacity: {
		value: 1,
		delay: 100,
		duration: 400,
		easing: 'linear'
	}, 
	duration: 500,
});


var CubeAnime = anime({
  	targets: ['.cube18'],
	opacity: {
		value: 0,
		delay: 500,
		duration: 100,
		easing: 'linear'
	},
	direction: 'alternate',
  	loop: true,
  	duration: 400,

});



document.getElementById('menu-research').onclick = function() {

var Research = anime({
  	targets: '#research',
  	delay: 0,
  	top: '0px',
  	easing: 'easeOutExpo',
	opacity: {
		value: 1,
		delay: 50,
		duration: 200,
		easing: 'linear'
	}, 
	zIndex: {
		value: [1000],
		round: true
	},
	duration: 400,

});


var Change = anime({
  	targets: '#main-container',
	backgroundColor: [
	{value: '#ffffff'},
	],
	zIndex: {
		value: [500],
		round: true
	},
	opacity: {
		value: 0,
		delay: 200,
		duration: 500,
		easing: 'linear'
	}, 

});


var ChangeBgColor = anime({
  	targets: '#bg',
	backgroundColor: [
	{value: '#ffffff'},
	],
});

};



document.getElementById('close-research').onclick = function() {

var Research = anime({
  	targets: '#research',
  	delay: 0,
  	top: '-100%',
  	easing: 'easeOutExpo',
	opacity: {
		value: 0,
		delay: 0,
		duration: 200,
		easing: 'linear'
	}, 
	zIndex: {
		value: [0],
		round: true
	},
	duration: 200,

});


var Change = anime({
  	targets: '#main-container',
  	delay:0,
	backgroundColor: [
	{value: '#4b4b4b'},
	],
	zIndex: {
		value: [1000],
		round: true
	},
	opacity: {
		value: 1,
		delay: 200,
		duration: 500,
		easing: 'linear'
	}, 
	duration: 200,

});



var ChangeBgColor = anime({
  	targets: '#bg',
	backgroundColor: [
	{value: '#4b4b4b'},
	],
	duration: 200,
});


};






document.getElementById('menu-results').onclick = function() {

var Research = anime({
  	targets: '#results',
  	delay: 0,
  	top: '0px',
  	easing: 'easeOutExpo',
	opacity: {
		value: 1,
		delay: 50,
		duration: 200,
		easing: 'linear'
	}, 
	zIndex: {
		value: [1000],
		round: true
	},
	duration: 400,

});


var Change = anime({
  	targets: '#main-container',
	backgroundColor: [
	{value: '#ffffff'},
	],
	zIndex: {
		value: [500],
		round: true
	},
	opacity: {
		value: 0,
		delay: 0,
		duration: 200,
		easing: 'linear'
	}, 

});


var ChangeBgColor = anime({
  	targets: '#bg',
	backgroundColor: [
	{value: '#ffffff'},
	],
});

};



document.getElementById('close-results').onclick = function() {

var Research = anime({
  	targets: '#results',
  	delay: 0,
  	top: '-100%',
  	easing: 'easeOutExpo',
	opacity: {
		value: 0,
		delay: 0,
		duration: 200,
		easing: 'linear'
	}, 
	zIndex: {
		value: [0],
		round: true
	},
	duration: 200,

});


var Change = anime({
  	targets: '#main-container',
  	delay:0,
	backgroundColor: [
	{value: '#4b4b4b'},
	],
	zIndex: {
		value: [1000],
		round: true
	},
	opacity: {
		value: 1,
		delay: 200,
		duration: 500,
		easing: 'linear'
	}, 
	duration: 200,

});



var ChangeBgColor = anime({
  	targets: '#bg',
	backgroundColor: [
	{value: '#4b4b4b'},
	],
	duration: 200,
});


};




document.getElementById('menu-codes').onclick = function() {

var Research = anime({
  	targets: '#codes',
  	delay: 0,
  	top: '0px',
  	easing: 'easeOutExpo',
	opacity: {
		value: 1,
		delay: 50,
		duration: 200,
		easing: 'linear'
	}, 
	zIndex: {
		value: [1000],
		round: true
	},
	duration: 400,

});


var Change = anime({
  	targets: '#main-container',
	backgroundColor: [
	{value: '#0c1263'},
	],
	zIndex: {
		value: [500],
		round: true
	},
	opacity: {
		value: 0,
		delay: 0,
		duration: 200,
		easing: 'linear'
	}, 

});


var ChangeBgColor = anime({
  	targets: '#bg',
	backgroundColor: [
	{value: '#0c1263'},
	],
});

};



document.getElementById('close-codes').onclick = function() {

var Research = anime({
  	targets: '#codes',
  	delay: 0,
  	top: '-100%',
  	easing: 'easeOutExpo',
	opacity: {
		value: 0,
		delay: 0,
		duration: 200,
		easing: 'linear'
	}, 
	zIndex: {
		value: [0],
		round: true
	},
	duration: 200,

});


var Change = anime({
  	targets: '#main-container',
  	delay:0,
	backgroundColor: [
	{value: '#4b4b4b'},
	],
	zIndex: {
		value: [1000],
		round: true
	},
	opacity: {
		value: 1,
		delay: 200,
		duration: 500,
		easing: 'linear'
	}, 
	duration: 200,

});



var ChangeBgColor = anime({
  	targets: '#bg',
	backgroundColor: [
	{value: '#4b4b4b'},
	],
	duration: 200,
});


};
