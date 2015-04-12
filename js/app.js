$(document).ready(function () {

  var color = $('.selected').css('background-color');
  var paintSurface = $('#paintsurface');
  var ctx = paintSurface[0].getContext('2d');
  var lastEvent;
  var canvasClicked = false;
  var thickness = $('#thickness').val();

  function changeCursor(color) { // create cursor for new color and apply it to page
    var cursor = document.createElement('canvas');
    var ctx = cursor.getContext('2d');
    cursor.width = 16;
    cursor.height = 16;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(2, 10);
    ctx.lineTo(2, 2);
    ctx.lineTo(10, 2);
    ctx.moveTo(2, 2);
    ctx.lineTo(30, 30)    
    ctx.stroke();
    document.body.style.cursor = 'url(' + cursor.toDataURL() + '), auto';
  }

  function initializeCanvas() {
    var paintSurface = $('#paintsurface');
    var ctx = paintSurface[0].getContext('2d');
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.lineWidth = 0;
    ctx.rect(0,0,960,540); // make background white instead of transparent
    ctx.stroke();
    ctx.fill();
    changeCursor(color); // initialize cursor to default selected color (black)
    $('#thickcounter').text(thickness);
    $('.erasercontrol').hide();
  }

  initializeCanvas(); // set up canvas upon page load

  $('li').click(function () { // make clicked color 'selected' and change cursor
    color = $(this).css('background-color');
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    changeCursor(color);
    thickness = $('#thickness').val();
    $('#thickcounter').text(thickness);
    $('#thickness').removeAttr('disabled');
    $('#eraserthickness').attr('disabled','disabled');
    $('.brushcontrol').show();
    $('.erasercontrol').hide();
    $('#selectedtool').css('background', color);
  });
  
  $('#thickness').change(function () { // change thickness when size slider changed
    thickness = $('#thickness').val();
    $('#thickcounter').text(thickness);
  });

  $('#eraserthickness').change(function () { // change eraser thickness when eraser slider changed
    thickness = $('#eraserthickness').val();
    $('#thickcounter').text(thickness);
  });

  $('#erase').click(function () { // select eraser
    document.body.style.cursor = 'auto';
    color = 'white';
    thickness = $('#eraserthickness').val();
    $('#thickcounter').text(thickness);
    $('#eraserthickness').removeAttr('disabled');
    $('#thickness').attr('disabled','disabled');
    $('.brushcontrol').hide();
    $('.erasercontrol').show();
    $('#selectedtool').css('background', 'url("eraser26.png")');
    document.body.style.cursor = 'url(eraser16.png), auto';
  });

  $('#save').click(function () { // save canvas
      var dataURL = paintSurface[0].toDataURL('image/png');
      window.open(dataURL);
    });

  $('#clear').click(function () { // clear canvas and start over
    var paintSurface = $('#paintsurface');
    var ctx = paintSurface[0].getContext('2d');
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.lineWidth = 0;
    ctx.clearRect(0,0,960,540); // erase canvas
    ctx.rect(0,0,960,540); // make background white instead of tansparent
    ctx.stroke();
    ctx.fill();
  });

  paintSurface.mousedown(function (e) { // if mouse is held down
    lastEvent = e;
    canvasClicked = true;
  }).mouseup(function () { // if mouse is let up
    canvasClicked = false;
    lastEvent = undefined;
  }).mouseleave(function () { // also if mouse leaves the canvas
    paintSurface.mouseup();
  });

  paintSurface.mousemove(function (e) { // draw if mouse is down
    if (canvasClicked) {
      lastEventpositionX = lastEvent.pageX-paintSurface.offset().left;
      lastEventpositionY = lastEvent.pageY-paintSurface.offset().top;
      xposition = e.pageX-paintSurface.offset().left;
      yposition = e.pageY-paintSurface.offset().top;

      ctx.beginPath();
      ctx.moveTo(lastEventpositionX, lastEventpositionY);
      ctx.lineTo(xposition, yposition);
      ctx.lineWidth = thickness
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;
      ctx.stroke();
      lastEvent = e;
    }
  });

});

// TODO

// add color
//   color picker
// remove color