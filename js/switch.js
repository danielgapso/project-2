let watchList=[];

const addToWatchList = (checkbox, id) => {
    if (checkbox.checked) {
      if (watchList.length < 5) {
        watchList.push(id);
      } else {
        $("#watchList").html("");
        watchList.forEach(coinId => {
          $("#watchList").append(`<li>${coinId}</li>`);
        });
        $("#watchListModal").modal("show");
        checkbox.checked = false;
      }
    } else {
      let index = watchList.indexOf(id);
      if (index > -1) {
        watchList.splice(index, 1);
      }
    }
  };
  
//
  $(document).ready(function(){
    $(search)
    $("#searchInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#container").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });