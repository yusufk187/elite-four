const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

const generationRanges = {
    'Generation I': { min: 1, max: 151 },
    'Generation II': { min: 152, max: 251 },
    'Generation III': { min: 252, max: 386 },
    'Generation IV': { min: 387, max: 493 },
    'Generation V': { min: 494, max: 649 },
    'Generation VI': { min: 650, max: 721 },
    'Generation VII': { min: 722, max: 809 },
    'Generation VIII': { min: 810, max: 905 },
    'Generation IX': { min: 906, max: 1017},
};

let allPokemon = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1100 ')
        .then(response => response.json())
        .then(data => processPokemonData(data.results))
        .catch(error => console.error("Error fetching Pokémon data:", error));

    populateFilters();
    document.getElementById('search').addEventListener('input', filterPokemonList);
    document.getElementById('typeFilter').addEventListener('change', filterPokemonList);
    document.getElementById('generationFilter').addEventListener('change', filterPokemonList);
});

const homeButton = document.getElementById('homeButton');
    homeButton.addEventListener('click', () => {
        window.location.href = 'start.html';
        homeButton.classList.add('shake');
    });

function processPokemonData(pokemonData) {
    const fetchPromises = pokemonData.map(pokemon => fetch(pokemon.url)
        .then(response => response.json())
        .then(details => ({
            name: pokemon.name,
            id: extractIdFromUrl(pokemon.url),
            details: details,
            primaryType: details.types[0].type.name
        }))
        .catch(error => console.error("Error fetching details:", error)));

    Promise.all(fetchPromises)
        .then(pokemonDetails => {
            allPokemon = pokemonDetails.filter(pokemon => pokemon);
            displayPokemonList(allPokemon);
        })
        .catch(error => console.error("Error in Promise.all:", error));
}

function extractIdFromUrl(url) {
    return parseInt(url.split('/').filter(Boolean).pop());
}

function displayPokemonList(pokemonList) {
    const listContainer = document.getElementById('pokemonList');
    listContainer.innerHTML = '';
    pokemonList.forEach(pokemon => {
        const listItem = createPokemonListItem(pokemon);
        listContainer.appendChild(listItem);
    });
}

function createPokemonListItem(pokemon) {
    const cardColor = typeColors[pokemon.primaryType] || '#f2f2f2';
    const listItem = document.createElement('div');
    listItem.className = 'pokemon-card';
    listItem.style.backgroundColor = cardColor;

    const typeIcons = pokemon.details.types.map(type => `<img src="icons/${type.type.name}.png" alt="${type.type.name}" class="type-icon">`).join('');
    listItem.innerHTML = `
        <img src="${pokemon.details.sprites.front_default}" alt="${capitalize(pokemon.name)}">
        <p class="pokemon-name">${capitalize(pokemon.name)}</p>
        <div class="pokemon-types">${typeIcons}</div>
    `;
    listItem.onclick = function() {
        window.location.href = `pokemon.html?name=${pokemon.name}`;
    };
    return listItem;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function populateFilters() {
    fetch('https://pokeapi.co/api/v2/type/')
        .then(response => response.json())
        .then(data => populateDropdown('typeFilter', data.results, 'name'))
        .catch(error => console.error("Error fetching types:", error));

    const generationDropdownData = Object.keys(generationRanges).map(gen => ({ name: gen }));
    populateDropdown('generationFilter', generationDropdownData, 'name');
}

function populateDropdown(dropdownId, items, property) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = ''; 

    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'All';
    dropdown.appendChild(defaultOption);

    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item[property];
        option.textContent = capitalize(item[property]);  
        dropdown.appendChild(option);
    });
}

function filterPokemonList() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedType = document.getElementById('typeFilter').value;
    const selectedGeneration = document.getElementById('generationFilter').value;

    const filteredList = allPokemon.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);
        const matchesType = !selectedType || pokemon.details.types.some(typeInfo => typeInfo.type.name === selectedType);
        const generation = getGenerationById(pokemon.id);
        const matchesGeneration = !selectedGeneration || generation === selectedGeneration;

        return matchesSearch && matchesType && matchesGeneration;
    });

    displayPokemonList(filteredList);
}
function getGenerationById(pokemonId) {
    return Object.keys(generationRanges).find(gen =>
        pokemonId >= generationRanges[gen].min && pokemonId <= generationRanges[gen].max
    ) || 'Unknown Generation';
}


