//Глобальные переменные
var calories = 0;
var weights = 0;
var result = 0;
var parentNames = document.getElementById('name-stack');
var parentWeights = document.getElementById('weight-stack');
var parentCalories = document.getElementById('calories-stack');
var parentRes = document.getElementById('result-stack');
var actionAdd = document.getElementById('addLine');
var actionRemove = document.getElementById('removeLine');
var countRes = 3;
var countCal = 3; //начинаем счёт с 3-х
var countName = 3; //начинаем счёт с 3-х
var countWeight = 3; //начинаем счёт с 3-х эти переменные нужны чтобы новые
//блоки всегда добавлялись в предыдущих детей связок Имён, Калорий, и Весов
var eachWeight = 0; // Каждый вес для каждого инпута
var eachCals = 0;
var allSum = [];
var weightSum = [];
var calsMultipyWeights = 0;
var numberofNeedsInputs = 0;
var regs = "";
var calArray = [];
var weiArray = [];
var resultOutput = 0;
var resultWeight = 0;
var nameDB0 = "";
var nameDB1 = "";
var nameDB2 = "";

var calDB0 = "";
var calDB1 = "";
var calDB2 = "";


actionAdd.onclick = function() { // При нажатии на кнопку, добавлять строки
  addNewInputs();
};

actionRemove.onclick = function() { // При нажатии на кнопку, добавлять строки
  removeNewInputs();
};

function addNewInputs(){   // Функция добавления имён, веса, калорий

  var newNameInput = document.createElement('input');
  newNameInput.className = "form-control";
  newNameInput.type = "text";
  newNameInput.name = "name" + countName;
  newNameInput.id = "tags"+countName;
  parentNames.insertBefore(newNameInput, parentNames.children[countName]);
  newNameInput.setAttribute('onkeyup', 'exportFromLocalStorage()');
  $( "#tags"+countName ).autocomplete({
    source: availableTags //Добавляем функцию выпадения поиска для новых инпутов
  });

  var newWeightInput = document.createElement('input');
  newWeightInput.className = "form-control";
  newWeightInput.type = "text";
  newWeightInput.name = "weight" + countWeight;
  newWeightInput.id = "w"+countWeight;
  parentWeights.insertBefore(newWeightInput, parentWeights.children[countWeight]);

  var newCalInput = document.createElement('input');
  newCalInput.className = "form-control";
  newCalInput.type = "text";
  newCalInput.name = "cals" + countCal;
  newCalInput.id = "c"+countCal;
  parentCalories.insertBefore(newCalInput, parentCalories.children[countCal]);

  var newCountRes = document.createElement('span');
  newCountRes.className = "form-control uneditable-input";
  newCountRes.type = "text";
  newCountRes.name = "res" + countRes;
  newCountRes.id = "r"+countRes;
  parentRes.insertBefore(newCountRes, parentRes.children[countRes]);

  countName++;
  countWeight++;
  countCal++;
  countRes++;
}

//------УДАЛЕНИЕ СТРОКИ ПО ВОЛЕ ПОЛЬЗОВАТЕЛЯ---------------
 function removeNewInputs(){   // Функция удаления имён
   if(countName>1){
     countCal = countCal-1;
     countRes = countRes-1;
     countName = countName-1;
     countWeight = countWeight-1;
     parentNames.removeChild(parentNames.children[countName]);
     parentWeights.removeChild(parentWeights.children[countWeight]);
     parentCalories.removeChild(parentCalories.children[countCal]);
     parentRes.removeChild(parentRes.children[countRes]);
   }
 }

 //------СЧИТЫВАНИЕ ПРОДУКТА С ИНПУТА И АВТОВЫВОД КАЛОРИЙ---------------
function exportFromLocalStorage(){
  // Проходим каждый раз, когда инициируется событие по всем инпутам и и проставляем значения в калории
  for (var i = 0; i < countName; i++) {
    if(localStorage.getItem(document.getElementById('tags'+i).value)){
    document.getElementById('c'+i).value = localStorage.getItem(document.getElementById('tags'+i).value);
    }
  }
}

