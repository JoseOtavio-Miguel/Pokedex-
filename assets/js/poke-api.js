
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

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertDetailToPokemon)
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
