const queryString = window.location.search;

const UrlParams = new URLSearchParams(queryString);

const q = UrlParams.get('q');

var index = UrlParams.get('ind');

const pageNum = UrlParams.get('page');

var SortBy = UrlParams.get('sort');

var isDescSort = UrlParams.get('sortBy');

$('#searchInp').val(q);

const apiKey = "ae6c7ebbff944c378786b19b385c49d0";

var searchResults = [];

if(SortBy==undefined)
{
    SortBy='relevancy';
}

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
        // var id = 1;
        var count = 0;
        var countToInsert = 0;
        for (var i = 0; i < searchResults.length; i++) {

            if (i != index && countToInsert < 3) {
                countToInsert++;
            }

            if (countToInsert == 3)
                break;
        }

        if (countToInsert != 0) {
            for (var i = 0; i < searchResults.length; i++) {

                if (i != index && count < 3) {
                    $('#newsRecBlock').append(`
        <div class="newsCard col-12 col-sm-12 col-md-12 col-lg-${12 / countToInsert}" onclick="OpenNews(${i})">
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
                    count++;
                    if (count == 3)
                        break;
                    
                }
            }
        }
        else
        {
            $('#RelNewsBlcok').remove();
            $('#hrNewsRel').remove();
        }

        if(!isDescSort && isDescSort!=null )
        {
            index = searchResults.length-1-index;
        }

        $("#newsImg").attr("src", searchResults[index].media);
        $('#title').text(searchResults[index].title);
        $('#date').text(searchResults[index].published_date);
        $('#summary').text(searchResults[index].summary);
        $('#source').append(`<a href="${searchResults[index].link}">${searchResults[index].clean_url}</a>`);
    }
    )
    .catch(err => {
        console.error(err);
    });

function OpenNews(index) {
    window.location.href = `newspage.html?q=${q}&ind=${index}&page=${pageNum}`;
}
