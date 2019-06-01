window.onload = function(){
	Game.init();
}
VAR = {
	fps:60,
	W:0,
	H:0,
	lastTime:0,
	lastUpdate:-1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}
Game = {
	init:function(){
		Game.canvas = document.createElement('canvas');
		Game.hit_canvas = document.createElement('canvas');
		Game.ctx = Game.canvas.getContext('2d');
		Game.hit_ctx = Game.hit_canvas.getContext('2d');

		Game.layout();
		window.addEventListener('resize', Game.layout, false);
		document.body.appendChild(Game.canvas);
		
		for(var i=0; i<3; i++){
			new Rock();
		}

		Game.ship = new Ship();

		window.addEventListener('keydown', Game.onKey, false);
		window.addEventListener('keyup', Game.onKey, false);

		Game.animationLoop();
	},
	stop:function(){
		window.removeEventListener('keydown', Game.onKey, false);
		window.removeEventListener('keyup', Game.onKey, false);
	},
	onKey:function(event){
		if(event.keyCode==32 || event.keyCode==37 || event.keyCode==38 || event.keyCode==39){
			event.preventDefault();
			if(event.type=='keydown' && !Game['key_'+event.keyCode]){
				Game['key_'+event.keyCode] = true;
				if(event.keyCode==37){
					Game.key_39 = false;
				}else if(event.keyCode==39){
					Game.key_37 = false;
				}else if(event.keyCode==32){
					new Bullet();
				}
			}else if(event.type=='keyup'){
				Game['key_'+event.keyCode] = false;
			}
		}
	},
	layout:function(event){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		VAR.d = Math.min(VAR.W, VAR.H);
		
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;

		Game.ctx.fillStyle = 'black';
		Game.ctx.strokeStyle = 'white';
		Game.ctx.lineWidth = 3;
		Game.ctx.lineJoin = 'round';

		Game.hit_canvas.width = VAR.W;
		Game.hit_canvas.height = VAR.H;
		Game.hit_ctx.fillStyle = 'red';
	},
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;
			
			Game.ctx.clearRect(0,0,VAR.W, VAR.H);
			Game.hit_ctx.clearRect(0,0,VAR.W, VAR.H);
			Game.ship.draw();
			Bullet.draw();
			Rock.draw();
			Dot.draw();
		}
	}
}