'use strict';

const title = document.getElementsByTagName('h1')[0];
const btns = document.getElementsByClassName('handler_btn');
const addBtn = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const rangeInput = document.querySelector('.rollback [type = "range"]');
const rangeValue = document.querySelector('.rollback .range-value');
const totalInputs = document.getElementsByClassName('total-input');
let screens = document.querySelectorAll('.screen');
console.log(screens);

Array.from(totalInputs).forEach(function (el) {
  console.log(el);
  return el;
});

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== null && num !== "";
  },
  isString: function(string) {
    return !isFinite(string) && string !== null && string !== "";
  },
  asking: function() {
    do {
      appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки").trim();
    } while (!appData.isString(appData.title));
    

    for (let i = 0; i < 2; i++) {
      let price = 0;
      let name;

      do {
        name = prompt("Какие типы экранов нужно разработать?").trim();
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько будет стоить данная работа?", 15000);
      } while (!appData.isNumber(price));
      price = +(price.trim());

      appData.screens.push({id: i, name: name, price: price});
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      do {
        name = prompt("Доп. услуга").trim();
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));
      appData.services[name + i] = +(price.trim());
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, screen) {
      return sum + screen.price;
    }, 0)

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice: function() {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getTittle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
  },
  getServicePercentPrice: function () {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
  },
  getRollbackMassage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },
  start: function() {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTittle();
    appData.logger();
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);

    // for (let key in appData.services) {
    //   console.log("Ключ: " + key + " Значение: " + appData.services[key]);
    // }

    // for (let key in appData) {
    //   console.log("Ключ: " + key + " Значение: " + appData[key]);
    // }
  }
}

// appData.start();