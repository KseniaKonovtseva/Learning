let title = "Project",
  screens = "Простые, Сложные, Интерактивные",
  screenPrice = 7000,
  rollback = 2,
  fullPrice = 500000,
  adaptive = true;

alert("text");
console.log("text1");
console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " септимов");
console.log("Стоимость разработки сайта " + fullPrice + " септимов");
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));