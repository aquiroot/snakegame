// configuracion de canvas
const board = document.querySelector('canvas');
const boardCtx = board.getContext('2d');

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

let keyPress;
const intervalo = 80;
const speed = 10;

const controls = {
	direction: { x: 1 * speed, y: 0 },
	serpiente: [{ x: 300, y: 300 }],
};

// Obtener pulsaciones de teclas
document.onkeydown = (ev) => {
	keyPress = direction[ev.key];
	const [x, y] = keyPress;
	if (-x !== controls.direction.x && -y !== controls.direction.y) {
		controls.direction.x = x * speed;
		controls.direction.y = y * speed;
	}
};

const draw = (color) => {
	boardCtx.clearRect(0, 0, 600, 600);
	boardCtx.fillStyle = 'green';
	const head = controls.serpiente[0];
	boardCtx.fillRect(head.x, head.y, 10, 10);
	console.log(head);
};

// funcion start
const start = () => {
	const head = controls.serpiente[0];
	let dx = controls.direction.x;
	let dy = controls.direction.y;
	head.x += dx;
	head.y += dy;
	requestAnimationFrame(draw);
	setTimeout(start, intervalo);
};

window.onload = () => {
	start();
};
