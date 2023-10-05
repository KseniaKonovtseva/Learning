'use strict';

let title,
  screens,
  screenPrice,
  adaptive,
  rollback = 2,
  allServicePrices,
  fullPrice,
  servicePercentPrice,
  service1,
  service1Price,
  service2,
  service2Price;

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num !== null && num !== "";
}

const asking = function() {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?", 15000);
  } while (!isNumber(screenPrice))
  screenPrice = +(screenPrice.replace(/\s/g, ''));
  adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt("Доп. услуга 1");

      do {
        service1Price = prompt("Сколько это будет стоить?");
      } while (!isNumber(service1Price));

      service1Price = +(service1Price.replace(/\s/g, ''));

    } else if (i === 1) {
      service2 = prompt("Доп. услуга 2");

      do {
        service2Price = prompt("Сколько это будет стоить?");
      } while (!isNumber(service2Price));
      
      service2Price = +(service2Price.replace(/\s/g, ''));
    }

    sum = service1Price + service2Price;
  }
  return sum;
}

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
}

function getFullPrice() {
  return screenPrice + allServicePrices;
}

const getTittle = function () {
  return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
}

const getServicePercentPrice = function () {
  return Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
}

const getRollbackMassage = function (price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так";
  }
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTittle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMassage(fullPrice));
console.log(getServicePercentPrice());