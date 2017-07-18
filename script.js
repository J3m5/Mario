var revert = false;
var jump = false;
var wWidth = $(window).width();
var wHeight = $(window).height();
var marioWidth;
var marioHeight;
var halfW = wWidth / 2;
var value = 0;
var keys = [];
var jumpHeight = Math.round(wHeight / 30);
var speed = 3;
var time = 10;
var XPos = 100;
var marioH = 7.092198582/100*wHeight;
var marioW = marioH/1.296296296;
var ratio = 1.266;
var YPos = Math.round(wHeight / ratio) + marioH/2;
var YPosd = Math.round(wHeight / ratio) + marioH/2;
var JUMP = 38;
var LEFT = 37;
var RIGHT = 39;
var DOWN = 40;
var gravity = 0;
var beonsurface = true;
var blockH;
var objects = [];
var mario = $("#mario");
var runRight = false;
var runLeft = false;
var backMove = false;

$(document).ready(function() {




  (function drawB() {
    var canvas = document.querySelector('#backG');
    var context = canvas.getContext('2d');
    var marioC = document.querySelector('#mario');
    var contextm = marioC.getContext('2d');



    function initialize() {

      $(window).resize(function() {

        speed = wHeight / 75;
        wWidth = $(window).width();
        wHeight = $(window).height();
        marioH = 7.092198582/100*wHeight;
        marioW = marioH/1.296296296;
        YPos = Math.round(wHeight / ratio) + marioH/2;
        YPosd = Math.round(wHeight / ratio) + marioH/2;
        resizeCanvas();

      });

      resizeCanvas();
    }

    function redraw(wCanvas, wHeight, back) {

      context.drawImage(back, 0, 0, wCanvas, wHeight);

    }

    function redrawM(marioImg) {

      contextm.drawImage(marioImg, 337, 141, 50, 65, 0, 0, marioW, marioH);
      marioWidth = $(mario).width();
      marioHeight = $(mario).height();


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

        var marioImg = new Image();
        marioImg.src = 'mario2.png';
        marioImg.onload = function() {
          var tp = $(window).height();
          var tpg = tp / 658;
          var scale = 0.8 / tpg;
          marioC.width = marioW;
          marioC.height = marioH;

          redrawM(marioImg);

        };
      };
    }
    initialize();
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
  $(".block").each(function(i, obj) {

    objects.push(obj);
  });

  console.log(objects);

  function speedUp() {
    if (speed >= Math.round(wHeight / 60)) {
      speed = Math.round(wHeight / 60);
    } else {
      speed++;
    }
  }

  function mainLoop() {
    // console.log(keys);
    // var PosX = $("#mario").offset().left;
    // var PosY = $("#mario").offset().top;



    // var mPos = $("#mario").offset().left;
    var rightBack = $("#backG").offset().left + $("#backG").width();
    // $(".info").html("rightBack: " + rightBack + "</br>XPos: " + XPos + "</br>Ypos: " + YPos + "</br> window height: " + wHeight + "</br> window width: " + wWidth + " </br>half window width: " + halfW + "</br> revert = " + revert + "</br>jump= " + jump);






    if (keys[LEFT] && XPos > 29) {
      backMove = false;
      runLeft = true;
      speedUp();

      XPos -= speed;

      if (revert == false) {
        $(mario).css({
          scale: ("-1,1"),
          filter: "FlipH"
        });
        revert = true;
      }


    }
    if (keys[RIGHT]) {

      runRight = true;
      speedUp();


      if (revert == true) {
        $(mario).css({
          scale: ("1, 1"),
          filter: "none"
        });
        revert = false;
      }

      if ((XPos+150) >= wWidth  / 2 && wWidth + speed <= rightBack) {
        backMove = true;

        $(".back").css({
          x: "-=" + speed
        });

      }
      if (  XPos <= wWidth / 2 && XPos + marioWidth + speed <= wWidth) {
        XPos += speed;
        backMove = false;
      }
    }
    console.log(wHeight);

    if (keys[RIGHT] == null && runRight == true && speed > 4 && backMove == true) {
      if (speed > 1) {
        speed = speed - 2;
        $(".back").css({
          x: "-=" + speed
        });
      } else {
        runRight = false;
        speed = 3;
        backMove = false;
      }

    }


    if (keys[JUMP] && jump == false) {
      gravity = 0;
      jump = true;
      YPos -= jumpHeight;
      gravity = -jumpHeight;
    }

    if (keys[DOWN]) {

    }

    if ((jump == true || !beonsurface)) {



      if (keys[JUMP]) {
        beonsurface = false;
        YPos += gravity;
        gravity = gravity + 2;
        beonsurface = false;
        if (gravity > 80) {
          gravity = 80;
        }



      } else if (keys[JUMP] == null) {
        YPos += gravity;

        if (gravity < 0) {
          gravity = gravity + 6;
        } else {
          gravity = gravity + 2;
        }

      }

      if (YPos >= YPosd) {
        jump = false;
        YPos = YPosd;
        bOnSurface = true;
      }
    }

    if (gravity > 60) {
      gravity = 60;
    }
    beonsurface = false;


    $.each(objects, function(i, obj) {

      var objTop = $(obj).offset().top;
      var objHeight = $(obj).height();
      var objLeft = $(obj).offset().left;
      var objBottom = objTop + objHeight;
      var objWidth = $(obj).width();

      // Detecte si mario tombe sur un objet.

      if (YPos + marioHeight > objTop &&
        XPos + marioWidth > objLeft &&
        XPos < objLeft + objWidth &&
        YPos < objTop &&
        YPos + marioHeight < (objTop + objHeight)
      ) {
        YPos = objTop - marioHeight;
        jump = false;
        gravity = 1;
      }
      //Detecte si mario touche un object avec sa tete en sautant.
      else if (
        YPos > objTop &&
        YPos <= objBottom &&
        XPos + marioWidth > objLeft &&
        XPos < objLeft + objWidth
      ) {
        gravity = 5;
        YPos = objBottom;

        toped = true;
        // gravity ++;
      }


    });





    $(mario).css({
      x: XPos
    });

    $(mario).css({
      top: YPos
    });

    $(".info").html("Onsurface: " + beonsurface + "</br>YPos: " + YPos + "</br>blockH: " + blockH + "</br>blockLeft" + $(".block").offset().left + "</br>XPos:" + XPos + "</br>Gravity" + gravity);



    requestAnimationFrame(mainLoop);
  }
  requestAnimationFrame(mainLoop);
});
