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
                    <div class="tabs">
                        <div class="tab-buttons">
                            <button class="tab-btn active" data-tab="about">About</button>
                            <button class="tab-btn" data-tab="stats">Base Stats</button>
                            <button class="tab-btn" data-tab="evolution">Evolution</button>
                            <button class="tab-btn" data-tab="moves">Moves</button>
                        </div>
                        <div class="tab-content active" id="about">
                            <dl>
                            <div class="info-item">
                                    <dt>Species</dt>
                                    <dd>${pokemon.type || 'Unknown'}</dd>
                                </div>
                                <div class="info-item">
                                    <dt>Gender</dt>
                                    <dd>${pokemon.gender || 'Unknown'}</dd>
                                </div>
                                <div class="info-item">
                                    <dt>Height</dt>
                                    <dd>${(pokemon.height * 3.28084).toFixed(2)} ft (${(pokemon.height * 100).toFixed(2)} cm)</dd>
                                </div>
                                <div class="info-item">
                                    <dt>Weight</dt>
                                    <dd>${pokemon.weight || '?'} kg (${(pokemon.weight * 2.20462).toFixed(2)} lbs)</dd>
                                </div>
                                <h3>Breeding</h3>
                                <div class="info-item">
                                    <dt>Abilities</dt>
                                    <dd>${pokemon.abilities?.join(', ') || 'Unknown'}</dd>
                                </div>
                                <div class="info-item">
                                    <dt>Egg Groups</dt>
                                    <dd>${pokemon.egg_groups?.join(', ') || 'Unknown'}</dd>
                                </div>
                            </dl>
                        </div>
                        <div class="tab-content" id="stats">
                            <h3>Base Stats</h3>
                            <div class="stats-list">
                                ${pokemon.stats.map(stat => `
                                    <div class="stat-item">
                                        <span class="stat-name">${stat.stat.name.toUpperCase()}</span>
                                        <div class="stat-bar">
                                            <div class="fill" style="width: ${stat.base_stat / 2}%"></div>
                                        </div>
                                        <span class="stat-value">${stat.base_stat}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    `;
}


document.addEventListener("click", e => {
  if (e.target.classList.contains("tab-btn")) {
    const tabs = e.target.closest(".tabs");
    const target = e.target.dataset.tab;

    tabs.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    tabs.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    e.target.classList.add("active");
    tabs.querySelector(`#${target}`).classList.add("active");
  }
});


// const buttons = document.querySelectorAll(".tab-btn");
// const contents = document.querySelectorAll(".tab-content");

// buttons.forEach(btn => {
//   btn.addEventListener("click", () => {
//     // remove 'active' de todos
//     buttons.forEach(b => b.classList.remove("active"));
//     contents.forEach(c => c.classList.remove("active"));

//     // ativa o botão e o conteúdo clicado
//     btn.classList.add("active");
//     document.getElementById(btn.dataset.tab).classList.add("active");
//   });
// });



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


