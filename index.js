const planszaGry = document.querySelector("#planszaGry");
const kontekst = planszaGry.getContext("2d");
const tekstWyniku = document.querySelector("#tekstWyniku");
const przyciskReset = document.querySelector("#przyciskReset");
const szerokoscGry = planszaGry.width;
const wysokoscGry = planszaGry.height;
const tloPlanszy = "white";
const kolorWeza = "rgb(15,150,15)";
const obramowanieWeza = "white";
const kolorJedzenia = "rgb(255,0,0)";
const wielkoscJednostki = 42;
let trwa = false;
let xPredkosc = wielkoscJednostki;
let yPredkosc = 0;
let jedzenieX;
let jedzenieY;
let wynik = 0;
let waz = [
    {x: wielkoscJednostki * 4, y: 0},
    {x: wielkoscJednostki * 3, y: 0},
    {x: wielkoscJednostki * 2, y: 0},
    {x: wielkoscJednostki, y: 0},
    {x: 0, y: 0}
];

window.addEventListener("keydown", zmienKierunek);
przyciskReset.addEventListener("click", resetujGre);

rozpocznijGre();

function rozpocznijGre(){
    trwa = true;
    tekstWyniku.textContent = wynik;
    utworzJedzenie();
    narysujJedzenie();
    nastepnaTura();
};
function nastepnaTura(){
    if(trwa){
        setTimeout(()=>{
            wyczyscPlansze();
            narysujJedzenie();
            poruszWazem();
            narysujWaza();
            sprawdzKoniecGry();
            nastepnaTura();
        }, 150);
    }
    else{
        pokazKoniecGry();
    }
};
function wyczyscPlansze(){
    kontekst.fillStyle = tloPlanszy;
    kontekst.fillRect(0, 0, szerokoscGry, wysokoscGry);
};
function utworzJedzenie(){
    function losoweJedzenie(min, max){
        const liczba = Math.round((Math.random() * (max - min) + min) / wielkoscJednostki) * wielkoscJednostki;
        return liczba;
    }
    jedzenieX = losoweJedzenie(0, szerokoscGry - wielkoscJednostki);
    jedzenieY = losoweJedzenie(0, wysokoscGry - wielkoscJednostki);
};
function narysujJedzenie(){
    kontekst.fillStyle = kolorJedzenia;
    kontekst.fillRect(jedzenieX, jedzenieY, wielkoscJednostki, wielkoscJednostki);
};
function poruszWazem(){
    const glowa = {x: waz[0].x + xPredkosc,
                   y: waz[0].y + yPredkosc};
    
    waz.unshift(glowa);
    //jeśli jedzenie zjedzone
    if(waz[0].x == jedzenieX && waz[0].y == jedzenieY){
        wynik += 1;
        tekstWyniku.textContent = wynik;
        utworzJedzenie();
    }
    else{
        waz.pop();
    }     
};
function narysujWaza(){
    kontekst.fillStyle = kolorWeza;
    kontekst.strokeStyle = obramowanieWeza;
    waz.forEach(czescWaza => {
        kontekst.fillRect(czescWaza.x, czescWaza.y, wielkoscJednostki, wielkoscJednostki);
        kontekst.strokeRect(czescWaza.x, czescWaza.y, wielkoscJednostki, wielkoscJednostki);
    })
};
function zmienKierunek(event){
    const klawisz = event.keyCode;
    const LEWO = 37;
    const GORA = 38;
    const PRAWO = 39;
    const DOL = 40;

    const idzieWGore = (yPredkosc == -wielkoscJednostki);
    const idzieWDol = (yPredkosc == wielkoscJednostki);
    const idzieWPrawo = (xPredkosc == wielkoscJednostki);
    const idzieWLewo = (xPredkosc == -wielkoscJednostki);

    switch(true){
        case(klawisz == LEWO && !idzieWPrawo):
            xPredkosc = -wielkoscJednostki;
            yPredkosc = 0;
            break;
        case(klawisz == GORA && !idzieWDol):
            xPredkosc = 0;
            yPredkosc = -wielkoscJednostki;
            break;
        case(klawisz == PRAWO && !idzieWLewo):
            xPredkosc = wielkoscJednostki;
            yPredkosc = 0;
            break;
        case(klawisz == DOL && !idzieWGore):
            xPredkosc = 0;
            yPredkosc = wielkoscJednostki;
            break;
    }
};
function sprawdzKoniecGry(){
    switch(true){
        case (waz[0].x < 0):
            trwa = false;
            break;
        case (waz[0].x >= szerokoscGry):
            trwa = false;
            break;
        case (waz[0].y < 0):
            trwa = false;
            break;
        case (waz[0].y >= wysokoscGry):
                trwa = false;
                break;
    }
    for(let i = 1; i < waz.length; i+=1){
        if(waz[i].x == waz[0].x && waz[i].y == waz[0].y){
            trwa = false;
        }
    }
};
function pokazKoniecGry(){
    kontekst.font = "50px MV Roboto";
    kontekst.fillStyle = "black";
    kontekst.textAlign = "center";
    kontekst.fillText("PRZEGRAŁEŚ!", szerokoscGry / 2, wysokoscGry / 2);
    trwa = false;
};
function resetujGre(){
    wynik = 0;
    xPredkosc = wielkoscJednostki;
    yPredkosc = 0;
    waz = [
        {x: wielkoscJednostki * 4, y: 0},
        {x: wielkoscJednostki * 3, y: 0},
        {x: wielkoscJednostki * 2, y: 0},
        {x: wielkoscJednostki, y: 0},
        {x: 0, y: 0}
    ];
    rozpocznijGre();
};
