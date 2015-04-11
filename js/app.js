$(document).ready(function () {

  var color = $('.selected').css('background-color');
  var paintSurface = $('canvas');
  var context = paintSurface[0].getContext('2d');
  var lastEvent;
  var canvasClicked = false;
  var thickness = $('#thickness').val();

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
    $('#erase').text('Click here to erase!');
    changeCursor(color);
    thickness = $('#thickness').val();
    $('#thickness').removeAttr('disabled');
  });
  
  $('#thickness').change(function () { // change thickness when size slider changed
    thickness = $('#thickness').val();
  });

  $('#erase').click(function () { // select eraser
    $(this).text('Now you\'re erasing!')
    $(this).siblings().removeClass('selected');
    document.body.style.cursor = 'auto';
    color = 'rgb(255,255,255)'
    thickness = 100;
    $('#thickness').attr('disabled','disabled');
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
      context.lineWidth = thickness
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
  })

});

// TODO

// less ugly cursor

// add color
//   color picker
// remove color

// multiple brushes
// draw shapes

// clear canvas
// save created picture