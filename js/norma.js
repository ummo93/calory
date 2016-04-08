//Логика пока не испоользуется в основном приложении, только в прототипе
    $( "#mainform" ).submit(function( event ) {
      event.preventDefault();
      var normaWeight = document.getElementById("weight").value;
      var normaHeight = document.getElementById("height").value;
      var normaOld = document.getElementById("old").value;
      var normaSelect = document.getElementById("select").value;
      var sexPerson = document.getElementById("sex").value;
      var result = 0;
      /*Здесь начинается счёт*/
      switch (+sexPerson) {
        case 1:
         result = ((10*(+normaWeight)) + (6.25*(+normaHeight)) - (5*(+normaOld)))*normaSelect;
         document.getElementById("result").innerHTML = result.toFixed(1) + " кКал";
         console.log( 'Мужчина!' );
      break;
        case 0:
         result = ((10*(+normaWeight)) + (6.25*(+normaHeight)) - (5*(+normaOld))-161)*normaSelect;
         document.getElementById("result").innerHTML = result.toFixed(1) + " кКал";
         console.log( 'Женщина!' );
      break;
        default:
        alert( 'Странный результат, перепроверьте всё!' );
      }
    });
