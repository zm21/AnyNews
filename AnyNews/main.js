// Get the input field
var input = document.getElementById("searchInp");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchInp").click();
    // alert($('#searchInp').val());
    window.location.href = `searchResults\\searchResults.html?q=${$('#searchInp').val()}`
  }
});

function RandomNews()
{
  $('#WeatherBlock').slideUp(1500, 'swing');
  $('#SearchBlock').slideUp(1500, 'swing');
  $('#navBar').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
  setTimeout(function () {
    window.location.href = `random\\dice.html`;       
}, 1600);
  // $('#WeatherBlock').animate({ height: 'toggle', opacity: 'toggle' }, 1500);
  // $('#SearchBlock').animate({ height: 'toggle', opacity: 'toggle' }, 1500);
} 