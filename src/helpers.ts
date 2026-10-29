// --- API / API data ---
const apiURL = "https://pokeapi.co/api/v2/pokemon";
const TOTAL_POKEMON = 1025

// gets JSON file then returns the data
export async function getJSON(name: string) {

    // get response
    const response = await fetch(`${apiURL}/${name}`)

    // check response
    if (!response.ok) {

        throw new Error(`response status = ${response.status}`);

    };

    // get data from JSON
    const pokemonData = await response.json();

    return pokemonData

};

// esnures the stat bar dosent go to low or high
function barRange(value: any, isTotalStat: boolean) {

    // adjust the total value to be divided by 6
    if(isTotalStat == true) {
        value = value / 6;
    }

    if (value < 10) {
        value = 10;
    }
    if (value > 100) {
        value = 100;
    }

    return value;
}

// processes the data for the home page
export function pokemonProcessor(pokemonData: any) {

    // stores the types as TYPE or TYPE / TYPE depending on how many there are
    let types = pokemonData.types[0].type.name

    if (pokemonData.types[1]) {
        types = types + ` / ${pokemonData.types[1].type.name}`
    }

    // gets all six stats and finds the stat total
    let total = 0;

    const stats = pokemonData.stats.map((stat: any) => {

        total = total + stat.base_stat;

        return {

            name: stat.stat.name, // name of pokemon
            value: stat.base_stat, // stat value
            length: barRange(stat.base_stat, false) // length of the statbar

        }

    })

    // appends the total stat to the stat data
    stats.push({
        name: "total",
        value: total,
        length: barRange(total, true)
    })

    // ensures that IDs have atleast 3 digits (1 -> 001 / 33 -> 033)
    let pokemonID = `${pokemonData.id}`;

    for (let i = (3 - pokemonID.length); i > 0; i--) {
        console.log("adding data");
        pokemonID = "0" + pokemonID;

    };

    // the preocessed data
    const processedData = {
        name: pokemonData.name,
        types: types,
        stats: stats,
        image: `https://www.serebii.net/pokemon/art/${pokemonID}.png`
    }

    return processedData;
}

// gets two pokemon
export async function twoPokemonProcessor() {
    let idOne = Math.round(Math.random() * TOTAL_POKEMON)
    let idTwo = Math.round(Math.random() * TOTAL_POKEMON)

    // esnure they are not the same
    while(idOne == idTwo) {
        idTwo = Math.round(Math.random() * TOTAL_POKEMON)
    }

    // try to get both pokemon
    try {
        const pokemonData1 = await getJSON(`${idOne}`)
        const pokemonData2 = await getJSON(`${idTwo}`)
        let processedPokemonData1 = pokemonProcessor(pokemonData1)
        let processedPokemonData2 = pokemonProcessor(pokemonData2)

        const processedData = [
            processedPokemonData1,
            processedPokemonData2
        ]

        return processedData
        
    }
    catch(error) {
        return error;
    }
}