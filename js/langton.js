/* ************************************************************************** */
/*           .      .@@                                                       */
/*          $@#.@#$..@$@`     $                                               */
/*        `##@$@@@$$$#@$##@@@#                                                */
/*     $@@##@$$###$##@@@@@@#$$@@#                                             */
/*    `#$$$##################@`                                               */
/*    #$##^$################$#$       langton.js                              */
/*   #$#<--->@#######$##########.                                             */
/*   ####$v####.        `####$ #.     By: cdivry <cdivry@student.42.fr>       */
/*   ####$####$`        .###  .                                               */
/*    .########################                                               */
/*     .$#$###################.                                               */
/*       `#################$.                                                 */
/*         `$$############$.`     Created: 2019/06/03 19:11:23 by cdivry      */
/*           `#$##########.       Updated: 2019/06/03 19:13:00 by cdivry      */
/*              `$#$$$$#$                                                     */
/*                  ##$.                                                      */
/* ************************************************************************** */


/*
** CANVAS
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


/*
** ENGINE
*/

// global stuff reduce to memory usage (better perfs than evaluated conditions)
var PAUSE = false;
const FPS = 30;
var ITERATIONS = 0;
var PLAYGROUND_SIZE = 768;
var MAP_SIZE = 96;
var ANT = {x: 48, y: 64, dir: 'left'};

const MOVE = {
	'top': { // is turned to top
		0: { // and on white tile
			dir: 'right',
			x: 1,
			y: 0,
		},
		1: { // and on black tile
			dir: 'left',
			x: -1,
			y: 0,
		},
	},
	'bottom': { // is turned to bottom
		0: { // and on white tile
			dir: 'left',
			x: -1,
			y: 0,
		},
		1: { // and on black tile
			dir: 'right',
			x: 1,
			y: 0,
		},
	},
	'left': { // is turned to left
		0: { // and on white tile
			dir: 'top',
			x: 0,
			y: -1,
		},
		1: { // and on black tile
			dir: 'bottom',
			x: 0,
			y: 1,
		},
	},
	'right': { // is turned to right
		0: { // and on white tile
			dir: 'bottom',
			x: 0,
			y: 1,
		},
		1: { // and on black tile
			dir: 'top',
			x: 0,
			y: -1,
		},
	},
};



ctx.strokeStyle = "#000";
ctx.lineWidth = 1;


// init MAP with white tiles
var MAP = Array(MAP_SIZE * MAP_SIZE);
MAP = MAP.fill(0);
const TILE_SIZE = PLAYGROUND_SIZE / MAP_SIZE;
const IMAGE = new Image();

var ROTATE = {
	'top': function(TILE_SIZE) {
		// 00 degre
		ctx.translate(
			(canvas.width / 2) - (PLAYGROUND_SIZE / 2) + (ANT.x * TILE_SIZE),
			(canvas.height / 2) - (PLAYGROUND_SIZE / 2) + (ANT.y * TILE_SIZE),
		);
		ctx.rotate(0 * 3.14 / 180);
	},
	'left': function(TILE_SIZE) {
		// 270 degrees
		ctx.translate(
			(canvas.width / 2) - (PLAYGROUND_SIZE / 2) + (ANT.x * TILE_SIZE),
			(canvas.height / 2) - (PLAYGROUND_SIZE / 2) + (ANT.y * TILE_SIZE) + TILE_SIZE,
		);
		ctx.rotate(270 * 3.14 / 180);
	},
	'bottom': function(TILE_SIZE) {
		// 180 degre
		ctx.translate(
			(canvas.width / 2) - (PLAYGROUND_SIZE / 2) + (ANT.x * TILE_SIZE) + TILE_SIZE,
			(canvas.height / 2) - (PLAYGROUND_SIZE / 2) + (ANT.y * TILE_SIZE) + TILE_SIZE,
		);
		ctx.rotate(180 * 3.14 / 180);
	},
	'right': function(TILE_SIZE) {
		// 90 degre
		ctx.translate(
			(canvas.width / 2) - (PLAYGROUND_SIZE / 2) + (ANT.x * TILE_SIZE) + TILE_SIZE,
			(canvas.height / 2) - (PLAYGROUND_SIZE / 2) + (ANT.y * TILE_SIZE),
		);
		ctx.rotate(90 * 3.14 / 180);
	},
};

