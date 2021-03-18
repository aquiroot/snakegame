// configuracion de canvas
const board = document.querySelector('canvas');
const boardCtx = board.getContext('2d');
const scoreScreen = document.querySelector('h3');

// variables
const direction = {
	s: [0, 1],
	w: [0, -1],
	d: [1, 0],
	a: [-1, 0],
	S: [0, 1],
	W: [0, -1],
	D: [1, 0],
	A: [-1, 0],
	ArrowDown: [0, 1],
	ArrowUp: [0, -1],
	ArrowRight: [1, 0],
	ArrowLeft: [-1, 0],
};

// Variables del tablero
const boardWidth = 640;
const boardHeight = 370;

// TODO: Cambiar speed segun dificultad elegida
let speed = 10;

let score = 0;

let keyPress;
const intervalo = 80;

const controls = {
	direction: { x: 1, y: 0 },
	serpiente: [{ x: 310, y: 180 }],
	alimento: { x: 100, y: 100 },
	start: false,
};

// Obtener pulsaciones de teclas
document.onkeydown = (ev) => {
	let keyPress = direction[ev.key];
	const [x, y] = keyPress;
	if (-x !== controls.direction.x && -y !== controls.direction.y) {
		controls.direction.x = x;
		controls.direction.y = y;
	}
};

// Dibujar objetos
const draw = () => {
	boardCtx.clearRect(0, 0, 640, 370);
	const head = controls.serpiente[0];
	const alimento = controls.alimento;
	drawFigures('black', head.x, head.y);
	drawFigures('#1f3000', alimento.x, alimento.y);
};

const drawFigures = (color, x, y) => {
	boardCtx.fillStyle = color;
	boardCtx.fillRect(x * speed, y * speed, 10, 10);
};

// funcion start
const start = () => {
	const head = controls.serpiente[0];
	let dx = controls.direction.x;
	let dy = controls.direction.y;
	head.x += dx;
	head.y += dy;
	if (
		head.x < -1 ||
		head.y < -1 ||
		head.x > boardWidth / 10 ||
		head.y > boardHeight / 10
	) {
		window.alert('looooser!!!');
		location.reload();
	}

	if (head.x === controls.alimento.x && head.y === controls.alimento.y) {
		eaten();
		score++;
		scoreScreen.innerHTML = score * speed;
	}
	requestAnimationFrame(draw);
	setTimeout(start, intervalo);
};

const eaten = () => {
	let alimentoPosition = randomPosition();
	controls.alimento.x = alimentoPosition.x;
	controls.alimento.y = alimentoPosition.y;
};

const randomPosition = () => {
	let d = Object.values(direction);
	return {
		x: parseInt(Math.random() * (boardWidth / speed)),
		y: parseInt(Math.random() * (boardHeight / speed)),
		d: d[parseInt(Math.random() * 11)],
	};
};

/**
 * Inicia el juego al cargar la patalla
 *  TODO: iniciar con un boton start que coincida con un boton del nokia
 */
window.onload = () => {
	position = randomPosition();
	let head = controls.serpiente[0];
	// posicion y direccion random de la serpiente
	head.x = position.x;
	head.y = position.y;
	controls.direction.x = position.d[0];
	controls.direction.y = position.d[1];
	alimentoPosition = randomPosition();
	// posicion random de alimento
	let alimento = controls.alimento;
	alimento.x = alimentoPosition.x;
	alimento.y = alimentoPosition.y;
	start();
};
