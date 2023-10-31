'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPersent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const cmsBtn = document.querySelector('#cms-open');
const hiddenCMS = document.querySelector('.hidden-cms-variants');
const hiddenInput = hiddenCMS.querySelector('.main-controls__input');
const cmsSelect = document.querySelector('#cms-select');
const cmsOtherInput = hiddenCMS.querySelector('#cms-other-input');

const inputRange = document.querySelector('.rollback input');
let inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  cms: 1,
  init: function () {
    this.addTitle()
    startBtn.addEventListener('click', this.start)
    buttonPlus.addEventListener('click', this.addScreenBlock)
    screens.forEach((el) => {
      el.addEventListener('input', () => {
        const select = el.querySelector('select');
        const input = el.querySelector('input');
  
        if (select.value === "" || input.value === "") {
          startBtn.disabled = true;
          startBtn.style.backgroundColor = 'grey';
        } else {
          startBtn.disabled = false;
          startBtn.style.backgroundColor = '#A52A2A';
        }
      })
    })
    inputRange.addEventListener('input', this.getRollback)
    inputRange.addEventListener('input', this.addPrices)
    inputRange.addEventListener('input', this.showResult)
    resetBtn.addEventListener('click', this.reset)
    cmsBtn.addEventListener('click', this.addCMS)
    cmsSelect.addEventListener('input', this.cmsOther)
    cmsOtherInput.addEventListener('input', this.cmsOther)
  },
  start: function () {
    appData.cmsOther();
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.block();
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  getRollback: function () {
    inputRangeValue.textContent = inputRange.value + '%';
    appData.rollback = inputRange.value;
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.screensCount;
  },
  addScreens: function () {
    let screens = document.querySelectorAll('.screen');

    screens.forEach((screen,index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const count = +input.value;

      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({id: index, name: selectName, price: +select.value * +input.value, count: count});
    })
  },
  addServices: function () {
    otherItemsPersent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    })
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  addCMS: function () {
    if (cmsBtn.checked) {
      hiddenCMS.style.display = "flex";
    } else {
      hiddenCMS.style.display = "none";
    }
  },
  cmsOther: function () {
    if (cmsSelect.value === "other") {
      hiddenInput.style.display = "block";
      this.cms = +cmsOtherInput.value;
    } else if (cmsSelect.value === "") {
      this.cms = 1;
      hiddenInput.style.display = "none";
    } else {
      this.cms = +cmsSelect.value;
      hiddenInput.style.display = "none";
    }
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((sum, screen) => {
      return sum + screen.price;
    }, 0)

    appData.screensCount = appData.screens.reduce((sum, screen) => {
      return sum + screen.count;
    }, 0)

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.fullPrice = appData.fullPrice + Math.ceil((appData.fullPrice / 100) * appData.cms);

    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
  },
  block: function () {
    let screens = document.querySelectorAll('.screen');

    screens.forEach((el) => {
      const select = el.querySelector('select');
      const input = el.querySelector('input');

      select.disabled = true;
      input.disabled = true;

      startBtn.style.display = "none";
      resetBtn.style.display = "inline-block";
    })
  },
  reset: function () {
    startBtn.style.display = "inline-block";
    resetBtn.style.display = "none";

    let screens = document.querySelectorAll('.screen');

    let i = screens.length;
    while (i > 1) {
      i--;
      screens[i].remove();
    }

    document.querySelector('select').value = "";
    document.querySelector('select').disabled = false;
    document.querySelector('input[type=text]').value = "";
    document.querySelector('input[type=text]').disabled = false;
    
    total.value = "0";
    totalCountOther.value = "0";
    fullTotalCount.value = "0";
    totalCountRollback.value = "0";
    totalCount.value = "0";

    otherItemsPersent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    })
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    })

    if (cmsBtn.checked) {
      cmsBtn.checked = false;
    }

    hiddenCMS.style.display = "none";
    hiddenInput.style.display = "none";

    this.screens = [];
    this.screenPrice = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    inputRange.value = 0;
    this.cms = 1;

    console.log(this.screens);
    console.log(this.screenPrice);
    console.log(this.adaptive);
    console.log(this.rollback);
    console.log(this.servicePricesPercent);
    console.log(this.servicePricesNumber);
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.servicesPercent);
    console.log(this.servicesNumber);
    console.log(this.cms);
  }
}

appData.init();