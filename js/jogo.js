	
	var tiles,tab,
	startScreen,vitoriaScreen,derrotaScreen,
	numeroMinas,numeroLinhas,numeroColunas;
	
	function load(){
		
		tiles = [[],[],[],[],[],[],[],[],[],[]];
		
		startScreen = document.querySelector("#startScreen");
		startScreen.addEventListener("click",startGame,false);
		vitoriaScreen = document.querySelector("#vitoriaScreen");
		derrotaScreen = document.querySelector("#derrotaScreen");
		
		numeroMinas = 20;
		numeroLinhas = 10;
		numeroColunas = 10;
	}
	
	function inicializar(){
		
		tab = new Tabuleiro(numeroLinhas,numeroColunas,numeroMinas);
		
		for(let i=0;i<numeroLinhas;i++){
			for(let j=0;j<numeroColunas;j++){
				let tile = document.querySelector("#n"+((j+1)+(i*10)));
				tile.className = "tile";
				tile.innerHTML = "";
				tile.dataset.linha = i;
				tile.dataset.coluna = j;
				tile.addEventListener("click",jogar,false);
				tile.addEventListener("mousedown",mouseClicado,false);
				tile.oncontextmenu = function(){return false};
				tiles[i].push(tile);
			}
		}
		
		desenha();
	}
	
	function mouseClicado(e){
		if(e.button == 2){
			if(this.className == "tile"){
				this.className = "tile-bomba";	
			}else{
				if(this.className == "tile-bomba"){
					this.className = "tile";
				}
			}
		}
	}

	function desenha(){
		for(let i=0;i<numeroLinhas;i++){
			for(let j=0;j<numeroColunas;j++){
				var tile = tiles[i][j];
				tile.style.left = j*26 +"px";
				tile.style.top = i*26+"px";
			}
		}
	}
	
	function desenhaTabuleiro(){
		for(let i=0;i<numeroLinhas;i++){
			for(let j=0;j<numeroColunas;j++){
				var tile = tiles[i][j];
				if(tab.tabuleiro[i][j] == 0){
					tile.className = "tile-aberto";
				}
				if(tab.tabuleiro[i][j] > 0){
					tile.className = "tile-aberto";
					tile.innerHTML = tab.tabuleiro[i][j];
				}
				
				if(tab.tabuleiro[i][j] == -1){
					tile.className = "tile-explodida";
				}
			}
		}
		
	}

	function jogar(){
		//document.getElementById("click-sound").play();
		tab.jogada(Number(this.dataset.linha),Number(this.dataset.coluna));
		desenhaTabuleiro();
		if(tab.vitoria()){
			vitoria();
		}else{
			if(tab.derrota()){
				tab.mostraMinas();
				desenhaTabuleiro();
				derrota();
			}
		}
	}
	
	function vitoria(){
		vitoriaScreen.style.opacity = "1";
		vitoriaScreen.style.zIndex = "1";
		setTimeout(function(){
			vitoriaScreen.addEventListener("click",startGame,false);	
		},500);
	}
	
	function derrota(){
		derrotaScreen.style.opacity = "1";
		derrotaScreen.style.zIndex = "1";
		setTimeout(function(){
			derrotaScreen.addEventListener("click",startGame,false);	
		},500);
	}
	
	function startGame(){
		this.style.opacity = 0;
		this.style.zIndex = -1;
		this.removeEventListener("click",startGame,false);
		inicializar();
	}
	
	load();