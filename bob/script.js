let originalPokemonList = [];

document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1100';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            originalPokemonList = data.results; // Store the original list
            displayPokemonList(data.results);
            populateGenerationFilter(); // Call function to populate the generation filter
        });

    document.getElementById('searchButton').addEventListener('click', function () {
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

function displayPokemonList(pokemonList) {
    const listContainer = document.getElementById('pokemonList');
    listContainer.innerHTML = '';

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

function filterPokemonList() {
    const searchKeyword = document.getElementById('search').value.toLowerCase();
    const typeFilter = document.getElementById('typeFilter').value;
    const generationFilter = document.getElementById('generationFilter').value;
    const numberFilter = document.getElementById('numberFilter').value;

    let filteredList = originalPokemonList.filter(pokemon => {
        // Filter by name
        const nameMatches = pokemon.name.toLowerCase().includes(searchKeyword);

        // Additional filtering logic for type and generation will go here (if necessary)

        return nameMatches;
    });

    if (numberFilter === 'asc') {
        filteredList.sort((a, b) => a.id - b.id);
    } else if (numberFilter === 'desc') {
        filteredList.sort((a, b) => b.id - a.id);
    }

    displayPokemonList(filteredList);
}

function populateGenerationFilter() {
    fetch('https://pokeapi.co/api/v2/generation')
        .then(response => response.json())
        .then(data => {
            const generationFilter = document.getElementById('generationFilter');
            data.results.forEach(gen => {
                const option = document.createElement('option');
                option.value = gen.name;
                option.textContent = capitalize(gen.name);
                generationFilter.appendChild(option);
            });
        });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
