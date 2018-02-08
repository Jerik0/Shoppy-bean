"use strict";

let search = document.getElementById('search');
let coffeeBody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');
let addRoastSelection = document.querySelector('#add-roast-selection');

const ajaxGet = (url, callback) => {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    let data;
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // console.log('response text: ' + xmlhttp.responseText);
      try {
        data = JSON.parse(xmlhttp.responseText);
      } catch(err) {
        console.log(err.message + " in " + xmlhttp.responseText);
      }
      callback(data);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

let coffees = [];

ajaxGet('../coffee-data.json', function(data) {
  coffees = data;

  const renderCoffee = (coffee) => {
    let html = '<div class="coffee">';
    html += '<h2>' + coffee.name + '</h2>';
    html += '<p>(' + coffee.roast + ')</p>';
    html += '</div>';
    redraw();
    return html;
  };

  const renderCoffees = (coffees) => {
    let html = '';
    for(let i = 0; i <= coffees.length -1; i++) {
      html += renderCoffee(coffees[i]);
    }
    return html;
  };

  const updateCoffees = (e) => {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    coffees.forEach(function(coffee) {
      if (coffee.roast === selectedRoast) {
        filteredCoffees.push(coffee);
      }
    });
    coffeeBody.innerHTML = renderCoffees(filteredCoffees);
  };

  coffeeBody.innerHTML = renderCoffees(coffees);

  // submitButton.addEventListener('click', updateCoffees);

  const containsString = (str) => {
    let newArr = [];
    coffees.forEach(function(coffee,i) {
      if(coffee.name.toLowerCase().includes(str.toLowerCase()) || coffee.roast.includes(str.toLowerCase())) {
        newArr.push(coffee);
      }
    });
    coffeeBody.innerHTML = renderCoffees(newArr);
  };

  search.addEventListener('input', function() {
    containsString(this.value);
  });
});

const redraw = () => {
  document.getElementById('coffee-container').style.display = 'none';
  document.getElementById('coffee-container').style.display = 'flex';
};