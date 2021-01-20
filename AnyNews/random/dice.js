var cube = document.getElementById('cube');

var min = 1;
var max = 24;

// cube.onclick = function() 
{
    var xRand = getRandom(max, min);
    var yRand = getRandom(max, min);

    cube.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
    cube.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
    setTimeout(GenerateWordAndNews, 5000);

}

function getRandom(max, min) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
}

function GenerateWordAndNews() {
    fetch("https://random-words-with-pronunciation.p.rapidapi.com/word", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3018524ef3mshd6b78606accbf95p199be5jsn2319e948b6d1",
            "x-rapidapi-host": "random-words-with-pronunciation.p.rapidapi.com"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(json => { 
            var q = json[0].word;
            fetch(`https://newscatcher.p.rapidapi.com/v1/search?q=${q}&lang=en&sort_by=relevancy&page=${1}&media=True`, {
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
                    if (json.articles==undefined||json.articles.length == 0)
                        GenerateWordAndNews();
                    else
                        window.location.href = `../searchResults/newsPage/newspage.html?q=${q}&ind=${0}&page=${1}`;
                })
                .catch(err => {
                    console.error(err);
                });


        })
        .catch(err => {
            console.error(err);
        });

}