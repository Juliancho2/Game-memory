//----------------------Variables--------------------

const d = document;
const $caja1 = d.querySelectorAll(".caja1");
const $cajasTraseras = d.querySelectorAll(".caja-atras");
const $cajasFrente = d.querySelectorAll(".caja-frente");
const $containerCajas = d.querySelector(".container-cajas")


//-------------fetch-peticion-----------------------------------

const fetchListPokemons = fetch("https://pokeapi.co/api/v2/pokemon/?limit=10&offset=20");
let litaRamdom = [];
const peticionFunction = async () => {
    let cardName = [];
    let cardUrl = [];
    let numeroRamdom = 0;



    peticion = await fetchListPokemons;
    json = await peticion.json();
    for (item of json.results) {
        let itemsPeticion = await fetch(item.url);
        let jsonP = await itemsPeticion.json();
        cardUrl.push(jsonP.sprites.front_default)
        cardName.push(jsonP.name)
    }

    for (let i = 0; i < $cajasTraseras.length; i++) {
        if (i == 10) break;
        numeroRamdom++;
        litaRamdom.push(numeroRamdom);
    }
    const repeat = Array(2).fill(litaRamdom).flat();
    let lista = repeat.sort(function () { return Math.random() - 0.5 });

    for (let i = 0; i < lista.length; i++) {
        let imgCard = cardUrl[lista[i]] || "https://statics.vrutal.com/m/70c9/70c9b907f2dc7c35fda910ace8111924.jpg";
        let nameCard = cardName[lista[i]] || "pokemon-1";
        $cajasTraseras[i].innerHTML = `<img src="${imgCard}" >`
        $caja1[i].setAttribute("data-name", nameCard);

    }

    //________________________EVENTO____CLICK________________________

    let count = 0;
    let listArr = [];

    $caja1.forEach(element => {
        element.addEventListener("click", (e) => {
           
            listArr.push(element.getAttribute("data-name"));
            
            if (count <= 1) {
                element.classList.add("rotar-caja");
                
                count++;
                };
            if (count >= 2) {
               
                if(listArr[0] == listArr[1]){
                    count = 0;
                    listArr=[];
                };
                if(listArr[0] !== listArr[1]){
                   
                setTimeout(() => {
                    let cardSelected= $containerCajas.querySelector(`[data-name="${listArr[0]}"]`);
                    cardSelected.classList.remove("rotar-caja")//remover clase de carta anterior seleccionada.
                    element.classList.remove("rotar-caja")//remover clase de carta actual seleccionada.
                    
                    count=0;
                    listArr=[];
                    }, 4000);

                }

            }
        })
    })

}
peticionFunction()
                    
                     
                
                            
                       
                     
                    
                
            
















