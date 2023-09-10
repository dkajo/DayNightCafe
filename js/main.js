import { getWeather } from "./api/weather.js";

const HAMBURGER_MENU = document.querySelector("a.icon");
const NAV_LINKS = document.querySelector("nav ul");
const CONTACT_SUBMIT_BTN = document.querySelector("#contact-submit");
const CONTACT_FORM = document.querySelector("#contact-form");
const BOOK_FORM = document.querySelector("#book-form");
const BOOK_FORM_SUBMIT = document.querySelector("#book-form input[type='submit']");
const BOOK_DATE = document.querySelector("#date");
const MAX_TEMP = document.querySelector("#max-temp");
const MIN_TEMP = document.querySelector("#min-temp");
const WEATHER_HEADING = document.querySelector("div.weather h3");
const WEATHER_ICON = document.querySelector("div.weather i");

const dateToday = getDateToday();

setAvailableDates();
displayWeather(dateToday);

HAMBURGER_MENU.addEventListener("click", toggleHamburgerMenu);

document.addEventListener("DOMContentLoaded", function () {
    if (CONTACT_FORM) {
        CONTACT_FORM.addEventListener("submit", contact);
    }
    if (BOOK_FORM) {
        BOOK_FORM.addEventListener("submit", bookRoom);
    }
    if (BOOK_DATE) {
        BOOK_DATE.addEventListener("change", () => displayWeather(BOOK_DATE.value))

    }
});


function getDateToday() {
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    let currentDate = `${year}-${month}-${day}`;
    return currentDate;
}

function toggleHamburgerMenu() {
    if (NAV_LINKS.style.display === "block") {
        NAV_LINKS.style.display = "none";
    } else {
        NAV_LINKS.style.display = "block";
    }
}

function contact(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let name = document.querySelector("#name").value;
    let message = document.querySelector("#message").value;
    console.log(email, name, message);
    CONTACT_SUBMIT_BTN.value = "Skickat!"
}

function bookRoom(event) {
    event.preventDefault();
    let date = document.querySelector("#date").value;
    let time = document.querySelector("#time").value;
    let room = document.querySelector("input[name='room']").value;
    let phone = document.querySelector("#phone").value;
    console.log(date, time, room, phone);
    BOOK_FORM_SUBMIT.value = "Bokat!";
}

function displayWeather(date) {
    getWeather(date).then(data => {
        if (WEATHER_HEADING) {
            WEATHER_HEADING.innerHTML = date;
        }

        if (MAX_TEMP && MIN_TEMP) {
            MAX_TEMP.innerHTML = data.daily.temperature_2m_max[0] + "°C";
            MIN_TEMP.innerHTML = data.daily.temperature_2m_min[0] + "°C";
        }


        if (WEATHER_ICON) {
            if (data.daily.weathercode[0] < 4) {
                WEATHER_ICON.className = "fa fa-sun-o";
            } else if (data.daily.weathercode[0] < 50) {
                WEATHER_ICON.className = "fa fa-cloud";
            } else {
                WEATHER_ICON.className = "fa fa-tint";
            }
        }

    });
}

function setAvailableDates() {
    let today = new Date();

    let maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    let formattedToday = today.toISOString().split('T')[0];
    let formattedMaxDate = maxDate.toISOString().split('T')[0];

    if (BOOK_DATE) {
        BOOK_DATE.setAttribute('min', formattedToday);
        BOOK_DATE.setAttribute('max', formattedMaxDate);
    }
}