function updatePrice() {
  let n = document.getElementById("n");
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }
  // Скрываем или показываем радиокнопки
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = (select.value == ("2" || "1") ? "block" : "none");
  //Свойства второго товара
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });
  // Скрываем или показываем чекбоксы
  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = (select.value == "3" ? "block" : "none");
  //Свойства третьего товара
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });
  let re = /\D/;
    if (n.value.match(re) !== null) {
        alert("Ошибка! Введите корректное число");
    }
    else{
      document.getElementById("answer").value = price*n.value + " рублей";
    }
}
function getPrices() {
  return {
    prodTypes: [1000, 2000, 500],
    prodOptions: {
      option2: -200,
      option3: -500,
    },
    prodProperties: {
      prop2: 100,
    }
  };
}
window.addEventListener('DOMContentLoaded', function (event) {
  let s = document.getElementsByName("prodType");
  let select = s[0];
  // Назначаем обработчик изменения количества товара
  let n = document.getElementById('n');
  n.addEventListener("change",function(event){
    updatePrice();
  })
  // Назначаем обработчик изменения типа товара
  select.addEventListener("change", function (event) {
    updatePrice();
  });
  // Назначаем обработчик радиокнопок  
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    radio.addEventListener("change", function (event) {
      updatePrice();
    });
  });
  // Назначаем обработчик чекбокса  
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (event) {
      updatePrice();
    });
  });
  updatePrice();
});
