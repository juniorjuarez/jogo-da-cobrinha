/* Declaração de variaveis*/
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

let food={
    x: Math.floor(Math.random()*15 +1)* box,
    y: Math.floor(Math.random()*15 +1)* box
}

/*Função para criar o canvas, tela verde */
function criarBG(){
    context.fillStyle = "Lightgreen";
    context.fillRect(0,0,16 * box , 16 * box);//tamanho da caixa
}
/*Função para criar a cobrinha*/ 
function criarCobrinha(){
    for(i=0; i < snake.length; i++ ){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

/* função para criar a comidinha*/

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

/*evento de interação com o teclado*/
document.addEventListener('keydown', update);

function update(event){
    /* comandos para executar a movimentação da cobrinha*/
    if(event.keyCode == 37 && direction !="right")direction = "left";
    if(event.keyCode == 38 && direction !="down")direction = "up";
    if(event.keyCode == 39 && direction !="left")direction = "right";
    if(event.keyCode == 40 && direction !="up")direction = "down";
}

function iniciarJogo(){

    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Perdeu, recarrege a pagina com F5");

        }
    }

    /*condição para atraversar as paredes horizontalmente e verticalmente */
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;


    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    /* Condição para que a cobrinha creça ao comer a comidinha*/
    if(snakeX != food.x || snakeY != food.y){
        /* função para remover um pixel da cobra, para simular a movimentação*/
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random()*15 +1)* box;
        food.y = Math.floor(Math.random()*15 +1)* box;
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    /* função para criar nova cabeça, e simular a movimentação*/
    snake.unshift(newHead);

}


let jogo = setInterval(iniciarJogo, 100);

