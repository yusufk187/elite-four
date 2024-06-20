function getPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;    

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
            }
            return response.json();
        })
        .then(pokemonData => {
            const name = pokemonData.name;
            const id = pokemonData.id;
            const types = pokemonData.types.map(type => type.type.name).join(', ');
            const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
            const baseExperience = pokemonData.base_experience;
            const stats = pokemonData.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');
            const weight = pokemonData.weight / 10; // Convert to kilograms
            const height = pokemonData.height / 10; // Convert to meters

            // Get the image URL from the pokemonData.sprites
            const imageUrl = pokemonData.sprites.front_default;

            // Update the #pokemonInfo div with name, id, types, abilities, baseExperience, stats, and image
            const pokemonInfo = document.getElementById('pokemonInfo');
            pokemonInfo.innerHTML = `
                <h2>${name}</h2>
                <p>ID: ${id}</p>
                <p>Types: ${types}</p>
                <p>Abilities: ${abilities}</p>
                <p>Base Experience: ${baseExperience}</p>
                <p>Stats:<br>${stats}</p>
                <p>Weight: ${weight} kg</p>
                <p>Height: ${height} m</p>
                <img id="pokemonImage" src="${imageUrl}" alt="${name} Image">
            `;
        })
        .catch(error => {
            const pokemonInfo = document.getElementById('pokemonInfo');
            pokemonInfo.innerHTML = `<p>${error.message}</p>`;
        });
}

function getItem() {
    const itemInput = document.getElementById('itemInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/item/${itemInput}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to retrieve data. Status code: ${response.status}`);
            }
            return response.json();
        })
        .then(itemData => {
            const name = itemData.name;
            const effect = itemData.effect_entries.find(entry => entry.language.name === 'en').effect;
            const shortEffect = itemData.effect_entries.find(entry => entry.language.name === 'en').short_effect;
            const spriteUrl = itemData.sprites.default;

            const itemInfo = document.getElementById('itemInfo');
            itemInfo.innerHTML = `
                <h2>${name}</h2>
                <p>Effect: ${effect}</p>
                <p>Short Effect: ${shortEffect}</p>
                <img src="${spriteUrl}" alt="${name} Image">
            `;
        })
        .catch(error => {
            const itemInfo = document.getElementById('itemInfo');
            itemInfo.innerHTML = `<p>${error.message}</p>`;
        });
}