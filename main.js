'use strict';

let title = prompt("Как называется ваш проект?"),
  fullPrice;
const screens = prompt("Какие типы экранов нужно разработать?"),
  screenPrice = +prompt("Сколько будет стоить данная работа?"),
  rollback = 2,
  adaptive = confirm("Нужен ли адаптив на сайте?"),
  service1 = prompt("Доп. услуга 1"),
  servicePrice1 = +prompt("Стомость услуги 1"),
  service2 = prompt("Доп. услуга 2"),
  servicePrice2 = +prompt("Стомость услуги 2");

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
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

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
}

function getFullPrice(allServicePrices) {
  return screenPrice + allServicePrices;
}
fullPrice = getFullPrice(getAllServicePrices());

const getTittle = function () {
  title = title.trim().toLowerCase();
  const firstLetter = title[0].toUpperCase();
  return title = firstLetter + title.substring(1);
}

const getServicePercentPrices = function () {
  const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
  return servicePercentPrice;
}

getAllServicePrices();
getTittle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
console.log(screens.toLowerCase().split(", "));
console.log(getRollbackMassage(fullPrice));
console.log(getServicePercentPrices());