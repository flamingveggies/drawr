$(document).ready(function () {

  var color = $('.selected').css('background-color');
  var paintSurface = $('#paintsurface');
  var ctx = paintSurface[0].getContext('2d');
  var lastEvent;
  var canvasClicked = false;
  var thickness = $('#thickness').val();

  function changeCursor(color) { // create cursor for new color and apply it to page
    var cursor = document.createElement('canvas'); // create cursor canvas
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
    ctx.stroke(); // draw cursor
    document.body.style.cursor = 'url(' + cursor.toDataURL() + '), auto'; // change to new cursor
  }

  function initializeCanvas() { // ensure canvas starts with selected default settings
    var paintSurface = $('#paintsurface');
    var ctx = paintSurface[0].getContext('2d');
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.lineWidth = 0;
    ctx.rect(0,0,960,540);
    ctx.stroke();
    ctx.fill(); // make background white instead of transparent
    changeCursor(color); // initialize cursor to default selected color (black)
    $('#thickcounter').text(thickness); // initialize counter
    $('.erasercontrol').hide(); // initialize size slider to brush slider
    $('#colorpicker').hide(); // hide color picker
  }

  initializeCanvas(); // set up canvas upon page load

  $('#palette').on('click', 'li', function () { // when color palette items selected:
    color = $(this).css('background-color'); // set brush color to color selected
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected'); // make clicked color 'selected'
    changeCursor(color); // change cursor to new color
    thickness = $('#thickness').val(); // update thickness
    $('#thickcounter').text(thickness); // change thickness counter to match new thickness
    $('#thickness').removeAttr('disabled');
    $('#eraserthickness').attr('disabled','disabled'); 
    $('.brushcontrol').show();
    $('.erasercontrol').hide(); // show/enable brush thickness slider, hide/disable eraser thickness slider
    $('#selectedtool').css('background', color); // update selected tool with new color
  });
  
  $('#thickness').change(function () { // change thickness when size slider changed and update counter
    thickness = $('#thickness').val();
    $('#thickcounter').text(thickness);
  });

  $('#eraserthickness').change(function () { // change eraser thickness when eraser slider changed and update counter
    thickness = $('#eraserthickness').val();
    $('#thickcounter').text(thickness);
  });

  $('#erase').click(function () { // when eraser selected:
    color = 'white'; // set eraser to white
    thickness = $('#eraserthickness').val(); // update thickness
    $('#thickcounter').text(thickness); // change thickness counter to match new thickness
    $(this).removeClass('selected'); // don't select
    $(this).siblings().removeClass('selected'); // deselect colors
    $('#eraserthickness').removeAttr('disabled');
    $('#thickness').attr('disabled','disabled');
    $('.brushcontrol').hide();
    $('.erasercontrol').show(); // show/enable eraser thickness slider, hide/disable brush thickness slider
    $('#selectedtool').css('background', 'url("eraser26.png")'); // update selected tool with eraser icon
    document.body.style.cursor = 'url(eraser16.png), auto'; // change cursor to eraser
  });

  $('#save').click(function () { // fetch canvas url and open in new tab to save
      var dataURL = paintSurface[0].toDataURL('image/png');
      window.open(dataURL);
    });

  $('#clear').click(function () { // clear canvas and start over
    var paintSurface = $('#paintsurface');
    var ctx = paintSurface[0].getContext('2d');
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.lineWidth = 0;
    ctx.clearRect(0,0,960,540); // erase canvas
    ctx.rect(0,0,960,540);
    ctx.stroke();
    ctx.fill(); // make background white instead of tansparent
  });

  $('#addcolor').click(function () { // show color picker to add new color to palette
    $('#colorpicker').show();
  });

  $('#removecolor').click(function () { // remove selected color from color palette and select last palette color
    $('li.selected').remove();
    $('#palette li:last-child').click();
  });

  $('#attachcolor').click(function () { // add picked color to palette, select new color, hide color picker
    var newColor = $('<li></li>');
    newColor.css('background-color', $('#colorpicked').css('background-color')).css('margin', '4px 3px');
    $('#palette').append(newColor);
    newColor.click();
    $('#colorpicker').hide();
  });

  $('#cancelcolor').click(function () { // close color picker without changign anything
    $('#colorpicker').hide();
  });

  $('.colorslider').change(function () { // update picked color when sliders changed
    var r = $('#redslider').val();
    var g = $('#greenslider').val();
    var b = $('#blueslider').val();
    $('#colorpicked').css('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
  });

  paintSurface.mousedown(function (e) { // if mouse is held down
    lastEvent = e;
    canvasClicked = true;
  }).mouseup(function () { // if mouse is let up
    canvasClicked = false;
  }).mouseleave(function () { // if mouse leaves canvas, interpret as if mouse is up
    paintSurface.mouseup();
  });

  paintSurface.mousemove(function (e) { // draw if mouse is down over canvas
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