var handler = document.querySelector('.handler');
var wrapper = handler.closest('.container-fluid');
var boxA = wrapper.querySelector('.box');
var isHandlerDragging = false;

document.addEventListener('mousedown', function(e) {
    if (e.target === handler) {
      isHandlerDragging = true;
    }
  });

  document.addEventListener('mousemove', function(e) {
    // Don't do anything if dragging flag is false
    
    if(window.getComputedStyle(boxA).width<="700px" )
      {
        $("#form1").removeClass("col-md-6");
        $("#form2").removeClass("col-md-6");
        $("#form3").removeClass("col-md-6");
        $("#form4").removeClass("col-md-6");
        $(".hr").css("display" , "none");
      }
      else if(window.getComputedStyle(boxA).width>="701px")
      {
        $("#form1").addClass("col-md-6");
        $("#form2").addClass("col-md-6");
        $("#form3").addClass("col-md-6");
        $("#form4").addClass("col-md-6");
        $(".hr").css("display" , "inline-block");
      }

    if (!isHandlerDragging) {
      return false;
    }

    var containerOffsetLeft = wrapper.offsetLeft; 

    // Get x-coordinate of pointer relative to container
    var pointerRelativeXpos = e.clientX - containerOffsetLeft;
    
    // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
    var boxAminWidth = 700;

    // Resize box A
    // * 8px is the left/right spacing between .handler and its inner pseudo-element
    // * Set flex-grow to 0 to prevent it from growing
    boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos)) + 'px';
    boxA.style.flexGrow = 0;

    document.addEventListener('mouseup', function(e) {

      if (e.target != handler) {
        isHandlerDragging = false;
      }
        // Turn off dragging flag when user mouse is up
        // isHandlerDragging = false;
    });

   })

   //<-- for view image -->
   function upload(){
    var imgcanvas = document.getElementById("canvas1");
    var fileinput = document.getElementById("inputimg");
    var image = new SimpleImage(fileinput);
    image.drawTo(imgcanvas);
  }

  