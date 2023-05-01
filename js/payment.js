"use strict"

const  selectSeanse = JSON.parse(localStorage.selectSeanse)
console.log(selectSeanse);

// We form a line with the selected places and calculate the total amount
let places = "";
let price = 0;

selectSeanse.salesPlaces.forEach((element) => {
  if (places != "") {places += ', '}
  places += `${element.row}/${element.place}`
  price += (element.type == "standart") ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip)
});

document.querySelector('.ticket__title').innerHTML = selectSeanse.filmName; // movie title
document.querySelector('.ticket__chairs').innerHTML = places; // chairs
document.querySelector('.ticket__hall').innerHTML = selectSeanse.hallName; // hall name
document.querySelector('.ticket__start').innerHTML = selectSeanse.seanceTime; // session start
document.querySelector('.ticket__cost').innerHTML = price; // price
console.log(document.querySelector('.acceptin-button'))

const newHallConfig = selectSeanse.hallConfig.replace(/selected/g, 'taken')

document.querySelector('.acceptin-button').addEventListener('click', (event) => {
  event.preventDefault();
  createRequest({
    url: "http://f0769682.xsph.ru/",
    params:  `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId
    }&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`,
    callback: (resp) => {}})
    
})

