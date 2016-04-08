var prodArray = [];

//ПЕРЕБОР ЛОКАЛЬНОГО ХРАНИЛИЩА И ЗАПИСЬ В МАССИВ ВСЕХ ПРОДУКТОВ (ключей лок.хран.)
function localProducts(){

  for(var i = 0; i<localStorage.length; i++){
     prodArray.push(localStorage.key(i));
   }
 }
setTimeout(localProducts, 100);


var availableTags = prodArray;

$(function() {

  $( "#tags0" ).autocomplete({
    source: availableTags
  });
  $( "#tags1" ).autocomplete({
    source: availableTags
  });
  $( "#tags2" ).autocomplete({
    source: availableTags
  });

});
// //Так можно спарсить объекты из JSON
// var products = [
//   {
//       "productId": "Milk",
//       "name": "Молоко",
//       "calories": "220"
//   },
//   {
//     "productId": "bread-white",
//     "name": "Хлеб белый",
//     "calories": "223"
//   },
//   {
//     "productId": "bread-black",
//     "name": "Хлеб чёрный",
//     "calories": "214",
//     "friends": [0,1,2,3]
//   }
// ];
//
// //Так можно достучаться до конкретного свойства
// var objectsProd = JSON.parse(JSON.stringify(products[1]));
// console.log(objectsProd.name);


//ТАК МОЖНО ПОЛУЧИТЬ СПИСОК КЛЮЧЕЙ ИЗ LOCALSTORAGE
// function localProducts(){
//   for(var i = 0; i<localStorage.length; i++){
//     console.log(localStorage.key(i));
//   }
// }
