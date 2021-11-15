
let tiles, tab, numeroMinas, numeroLinhas, numeroColunas, placarBandeiras, numeroBandeiras = 0;

function load() {

	tiles = [[], [], [], [], [], [], [], [], [], []];

	let startScreen = document.querySelector("#startScreen");
	placarBandeiras = document.querySelector("#n-bandeiras");
	startScreen.addEventListener("click", startGame, false);

	numeroMinas = 20;
	numeroLinhas = 10;
	numeroColunas = 10;

}

function inicializar() {

	tab = new Tabuleiro(numeroLinhas, numeroColunas, numeroMinas);

	numeroBandeiras = 20;
	placarBandeiras.innerHTML = numeroBandeiras;

	for (let i = 0; i < numeroLinhas; i++) {
		for (let j = 0; j < numeroColunas; j++) {
			let tile = document.querySelector("#n" + ((j + 1) + (i * 10)));
			tile.className = "tile";
			tile.innerHTML = "";
			tile.dataset.linha = i;
			tile.dataset.coluna = j;
			tile.addEventListener("click", jogar, false);
			tile.addEventListener("mousedown", mouseClicado, false);
			tile.oncontextmenu = function () { return false };
			tiles[i].push(tile);
		}
	}

	desenha();
}

function mouseClicado(e) {
	if (e.button == 2) {
		if (this.className == "tile") {
			if(numeroBandeiras > 0){
				this.className = "tile-bandeira";
				numeroBandeiras--;
				placarBandeiras.innerHTML = numeroBandeiras;
			}
		} else {
			if (this.className == "tile-bandeira") {
				this.className = "tile";
				numeroBandeiras++;
				placarBandeiras.innerHTML = numeroBandeiras;
			}
		}
	}
}

function desenha() {
	let tile;
	for (let i = 0; i < numeroLinhas; i++) {
		for (let j = 0; j < numeroColunas; j++) {
			tile = tiles[i][j];
			tile.style.left = j * 26 + "px";
			tile.style.top = i * 26 + "px";
		}
	}
}

function desenhaTabuleiro() {
	let tile;
	for (let i = 0; i < numeroLinhas; i++) {
		for (let j = 0; j < numeroColunas; j++) {
			tile = tiles[i][j];
			if (tile.className != "tile-aberto") {
				if (tab.tabuleiro[i][j] >= 0) {
					if(tile.className == "tile-bandeira"){
						numeroBandeiras++;
						placarBandeiras.innerHTML = numeroBandeiras;
					}
					tile.className = "tile-aberto";
					if (tab.tabuleiro[i][j] > 0) {
						tile.innerHTML = tab.tabuleiro[i][j];
					}
				} else {
					if (tab.tabuleiro[i][j] == -1) {
						tile.className = "tile-explodida";
					}
				}
			}
		}
	}

}

function jogar(e) {
	//document.getElementById("click-sound").play();
	tab.jogada(Number(this.dataset.linha), Number(this.dataset.coluna));
	desenhaTabuleiro();
	if (tab.vitoria()) {
		fimDeJogo(true);
	} else {
		if (tab.derrota()) {
			tab.mostraMinas();
			desenhaTabuleiro();
			fimDeJogo(false);
		}
	}
}

function fimDeJogo(vitoria) {
	let screen = document.querySelector(vitoria ? "#vitoriaScreen" : "#derrotaScreen");
	screen.style.opacity = "1";
	screen.style.zIndex = "1";
	setTimeout(function () {
		screen.addEventListener("click", startGame, false);
	}, 500);
}

function startGame() {
	this.style.opacity = 0;
	this.style.zIndex = -1;
	this.removeEventListener("click", startGame, false);
	inicializar();
}

load();