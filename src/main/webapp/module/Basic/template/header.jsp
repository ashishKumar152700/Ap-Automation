<link rel="stylesheet" href="/module/Basic/css/style.css" />

<div class="modal inmodal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document" >
    <div class="modal-content">
      <div class="modal-header text-left">
          <div class="form-group row ">
            <div class="col-12 d-flex justify-content-start flex-column align-item-start">
            <label class="labelling">New Password*</label>
            <div class="input-group">
                  <input type="password" placeholder="New Password"class="form-control pwd" id="password1" required="" >
                  <span class="input-group-btn">
                    <button class="btn btn-default reveal" id="show" type="button"><i class="fa fa-eye-slash"></i></button>
                  </span>
                </div><br>
                <label class="labelling">Confirm Password*</label>
                <div class="input-group">
                <input type="password" placeholder="Confirm Password" class="form-control pwd1" id="password2" required="">
                <span class="input-group-btn">
                  <button class="btn btn-default reveal1" id="show1" type="button"><i class="fa fa-eye-slash"></i></button>
                </span>  
              </div>

              
              <div id="errorText" class="mt-2"></div>
            </div>
            </div>
            
        <button type="button" class="close d-none" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary mb-2" data-dismiss="modal" id="modal_close">Close</button>
        <button type="button" class="btn btn-primary mb-2" onclick="validatePasswords()" >Save Password</button>
      </div>
    </div>
  </div>
</div>


<nav class="navbar-default navbar-static-side" role="navigation">
  <div class="sidebar-collapse">
    <ul class="nav metismenu" id="side-menu">
      <li class="nav-header">
        <div class="dropdown profile-element">
          <div class="infont text-center">
            <i class="fa fa-user-circle name" aria-hidden="true"></i>
          </div>
          <span class="block m-t-xs font-bold name text-center"></span>
        </div>
        <div class="logo-element mx-2">
          <div class="infont col-md-3 col-sm-4">
            <a href=""><i class="fa fa-user-circle" aria-hidden="true"></i></a>
          </div>
        </div>
      </li>
      <li id="menulist" class="nav metismenu sidemenu"></li>
    </ul>
  </div>
</nav>

