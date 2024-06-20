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
    const homeButton = document.getElementById('homeButton');
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
        homeButton.classList.add('shake');
    });
    
    

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const primaryType = data.types[0].type.name;
        const backgroundStyle = typeColorsDarker[primaryType] || 'linear-gradient(to right, #ffffff, #e9e9e9)';
        const textColor = typeColorsDarker[primaryType] || '#000000'; 
        document.querySelector('.pokemon-details-container').style.background = backgroundStyle;
        document.body.style.background = backgroundStyle;

        fetch(data.species.url)
            .then(response => response.json())
            .then(speciesData => {
                displayPokemonDetails(data, speciesData, textColor);
                return fetch(speciesData.evolution_chain.url);
            })
            .then(response => response.json())
            .then(evolutionData => {
                displayEvolutionLine(evolutionData.chain);
            });
    });
});
function displayPokemonDetails(pokemon, speciesData, textColor) {
    const typesIcons = pokemon.types.map(type =>
        `<img src="icons/${type.type.name}.png" alt="${type.type.name}" class="type-icon">`
    ).join('');

    const abilitiesPromises = pokemon.abilities.map(ability => 
        fetch(ability.ability.url).then(response => response.json())
    );
    const primaryTypeColor = typeColors[pokemon.primaryType] || '#f2f2f2';
    document.body.style.backgroundColor = primaryTypeColor;

    Promise.all(abilitiesPromises).then(abilitiesData => {
        const abilitiesHtml = abilitiesData.map(abilityData => {
            const abilityEffect = abilityData.effect_entries.find(entry => entry.language.name === 'en').effect;
            return `<span class="ability">${capitalize(abilityData.name)}
                        <span class="ability-description">${abilityEffect}</span>
                    </span>`;
        }).join(', ');

        document.querySelector('.pokemon-abilities').innerHTML = 
            `<h2>Abilities</h2><p style="color: ${textColor}">${abilitiesHtml}</p>`;
    });

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
            <p><strong></strong> ${typesIcons}</p>
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
            <p><strong>Pokédex Entry:</strong> ${speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>
        </div>`;

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
function calculateMinStat(baseStat, isHp) {
    if (isHp) {
        return ((2 * baseStat) * 100) / 100 + 100 + 10;
    } else {
        return ((2 * baseStat) * 100) / 100 + 5;
    }
}

function calculateMaxStat(baseStat, isHp) {
    if (isHp) {
        return ((2 * baseStat + 31 + (252 / 4)) * 100) / 100 + 100 + 10;
    } else {
        
        return (((2 * baseStat + 31 + (252 / 4)) * 100) / 100 + 5) * 1.1;
    }
}


function createStatRow(stat) {
    const baseStat = stat.base_stat;
    const isHp = stat.stat.name === 'hp';
    const statPercentage = (baseStat / 255) * 100;
    const minStat = calculateMinStat(baseStat, isHp);
    const maxStat = calculateMaxStat(baseStat, isHp);

    return `
        <div class="stat-row">
            <div class="stat-name">${capitalize(stat.stat.name)}</div>
            <div class="stat-number">${baseStat}</div>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${statPercentage}%"></div>
            </div>
            <div class="stat-min-max">Min: ${Math.floor(minStat)} / Max: ${Math.floor(maxStat)}</div>
        </div>
    `;
}

function displayEvolutionLine(chain) {
    processEvolutionChain(chain).then(evolutions => {
        const container = document.getElementById('evolution-container');
        container.innerHTML = '';

        const header = document.createElement('h2');
        header.textContent = 'Evolution Chain';
        header.className = 'evolution-header';
        container.appendChild(header);


        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'sprite-container';

        evolutions.forEach(evolution => {
            const evolutionElement = document.createElement('div');
            evolutionElement.className = 'evolution-element';

            const sprite = document.createElement('img');
            sprite.src = evolution.sprite;
            sprite.alt = `Sprite of ${evolution.name}`;
            sprite.className = 'pokemon-sprite';

            sprite.addEventListener('click', () => {
                window.location.href = `pokemon.html?name=${evolution.name}`;
            });

            evolutionElement.appendChild(sprite);
            spriteContainer.appendChild(evolutionElement); 
        });

        container.appendChild(spriteContainer); 
    });
}
function processEvolutionChain(chain) {
    let currentStage = chain;
    let promises = [];

    while (currentStage) {
        const name = currentStage.species.name;
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const promise = fetch(url)
            .then(response => response.json())
            .then(data => ({
                name: name,
                sprite: data.sprites.front_default
            }));
        promises.push(promise);

        currentStage = currentStage.evolves_to.length > 0 ? currentStage.evolves_to[0] : null;
    }

    return Promise.all(promises);
}