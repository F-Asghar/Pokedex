let ArrPokemon = [];
let currentIndex = 0;
let currentIndex2 = 0;
let searchedNames = [];
let offset = 0;

// #region get Data

async function getData() {
    loadingSpinner();
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        const pokemonList = result.results;
        fetchData(pokemonList);
    } catch (error) {
        console.error(error);
    } finally {
        removeLoadingSpinner();
    }
}

async function getData2() {
    const newOfset = (offset += 20);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${newOfset}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        const pokemonList = result.results;
        fetchData(pokemonList);
    } catch (error) {
        console.error(error);
    } finally {
        removeLoadingSpinner();
    }
}

async function fetchData(pokemonList) {
    for (const pokemon of pokemonList) {
        const detailsResponse = await fetch(pokemon.url);
        const pokeDetails = await detailsResponse.json();
        renderResult(pokeDetails);
        ArrPokemon.push(pokeDetails);
    }
}

// #endregion

// #region render and Dialog

function renderResult(pokeDetails) {
    const contentContainer = document.getElementById("content-witdh");
    pokeDetails.name = pokeDetails.name.toUpperCase();
    contentContainer.innerHTML += getPokeTemplate(pokeDetails);
    getAllElements(pokeDetails);
    pokemonTypeColor(pokeDetails);
}

function openDialog(id) {
    const openDialogRef = document.getElementById("poke-dialog");
    currentIndex = ArrPokemon.findIndex((p) => p.id == id);
    let currentPokemon = ArrPokemon[currentIndex];
    if (searchedNames.length > 0) {
        currentIndex2 = searchedNames.findIndex((p) => p.id == id);
        currentPokemon = searchedNames[currentIndex2];
    }
    openDialogRef.innerHTML = getDialogTemplate(currentPokemon);
    openDialogRef.showModal();
    pokemonTypeColor(currentPokemon);
    getAllElements2(currentPokemon);
    if (searchedNames.length > 0) {
        nextPrevTwo();
    } else {
        nextPrev();
    }
}

function closeDialog() {
    const dialog = document.getElementById("poke-dialog");
    const dialogContent = dialog.querySelector(".event-bubbling");
    dialog.addEventListener("click", () => {
        dialog.close();
        document.body.classList.remove("no-scroll");
    });
    if (!dialog.open) return;
    dialogContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

function hideBtn() {
    const hideBtnRef = document.getElementById("first-btn");
    hideBtnRef.style.display = "none";
}

function renderEmpty() {
    const contentContainer = document.getElementById("content-witdh");
    contentContainer.innerHTML = getEmptyTemplate();
    hideBtn();
}

// #endregion

// #region other functions

function getAllElements(pokeDetails) {
    const elements = document.getElementById(`poke-elements-${pokeDetails.id}`);
    elements.innerHTML = "";
    for (let index = 0; index < pokeDetails.types.length; index++) {
        const element = pokeDetails.types[index].type.name;
        elements.innerHTML += getTypeTemplate(element);
        if (index < pokeDetails.types.length - 1) {
            elements.innerHTML += ", ";
        }
    }
}

function getAllElements2(currentPokemon) {
    const elements = document.getElementById(
        `pokemon-elements-${currentPokemon.id}`,
    );
    elements.innerHTML = "";

    for (let index = 0; index < currentPokemon.types.length; index++) {
        const element = currentPokemon.types[index].type.name;
        elements.innerHTML += getTypeTemplate(element);
        if (index < currentPokemon.types.length - 1) {
            elements.innerHTML += ", ";
        }
    }
}

function getAllAbilities(ArrAbilities) {
    let abilities = "";
    let cnt = 0;
    for (const abilitie of ArrAbilities) {
        if (cnt >= 2) break;
        if (cnt > 0) {
            abilities += ",";
        }
        abilities += abilitie.ability.name;
        cnt++;
    }
    return abilities;
}

function getPokemonColor(pokeDetails) {
    let type = pokeDetails.types[0].type.name;
    let color = "";

    if (type == "grass") {
        color = "#097969";
    } else if (type == "fire") {
        color = "#F08030";
    } else if (type == "water") {
        color = "#6890F0";
    } else if (type == "ground") {
        color = "#BD9237";
    } else if (type == "poison") {
        color = "#F85888";
    } else if (type == "bug") {
        color = "#99D681";
    } else if (type == "normal") {
        color = "#C4C4C4";
    } else if (type == "electric") {
        color = "#DFFF00";
    } else if (type == "fairy") {
        color = "#FF08F7";
    } else if (type == "fighting") {
        color = "#FF0303";
    } else if (type == "psychic") {
        color = "#ed00edff";
    } else if (type == "rock") {
        color = "#221f22ff";
    } else {
        color = "#C4C4C4";
    }

    return color;
}

function getPokemonCardById(pokemonId) {
    return document.getElementById(`poke-card-${pokemonId}`);
}

function pokemonTypeColor(pokeDetails) {
    const color = getPokemonColor(pokeDetails);
    const card = getPokemonCardById(pokeDetails.id);
    const dialog = document.getElementById("poke-dialog");
    const pokeDialogColor = document.querySelector(".poke-img");

    if (card) {
        let pokeColor = card.querySelector(".poke-main");
        if (pokeColor) {
            pokeColor.style.backgroundColor = color;
        }
    }
    if (dialog && dialog.open) {
        pokeDialogColor.style.backgroundColor = color;
    }
}

function noScroll() {
    document.body.classList.add("no-scroll");
}

function refresh() {
    const contentContainer = document.getElementById("content-witdh");
    contentContainer.innerHTML = "";
    ArrPokemon = [];
    searchedNames = [];
    getData();
    const hideBtnRef = document.getElementById("first-btn");
    hideBtnRef.style.display = "block";
}

// #endregion

// #region Dialog-BTN

// #region Dialog-BTN1
function nextPrev() {
    const prevButton = document.getElementById("dialog-prev");
    const nextButton = document.getElementById("dialog-next");
    if (!prevButton || !nextButton) return;
    prevBtn(prevButton);
    nextBtn(nextButton);
}

function prevBtn(prevButton) {
    const dialog = document.getElementById("poke-dialog");
    prevButton.addEventListener("click", () => {
        currentIndex =
            (currentIndex - 1 + ArrPokemon.length) % ArrPokemon.length;
        const currentPokemon = ArrPokemon[currentIndex];
        dialog.innerHTML = getDialogTemplate(currentPokemon);
        pokemonTypeColor(currentPokemon);
        getAllElements2(currentPokemon);
        closeDialog();
        nextPrev();
    });
}

function nextBtn(nextButton) {
    const dialog = document.getElementById("poke-dialog");
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % ArrPokemon.length;
        const currentPokemon = ArrPokemon[currentIndex];
        dialog.innerHTML = getDialogTemplate(currentPokemon);
        pokemonTypeColor(currentPokemon);
        getAllElements2(currentPokemon);
        closeDialog();
        nextPrev();
    });
}

