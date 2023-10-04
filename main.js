const title = prompt("Как называется ваш проект?"),
  screens = prompt("Какие типы экранов нужно разработать?"),
  screenPrice = +prompt("Сколько будет стоить данная работа?"),
  rollback = 2,
  adaptive = confirm("Нужен ли адаптив на сайте?"),
  service1 = prompt("Доп. услуга 1"),
  servicePrice1 = +prompt("Стомость услуги 1"),
  service2 = prompt("Доп. услуга 2"),
  servicePrice2 = +prompt("Стомость услуги 2"),
  fullPrice = screenPrice + servicePrice1 + servicePrice2,
  servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));

alert("text");
console.log("text1");
console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " септимов");
console.log("Стоимость разработки сайта " + fullPrice + " септимов");
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));
console.log(servicePercentPrice);

switch (true) {
  case fullPrice >= 30000:
    salePrice = Math.ceil(fullPrice - (fullPrice * (10 / 100)));
    console.log("Даем скидку в 10%");
    break
  case fullPrice >= 15000 && fullPrice < 30000:
    salePrice = Math.ceil(fullPrice - (fullPrice * (5 / 100)));
    console.log("Даем скидку в 5%");
    break
  case fullPrice >= 0 && fullPrice < 15000:
    console.log("Скидка не предусмотрена");
    break
  case fullPrice < 0:
    console.log("Что-то пошло не так");
    break
}