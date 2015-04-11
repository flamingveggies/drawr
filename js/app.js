$(document).ready(function () {

  var color = $('.selected').css('background-color');
  var paintSurface = $('canvas');
  var context = paintSurface[0].getContext('2d');
  var lastEvent;
  var canvasClicked = false;

  function changeCursor(color) { // create cursor for new color and apply it to page
    var cursor = document.createElement('canvas');
    var context = cursor.getContext('2d');
    cursor.width = 16;
    cursor.height = 16;
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.moveTo(2, 10);
    context.lineTo(2, 2);
    context.lineTo(10, 2);
    context.moveTo(2, 2);
    context.lineTo(30, 30)    
    context.stroke();
    document.body.style.cursor = 'url(' + cursor.toDataURL() + '), auto';
  }

  changeCursor(color); // initialize cursor to default selected color (black)

  $('li').click(function () { // make clicked color 'selected' and change cursor
    color = $(this).css("background-color");
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    changeCursor(color);
  });
  
  paintSurface.mousedown(function (e) { // if mouse is held down
    lastEvent = e;
    canvasClicked = true;
  }).mouseup(function () { // if mouse is let up
    canvasClicked = false;
  }).mouseleave(function () { // also if mouse leaves the canvas
    paintSurface.mouseup();
  });

  paintSurface.mousemove(function (e) { // draw if mouse is down
    if (canvasClicked) {
      lastEventpositionX = lastEvent.pageX-paintSurface.offset().left;
      lastEventpositionY = lastEvent.pageY-paintSurface.offset().top;
      xposition = e.pageX-paintSurface.offset().left;
      yposition = e.pageY-paintSurface.offset().top;

      context.beginPath();
      context.moveTo(lastEventpositionX, lastEventpositionY);
      context.lineTo(xposition, yposition);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
  })

});

// TODO

// less ugly cursor

// no cursor in IE
// no drawing in FF

// add color
//   color picker
// remove color

// multiple brushes
// draw shapes
// erase

// clear canvas
// save created picture