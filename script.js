const TCG = document.querySelector(".TCG");
const pokein = document.querySelector(".name");
const card = document.querySelector(".card");
const set = document.querySelector(".set");
const price = document.querySelector(".price");
const rare = document.querySelector(".rare");
const key = "30b4ce61-7014-408d-9266-0a541751afa6";

function rot(button){
    button.classList.add('rotate');
    button.addEventListener('animationend',() => {
        button.classList.remove('rotate');
    }, {once: true});
}

TCG.addEventListener("submit", async event => {

    event.preventDefault();

    const name = pokein.value;

    if(name){
        try{
            const nameD = await getweather(name);
            dispweather(nameD);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please Enter a Pokemon Name");
    }
});

async function getweather(name){
    const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${name}`;

    const response = await fetch(apiUrl);
    
    console.log(response);
    if(!response.ok){
        throw new Error("Cannot find the Pokemon");
    }

    return await response.json();
    
}

function dispweather(data){
    console.log(data);
    card.innerHTML = '';
    set.innerHTML = '';
    price.innerHTML = '';
    rare.innerHTML = '';
    if (data.data.length > 0) {
        const randomCard = data.data[Math.floor(Math.random() * data.data.length)];
        card.innerHTML = `
            <img class="gencard" src="${randomCard.images.small}" alt="${randomCard.name}">  
        `;
        set.innerHTML = `
            <p>Set: ${randomCard.set.name}</p>  
        `;
        rare.innerHTML = `
            <p>Rarity: ${randomCard.rarity}</p>  
        `;
        price.innerHTML = `
            <p>$${randomCard.cardmarket.prices.averageSellPrice}</p>  
        `;
    } else {
        cardDiv.innerHTML = '<p>No card found. Please try again.</p>';
    }
}


            
            

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errormsg");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}