// --- API / API data ---
const apiURL = "https://pokeapi.co/api/v2/pokemon";

// gets pikachu JSON file then displays pikachu's data
export async function getJSON(name: string) {

    // get response
    const response = await fetch(`${apiURL}/${name}`)

    // check response
    if (!response.ok) {

        throw new Error(`response status = ${response.status}`);

    };

    // get pikachu data from JSON
    const pokemonData = await response.json();

    return pokemonData

};

export function homeProcesser(pokemonData: any) {

    let types = pokemonData.types[0].type.name
    if (pokemonData.types[1]) {
        types = types + ` / ${pokemonData.types[1].type.name}`
    }

    let total = 0;
    const stats = pokemonData.stats.map((stat: any) => {
        total = total + stat.base_stat;
        return {
            name: stat.stat.name,
            value: stat.base_stat
        }
    })
    stats.push({
        name: "total",
        value: total
    })

    let pokemonID = `${pokemonData.id}`;
    console.log(pokemonID, "length: ", pokemonID.length);
    for (let i = (3 - pokemonID.length); i > 0; i--) {
        console.log("adding data");
        pokemonID = "0" + pokemonID;

    };

    const processedData = {
        name: pokemonData.name,
        types: types,
        stats: stats,
        image: `https://www.serebii.net/pokemon/art/${pokemonID}.png`
    }
    return processedData;
}