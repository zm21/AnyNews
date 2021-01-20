const queryString = window.location.search;

const UrlParams = new URLSearchParams(queryString);

const q = UrlParams.get('q');

$('#searchInp').val(q);

const apiKey = "ae6c7ebbff944c378786b19b385c49d0";

var searchResults = [];

var pageNum = 1;

var SortBy = "relevancy";
var isDescSort = true;
// Get the input field
var input = document.getElementById("searchInp");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchInp").click();
    // alert($('#searchInp').val());
    window.location.href = `searchResults.html?q=${$('#searchInp').val()}`;
  }
});

LoadNews();


$('#dropDown').change(function(){
  var oldSort = SortBy;
  var oldOrder = isDescSort;
  SortType();
  if(oldSort!=SortBy || oldOrder!=isDescSort)
  {
    var pages = pageNum;
    pageNum = 1;
    $('#searchResults').empty();
    LoadNews(pageNum)
    for(var i = 1; i < pages; i++ )
    {
      NextPage();
    }
  }
});

function SortType() {
  SortBy = $('#dropDown').val();
  switch (SortBy) {
    case 'relevancy':
      SortBy = 'relevancy';
      isDescSort = true;
      break;
    case 'relAsc':
      SortBy = 'relevancy';
      isDescSort = false;
      break;
    case 'date':
      SortBy = 'date';
      isDescSort = true;
      break;
    case 'dateAsc':
      SortBy = 'date';
      isDescSort = false;
      break;
  }
}

function LoadNews(pageNum) {
  SortType();
  fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${q}&lang=en&sort_by=${SortBy}&page=${pageNum}&media=True`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "2084fb7481msh85bdc7125cc70a3p160aadjsn52966133cf3e",
      "x-rapidapi-host": "newscatcher.p.rapidapi.com"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json.articles);
      searchResults = json.articles;
      if (isDescSort) {
        for (var i = 0; i < searchResults.length; i++) {

          $('#searchResults').append(`<div class="row newsCard" onclick="OpenNews(${i})" style="background-image: url('${searchResults[i].media}');">
        <img class="col-sm-12 col-md-12 col-lg-4" src="${searchResults[i].media}" alt="">
        <div class="newsBlcok col-sm-12 col-md-12 col-lg-8">
            <div class="textBlock">
                <h3>${searchResults[i].title}</h3>
                <small class="text-muted">${searchResults[i].published_date}</small>
                <p>${searchResults[i].summary}</p>
            </div>
        </div>
    </div>`);

          //     $('#searchResults').append(`
          //     <div class="col-12 mt-3" onclick="OpenNews(${i})">
          //     <div class="card" style="background-image: url("${searchResults[i].media}");">
          //         <div class="card-horizontal" >
          //             <div class="img-square-wrapper">
          //                 <img class="" src="${searchResults[i].media}" style="height: 180px; width: 300px; border-top-left-radius: 3px" alt="Card image cap">
          //             </div>
          //             <div class="card-body">
          //                 <h4 class="card-title">${searchResults[i].title}</h4>
          //                 <p class="card-text">${searchResults[i].summary}</p>
          //             </div>
          //         </div>
          //         <div class="card-footer">
          //             <small class="text-muted">${searchResults[i].published_date}</small>
          //         </div>
          //     </div>
          // </div>`);

          //   $(`#searchResults`).append(` 
          //   <div class="card-block col-12 col-sm-6 col-md-4 col-lg-4" >
          //   <div class="card" style="height: 100%;">
          //   <img class="card-img-top" src="${searchResults[i].media}" alt="Card image cap">
          //   <div class="card-body">
          //     <h5 class="card-title">${searchResults[i].title}</h5>
          //     <p class="card-text">${searchResults[i].summary}</p>
          //   </div>
          //   <ul class="list-group list-group-flush">
          //     <li class="list-group-item">${searchResults[i].published_date}</li>
          //     <li class="list-group-item">Dapibus ac facilisis in</li>
          //     <li class="list-group-item">Vestibulum at eros</li>
          //   </ul>
          //   <div class="card-body">
          //     <a href="#" class="card-link">Card link</a>
          //     <a href="#" class="card-link">Another link</a>
          //     </div>
          //   </div>
          // </div>`);
        }
      }
      else {
        for (var i = searchResults.length-1; i >=0 ; i--) {

          $('#searchResults').append(`<div class="row newsCard" onclick="OpenNews(${i})" style="background-image: url('${searchResults[i].media}');">
        <img class="col-sm-12 col-md-12 col-lg-4" src="${searchResults[i].media}" alt="">
        <div class="newsBlcok col-sm-12 col-md-12 col-lg-8">
            <div class="textBlock">
                <h3>${searchResults[i].title}</h3>
                <small class="text-muted">${searchResults[i].published_date}</small>
                <p>${searchResults[i].summary}</p>
            </div>
        </div>
    </div>`);
        }
      }
    }
    )
    .catch(err => {
      console.log(err);
    });
}

function NextPage() {
  pageNum++;
  LoadNews(pageNum);
}

function OpenNews(index) {
    window.location.href = `newsPage/newspage.html?q=${q}&ind=${index}&page=${pageNum}&sort=${SortBy}&sortBy=${isDescSort}`;
}