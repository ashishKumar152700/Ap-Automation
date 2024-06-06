
$(document).ready(()=>{

  const token = JSON.parse(localStorage.getItem("token"));

  var test = $.test()

  $(".reveal").on('click',function() {
    var $pwd = $("#jdePassword");
    if ($pwd.attr('type') === 'password') {
        // alert("hi")
        $pwd.attr('type', 'text');
        $('#show i').removeClass( "fa-eye-slash" );
        $('#show i').addClass( "fa-eye" );
    } else {
        $pwd.attr('type', 'password');
        
        $('#show i').addClass( "fa-eye-slash" );
        $('#show i').removeClass( "fa-eye" );
    }
});


  $("#type").filterMultiSelect({
      placeholderText: "No Type Selected",
    });
      


  
  $("#env").filterMultiSelect({
    placeholderText: "No Enviornment Selected",
  });
  
  $('#form').submit(function(e){
    // var array = [];
    
    e.preventDefault();
    $("#type .item").map((index,value)=>{
      array1 = value.innerText.split("\n")[0];
    })
    
    $("#env .item").map((index,value)=>{
      array2 = value.innerText.split("\n")[0];
    })
    var url= $("#jdeUrl").val()
    var user = $("#jdeUser").val()
    var password= $("#jdePassword").val()
    var checkbox = $("#url_active")[0].checked
    

    $.ajax({
    type: "POST",
    url: `${[test[0].url]}/configmaster/addconfig`,
    data: JSON.stringify({
         url: url,
         username: user,
        password: password,
        url_active: checkbox,
        type : array1,
        env : array2,
      }),
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
    success: function(data,status,xhr) {

      console.log(xhr);

    if (xhr.status==200)
    {
      // console.log(data);
    window.open("config.jsp" ,"_self"); 
    }
    else{
          $.errorMessage(xhr.responseJSON.message);
    }
 
    },
    error: function(xhr){

      console.log(xhr);
      if(xhr.status == 498)
      {
          $.tokenError();
      }
      else if(xhr.status >= 400 && xhr.status < 500){

            $.errorMessage(xhr.responseJSON.message);
      }
      else{
            $.errorMessage(xhr.responseJSON.error)
      }
    }
      
    });
    });


    $(".cancel").click(()=>{
        window.open("config.jsp" , "_self");
    })

    

   

    })
 

         