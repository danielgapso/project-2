const coinUrl = "https://api.coingecko.com/api/v3/coins/list";
const infoUrl = "https://api.coingecko.com/api/v3/coins/{id}";

let allCoins = [];
let allCoinsInfo = [];

$(document).ready(function () {
  $.get(coinUrl).done(function (data) {
    allCoins = data;
    getData();
  });
});


const getCoinInfo = (id) => {
    const url = infoUrl.replace("{id}", id);
    $("#coinInfo-" + id).html("");
    $("#loadingGif").css("display", "block");
    $.get(url, function (data) {
      allCoinsInfo = data;
      $("#loadingGif").css("display", "none");
      printinfo(id, data);
    });
  };
  