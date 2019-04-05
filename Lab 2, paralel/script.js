function ring(){
  var setr;
  function array(n) {
    let array = [];
    let flag = true;
    let schet = 1;
    const num = Math.floor(Math.random() * (n - 1) + 1);
    array[0] = {
      number: 1,
      id: num,
      idmax: num
    };
    for (i = 1; i < n; i++) {
      array[i] = {};
      array[i].number = i + 1;
      flag = true;
      
      while (flag) {
        idnum = Math.floor(Math.random() * (n - 1 + 1)) + 1;
        for (j = 0; j < array.length - 1; j++) {
          if (array[j].id != idnum) {
            schet += 1;
          }
        }
        // если счетчик сработал то внесение данных в объект
        if (schet == array.length) {
          array[i].id = idnum;
          array[i].idmax = idnum;
          flag = false;
        }
        // сброс счетчика
        schet = 1;
      }
    }
 
    return array;
  }
  set = document.getElementById('inp').value;
   radius = 200;
   width = 600;
   height = 600;
   angle = 300;
   schtk = 0;
   arrayobj = array(set);     
   
  server = `<div class='schet'id='schet'><p>0</p></div>`;  
  for (i = 0; i < arrayobj.length; i++) {
     server += `<div class='station' id='test'><p>`+'№ '+arrayobj[i].number+' id:'+arrayobj[i].id+' idmax: '+arrayobj[i].idmax+`</p></div>`;              
  if (arrayobj[i].idmax === arrayobj.length) {
      setr = i;
    }
    }
  // вывод html элементов на страницу  
  
  $(".container").html(server);
  let step = (2 * Math.PI) / arrayobj.length;
  $(".station").each(function coord(index) {         
    let x = Math.round(
      width / 2 + radius * Math.cos(angle) - $(this).width() / 2
    );
    let y = Math.round(
      height / 2 + radius * Math.sin(angle) - $(this).height() / 2
    );
    $(this).css({
      left: x + 3 + "px",
      top: y + "px"
    });
    angle += step;
  });
            
 let timer = setInterval(function() {   
    for (let i=0; i < arrayobj.length; i++ ) {
    console.log(i);
     if (i == 0) {
        if (arrayobj[0].idmax < arrayobj[1].idmax) {
          arrayobj[0].idmax = arrayobj[1].idmax;
        }
        }
        else if (i!==0){ 
       if (arrayobj[i-1].idmax < arrayobj[i].idmax) {
          arrayobj[i-1].idmax = arrayobj[i].idmax
        }
        }      
    
    }
     for (i = arrayobj.length - 1; i >= 0; i--) {
      // если элемент последний, то задаем значение первому элементу
      if (i == arrayobj.length - 1) {
        if (arrayobj[0].idmax < arrayobj[arrayobj.length - 1].idmax) {
          arrayobj[0].idmax = arrayobj[arrayobj.length - 1].idmax;
        }         
      } else if (i !== arrayobj.length - 1) {
        if (arrayobj[i + 1].idmax < arrayobj[i].idmax) {
          arrayobj[i + 1].idmax = arrayobj[i].idmax;
        }
      }
      console.log(i);
    }
    
    schtk += 1;    
    server = `<div class='schet'id='schet'><p>0</p></div>`;
    for (let i = 0; i < arrayobj.length; i++) {
       server += `<div class='station' id='test'><p>`+'№ '+arrayobj[i].number+' id:'+arrayobj[i].id+' idmax: '+arrayobj[i].idmax+`</p></div>`;
    }
   $(".container").html(server);
  // cont=document.getElementsByClassName('container');
  //console.log(cont);
  // cont.innerHTML+=server;
    $(".schet").html(schtk);
    let step = (2 * Math.PI) / $(".station").length;
    let schetmax=0;
    $(".station").each(function(index) { 

      let x = Math.round(
        width / 2 + radius * Math.cos(angle) - $(this).width() / 2
      );
      let y = Math.round(
        height / 2 + radius * Math.sin(angle) - $(this).height() / 2
      );
      $(this).css({
        left: x + 3 + "px",
        top: y + "px"
      });
      angle += step;
       schetmax+=1;
      // console.log(schetmax);
     if (schtk==arrayobj.length ){   
     if (index === setr) {
     // console.log(setr);
      //console.log(index);
      $(this).css({
         backgroundImage:"url('stationmax.png')"
      }) 
      }
      }
    });
       
  }, 500);  //таймер
  timeset = (arrayobj.length * 500);
  // остановка программы после длины массива шагов
  setTimeout(function() {
   clearInterval(timer);
  }, timeset);
};
