"use strict";

let search = document.getElementById('search');
let coffeeBody = document.querySelector('#coffees');
let roastSelection = document.querySelector('#roast-selection');
let addRoastSelection = document.querySelector('#add-roast-selection');
let addSubmitBtn = document.querySelector('#add-coffee-submit');
// const fetch = require('node-fetch');

const ajaxGet = (url, callback) => {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    let data;
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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
      } else if(selectedRoast === 'all') {
        filteredCoffees = coffees;
      }
    });
    coffeeBody.innerHTML = renderCoffees(filteredCoffees);
  };

  coffeeBody.innerHTML = renderCoffees(coffees);

  roastSelection.addEventListener('input', updateCoffees);

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

  const addCoffee = (coffee, roast, coffeesArr) => {
    const id = (coffeesArr[coffeesArr.length -1].id + 1);
    const newCoffee = {id: id, name: coffee, roast: roast} + ',';
    const url = '../coffee-data.json';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCoffee),
    };
    fetch(url, options)
        .then(/* post was created successfully */)
        .catch(/* handle errors */);
  };

  addSubmitBtn.addEventListener('click', function() {
    addCoffee(this.value, addRoastSelection.value);
  });
});

const redraw = () => {
  document.getElementById('coffee-container').style.display = 'none';
  document.getElementById('coffee-container').style.display = 'flex';
};
