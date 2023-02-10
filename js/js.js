//const coinUrl = "https://api.coingecko.com/api/v3/coins/list";
const infoUrl="https://api.coingecko.com/api/v3/coins/";

let allcoins = [];


$(async () => {
  $.get(infoUrl).done(function (data) {
    allcoins = data;
    getData();
  });
});

const getData = () => {
  $("#container").html("");
  for (let counter = 0; counter < 50; counter++) {
    $("#container").append(`
    <div class="Box">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${allcoins[counter].symbol}</h5>
        <p class="card-text">${allcoins[counter].id}</p>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          more info
        </button>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">more info</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5 class="card-text">coin name ${allcoins[counter].name}</h5>
          <img src=${allcoins[counter].image.thumb} width=100/><br/>
        </p>
          <p class="card-text">
            price in dollars
            ${allcoins[counter].market_data.current_price.usd}$
          </p>
          <p class="card-text">
            price in euros ${allcoins[counter].market_data.current_price.eur}€
          </p>
          <p class="card-text">
            price in
            shekels${allcoins[counter].market_data.current_price.ils}₪
          </p>
        </div>
      </div>
    </div>
  </div>
  `);
}};

