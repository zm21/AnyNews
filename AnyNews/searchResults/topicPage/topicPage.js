const queryString = window.location.search;

const UrlParams = new URLSearchParams(queryString);

const q = UrlParams.get('q');

switch(q){
    case 'Sport':
        $('#liSport').addClass('active');
        break;
    case 'Tech':
        $('#liTech').addClass('active');
        break;   
    case 'Business':
        $('#liBusiness').addClass('active');
        break;
    case 'Entertainment':
        $('#liEntertainment').addClass('active');
        break;   
    case 'COVID-19':
        $('#liCOVID19').addClass('active');
        $('#loadMore').remove();
        break; 
    default:
        $('#ulTopcis').append(`
        <li class="nav-item active">
            <a class="nav-link" href="topicPage.html?q=${q}">${q}</a>
        </li>`);
        $('#loadMore').remove();
        break; 
}

var searchResults = [];

// var loadedNews = [];

var pageNum = 1;
var isLongNext = true;
var shortCounter = 0;
var longCounter = 1;
var isStart = true;


loadNews();
loadNews();

function loadNews(pageNum)
{
    fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${q}&lang=en&sort_by=relevancy&page=${pageNum}&media=True`, {
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
      for (var i = 0; i < searchResults.length; i++) {
            if(isLongNext==true)
            {
                $('#newsBlock').append(`
                <div class="newsCard col-12 col-sm-12 col-md-12 col-lg-8" onclick="OpenNews(${i})">
                <a class="butFrame " href="#" style="background:url(${searchResults[i].media})">
                    <div class="butTextWrap">
                      <div class="butHeading">${searchResults[i].title}
                        <br/>
                        <div class="butText">
                        
                        </div>
                      </div>
                      <p>Read More...</p>
                    </div>
                </a>
            </div>`);
            longCounter++;
            if(longCounter==2)
            {
                isLongNext=false;
                longCounter=0;
            }
            }
            else{
                $('#newsBlock').append(`
                <div class="newsCard col-12 col-sm-12 col-md-12 col-lg-4" onclick="OpenNews(${i})">
                <a class="butFrame " href="#" style="background:url(${searchResults[i].media})">
                    <div class="butTextWrap">
                      <div class="butHeading">${searchResults[i].title}
                        <br/>
                        <div class="butText">
                        </div>
                      </div>
                      <p>Read More...</p>
                    </div>
                </a>
            </div>`);
            shortCounter++;
            if(shortCounter==2)
            {
                isLongNext=true;
                shortCounter=0;
            }
        }
      }
    }
      )
    .catch(err => {
        console.error(err);
    });
}

function NextPage()
{
    pageNum++;
    loadNews(pageNum);
}

function OpenNews(index)
{
  window.location.href = `../newsPage/newspage.html?q=${q}&ind=${index}&page=${pageNum}`;
}







// if(pageNum%2!=0 && searchResults.length>0)
//         {
//             $('#newsBlock').append(`
//                 <div class="newsCard col-12 col-sm-8" onclick="OpenNews(${i})">
//                 <a class="butFrame " href="#" style="background:url(${searchResults[0].media})">
//                     <div class="butTextWrap">
//                       <div class="butHeading">${searchResults[0].title}
//                         <br/>
//                         <div class="butText">
                        
//                         </div>
//                       </div>
//                       <p>Read More...</p>
//                     </div>
//                 </a>
//             </div>`);
//         }

//         for (var i = 1; i < searchResults.length; i++) {
//             if(i==1)
//         }
//       for (var i = 0; i < searchResults.length; i++) {
//             if((isLong1 || isLong2) && !(isLong1 && isLong2))
//             {
//                 $('#newsBlock').append(`
//                 <div class="newsCard col-12 col-sm-8" onclick="OpenNews(${i})">
//                 <a class="butFrame " href="#" style="background:url(${searchResults[i].media})">
//                     <div class="butTextWrap">
//                       <div class="butHeading">${searchResults[i].title}
//                         <br/>
//                         <div class="butText">
                        
//                         </div>
//                       </div>
//                       <p>Read More...</p>
//                     </div>
//                 </a>
//             </div>`);
//             if(isLong1)
//                 isLong2=true;
//             // longCounter++;
//             // if(longCounter==2)
//             // {
//             //     isLongNext=false;
//             //     longCounter=0;
//             // }
//             // else if (isStart)
//             // {
//             //     isLongNext=false;
//             //     longCounter=0;
//             // }
//             }
//             else{
//                 $('#newsBlock').append(`
//                 <div class="newsCard col-12 col-sm-4" onclick="OpenNews(${i})">
//                 <a class="butFrame " href="#" style="background:url(${searchResults[i].media})">
//                     <div class="butTextWrap">
//                       <div class="butHeading">${searchResults[i].title}
//                         <br/>
//                         <div class="butText">
//                         </div>
//                       </div>
//                       <p>Read More...</p>
//                     </div>
//                 </a>
//             </div>`);
//             if(isLong1)
//                 isLong1=false;
//             else if(isLong2)
//                 isLong2=false;
//             // shortCounter++;
//             // if(shortCounter==2)
//             // {
//             //     isLongNext=true;
//             //     shortCounter=0;
//             // }
//         }
//       }
//     }