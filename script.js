var revert = false;
var jump = false;
var wWidth = $(window).width();
var wHeight = $(window).height();
var halfW = wWidth / 2;
var value = 0;
var keys = [];
var jumpHeight = Math.round(wHeight / 38.28);
var speed = 3;
var time = 10;
var XPos = 100;
var YPos = Math.round(wHeight / 1.2429);
var YPosd = Math.round( wHeight / 1.2429);
var JUMP = 38;
var LEFT = 37;
var RIGHT = 39;
var DOWN = 40;
var gravity = 0;
var beonsurface = true;

$(document).ready(function() {




  (function drawB() {
    var canvas = document.querySelector('#backG');
    var context = canvas.getContext('2d');
    var marioC = document.querySelector('#mario');
    var contextm = marioC.getContext('2d');

    initialize();

    function initialize() {

      $(window).resize(function() {

        speed = wHeight / 75;

        resizeCanvas();

      });

      resizeCanvas();
    }

    function redraw(wCanvas, wHeight, back) {

      context.drawImage(back, 0, 0, wCanvas, wHeight);

    }

    function redrawM(mario) {
      contextm.drawImage(mario, 337, 141, 50, 65, 0, 0, 50, 65);


    }

    function resizeCanvas() {


      var back = new Image();
      back.src = 'SMBw112.png';
      back.onload = function() {

        var iw = back.width;
        var ih = back.height;
        var scale = wHeight / ih;
        var wCanvas = scale * iw;

        canvas.height = wHeight;
        canvas.width = wCanvas;

        redraw(wCanvas, wHeight, back);

        var mario = new Image();
        mario.src = 'mario2.png';
        mario.onload = function() {
          var tp = $(window).height();
          var tpg = tp / 658;
          var scale = 0.8 / tpg;
          marioC.width = 50;
          marioC.height = 65;

          // contextm.scale(1/scale,1/scale);
          redrawM(mario);

        };
      };
    }

  })();






  $(document).keydown(function(e) {
    e.preventDefault();
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
    delete keys[e.keyCode];
    // $(".game").stop();
  });

  // setInterval(function(){
  //   ,20);



  function mainLoop() {
    // console.log(keys);
    var PosX = $("#mario").offset().left;
    var PosY = $("#mario").offset().top;
    wWidth = $(window).width();
    wHeight = $(window).height();


    // var mPos = $("#mario").offset().left;
    var rightBack = $("#backG").offset().left + $("#backG").width();
    // $(".info").html("rightBack: " + rightBack + "</br>XPos: " + XPos + "</br>Ypos: " + YPos + "</br> window height: " + wHeight + "</br> window width: " + wWidth + " </br>half window width: " + halfW + "</br> revert = " + revert + "</br>jump= " + jump);






    if (keys[LEFT] && PosX > 29) {


      XPos -= speed;

      if (revert == false) {
        $("#mario").css({
          scale: ("-1,1"),
          filter: "FlipH"
        });
        revert = true;
      }


    }
    if (keys[RIGHT]) {


      if(speed > Math.round(wHeight / 40)){
        speed = Math.round(wHeight / 40);
      }else {
        speed++;
      }

      if (revert == true) {
        $("#mario").css({
          scale: ("1, 1"),
          filter: "none"
        });
        revert = false;
      }
      if (XPos + $("#mario").width() >= wWidth / 2 && wWidth < rightBack - 15) {


        $(".back").css({
          x: "-=" + speed
        });

      } else if (XPos + 7 + $("#mario").width() < wWidth) {
        XPos += speed;

      }
    }



    if (keys[JUMP] && jump == false) {
      gravity = 0;
      // jumpPos =
      jump = true;
      wHeight = $(window).height();
      // jumpHeight = wHeight / 38.28;
      YPos -= jumpHeight;
      gravity = -jumpHeight;

      // setTimeout(function(){jump=false;}, 500);
      // gravity = 0;

    }
beonsurface = false;

    var blockH = $(".block").offset().top + $(".block").height();
    if (
      YPos > $(".block").offset().top &&
      YPos < ($(".block").offset().top + $(".block").height()) &&
      $(".block").offset().left < XPos + $("#mario").width() &&
      $(".block").offset().left + $(".block").width() > XPos


    ) {
      gravity = 5;
      YPos = blockH;

      toped = true;
      // gravity ++;
    }

    if (YPos + $("#mario").height() > $(".block").offset().top &&
      XPos + $("#mario").width() >$(".block").offset().left &&
       XPos < $(".block").offset().left + $(".block").width() &&
      YPos < $(".block").offset().top &&
      YPos + $("#mario").height() < ($(".block").offset().top + $(".block").height())
    ) {
      YPos = $(".block").offset().top - $("#mario").height();

      jump = false;
      gravity = 1;


    }





    if (jump == true || !beonsurface) {

      YPos += gravity;
      gravity++;
      if (gravity > 40){
        gravity =40;
      }
      beonsurface = false;
      if (YPos >= YPosd) {
        jump = false;
        YPos = YPosd;
        bOnSurface=true;
      }
    }
if(YPos == YPosd){
  beonsurface =true;
}

    $("#mario").css({
      x: Math.round(XPos)
    });

    $("#mario").css({
      top: Math.round(YPos)
    });

    $(".info").html("Onsurface: "+ beonsurface+"</br>YPos: " + YPos + "</br>blockH: " + blockH + "</br>blockLeft" + $(".block").offset().left + "</br>XPos:" + XPos + "</br>Gravity" + gravity);


    if (keys[DOWN]) {



    }

    requestAnimationFrame(mainLoop);
  }
  requestAnimationFrame(mainLoop);
});
