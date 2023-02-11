const coinUrl = "https://api.coingecko.com/api/v3/coins/list";
const infoUrl = "https://api.coingecko.com/api/v3/coins/{id}";

let allCoins = [];
let allCoinsInfo=[];

$(document).ready(function () {
  $.get(coinUrl).done(function (data) {
    allCoins = data;
    getData();
  });
});


const getData = () => {
  $("#container").html("");
  for (let counter = 0; counter < 100; counter++) {
    $("#container").append(`
    <div class="Box" id="box-${counter}-${allCoins[counter].id}">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <div class="form-check form-switch" id="addSwitch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          <label class="form-check-label mb-3" for="flexSwitchCheckDefault">add to watch list</label>
        </div>
        <h5 class="card-title">${allCoins[counter].symbol}</h5>
        <p class="card-text">${allCoins[counter].id}</p>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" 
        data-bs-target="#collapseExample-${counter}-${allCoins[counter].id}"
        onclick="getCoinInfo('${allCoins[counter].id}', '#collapseExample-${counter}-${allCoins[counter].id}')" 
        aria-expanded="false"
        aria-controls="collapseExample-${counter}-${allCoins[counter].id}">
          more info
        </button>
        <div class="collapse" id="collapseExample-${counter}-${allCoins[counter].id}">
          <div class="card card-body">
            <div id="coinInfo-${allCoins[counter].id}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `);
  }};

  const getCoinInfo = (id, target) => {
    const url = infoUrl.replace("{id}", id);
    $.get(url, function(data) {
      allCoinsInfo = data;
      console.log("data: ", data);
      printinfo(id, data);
      $(target).collapse('show');
    });
  };
  
  const printinfo = (id, data) => {
    $("#coinInfo-" + id).append(`
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
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

   