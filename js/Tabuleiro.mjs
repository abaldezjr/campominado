class Tabuleiro {

	constructor(argLinhas, argColunas, argMinas) {
		this.minas = [[], [], [], [], [], [], [], [], [], []];
		this.tabuleiro = [[], [], [], [], [], [], [], [], [], []];
		this.N_LINHAS = argLinhas;
		this.N_COLUNAS = argColunas;
		this.N_MINAS = argMinas;
		this.linha = 0;
		this.coluna = 0;
		this.iniciaMinas();
		this.sorteiaMinas();
		this.preencheDicas();
		this.iniciaTabuleiro();
	}

	vitoria() {
		let cont = 0;
		for (let linha = 0; linha < this.N_LINHAS; linha++) {
			for (let coluna = 0; coluna < this.N_COLUNAS; coluna++) {
				if (this.tabuleiro[linha][coluna] == '_') {
					cont++;
				}
			}
		}
		if (cont == this.N_MINAS) {
			return true;
		} else {
			return false;
		}
	}

	derrota() {
		return this.minas[this.linha][this.coluna] == -1;
	}

	mostraMinas() {
		for (let linha = 0; linha < this.N_LINHAS; linha++) {
			for (let coluna = 0; coluna < this.N_COLUNAS; coluna++) {
				if (this.minas[linha][coluna] == -1) {
					this.tabuleiro[linha][coluna] = this.minas[linha][coluna];
				}
			}
		}
	}

	jogada(i, j) {
		this.setPosicao(i, j);
		if (!this.derrota()) {
			this.abreVizinhos(i, j);
		} else {
			this.tabuleiro[this.linha][this.coluna] = this.minas[this.linha][this.coluna];
		}
	}

	abreVizinhos(l, c) {
		let x = l, y = c;

		if (x >= 0 && x <= 9) {
			if (y >= 0 && y <= 9) {
				if (this.tabuleiro[x][y] == "_" && this.minas[x][y] == 0) {
					this.tabuleiro[x][y] = this.minas[x][y];

					this.abreVizinhos(x - 1, y - 1);
					this.abreVizinhos(x - 1, y);
					this.abreVizinhos(x - 1, y + 1);

					this.abreVizinhos(x, y - 1);
					this.abreVizinhos(x, y + 1);

					this.abreVizinhos(x + 1, y - 1);
					this.abreVizinhos(x + 1, y);
					this.abreVizinhos(x + 1, y + 1);

				} else {
					if (this.tabuleiro[x][y] == "_" && this.minas[x][y] > 0) {
						this.tabuleiro[x][y] = this.minas[x][y];
					}
				}
			}
		}
	}

	getPosicao(linha, coluna) {
		return this.minas[linha][coluna];
	}

	setPosicao(linha, coluna) {
		this.linha = linha;
		this.coluna = coluna;
	}

	preencheDicas() {
		let l, c, x, y;

		for (l = 0; l < this.N_LINHAS; l++) {
			for (c = 0; c < this.N_COLUNAS; c++) {
				if (this.minas[l][c] == -1) {
					for (x = l - 1; x <= l + 1; x++) {
						for (y = c - 1; y <= c + 1; y++) {
							if (this.minas[x][y] != -1) {
								this.minas[x][y] += 1;
							}
						}
					}
				}
			}
		}
	}

	iniciaTabuleiro() {
		for (let i = 0; i < this.N_LINHAS; i++) {
			for (let j = 0; j < this.N_COLUNAS; j++) {
				this.tabuleiro[i][j] = '_';
			}
		}
	}

	iniciaMinas() {
		for (let i = 0; i < this.N_LINHAS; i++) {
			for (let j = 0; j < this.N_COLUNAS; j++) {
				this.minas[i][j] = 0;
			}
		}
	}

	sorteiaMinas() {
		let sorteado;
		let linha, coluna;
		for (let i = 0; i < this.N_MINAS; i++) {

			do {
				linha = Math.floor((Math.random() * 8) + 1);
				coluna = Math.floor((Math.random() * 8) + 1);

				if (this.minas[linha][coluna] == -1)
					sorteado = true;
				else
					sorteado = false;
			} while (sorteado);

			this.minas[linha][coluna] = -1;
		}
	}
}