// #endregion

//#region Dialog-BTN2-Search
function nextPrevTwo() {
    const prevButtonTwo = document.getElementById("dialog-prev");
    const nextButtonTwo = document.getElementById("dialog-next");
    if (!prevButtonTwo || !nextButtonTwo) return;
    prevBtnTwo(prevButtonTwo);
    nextBtnTwo(nextButtonTwo);
}

function prevBtnTwo(prevButtonTwo) {
    const dialog = document.getElementById("poke-dialog");
    prevButtonTwo.addEventListener("click", () => {
        currentIndex2 =
            (currentIndex2 - 1 + searchedNames.length) % searchedNames.length;
        dialog.innerHTML = getDialogTemplate(currentPokemon);
        pokemonTypeColor(currentPokemon);
        getAllElements2(currentPokemon);
        closeDialog();
        nextPrevTwo();
    });
}

function nextBtnTwo(nextButton) {
    const dialog = document.getElementById("poke-dialog");
    nextButton.addEventListener("click", () => {
        currentIndex2 = (currentIndex2 + 1) % searchedNames.length;
        const currentPokemon = searchedNames[currentIndex2];
        dialog.innerHTML = getDialogTemplate(currentPokemon);
        pokemonTypeColor(currentPokemon);
        getAllElements2(currentPokemon);
        closeDialog();
        nextPrevTwo();
    });
}

// #endregion

// #endregion

// #region loading

function loadingSpinner() {
    const spinnerRef = document.getElementById("loader-container");
    spinnerRef.style.display = "flex";
    noScroll();
}

function removeLoadingSpinner() {
    setTimeout(function () {
        const spinnerRef = document.getElementById("loader-container");
        spinnerRef.style.display = "none";
        document.body.classList.remove("no-scroll");
    }, 2000);
}

// #endregion

// #region request

function inputRequest() {
    const inputRef = document.getElementById("input-Field");
    const requestedObject = inputRef.value.trim().toLowerCase();
    const contentContainer = document.getElementById("content-witdh");
    searchedNames = [];
    contentContainer.innerHTML = "";
    for (let i = 0; i < ArrPokemon.length; i++) {
        if (
            ArrPokemon[i].species.name.toLowerCase().includes(requestedObject)
        ) {
            searchedNames.push(ArrPokemon[i]);
        }
    }
    inputHelper(searchedNames);
    hideBtn();
    inputRef.value = "";
}

function inputHelper(searchedNames) {
    const contentContainer = document.getElementById("content-witdh");
    for (let x = 0; x < searchedNames.length; x++) {
        contentContainer.innerHTML += getPokeTemplate(searchedNames[x]);
        getAllElements(searchedNames[x]);
        nextPrevTwo();
        pokemonTypeColor(searchedNames[x]);
    }
    if (searchedNames.length === 0) {
        renderEmpty();
    }
}

// #endregion
