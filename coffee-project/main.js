"use strict";

const redraw = () => {
  document.getElementById('coffee-container').style.display = 'none';
  document.getElementById('coffee-container').style.display = 'flex';
};

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

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
let coffees = [
  {id: 1, name: 'Light City', roast: 'light'},
  {id: 2, name: 'Half City', roast: 'light'},
  {id: 3, name: 'Cinnamon', roast: 'light'},
  {id: 4, name: 'City', roast: 'medium'},
  {id: 5, name: 'American', roast: 'medium'},
  {id: 6, name: 'Breakfast', roast: 'medium'},
  {id: 7, name: 'High', roast: 'dark'},
  {id: 8, name: 'Continental', roast: 'dark'},
  {id: 9, name: 'New Orleans', roast: 'dark'},
  {id: 10, name: 'European', roast: 'dark'},
  {id: 11, name: 'Espresso', roast: 'dark'},
  {id: 12, name: 'Viennese', roast: 'dark'},
  {id: 13, name: 'Italian', roast: 'dark'},
  {id: 14, name: 'French', roast: 'dark'},
];

let search = document.getElementById('search');
let coffeeBody = document.querySelector('#coffees');
let submitButton = document.querySelector('#submit');
let roastSelection = document.querySelector('#roast-selection');

coffeeBody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

const containsString = (str) => {
    let newArr = [];
  coffees.forEach(function(e,i) {
    if(e.name.toLowerCase().includes(str.toLowerCase()) || e.roast.includes(str.toLowerCase())) {
      console.log('str: ' + str);
      console.log('e.name: ' + e.name);
      console.log('e.roast: ' + e.roast);
      console.log('===================');
      newArr.push(e);
    }
  });
  console.log(newArr);
  coffeeBody.innerHTML = renderCoffees(newArr);
};

search.addEventListener('input', function() {
  containsString(this.value);
});
