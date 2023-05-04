"use strict"

const  selectSeanse = JSON.parse(localStorage.selectSeanse)
console.log(selectSeanse)

document.addEventListener("DOMContentLoaded", ()=>{
  const buttonAcceptin = document.querySelector('.acceptin-button'); // Кнопка "Бронировать"

document.querySelector('.buying__info-title').innerHTML = selectSeanse.filmName;
document.querySelector('.buying__info-start').innerHTML = `Начало сеанса ${selectSeanse.seanceTime}`;
document.querySelector('.buying__info-hall').innerHTML = selectSeanse.hallName;
document.querySelector('.price-standart').innerHTML = selectSeanse.priceStandart;
console.log(`event=get_hallConfig&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}`)
createRequest({
  url: "http://f0769682.xsph.ru/",
  params:  `event=get_hallConfig&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}`,
  callback: (resp) => {
    console.log(resp);
    if (resp) {
      selectSeanse.hallConfig = resp
    }
    document.querySelector('.conf-step__wrapper').innerHTML = selectSeanse.hallConfig;
    const chairs = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair')); // Все кресла
  let chairsSelected = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected')); // Выбранные кресла
  if (chairsSelected.length) {
    buttonAcceptin.removeAttribute("disabled");
  } else {
    buttonAcceptin.setAttribute("disabled", true);
  }

  // We hang the onclick event on the chairs
  chairs.forEach(chair => chair.addEventListener('click', (event) => {
    if (event.target.classList.contains('conf-step__chair_taken')) {return}; // Прерываем выполнение если клик был по забронированному месту
    event.target.classList.toggle('conf-step__chair_selected');
    chairsSelected = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected'));
    if (chairsSelected.length) {
      buttonAcceptin.removeAttribute("disabled");
    } else {
      buttonAcceptin.setAttribute("disabled", true);
    }    
  }));
  }})
  
  // We hang the onclick event on the button
  buttonAcceptin.addEventListener("click", (event) => {
    event.preventDefault();
    // We form a list of selected places
    const selectedPlaces = Array();
    const divRows = Array.from(document.getElementsByClassName("conf-step__row"));
    for (let i=0; i < divRows.length; i++) {
      const spanPlaces = Array.from(divRows[i].getElementsByClassName("conf-step__chair"));
      for (let j=0; j < spanPlaces.length; j++) {
        if (spanPlaces[j].classList.contains("conf-step__chair_selected")) {
          // Determine the type of chair chosen
          const typePlace = (spanPlaces[j].classList.contains("conf-step__chair_standart")) ? "standart" : "vip"
          selectedPlaces.push({
            "row": i+1,
            "place": j+1,
            "type":  typePlace
          })
        }
      }
    }
    // Change the selected seats to occupied and save the new configuration
    const configurationHall = document.querySelector('.conf-step__wrapper').innerHTML;
    // Forming and sending a request
    selectSeanse.hallConfig = configurationHall;
    selectSeanse.salesPlaces = selectedPlaces;
    localStorage.clear();
    localStorage.setItem('selectSeanse', JSON.stringify(selectSeanse))
    const link = document.createElement('a');
    link.href = "payment.html";
    link.click();
  })


});