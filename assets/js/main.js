// function convertPokemonTypesToLi(pokemonTypes) {
//     return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
// }

// pokeApi.getPokemons().then((pokemons = []) => {
    
//     pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')

//      const listItems = []
//      for(let i = 0; i < pokemons.length; i++) {
//          const pokemon = pokemons[i];
//          listItems.push(convertPokemonToLi(pokemon))
//      }

//      console.log(listItems)
// })


const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0;

const maxRecords = 248;

function showPokemonDetails(pokemon) {
    const detailsContainer = document.getElementById('pokemonDetails');
    detailsContainer.innerHTML = `
        <div class="PokemonShowDetail">
            <li class="pokemon-detail ${pokemon.type}">
                <h2>${pokemon.name}</h2>
                <span class="number">#00${pokemon.num}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img class="pokemonImageDetail" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div class="extra-info">
                    <dl>
                        <div class="info-item">
                            <dt>Species</dt>
                            <dd>${pokemon.type || 'Unknown'}</dd>
                        </div>
                        <div class="info-item">
                            <dt>Height</dt>
                            <dd>${pokemon.height || '?'} m</dd>
                        </div>
                        <div class="info-item">
                            <dt>Weight</dt>
                            <dd>${pokemon.weight || '?'} kg</dd>
                        </div>
                        <div class="info-item">
                            <dt>Abilities</dt>
                            <dd>${pokemon.abilities?.join(', ') || 'Unknown'}</dd>
                        </div>
                        <div class="info-item">
                            <dt>Gender</dt>
                            <dd>${pokemon.gender || 'Unknown'}</dd>
                        </div>
                        <div class="info-item">
                            <dt>Egg Groups</dt>
                            <dd>${pokemon.egg_groups?.join(', ') || 'Unknown'}</dd>
                        </div>
                    </dl>
                </div>
            </li>
        </div>
    `;
}




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" data-name="${pokemon.name}">
                <span class="number">#00${pokemon.num}</span>
                <span class="name">${pokemon.name}</span>

                <button class="info-btn ${pokemon.type}" data-pokemon='${JSON.stringify(pokemon)}'></button>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');

        pokemonList.innerHTML += newHtml;

        // Seleciona todos os botões com classe .info-btn
        const infoButtons = document.querySelectorAll('.info-btn');

        infoButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que clique no botão dispare o evento do li
                const pokemonData = JSON.parse(button.getAttribute('data-pokemon'))
                showPokemonDetails(pokemonData);
            });
        });
    });
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } 
    else {
        loadPokemonItens(offset, limit)
    }
})


