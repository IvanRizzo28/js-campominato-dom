/*
Consegna
L’utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100. Ci saranno quindi 10 caselle per ognuna delle 10 righe. Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/
'use strict';

/*
funzioni
*/
function setDifficolta(difficolta){
    const diff = document.querySelector(':root');
    diff.style.setProperty('--difficolta', difficolta);
}

function creaBombe(num,max){
    let array=[],count=1;
    let tmp=Math.floor(Math.random() * max);
    array.push(tmp);
    do{
        tmp=Math.floor(Math.random() * max);
        if (!array.includes(tmp)){
            array.push(tmp);
            count++;
        }
    }while(count<num)
    return array;
}

function creaCelle(n,bombe){
    const container=document.querySelector(".container");
    container.innerHTML="";
    container.classList.remove("disabled");
    console.log(bombe);
    for (let i=0;i<n;i++)
    {
        let element=document.createElement("div");
        element.classList.add("cell");
        element.innerText=i+1;
        element.addEventListener("click", function(){
            if (bombe.includes(i)){
                const celle=document.querySelectorAll(".cell");
                for (let i=0;i<bombe.length;i++) celle[bombe[i]].classList.add("rosso");
                container.classList.add("disabled");
                messaggio.innerText="Hai perso!!!!";
                //element.classList.add("rosso");
            }
            else    
            {
                element.classList.add("blu");
                score++;
                punteggio.innerHTML=score;
                if (score===n-16){
                    container.classList.add("disabled");
                    messaggio.innerText="Hai vinto!!!!";
                }
            }
        });
        container.append(element);
    }
}

/*
main
*/
const start=document.getElementById("start");
const select=document.getElementById("select");
const punteggio=document.getElementById("score");
const messaggio=document.getElementById("messaggio");
let score;

start.addEventListener("click", function(){
    messaggio.innerText="";
    score=0;
    punteggio.innerText=0;
    setDifficolta(select.value);
    let dim=select.value*select.value;
    let bombe=creaBombe(16,dim);
    creaCelle(dim,bombe);
});