//Основное вычисление
//Сериализуем все данные из формы
$( "#mainform" ).submit(function( event ) {
  var parse = JSON.parse(JSON.stringify($('input').serializeArray())),
    array = [];
  event.preventDefault();
//Выводим в консоль только данные из веса и калорий
  var count = 0;
//Перебираем все спарсенные объекты
  for(var obj in parse) {
      //Если забыли заполнить поля, то выводить алерт и выйти из цикла
      if(parse[obj].value === ''){
      alert("Вы забыли заполнить некоторые поля.\nЕсли вам нечем их заполнить, удалите лишнюю строку!");
      break;
      }
      //Если в имени инпута есть weight и его номер obj то получить его значение и разделить на 100, чтобы получить коэфициент
      //Записать результат в массив weiArray
      if(/weight/.test(parse[obj].name)){
          eachWeight = parse[obj].value/100;
          weiArray.push(+eachWeight);
          console.log(weiArray);
      }
      //Если в имени инпута есть cal и его номер obj то получить его значение
      //Записать результат в массив calArray
      if(/cal/.test(parse[obj].name)){
          eachCals = parse[obj].value;
          calArray.push(+eachCals);
          console.log(calArray);
          count++;
      }
  }
  //Поочерёдное умножение каждого элемента массива с каллориями с каждым элементом массмва с коэфициентами веса.
  for (i=0; i<count; i++) {
    calsMultipyWeights = calArray[i]*weiArray[i];
    allSum.push(+calsMultipyWeights);
    weightSum.push(+weiArray[i]);
    calsMultipyWeights = 0;
    document.getElementById('r' + i).innerHTML=allSum[i].toFixed(2);
  }
  //Получение суммы всех элементов массива
  for (a=0; a<count; a++) {
    resultOutput=resultOutput+allSum[a];
    resultWeight = resultWeight + weightSum[a];
  }
  //Вывод результата в поле результата
  document.getElementById('result').innerHTML =  resultOutput.toFixed(2);
  document.getElementById('result-weight').innerHTML =  (resultWeight*100).toFixed(2);

  //Обнуляем переменные, чтобы не накапливался результат
  eachCals = 0;
  eachWeight = 0;
  resultOutput = 0;
  resultWeight = 0;
  calArray.length = 0;
  weiArray.length = 0;
  allSum.length = 0;
  weightSum.length = 0;
  calsMultipyWeights = 0;

});

// ФУНКЦИЯ КОТОРАЯ ПРОВЕРЯЕТ НИ КЛИКНУЛИ ЛИ НА ВЫПАДАЮЩИЙ СПИСОК ПОДГРУЗКИ JQUERY, ЧТОБЫ ПО КЛИКУ ВНЕСТИ КАЛОРИИ
function ulOnClick(){

  var ClickOnJQdropdowns = document.getElementsByClassName("ui-autocomplete ui-front ui-menu ui-widget ui-widget-content");
  for (var i = 0; i < ClickOnJQdropdowns.length; i++) {
    ClickOnJQdropdowns[i].setAttribute('onclick', 'exportFromLocalStorage()');
  }
}
setInterval(ulOnClick, 3000);
//--------Работа карандашиков---------
function redactNorma(){
  $('#norma').removeAttr("disabled");
  document.getElementById('norma').value="";
}
function redactDop(){
  $('#dop').removeAttr("disabled");
  document.getElementById('dop').value="";
}
function blurDisabledNorma(){
  document.getElementById('norma').setAttribute('disabled', true);
  if(document.getElementById('norma').value===""){
    document.getElementById('norma').value="Не указана";
  }else{
  document.getElementById('norma').value = document.getElementById('norma').value + " ккал";
  }
}
function blurDisabledDop(){
  document.getElementById('dop').setAttribute('disabled', true);
  if(document.getElementById('dop').value===""){
    document.getElementById('dop').value="Не указана";
  }else{
  document.getElementById('dop').value = document.getElementById('dop').value + " ккал";
  }
}
//-Конец-------Работа карандашиков---------

//Функция добавления в локальную базу новых продуктов
function updateDataBase() {

    nameDB0 = document.getElementById('db-name-0').value;
    nameDB1 = document.getElementById('db-name-1').value;
    nameDB2 = document.getElementById('db-name-2').value;

    calDB0 = document.getElementById('db-cal-0').value;
    calDB1 = document.getElementById('db-cal-1').value;
    calDB2 = document.getElementById('db-cal-2').value;

    if((nameDB0 || nameDB1 || nameDB2)){
       localStorage.setItem(nameDB0, calDB0);
       localStorage.setItem(nameDB1, calDB1);
       localStorage.setItem(nameDB2, calDB2);
       document.getElementById('buttonDB').setAttribute('data-toggle', "modal");
       document.getElementById('buttonDB').setAttribute('data-target', "#myModal");
    }else if(!(nameDB0 || nameDB1 || nameDB2)){
      alert("Вы не заполнили ни одного продукта!");
    }
  }
