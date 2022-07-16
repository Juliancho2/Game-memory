const d = document;
const $cajasTraseras = d.querySelectorAll(".caja-atras");
const $cards = d.querySelectorAll(".caja1");
const $cajasFrente = d.querySelectorAll(".caja-frente");
const $caja1 = d.querySelectorAll(".caja1");
const $containerTime=d.querySelector(".container-time");
let count=0;
let modal;
let time;
let hora=0;
let minuto=0
let segundo=0;
let resetGame;


const getPokemonList = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=20"
  );
  const { results } = await response.json();
  const pokemonData = await getPokemonData(results);

  return [...pokemonData, ...pokemonData];
};

const getPokemonData = async (pokemonList) => {
  const response = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response;
    })
  );

  const pokemonData = await Promise.all(response.map((item) => item.json()));

  return pokemonData;
};

const shuffleList = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
};

const setPokemonInCard = (listOfPokemon) => {
  listOfPokemon.forEach((item, index) => {
    $cajasTraseras[
      index
    ].innerHTML = `<img src="${item.sprites.front_default}">`;

    $cards[index].setAttribute("data-id", item.id);
  });
};

d.addEventListener("click",async (e)=>{
  if(e.target.matches(".modal button")){
   time=setInterval(()=>{
   
           segundo++;
           if(segundo == 60){
               segundo=0;
               minuto++;
               if(minuto==60){
                   minuto=0;
                   segundo=0;
                   hora++;
               }
           }
           
           $containerTime.querySelector(".tiempo > p").innerHTML=`
           <span>${hora || "00"}:${minuto || "00"}:${segundo}</span>
           `
           
       },1000);
      

   if(e.target.textContent == "¡Jugar Ya!"){
      modal=e.target.parentElement;
      modal.parentElement.classList.add("modal_none");
      $containerTime.style.display="flex";
       
           
       
   }
      
      
   else{
       resetGame();
       const pokemonList=await getPokemonList();
       const sufflePokemonList=shuffleList(pokemonList);
       setTimeout(()=>{
        setPokemonInCard(sufflePokemonList);
       },1500)
   }}
})

const setClickEventToAllCards = () => {
  let clickedElements = [];
  let comparing = false;

  $cards.forEach((card) => {
    
    card.addEventListener("click", (e) => {
      if (comparing) return;
     
      if (clickedElements.length < 2) {
        card.classList.add("rotar-caja");
        clickedElements.push(card);
      }

      if (clickedElements.length === 2) {
        comparing = true;
        if (
          clickedElements[0].getAttribute("data-id") ===
          clickedElements[1].getAttribute("data-id")
        ) {
          clickedElements = [];
          comparing = false;
          count++;
          $containerTime.querySelector(".parejas span").textContent=count;
          if(count === 10){

            modal.parentElement.classList.remove("modal_none");
            modal.innerHTML=`<h2>¡Haz ganado!</h2>
            <p>Tiempo: ${hora || "00"}:${minuto || "00"}:${segundo}</p>
            <button>Jugar de nuevo</button>`;
            hora=0;
            minuto=0
            segundo=0;
            clearInterval(time);
            count=0;
      }
        }
        
        
      else{
          comparing = true;
          setTimeout(() => {
            clickedElements[0].classList.remove("rotar-caja");
            clickedElements[1].classList.remove("rotar-caja");
            clickedElements = [];
            comparing = false;
          }, 1500);
        }
      }
    });
  });
};

const initGame = async () => {
  const pokemonList = await getPokemonList();
  const sufflePokemonList = shuffleList(pokemonList);
  setPokemonInCard(sufflePokemonList);
  setClickEventToAllCards();
};


$caja1.forEach(element => {
           resetGame=function(){
              
              modal.parentElement.classList.add("modal_none")
              $caja1.forEach(el=>{
                  el.classList.remove("rotar-caja");
              });
              $containerTime.querySelector(".parejas span").textContent="0";
              
              
              
            }
              
          })


   

initGame();


                
                            
                       
                     
                    
                
            
















