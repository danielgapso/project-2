let watchList = [];

const addToWatchList = (checkbox, id) => {
  const modalCheckbox = document.querySelector(`#coin-${id}`);
  if (checkbox.checked) {
    if (watchList.length < 5) {
      watchList.push({ id: id, name: id });
    } else {
      $("#watchList").html("");
      watchList.forEach((coinId) => {
        const isChecked = watchList.some((coin) => coin.id === coinId.id);
        $("#watchList").append(`
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="coin-${coinId.id}" data-id="${coinId.id}" ${isChecked ? "checked" : ""}>
            <label class="form-check-label" for="coin-${coinId.id}">${coinId.id}</label>
          </div>
        `);
      });
      $("#watchListModal").modal("show");
      checkbox.checked = false;

      $("#watchListModal input[type='checkbox']").on("change", function() {
        const id = $(this).data("id");
        if (this.checked) {
          watchList.push({ id: id, name: id });
        } else {
          let index = watchList.findIndex((coin) => coin.id === id);
          if (index > -1) {
            watchList.splice(index, 1);
          }
        }
        console.log(watchList);
        showWatched(watchList);
      });
    }
  } else {
    let index = watchList.findIndex((coin) => coin.id === id);
    if (index > -1) {
      watchList.splice(index, 1);
    }
  }
  if (modalCheckbox) {
    modalCheckbox.checked = checkbox.checked;
  }
  console.log(watchList);
  showWatched(watchList); 
};

const showWatched = (watchList = []) => {
  $("#chartsContinter").html("");
  watchList.forEach((coin) => {
    const html = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${coin.id}</h5>
          <p class="card-text">${coin.name}</p>
          <a href="#" class="btn btn-primary">Go to ${coin.id} chart</a>
        </div>
      </div>
    `;
    $("#chartsContinter").append(html);
  });
};

const search = () => {
  const searchValue = $('input[name="search"]').val();//get the search field value
  if (searchValue === '') {
    window.location.href = '/'; // reload the page to return to the home screen
    return; // exit the function
  }
  const filteredCoins = allCoins.filter(coin => {//filter the array by the searched value
     return coin.symbol === searchValue;
  });
  $("#container").html("");//reset the container div
  filteredCoins.forEach(coin => {//check each coin if the value matches the search
    //show the card or cards by the search
    $("#container").append(`
    <div class="Box" id="box-${coin.id}">
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <div class="form-check form-switch" id="addSwitch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
        onclick="addToWatchList(this, '${coin.id}')">
        </div>
        <h5 class="card-title">${coin.symbol}</h5>
        <p class="card-text">${coin.id}</p>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" 
        data-bs-target="#collapseExample-${coin.id}"
        onclick="getCoinInfo('${coin.id}', '#collapseExample-${coin.id}')" 
        aria-expanded="false"
        aria-controls="collapseExample-${coin.id}">
          more info
        </button>
        <div class="collapse" id="collapseExample-${coin.id}">
          <div class="card card-body">
            <div id="coinInfo-${coin.id}"></div>
          </div>
        </div>
      </div>
  `);
  });
  $('input[name="search"]').val("");
};


  