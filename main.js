// configuracion de pantalla
const board = document.querySelector('canvas');
const boardCtx = board.getContext('2d');
const scoreScreen = document.querySelector('h3');

// variables de movimiento
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

// variable de crecimiento para dar dificultad
let sizeV = 1;

let score = 0;

let keyPress;
const intervalo = 80;

const controls = {
	direction: { x: 1, y: 0 },
	serpiente: [{ x: 310, y: 180 }],
	alimento: { x: 100, y: 100 },
	start: false,
	crecimiento: 0,
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
	for (let idx = 0; idx < controls.serpiente.length; idx++) {
		const { x, y } = controls.serpiente[idx];
		drawFigures('#1f3000', x, y);
	}
	const alimento = controls.alimento;
	drawFigures('black', alimento.x, alimento.y);
};

const drawFigures = (color, x, y) => {
	boardCtx.fillStyle = color;
	boardCtx.fillRect(x * speed, y * speed, 10, 10);
};

// funcion que maneja toda la logica de objetos
const start = () => {
	if (controls.start) {
		let tail = {};
		Object.assign(tail, controls.serpiente[controls.serpiente.length - 1]);
		const head = controls.serpiente[0];
		let dx = controls.direction.x;
		let dy = controls.direction.y;
		let size = controls.serpiente.length - 1;
		for (let idx = size; idx > -1; idx--) {
			let head = controls.serpiente[idx];
			if (idx === 0) {
				head.x += dx;
				head.y += dy;
			} else {
				head.x = controls.serpiente[idx - 1].x;
				head.y = controls.serpiente[idx - 1].y;
			}
		}

		if (collision()) {
			controls.start = false;
			window.alert('ha perdido, puntaje: ' + score * speed);
			location.reload();
		}

		if (head.x === controls.alimento.x && head.y === controls.alimento.y) {
			controls.crecimiento += sizeV;
			eaten();
			score++;
			sizeV++;
			scoreScreen.innerHTML = score * speed;
		}

		if (controls.crecimiento > 0) {
			controls.serpiente.push(tail);
			controls.crecimiento -= 1;
		}
		//console.log(controls.serpiente);
		requestAnimationFrame(draw);
		setTimeout(start, intervalo);
	}
};

// funcion que da un nuevo alimento cuando se come el anterior
const eaten = () => {
	let alimentoPosition = randomPosition();
	controls.alimento.x = alimentoPosition.x;
	controls.alimento.y = alimentoPosition.y;
};

// funcion que maneja las colisiones contra bordes y si misma
const collision = () => {
	const head = controls.serpiente[0];
	if (
		head.x < -1 ||
		head.y < -1 ||
		head.x > boardWidth / speed ||
		head.y > boardHeight / speed
	) {
		return true;
	}

	for (let idx = 1; idx < controls.serpiente.length; idx++) {
		let part = controls.serpiente[idx];
		if (part.x === head.x && part.y === head.y) {
			return true;
		}
	}
};

// da posiciones y direcciones aleatorias a los objetos
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
	controls.start = true;
	start();
};
