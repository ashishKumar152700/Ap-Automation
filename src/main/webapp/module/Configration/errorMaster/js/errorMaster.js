$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
      $("form")[0].reset();
      var test = $.test();
  
    
      $('#form1').submit(function (e) {
        e.preventDefault()
  
         
          // console.log(fav_language);
          
          var errorcode = $("#errorcode").val()
          var errordescription = $("#errordescription").val()
          var errortype = $("#errortype").val()
          var errorresolution = $("#errorresolution").val()
  
      
  
          $.ajax({
              url: `${[test[0].url]}/errorMsg/add`,
              type: "POST",
              data: JSON.stringify({
                error_code:errorcode ,
                error_description: errordescription ,
                error_type: errortype ,
                error_resolution: errorresolution,
              
              }),
  
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ token
              },
  
              success: function (data, status, xhr) {
              
                if (xhr.status == 200) {
                    window.open("../template/error.jsp", "_self");
                    $("form")[0].reset();
                }
                else{
                    console.log(xhr.status);
                    $.errorMessage(xhr.responseJSON.message);
                    $("form")[0].reset();
                }
                
            },
  
              error: function (xhr, httpStatusMessage, customErrorMessage) {
  
                if(xhr.status == 498)
                {
                    $.tokenError();
                }
                else if(xhr.status >= 400 && xhr.status < 500){
  
                  $.errorMessage(xhr.responseJSON.message);
                  $("form")[0].reset();
                }
                else{
                  $.errorMessage(xhr.responseJSON.error)
                  $("form")[0].reset();
                }
              }
          });
  
      });
  
     
      
      $(".cancel").click((e) => {
          e.preventDefault();
          window.open("../template/error.jsp", "_self");
      })
  
  });
  