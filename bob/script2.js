document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1100';
    let originalPokemonList;  // Define the original list variable

    fetch(url)
        .then(response => response.json())
        .then(data => {
            originalPokemonList = data.results;  // Initialize the original list
            displayPokemonList(originalPokemonList);
            populateGenerationFilter(); // Call function to populate the generation filter
        });

    document.getElementById('search').addEventListener('input', function () {
        filterPokemonList();
    });

    document.getElementById('typeFilter').addEventListener('change', function () {
        filterPokemonList();
    });

    document.getElementById('generationFilter').addEventListener('change', function () {
        filterPokemonList();
    });

    document.getElementById('numberFilter').addEventListener('change', function () {
        filterPokemonList();
    });
});

// Add the rest of your existing code here

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

function displayPokemonList(pokemonList) {
    const listContainer = document.getElementById('pokemonList');
    listContainer.innerHTML = ''; // Clear the previous list

    pokemonList.forEach(pokemon => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonDetails => {
                const primaryType = pokemonDetails.types[0].type.name;
                const cardColor = typeColors[primaryType] || '#f2f2f2';

                const listItem = document.createElement('div');
                listItem.className = 'pokemon-card';
                listItem.style.backgroundColor = cardColor;

                const typeIcons = pokemonDetails.types.map(type =>
                    `<img src="icons/${type.type.name}.png" alt="${type.type.name}" class="type-icon">`
                ).join('');

                listItem.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png" alt="${capitalize(pokemon.name)}">
                    <p class="pokemon-name">${capitalize(pokemon.name)}</p>
                    <div class="pokemon-types">${typeIcons}</div>
                `;
                listItem.onclick = function () {
                    window.location.href = `pokemon.html?name=${pokemon.name}`;
                };
                listContainer.appendChild(listItem);
            });
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// Function to filter the Pokemon list based on search, type, generation, and number
function filterPokemonList() {
    const searchKeyword = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const generationFilter = document.getElementById('generationFilter').value;
    const numberFilter = document.getElementById('numberFilter').value;

    const filteredList = originalPokemonList.filter(pokemon => {
        const nameMatches = pokemon.name.includes(searchKeyword);
        const typeMatches = typeFilter === '' || pokemon.types.includes(typeFilter);
        const generationMatches = generationFilter === '' || pokemon.generation === generationFilter;

        return nameMatches && typeMatches && generationMatches;
    });

    const sortedList = sortPokemonList(filteredList, numberFilter);

    displayPokemonList(sortedList);
}

// Function to populate the generation filter based on data from the PokeAPI
function populateGenerationFilter() {
    // Implement logic to fetch generation data from the PokeAPI and populate the dropdown
    // You can use a similar fetch method as you did for Pokemon data
    // Example: fetch('https://pokeapi.co/api/v2/generation')
    //           .then(response => response.json())
    //           .then(data => {
    //               // Use data to populate the generation filter options dynamically
    //           });
}

// Function to sort the Pokemon list based on the number (ID)
function sortPokemonList(pokemonList, order) {
    return pokemonList.sort((a, b) => {
        const numA = a.id;
        const numB = b.id;

        if (order === 'asc') {
            return numA - numB;
        } else {
            return numB - numA;
        }
    });
}

