//----------------------Variables--------------------

const d= document;
const $containerCajas= d.querySelector(".container-cajas");
const $cajasTraseras=d.querySelectorAll(".caja-atras");


//-------------fetch-peticion-----------------------------------

const fetchListPokemons=fetch("https://pokeapi.co/api/v2/pokemon/?limit=10&offset=15");
let litaRamdom=[];

const peticionFunction =async()=>{
let items=[];
let numeroRamdom=0;

peticion=await fetchListPokemons;
json= await peticion.json();
     
    for (const item of json.results) {
         itemsPeticion= await fetch(item.url);
         jsonP=await itemsPeticion.json();
         items.push(jsonP.sprites.front_default)
        }
   for (let i = 0; i < $cajasTraseras.length; i++) {
    if(i == 10)break;
        numeroRamdom++;
        litaRamdom.push(numeroRamdom);
        
    }
    const repeat = Array(2).fill(litaRamdom).flat();
    let lista = repeat.sort(function() {return Math.random() - 0.5});
    
    for (let i = 0; i < repeat.length; i++) {
        
        $cajasTraseras[i].innerHTML=`<img src="${items[lista[i]]}">`;
        
    }
    console.log(lista);

// const cards=[
//     {id:lista[0],selected:false},{id:lista[1],selected:false},{id:lista[2],selected:false},
//     {id:lista[3],selected:false},{id:lista[4],selected:false},{id:lista[5],selected:false},
//     {id:lista[6],selected:false},{id:lista[7],selected:false},{id:lista[8],selected:false},
//     {id:lista[9],selected:false}
// ]


//________________________EVENTO____CLICK________________________

$containerCajas.addEventListener("click",(e)=>{
    if(e.target.matches(".caja1 *"))e.target.parentElement.classList.add("rotar-caja");
    setTimeout(()=>{
        e.target.parentElement.classList.remove("rotar-caja");
    },3000)
          
    });
        
    
}

peticionFunction()








