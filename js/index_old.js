"use strict"

const data = {};

document.addEventListener("DOMContentLoaded", ()=>{
  const dayLinks = Array.from(document.getElementsByClassName("page-nav__day"));
  const movieSeances = Array.from(document.getElementsByClassName("movie-seances__time"));
  // Вешаем событие onclixk на вкладки с датами
  dayLinks.forEach(dayLink => dayLink.addEventListener('click', (event)=> {
    event.preventDefault();
    document.getElementsByClassName("page-nav__day_chosen")[0].classList.toggle("page-nav__day_chosen");
    dayLink.classList.toggle("page-nav__day_chosen");

    let timeStampDay = Number(event.target.dataset.timeStamp);
    if (isNaN(timeStampDay)) {
      timeStampDay = Number(event.target.closest('.page-nav__day').dataset.timeStamp)
    }
    movieSeances.forEach(movieSeance => {
      const timeStampSeanceDay = Number(movieSeance.dataset.seanceStart) * 60;
      const timeStampSeance = timeStampDay + timeStampSeanceDay;
      const timeStampNow = Math.trunc(+new Date() / 1000);
      movieSeance.dataset.seanceTimeStamp = timeStampSeance;
      if ((timeStampSeance - timeStampNow) > 0) { // Если сеанс еще не начался
        movieSeance.classList.remove('acceptin-button-disabled');
      } else {
        movieSeance.classList.add('acceptin-button-disabled');
      }
    })
  }))
 });
  
 createRequest({
  url: "https://f0769682.xsph.ru/",
  params:  "event=update",
  callback: (resp) => {
    data.seances = resp.seances.result; // Получение списка  сеансов
    data.films = resp.films.result; // Получение списка фильмов
    data.halls = resp.halls.result; // Получение списка залов
      data.halls = data.halls.filter(hall => hall.hall_open == 1)
    console.log(data);
    
    // Отрисовка контента
    const main = document.querySelector("main")
    data.films.forEach((film) => {
      let seancesHTML = '';
      const filmId = film.film_id;
      data.halls.forEach((hall) => {
        const seances = data.seances.filter(seance => ((seance.seance_hallid == hall.hall_id) && (seance.seance_filmid == filmId)))
        if (seances.length > 0) {
          seancesHTML += `
            <div class="movie-seances__hall">
              <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
              <ul class="movie-seances__list">`
          seances.forEach(seance => seancesHTML += `<li class="movie-seances__time-block"><a class="movie-seances__time"   href="hall.html" data-film-name="${film.film_name}" data-film-id="${film.film_id}" data-hall-id="${hall.hall_id}" data-hall-name="${hall.hall_name}" data-price-vip="${hall.hall_price_vip}" data-price-standart="${hall.hall_price_standart}" data-seance-id="${seance.seance_id}" 
          data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}">${seance.seance_time}</a></li>`)
          seancesHTML += `
              </ul>
            </div>`
        }
      })
      if (seancesHTML) {
        main.innerHTML += `
          <section class="movie">
            <div class="movie__info">
              <div class="movie__poster">
                <img class="movie__poster-image" alt="Звёздные войны постер" src="${film.film_poster}">
              </div>
              <div class="movie__description">
                <h2 class="movie__title">${film.film_name}</h2>
                <p class="movie__synopsis">${film.film_description}</p>
                <p class="movie__data">
                  <span class="movie__data-duration">${film.film_duration} мин.</span>
                  <span class="movie__data-origin">${film.film_origin}</span>
                </p>
              </div>
            </div>
            ${seancesHTML}
          </section>
            `
      }
    })
    


const dayLinks = Array.from(document.getElementsByClassName("page-nav__day"));
const movieSeances = Array.from(document.getElementsByClassName("movie-seances__time"));
// Вешаем событие onclixk на вкладки с датами
dayLinks.forEach(dayLink => dayLink.addEventListener('click', (event)=> {
  event.preventDefault();
  document.getElementsByClassName("page-nav__day_chosen")[0].classList.toggle("page-nav__day_chosen");
  dayLink.classList.toggle("page-nav__day_chosen");

  let timeStampDay = Number(event.target.dataset.timeStamp);
  if (isNaN(timeStampDay)) {
    timeStampDay = Number(event.target.closest('.page-nav__day').dataset.timeStamp)
  }
  movieSeances.forEach(movieSeance => {
    const timeStampSeanceDay = Number(movieSeance.dataset.seanceStart) * 60;
    const timeStampSeance = timeStampDay + timeStampSeanceDay;
    const timeStampNow = Math.trunc(+new Date() / 1000);
    movieSeance.dataset.seanceTimeStamp = timeStampSeance;
    if ((timeStampSeance - timeStampNow) > 0) { // Если сеанс еще не начался
      movieSeance.classList.remove('acceptin-button-disabled');
    } else {
      movieSeance.classList.add('acceptin-button-disabled');
    }
  })
}))
dayLinks[0].click();

movieSeances.forEach(movieSeance => movieSeance.addEventListener('click', (event)=>{
    //event.preventDefault();
    const selectSeanse = event.target.dataset;
    selectSeanse.hallConfig = data.halls.filter(hall => hall.hall_id == selectSeanse.hallId)[0].hall_config/*.replace(/conf-step/g, 'buying-scheme')*/
    localStorage.clear();
    localStorage.setItem('selectSeanse', JSON.stringify(selectSeanse))
  })
)
  }     
});





  movieSeances.forEach(movieSeance => movieSeance.addEventListener('click', (event)=>{
      const seanceId = event.target.dataset.seanceId;
      const seanceTimeStamp = event.target.dataset.seanceTimeStamp;
      event.preventDefault();
      const params = `seanceId=${seanceId}&seanceTimeStamp=${seanceTimeStamp}`
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://f0769682.xsph.ru/", true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(params);
      xhr.onreadystatechange =  () => {
        if((xhr.readyState === 4) && (xhr.status === 200)) {
          console.log(xhr.responseText);
          const link = document.createElement('a');
          link.href = "/client/hall.php";
          link.click();
        }
      }
    })
  )

  const loaderImg = document.getElementById("loader");
  const items = document.getElementById("items");
  
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://f0769682.xsph.ru/');
  xhr.send();
  xhr.onreadystatechange = function () {
      if((xhr.readyState === 4) && (xhr.status === 200)) {
          let output = '';
          let data = JSON.parse(xhr.responseText).response.Valute;
          for (let key in data) {
              output += "<div class=\"item\"> <div class=\"item__code\">" + data[key].CharCode + "</div>" + "<div class=\"item__value\">" + data[key].Value + "</div>" + "<div class=\"item__currency\"> руб. </div> </div>"
          }
          loaderImg.classList.remove("loader_active");
          items.innerHTML = output;
      }
    };


