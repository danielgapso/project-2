const getData = () => {//this function shows the cards with the info for each card
  $("#container").html("");//sets the container div as empty string
  for (let counter = 0; counter < 100; counter++) {//one loop to show 100 cards
    //the cards are shown by using bootstrap cards it presents them with unique id for each card and their data
    //each card has a switch button that gives you the ability to add that card to the watch list
    $("#container").append(`
    <div class="Box" id="box-${allCoins[counter].id}">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <div class="form-check form-switch" id="addSwitch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
        onclick="addToWatchList(this, '${allCoins[counter].id}')">
        </div>
        <h5 class="card-title">${allCoins[counter].symbol}</h5>
        <p class="card-text">${allCoins[counter].id}</p>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" 
        data-bs-target="#collapseExample-${allCoins[counter].id}"
        onclick="getCoinInfo('${allCoins[counter].id}', '#collapseExample-${allCoins[counter].id}')" 
        aria-expanded="false"
        aria-controls="collapseExample-${allCoins[counter].id}">
          more info
        </button>
        <div class="collapse" id="collapseExample-${allCoins[counter].id}">
          <div class="card card-body">
            <div id="coinInfo-${allCoins[counter].id}"></div>
          </div>
        </div>
      </div>
  `);
  }
};

const printinfo = (id, data) => {//when more info is click this function is called it gets the id of the clicked card and the data
  //it will be showen in the card by its info and id using html 
  $("#coinInfo-" + id).append(`
        <div>
          <img src=${data.image.thumb} width=100/><br/>
          <h5 class="card-text">coin name ${data.name}</h5>
          <p class="card-text">
            price in dollars
            ${data.market_data.current_price.usd}$
          </p>
          <p class="card-text">
            price in euros ${data.market_data.current_price.eur}€
          </p>
          <p class="card-text">
            price in
            shekels ${data.market_data.current_price.ils}₪
          </p>
        </div>
      </div>
    </div>
    `);
};
