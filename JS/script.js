const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');


let pokemonID = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonID = data.id;
    }else{
        pokemonName.innerHTML = "Not found :(";
        pokemonNumber.innerHTML = "";
        pokemonImage.style.display = 'none';
    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

prevBtn.addEventListener('click', () => {
    if(pokemonID > 1){
        pokemonID -= 1;
    }

    renderPokemon(pokemonID);
});

nextBtn.addEventListener('click', () => {
    pokemonID += 1;
    renderPokemon(pokemonID);
});

renderPokemon(pokemonID);