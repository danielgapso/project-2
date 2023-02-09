//const coinUrl = "https://api.coingecko.com/api/v3/coins/list";

let allcoins = [];

$(async () => {
  $.get(coinUrl).done(function (data) {
    allcoins = data;
    getData();
  });
});

const getData = () => {
  $("#container").html("");
  for (let counter = 0; counter < 100; counter++) {
    $("#container").append(`
        <div class="Box">
          <div class="card" style="width: 18rem;">
             <div class="card-body">
               <h5 class="card-title">${allcoins[counter].symbol}</h5>
               <p class="card-text">${allcoins[counter].name}</p>
               <a href="#" class="btn btn-primary">more info</a>
             </div>
          </div>
    </div>
  `);
}};
