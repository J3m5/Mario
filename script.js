var revert = false;
var jump = false;
var wWidth = $(window).width();
var wHeight = $(window).height();
var halfW = wWidth / 2;
var value = 0;
var keys = [];
var jumpHeight = wWidth / 38.28;
var speed = wHeight / 40;
var time = 10;
var xPos = 100;
var YPos = wHeight / 1.2429;
var YPosd = wHeight / 1.2429;
var JUMP = 38;
var LEFT = 37;
var RIGHT = 39;
var DOWN = 40;
var gravity = 0;

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
  var blockH = $(".block").offset().top + $(".block").height();
  if ( blockH >= YPos) {
    YPos = blockH;
    gravity = 5;
    // gravity ++;
  }
    $("#mario").css({
      x: xPos
    });

    $("#mario").css({
      top: YPos
    });

    // var mPos = $("#mario").offset().left;
    var rightBack = $("#backG").offset().left + $("#backG").width();
    // $(".info").html("rightBack: " + rightBack + "</br>Xpos: " + xPos + "</br>Ypos: " + YPos + "</br> window height: " + wHeight + "</br> window width: " + wWidth + " </br>half window width: " + halfW + "</br> revert = " + revert + "</br>jump= " + jump);

$(".info").html("PosY: " + PosY + "</br>blockH: " + blockH);




    if (keys[LEFT] && PosX > 29) {


      xPos -= speed;

      if (revert == false) {
        $("#mario").css({
          scale: ("-1,1"),
          filter: "FlipH"
        });
        revert = true;
      }


    }
    if (keys[RIGHT]) {
      if (revert == true) {
        $("#mario").css({
          scale: ("1, 1"),
          filter: "none"
        });
        revert = false;
      }
      if (xPos + $("#mario").width() >= wWidth/2 && wWidth < rightBack - 15) {


        $(".back").css({
          x: "-=" + speed
        });

      } else if (xPos + 7 + $("#mario").width() < wWidth) {
        xPos += speed;

      }
    }



    if (keys[JUMP] && jump == false) {
      gravity = 0;
      // jumpPos =
      jump = true;
      wHeight = $(window).height();
      jumpHeight = wHeight / 38.28;
      YPos -= jumpHeight;
      gravity = -jumpHeight;

      // setTimeout(function(){jump=false;}, 500);
      // gravity = 0;

    }

    if (jump == true) {
      YPos += gravity;
      gravity++;
      if (YPos >= YPosd) {
        jump = false;
        YPos = YPosd;
      }
    }






    if (keys[DOWN]) {



    }

    requestAnimationFrame(mainLoop);
  }
  requestAnimationFrame(mainLoop);
});
