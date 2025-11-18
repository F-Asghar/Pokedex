
function getTypeTemplate(element){
    return `<p class="type">${element}</p>`
}

function getPokeTemplate(pokeDetails) {
    return `<section id="poke-card-${pokeDetails.id}" class="pokemon" onclick="openDialog(${pokeDetails.id}), noScroll()">
            <header class="poke-id-name">
                <p>#${pokeDetails.id}</p>
                <h3>${pokeDetails.name}</h3>
            </header>
            <div class="poke-main">
            <img class="poke-main-img" src="${pokeDetails.sprites.other["official-artwork"].front_default}" alt="">
            </div>
            <div id="poke-elements-${pokeDetails.id}" class="poke-element">
            </div>
            </section>`;
}

function getDialogTemplate(currentPokemon){
    return`             <div class="event-bubbling">
            <section class="poke-cart">
            <header class="poke-id-name">
                <p>#${currentPokemon.id}</p>
                <h3>${currentPokemon.name}</h3>
            </header>
            <div class="poke-img">
            <img class="dialog-img" src="${currentPokemon.sprites.other["official-artwork"].front_default}" alt="">
            </div>
            <div id="pokemon-elements-${currentPokemon.id}" class="poke-element">
            </div>
            <main class="poke-information">
                <nav class="poke-nav">
                    <p>main</p>
                </nav>
                <div class="poke-table">
                <table class="poke-data">
                    <tr>
                    <th>Height:</th>
                    <td> ${currentPokemon.height}M</td>
                    </tr>
                    <tr>
                    <th>Weight:</th>
                    <td> ${currentPokemon.weight}KG</td>
                    </tr>
                    <tr>
                    <th>Base experiance:</th>
                    <td> ${currentPokemon.base_experience}XP</td>
                    </tr>
                    <tr>
                    <th>Abilities:</th>
                    <td> ${getAllAbilities(currentPokemon.abilities)}</td>
                    </tr>
                </table>
                </div>
            </main>
        </section>
        <section class="switch-pokemon">
            <button id="dialog-prev">Preview</button>
            <button id="dialog-next">Next</button>
        </section>
        </div>   `
}

function getEmptyTemplate(){
    return `<h2 id="empty">Keine Einträge gefunden</h2>`
}

