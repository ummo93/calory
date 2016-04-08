var datepickerValue = "";
var nowDate = new Date(hours, minutes);
var hours = nowDate.getHours();
var minutes = nowDate.getMinutes();
var seconds = nowDate.getSeconds();
var data = nowDate.toDateString();
var products = "";
var weights = "";
var ccals = "";
var ress = "";
document.getElementById("datepicker").value = data + "/" + hours + "/"+ minutes;


function saveTheResult(){
function blobParsing(){
    var nameArray = [];
    var weightArray = [];
    var calArray = [];
    var resArray = [];
    var eachName = 0;
    var eachWeight = 0;
    var eachCal = 0;
    var eachRes = 0;
  var parsing = JSON.parse(JSON.stringify($('input').serializeArray())),
    array = [];
    var counting = 0;

    for(var obj in parsing) {

      //Если в имени инпута есть weight и его номер obj то получить его значение и разделить на 100, чтобы получить коэфициент
      //Записать результат в массив weiArray
        if(/name/.test(parsing[obj].name)){
          eachName = parsing[obj];
          nameArray.push(eachName.value);

        }
        if(/weight/.test(parsing[obj].name)){
          eachWeight = parsing[obj];
          weightArray.push(eachWeight.value);

        }
        if(/cal/.test(parsing[obj].name)){
          eachCal = parsing[obj];
          calArray.push(eachCal.value);

        }

    }

    for(var i=0; i<document.getElementById('result-stack').getElementsByTagName('*').length; i++){
      resArray.push(document.getElementById('result-stack').getElementsByTagName('span')[i].innerHTML);
    }
    products = nameArray;
    weights = weightArray;
    ccals = calArray;
    ress = resArray;
    return "\n Все продукты: "+ products + '\n Вес каждого продукта (грамм): '+ weights + '\n Калораж каждого продукта (ккал/100г): '+ ccals+ '\n Итоговый калораж каждого продукта (ккал): '+ ress;
  }
var datepickerValue = document.getElementById("datepicker").value;
  var blob = new Blob([datepickerValue + "\n\n"+
' Все калории за день' + " = "+ document.getElementById("result").innerHTML +
"\n Общий вес за день составил: "+document.getElementById("result-weight").innerHTML + blobParsing()], {type: "text/plain;charset=utf-8"});
saveAs(blob, datepickerValue + ".txt");
}