<div id="page-wrapper" class="gray-bg dashbard-1">
  <nav
    class="navbar navbar-fixed-top"
    role="navigation"
    style="margin-bottom: 0"
  >
    <div class="navbar-header">
      <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" href="#"
        ><i class="fa fa-bars"></i>
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;

        <video id="video" autoplay loop muted>
          <source src="/module/images/rsb_logo_video.mp4" type="video/mp4">
        </video>
    </div>

   
   
    <ul class="nav navbar-top-links navbar-right">
     
      <li class="d-none">
          <input type="button" value="DB Update" class="btn btn-primary mr-3" id="db_update">
      </li>
      <li>
        <span class="m-r-sm text-muted welcome-message"> Welcome to DIGI-GRN  </span>
    </li>

      <li class="dropleft">
        <a class="dropdown-toggle count-info d-flex justify-content-around align-items-baseline" data-toggle="dropdown" href="#">
          <i id="power" class="fa fa-power-off"></i>
          <label for="power" class="mr-1">Logout</label>
        </a>
        <ul class="dropdown-menu dropdown-alerts">

            <li >
                <a class="log_out">
                    <i class="fa fa-sign-out"></i> Log out
                </a>
            </li>
            <li class="dropdown-divider"></li>
          
        </ul>
    </li>
    </ul>
  </nav>
  <script src="/static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
  <script src="/module/Configration/js/globalConfig.js"></script>
  <script src="/module/Basic/js/jquery.menu.js"></script>

  <script>

    var test = $.test();
    var username = JSON.parse(localStorage.getItem('username')); 
    var token = JSON.parse(localStorage.getItem('token'));





    $("title").html() == "DashBoard" ? $(".dropdown-alerts").prepend(`<li ><a  data-toggle="modal" data-target="#exampleModalCenter" ><i class="fa fa-sign-out"></i>Change Password</a></li>`) : "";

    // To make the menu bar fixed

    $("body").addClass('fixed-sidebar');
    $("body").addClass('fixed-nav');
    $("body").addClass('fixed-nav-basic');
            // $('.sidebar-collapse').slimScroll({
            //     height: '100%',
            //     railOpacity: 0.9,
            //     display : "block"
            // });

              $("#db_update").click(()=>{

                if(JSON.parse(localStorage.getItem("userrole")).includes("Admin")){
                  console.log( " roles " ,sessionString);
                  // alert("authorized")
                  window.open('/module/GateEntry/DB_Update/template/gate.jsp')
                }
                else{
                  $.errorMessage("You are not authorized to access this page")
                  
                }

                

              })

    

            let lastKnownScrollPosition = 0;
            let ticking = false;

            // (()=>{
            //   console.log('hello');
            //   window.screenY = 0;
            // })()

          

            document.addEventListener("scroll", (event) => {
              lastKnownScrollPosition = window.scrollY;
              
              // console.log('scroll ---->' ,window.scrollY);

              if(window.scrollY <= 0)
              {
                ticking = false
                }
                else{
                  ticking = true;
                }
                
                // console.log('tickling ---->' ,ticking);
                // console.log('scroll y ---->' ,window.scrollY);

                if($("title").html() != "Invoice Training" && $("title").html() != "Remap Invoice" )
                {
                  if (ticking) {
                    
                    $("#dynamic_breadcrumb").addClass("navbar-fixed-topp")
                  }
                  else{
                    $("#dynamic_breadcrumb").removeClass("navbar-fixed-topp")
                  }
                }
                else{
                  $("#dynamic_breadcrumb").removeClass("navbar-fixed-topp")
                }

            });


    $(".reveal").on('click',function() {
                    var $pwd = $(".pwd");
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
                $(".reveal1").on('click',function() {
                    var $pwd1 = $(".pwd1");
                    if ($pwd1.attr('type') === 'password') {
                        // alert("hi")
                        $pwd1.attr('type', 'text');
                        $('#show1 i').removeClass( "fa-eye-slash" );
                        $('#show1 i').addClass( "fa-eye" );
                    } else {
                        $pwd1.attr('type', 'password');
                        
                        $('#show1 i').addClass( "fa-eye-slash" );
                        $('#show1 i').removeClass( "fa-eye" );
                    }
                });


     function validatePasswords() {
      var password = document.getElementById('password1').value;
      var confirmPassword = document.getElementById('password2').value;
      var errorText = document.getElementById('errorText');
    
    //   Check if both passwords match
        if (password == "" && confirmPassword == "")
            {
                errorText.innerText = "Fields are required"
                errorText.style.color = "red"
                setBorderColors();
                return false;
            }
    
   
      if (password === confirmPassword) {
        errorText.innerText = "Password Matched!";
        errorText.style.color = "green"; 

        // Set success message color
        resetBorderColors(); // Reset border colors (in case they were previously showing an error)

        $("#modal_close").trigger("click")

        console.log(token);
        $.ajax({
          url : `${[test[0].url]}/usermaster/updateuser?username=${username}&password=${password}`,
          type : `PUT`,
          headers : {
            'Authorization': 'Bearer '+ token,
          },
          success : function(res,status,xhr) {

            if(xhr.status == 200)
            {
                swal("" , "Successfully Updated" , "success")
            }
            else{

                  $.errorMessage(xhr.responseJSON.message);
              }


          },
          error : function(xhr){
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
        })


      } else {
        errorText.innerText = "Password Not Matched!";
        errorText.style.color = "red"; // Set error message color
        setBorderColors(); // Set border colors to indicate error
      }
    } 
  
    function setBorderColors() {
    $("#password1, #password2").css("border-color", "red");
  }

  function resetBorderColors() {
    $("#password1, #password2").css("border-color", "green" );
  }


  $("#exampleModalCenter").on('hide.bs.modal', function () {
       $("#password1, #password2").css("border-color", "#e5e6e7");
       $("#password1, #password2").val("")
       $("#errorText").html("")
    });


  </script>

  
            
            <!-- <script src="../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script> -->
            
            
            
