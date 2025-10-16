
const pokeApi = {}


function convertDetailToPokemon(pokemonDetails) {
    const pokemon = new Pokemon()
    pokemon.name = pokemonDetails.name;
    pokemon.num = pokemonDetails.id;

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default

    // pokemon.types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    // pokemon.type = pokemon.types.get(0)


    pokemon.stats = pokemonDetails.stats.map(s => ({
        base_stat: s.base_stat,
        stat: {name: s.stat.name}
    }))

    return pokemon
}

async function getPokemonStats(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    const stats = data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat 
    }));

    const total = stats.reduce((sum, s) => sum + s.value, 0);

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertDetailToPokemon)
        .then(async (detailPokemon) => {

            // Get Gender
            const genderData = await pokeApi.getPokemonGender(detailPokemon);
            const rate = genderData.gender_rate;

            if(rate === -1) {
                detailPokemon.gender = 'Genderless';
            }
            else {
                const femalePercent = (rate / 8) * 100;
                const malePercent = 100 - femalePercent;
                detailPokemon.gender =`♂️ ${malePercent.toFixed(1)}% / ♀️ ${femalePercent.toFixed(1)}%`;
            }

            // Get Egg Groups
            const eggData = await pokeApi.getPokemonEggGroup(detailPokemon);
            detailPokemon.egg_groups = eggData.egg_groups;


            // Get Status
            const pokeStats = await pokeApi.getPokemonStats(detailPokemon);
            detailPokemon.height = pokeStats.height;
            detailPokemon.weight = pokeStats.weight;
            detailPokemon.abilities = pokeStats.abilities;

            return detailPokemon;
        })
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) 
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


pokeApi.getPokemonGender = (pokemon) => {
    const genderUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`;
    return fetch(genderUrl)
    .then(response => response.json())
    .then(data => {
        return {
            gender_rate: data.gender_rate
        };
    });
};


pokeApi.getPokemonEggGroup = (pokemon) => {
    const eggGroupUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`;
    return fetch(eggGroupUrl)
    .then(response => response.json())
    .then(data => {
        return {
            egg_groups: data.egg_groups.map(group => group.name)
        }
    })
}

pokeApi.getPokemonStats = (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return {
                height: data.height / 10,
                weight: data.weight / 10,
                abilities: data.abilities.map(a => a.ability.name)
            }
        })
}


