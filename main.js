'use strict';

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service1Price: 0,
  service2: "",
  service2Price: 0,
  isNumber: function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== null && num !== "";
  },
  asking: function() {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
  
    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?", 15000);
    } while (!appData.isNumber(appData.screenPrice))
    appData.screenPrice = +(appData.screenPrice.replace(/\s/g, ''));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

      if (i === 0) {
        appData.service1 = prompt("Доп. услуга 1");

        do {
          appData.service1Price = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(appData.service1Price));

        appData.service1Price = +(appData.service1Price.replace(/\s/g, ''));

      } else if (i === 1) {
        appData.service2 = prompt("Доп. услуга 2");

        do {
          appData.service2Price = prompt("Сколько это будет стоить?");
        } while (!appData.isNumber(appData.service2Price));
        
        appData.service2Price = +(appData.service2Price.replace(/\s/g, ''));
      }

      sum = appData.service1Price + appData.service2Price;
    }
    return sum;
  },
  getFullPrice: function() {
    return appData.screenPrice + appData.allServicePrices;
  },
  getTittle: function () {
    return appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
  },
  getServicePercentPrice: function () {
    return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
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
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrice();
    appData.title = appData.getTittle();
    appData.logger();
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);

    for (let key in appData) {
      console.log("Ключ: " + key + " Значение: " + appData[key]);
    }
  }
}

appData.start();