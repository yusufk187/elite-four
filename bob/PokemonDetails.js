const typeColors = {
    normal: 'linear-gradient(to right, #A8A77A, #C3C0B8)',
    fire: 'linear-gradient(to right, #EE8130, #FFA05D)',
    water: 'linear-gradient(to right, #6390F0, #91BDFE)',
    electric: 'linear-gradient(to right, #F7D02C, #FFEA70)',
    grass: 'linear-gradient(to right, #7AC74C, #A8E67E)',
    ice: 'linear-gradient(to right, #96D9D6, #C4F1F9)',
    fighting: 'linear-gradient(to right, #C22E28, #DE5753)',
    poison: 'linear-gradient(to right, #A33EA1, #C77CD4)',
    ground: 'linear-gradient(to right, #E2BF65, #F0D579)',
    flying: 'linear-gradient(to right, #A98FF3, #C4BBF5)',
    psychic: 'linear-gradient(to right, #F95587, #FFA8C0)',
    bug: 'linear-gradient(to right, #A6B91A, #C3D21E)',
    rock: 'linear-gradient(to right, #B6A136, #D1C155)',
    ghost: 'linear-gradient(to right, #735797, #9785C4)',
    dragon: 'linear-gradient(to right, #6F35FC, #9186FF)',
    dark: 'linear-gradient(to right, #705746, #8C7A70)',
    steel: 'linear-gradient(to right, #B7B7CE, #E3E3F2)',
    fairy: 'linear-gradient(to right, #D685AD, #F0B6D3)',
};

const typeColorsDarker = {
    normal: 'linear-gradient(to right, #918970, #A3A08A)',
    fire: 'linear-gradient(to right, #C4621A, #D37A46)',
    water: 'linear-gradient(to right, #4C72C0, #6A94C6)',
    electric: 'linear-gradient(to right, #C5AF1C, #D6C256)',
    grass: 'linear-gradient(to right, #5E8F3A, #86B062)',
    ice: 'linear-gradient(to right, #78BFB8, #98D0D9)',
    fighting: 'linear-gradient(to right, #9A1D20, #B5423E)',
    poison: 'linear-gradient(to right, #822D81, #A55BA9)',
    ground: 'linear-gradient(to right, #B6984F, #C8B16B)',
    flying: 'linear-gradient(to right, #8874C3, #A093C7)',
    psychic: 'linear-gradient(to right, #C73E6F, #D5789E)',
    bug: 'linear-gradient(to right, #869214, #A3B41C)',
    rock: 'linear-gradient(to right, #94802C, #AFA344)',
    ghost: 'linear-gradient(to right, #5A4E7C, #7A6AA2)',
    dragon: 'linear-gradient(to right, #572CCC, #7064D6)',
    dark: 'linear-gradient(to right, #584739, #726658)',
    steel: 'linear-gradient(to right, #9697AA, #B2B2D4)',
    fairy: 'linear-gradient(to right, #B15A8D, #C684AF)',
};

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get('name');
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const primaryType = data.types[0].type.name;
        const backgroundStyle = typeColors[primaryType] || 'linear-gradient(to right, #ffffff, #e9e9e9)';
        const textColor = typeColorsDarker[primaryType] || '#000000'; // Default to black if no color is found
        document.querySelector('.pokemon-details-container').style.background = backgroundStyle;

        fetch(data.species.url)
            .then(response => response.json())
            .then(speciesData => {
                displayPokemonDetails(data, speciesData, textColor);
            });
        });
});

function displayPokemonDetails(pokemon, speciesData, textColor) {
    const typesIcons = pokemon.types.map(type =>
        `<img src="icons/${type.type.name}.png" alt="${type.type.name}" class="type-icon">`
    ).join('');

    const abilitiesHtml = pokemon.abilities.map(ability => 
        `<span class="ability" style="color: ${textColor}">${capitalize(ability.ability.name)}</span>`
    ).join(', ');

    const statsHtml = pokemon.stats.map(stat => 
        createStatRow(stat, textColor)
    ).join('');

    document.querySelector('.pokemon-image-container').innerHTML = 
        `<img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${capitalize(pokemon.name)}">`;

    document.querySelector('.pokemon-info').innerHTML = 
        `<div class="pokemon-info-header">
            <div>
                <div class="pokemon-species" style="color: ${textColor}">${capitalize(speciesData.genera.find(gen => gen.language.name === 'en').genus)}</div>
                <div class="pokemon-name">${capitalize(pokemon.name)}</div>
            </div>
            <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
        </div>
        <div class="section">
            <p><strong>Types:</strong> ${typesIcons}</p>
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Pokédex Entry:</strong> ${speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>
        </div>`;

    document.querySelector('.pokemon-abilities').innerHTML = 
        `<h2>Abilities</h2><p>${abilitiesHtml}</p>`;

    document.querySelector('.pokemon-stats').innerHTML = 
        `<h2>Stats</h2>${statsHtml}`;
}

function createStatRow(stat, textColor) {
    const baseStat = stat.base_stat;
    const statPercentage = (baseStat / 255) * 100;
    return `
        <div class="stat-row">
            <div class="stat-name" style="color: ${textColor}">${capitalize(stat.stat.name)}</div>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${statPercentage}%"></div>
            </div>
            <div class="stat-value">${baseStat}</div>
        </div>
    `;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createStatRow(stat) {
    const baseStat = stat.base_stat;
    const statPercentage = (baseStat / 255) * 100;
    const minStat = calculateMinStat(baseStat); 
    const maxStat = calculateMaxStat(baseStat); 

    return `
        <div class="stat-row">
            <div class="stat-name">${capitalize(stat.stat.name)}</div>
            <div class="stat-number">${baseStat}</div>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${statPercentage}%"></div>
            </div>
            <div class="stat-min-max">Min: ${minStat} / Max: ${maxStat}</div>
        </div>
    `;
}

function calculateMinStat(baseStat) {
    return baseStat - 10;
}

function calculateMaxStat(baseStat) {
    return baseStat + 10;
}

