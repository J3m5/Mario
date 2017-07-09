var revert = false;
var jump = false;
var wWidth = $(window).width();
wHeight = $(window).height();
var halfW = wWidth / 2;
var value = 0;
var keys = [];
var jumpHeight=25;
var speed = wHeight / 80;
var time = 10;
var xPos = 100;
var YPos = 770;
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
        wHeight = $(window).height();
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
          //
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



  // var jump;
  // setInterval(function(){
  //   if (jump == true){
  //     // YPos += gravity;
  //   gravity++;
  //   }
  //
  // },20);

  function mainLoop() {
    // console.log(keys);
    var PosX = $("#mario").offset().left;
    var PosY = $("#mario").offset().top;

    $("#mario").css({
      x: xPos
    });

    $("#mario").css({
      top: YPos
    });

    // var mPos = $("#mario").offset().left;

    $(".info").html("Xpos: " + PosX + "</br>Ypos: " + YPos + "</br> window height: " + wHeight + " </br>half window width: " + halfW + "</br> revert = " + revert + "</br>jump= " + jump);

    if (keys[RIGHT]) {
      if (revert == true) {
        $("#mario").css({
          scale: ("1, 1"),
          filter: "none"
        });
        revert = false;
      }
      if (PosX < halfW) {

        xPos += speed;


      } else {

        $("#backG").css({
          x: "-=" + speed
        });
      }
    }


    if (keys[LEFT] && PosX > 1) {


    xPos -= speed;

      if (revert == false) {
        $("#mario").css({
          scale: ("-1,1"),
          filter: "FlipH"
        });
        revert = true;
      }


    }


    if (keys[JUMP] && jump == false) {
gravity=0;
      // jumpPos =
      jump = true;

  YPos -= jumpHeight;
gravity = -jumpHeight;

      // setTimeout(function(){jump=false;}, 500);
// gravity = 0;

    }

      if (jump == true){
        YPos += gravity;
gravity++;
if(YPos >= 771){
  jump=false;
YPos = 770;
}
      }






    if (keys[DOWN]) {



    }

    requestAnimationFrame(mainLoop);
  }
  requestAnimationFrame(mainLoop);
});
