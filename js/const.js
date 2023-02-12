const coinUrl = "https://api.coingecko.com/api/v3/coins/list";
const infoUrl = "https://api.coingecko.com/api/v3/coins/{id}";

let allCoins = [];

$(document).ready(function () {
  $.get(coinUrl).done(function (data) {
    allCoins = data;
    getData();
  });
});

const getCoinInfo = id => {
  const url = infoUrl.replace("{id}", id);
  $("#coinInfo-" + id).html("");
  $("#loadingGif").css("display", "block");

  if ("caches" in window) {
    caches.match(url).then(response => {

      if (response) {
        response.json().then(json => {
          let dateCached = new Date(response.headers.get("date"));
          let now = new Date();
          let differenceInMinutes = (now - dateCached) / 1000 / 60;

          if (differenceInMinutes < 2) {
            data = json;
            $("#loadingGif").css("display", "none");
            printinfo(id, json);

          } else {
            $.get(url, data => {
              caches.open("coinData").then(cache => {
                cache.put(url, new Response(JSON.stringify(data), {
                  headers: {
                    "Date": new Date().toUTCString()
                  }
                }));
                $("#loadingGif").css("display", "none");
                printinfo(id, data);
              });
            });
          }
        });

      } else {
        $.get(url, data => {
          caches.open("coinData").then(cache => {
            cache.put(url, new Response(JSON.stringify(data), {
              headers: {
                "Date": new Date().toUTCString()
              }
            }));
            $("#loadingGif").css("display", "none");
            printinfo(id, data);
          });
        });
      }
    });

  } else {
    $.get(url, data => {
      $("#loadingGif").css("display", "none");
      printinfo(id, data);
    });
  }
};
