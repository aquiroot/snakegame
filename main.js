/**
 * PARAMETROS DE IMAGEN
 */

// configuracion de canvas
const gameBoard = document.getElementById('game__board');
const gameBoard_ctx = game__board.getContext('2d');

// Inicio del juego
main();

// Posicion inicial de la serpiente
let snake = [
	{ x: 200, y: 200 },
	{ x: 190, y: 200 },
	{ x: 180, y: 200 },
	{ x: 170, y: 200 },
	{ x: 160, y: 200 },
];

// Varibles de color de elementos del juego
const board_border = 'black';
const board_background = 'white';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

// Crea y rellena los bordes al canvas
function clearCanvas() {
	gameBoard_ctx.fillStyle = board_background;
	gameBoard_ctx.strokestyle = board_border;
	gameBoard_ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
	gameBoard_ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

function drawSnakePart(snakePart) {
	gameBoard_ctx.fillStyle = 'lightblue';
	gameBoard_ctx.strokestyle = 'darkblue';
	gameBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
	gameBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Funcion para dibujar las partes de la serpiente
function drawSnake() {
	snake.forEach(drawSnakePart);
}

/**
 * PARAMETROS DE MOVIMIENTO
 */

function move_snake() {
	const head = { x: snake[0].x + dx, y: snake[0].y };
	snake.unshift(head);
	snake.pop();
}

/**
 * FUNCION DE REPETICION
 */

function main() {
	setTimeout(function onTick() {
		clear_board();
		move_snake();
		drawSnake();
		// Genera un loop de si mismo
		main();
	}, 100);
}
