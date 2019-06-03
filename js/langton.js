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

var FPS = 30;
var ROTATE = {
	'up': function(tile_size, image) {
		// 00 degre
		ctx.translate(
			(canvas.width / 2) - (playground_size / 2) + (ant.x * tile_size),
			(canvas.height / 2) - (playground_size / 2) + (ant.y * tile_size),
		);
		ctx.rotate(0 * 3.14 / 180);
	},
	'down': function(tile_size, image) {
		// 180 degre
		ctx.translate(
			(canvas.width / 2) - (playground_size / 2) + (ant.x * tile_size) + tile_size,
			(canvas.height / 2) - (playground_size / 2) + (ant.y * tile_size) + tile_size,
		);
		ctx.rotate(180 * 3.14 / 180);
	},
	'left': function(tile_size, image) {
		// 90 degre
		ctx.translate(
			(canvas.width / 2) - (playground_size / 2) + (ant.x * tile_size) + tile_size,
			(canvas.height / 2) - (playground_size / 2) + (ant.y * tile_size),
		);
		ctx.rotate(90 * 3.14 / 180);
	},
	'right': function(tile_size, image) {
		// 270 degre
		ctx.translate(
			(canvas.width / 2) - (playground_size / 2) + (ant.x * tile_size),
			(canvas.height / 2) - (playground_size / 2) + (ant.y * tile_size) + tile_size,
		);
		ctx.rotate(270 * 3.14 / 180);
	},
};
var playground_size = 512;
var map_size = 11;
var map = Array(map_size * map_size)
map = map.fill(0)
map[42] = 1;

var ant = {x: 1, y: 1, dir: 'up'};


/*
** DRAW
*/

function draw_background() {
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_playground()
{
	ctx.fillStyle = '#ccc';
    ctx.fillRect((canvas.width / 2) - 256, (canvas.height / 2) - 256, playground_size, playground_size);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 3;

	var image = new Image();
	var tile_size = playground_size / map_size;
	var x = 0, y = 0;
	var x_tile = 0, y_tile = 0;
	var ant_pos = {
		x: ((canvas.width / 2) - (playground_size / 2) + (ant.x * tile_size)),
		y: ((canvas.height / 2) - (playground_size / 2) + (ant.y * tile_size)),
	};
	map.forEach(tile => {
		x_pos = (canvas.width / 2) - (playground_size / 2) + (x * tile_size);
		y_pos = (canvas.height / 2) - (playground_size / 2) + (y * tile_size);
		if (tile) {
			ctx.fillStyle = '#000';
			ctx.fillRect(x_pos, y_pos, tile_size, tile_size);
		} else {
			ctx.fillStyle = '#fff';
			ctx.fillRect(x_pos, y_pos, tile_size, tile_size);
			ctx.strokeRect(x_pos, y_pos, tile_size, tile_size);
		}
		// draw ant
		if (x == ant.x && y == ant.y)
		{
			image.onload = function() {
				ctx.save();
				ROTATE[ant.dir](tile_size, image);
				ctx.drawImage(image, 0, 0, tile_size, tile_size);
				ctx.restore();
			};
		}
		x++;
		if (x % map_size == 0) {
			x = 0;
			y++;
		}
		image.src="img/fourmi.png";
	});
}


function draw_loop() {
    canvas.height = document.body.clientHeight;
    canvas.width = document.body.clientWidth;
    draw_background();
	draw_playground();
}




/* **************************************** */
/*                ENTRYPOINT                */
/* **************************************** */

/*
** GAME DRAW LOOP
*/

//window.setInterval(draw_loop, 1000 / FPS);
//window.setInterval(draw_loop, 1000);

// draw only once
draw_loop();
