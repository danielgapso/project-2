const getData = () => {
  $("#container").html("");
  for (let counter = 0; counter < 100; counter++) {
    $("#container").append(`
    <div class="Box" id="box-${allCoins[counter].id}">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <div class="form-check form-switch" id="addSwitch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          <label class="form-check-label mb-3" for="flexSwitchCheckDefault">add to watch list</label>
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

const printinfo = (id, data) => {
  $("#coinInfo-" + id).append(`
        <div>
          <img src=${allCoinsInfo.image.thumb} width=100/><br/>
          <h5 class="card-text">coin name ${data.name}</h5>
          <p class="card-text">
            price in dollars
            ${allCoinsInfo.market_data.current_price.usd}$
          </p>
          <p class="card-text">
            price in euros ${allCoinsInfo.market_data.current_price.eur}€
          </p>
          <p class="card-text">
            price in
            shekels ${allCoinsInfo.market_data.current_price.ils}₪
          </p>
        </div>
      </div>
    </div>
    `);
};