function get_tile(x, y) {
	return (MAP[ANT.x + (MAP_SIZE * ANT.y)]);
}

function set_tile(x, y, value) {
	MAP[ANT.x + (MAP_SIZE * ANT.y)] = value;
}

function is_inside_map()
{
	return (MAP[ANT.x + (MAP_SIZE * ANT.y)] === 'undefined' ? false : true);
}

function move_ANT(ANT, tile_value) {
	ANT.x += MOVE[ANT.dir][tile_value].x;
	ANT.y += MOVE[ANT.dir][tile_value].y;
	ANT.dir = MOVE[ANT.dir][tile_value].dir;
	return (ANT);
}

/*
** DRAW
*/

function draw_background() {
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_tile(x, y, tile_value) {
	x_pos = (canvas.width / 2) - (PLAYGROUND_SIZE / 2) + (x * TILE_SIZE);
	y_pos = (canvas.height / 2) - (PLAYGROUND_SIZE / 2) + (y * TILE_SIZE);
	if (tile_value) {
		ctx.fillStyle = '#000';
		ctx.fillRect(x_pos, y_pos, TILE_SIZE, TILE_SIZE);
	} else {
		ctx.fillStyle = '#fff';
		ctx.fillRect(x_pos, y_pos, TILE_SIZE, TILE_SIZE);
		ctx.strokeRect(x_pos, y_pos, TILE_SIZE, TILE_SIZE);
	}

	// draw ANT
	if (x == ANT.x && y == ANT.y)
	{
		IMAGE.onload = function() {
			ctx.save();
			ROTATE[ANT.dir](TILE_SIZE);
			ctx.drawImage(IMAGE, 0, 0, TILE_SIZE, TILE_SIZE);
			ctx.restore();
		};
	}
}

function draw_playground()
{
	IMAGE.src="img/fourmi.png";
	ctx.fillStyle = '#ccc';
    ctx.fillRect((canvas.width / 2) - (PLAYGROUND_SIZE / 2),
    			(canvas.height / 2) - (PLAYGROUND_SIZE / 2),
    			PLAYGROUND_SIZE,
    			PLAYGROUND_SIZE);

	var x = 0, y = 0;
	const POS = {
		x: (canvas.width / 2) - (PLAYGROUND_SIZE / 2),
		y: (canvas.height / 2) - (PLAYGROUND_SIZE / 2),
	};
	MAP.forEach(tile => {
		draw_tile(x, y, tile);

		// next tile on square map
		x++;
		if (x % MAP_SIZE == 0) {
			x = 0;
			y++;
		}
	});
}

function draw_infos() {
	ctx.fillStyle = '#fff';
	ctx.font = "21px Tahoma";
	ctx.fillText("Itérations: " + ITERATIONS, 42, 42);
}

function draw_loop() {
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
    draw_background();
	draw_playground();
	draw_infos();
}

function game_loop(ANT) {
	if (!PAUSE) {
		var tile_value = get_tile(ANT.x, ANT.y);
		set_tile(ANT.x, ANT.y, tile_value ? 0 : 1);
		ANT = move_ANT(ANT, tile_value);
		ITERATIONS++;
		return (ANT);
	}
}
function main_loop() {
	ANT = game_loop(ANT);
	//console.log(x)
}


/* **************************************** */
/*                ENTRYPOINT                */
/* **************************************** */

/*
** GAME DRAW LOOP
*/

//window.setInterval(draw_loop, 1000 / FPS);
window.setInterval(main_loop, 10);
window.setInterval(draw_loop, 100);

// draw only once
//draw_loop();
