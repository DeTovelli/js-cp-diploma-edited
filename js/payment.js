"use strict"

const  selectSeanse = JSON.parse(localStorage.selectSeanse)
console.log(selectSeanse);

// Формируем строку с выбранными местами и счетаем общую сумму
let places = "";
let price = 0;

selectSeanse.salesPlaces.forEach((element) => {
  if (places != "") {places += ', '}
  places += `${element.row}/${element.place}`
  price += (element.type == "standart") ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip)
});

document.querySelector('.ticket__title').innerHTML = selectSeanse.filmName; // название фильма
document.querySelector('.ticket__chairs').innerHTML = places; // места
document.querySelector('.ticket__hall').innerHTML = selectSeanse.hallName; // название зала
document.querySelector('.ticket__start').innerHTML = selectSeanse.seanceTime; // начало сеанса
document.querySelector('.ticket__cost').innerHTML = price; // цена
console.log(document.querySelector('.acceptin-button'))

const newHallConfig = selectSeanse.hallConfig.replace(/selected/g, 'taken')

document.querySelector('.acceptin-button').addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.clear();
  createRequest({
    url: "http://f0769682.xsph.ru/",
    params:  `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId
    }&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`,
    callback: (resp) => {}})
    
})

