


$(document).ready(()=>{



  
  // console.log(userRole);

  let token = JSON.parse(localStorage.getItem("token"));


  var test = $.test();
  let menus_data = $.menus()

  // console.log('menu_data ---->' ,menus_data);

  // console.log("test : ",test);

  $.fn.sidemenu = function(options) {

    let fillUL = function(jsonCode, dest,depth) {

      
      let i = 0, $a=null,$div;
      if (jsonCode instanceof Array) {
        for (i = 0; i < jsonCode.length; i += 1) {
          let $LI = $('<li class="main"></li>');
          $div=$(`<a class="sub-child down"></a>`);
          $namea = $(`<a></a>`)
          $div.css({

          }); 

          if(jsonCode[i].link!=null && jsonCode[i].icon == null) {  
             
            $div.attr('href',jsonCode[i].link);   
            $div.text(jsonCode[i].name);
            $LI.append($div);
            
          } else if (jsonCode[i].icon !=null && jsonCode[i].link != null){   
           
            let menuRoles = jsonCode[i].assignroles.map((value)=>value.rolecode)
            // // console.log(jsonCode[i].assignroles);
            
            let values = userRole.map((value)=> menuRoles.includes(value))
            
            // console.log(values.includes(true));
            // console.log(userRole.includes(...menuRoles.map((value)=>value)));
            // if(jsonCode[i].assignroles[0].rolecode == userRole[0] || userRole[1] || userRole[2] || userRole[3] ){
            if(values.includes(true) ){
              
              $sp = `<span class="nav-label">${jsonCode[i].name}</span>`;
              $div.attr('href',jsonCode[i].link);
              $div.append($sp)
              $LI.append($div)  
            }
            
          }
          else {
            try {

              

              let menuRoles = jsonCode[i].assignroles.map((value)=>value.rolecode)
              // // // console.log(jsonCode[i].assignroles);
              

              let values = userRole.map((value)=> menuRoles.includes(value))
              
              // console.log(values.includes(true));
              // console.log(userRole.includes(...menuRoles.map((value)=>value)));
             
            if( jsonCode[i].assignroles[0] == undefined  || values.includes(true) ){
              $ULd = $(`<span class="fa arrow"></span>`)
              $namespan = jsonCode[i].name
              if (jsonCode[i].parentId == 0){
                  $namespan = $(`<span class="nav-label">${jsonCode[i].name}</span>`)
              }
              $div.append($namespan);
              $div.append($ULd);
              $LI.append($div);
            }
          }
          catch (error) {
              console.log(error);
          }

                }
                if (typeof jsonCode[i].icon !=='undefined') {
                  
                  if (jsonCode[i].parentId == 0) {
                    $i = (`<i class="${jsonCode[i].icon}"></i>`)
                    $div.prepend($i);
                    $namea.prepend($i);
                  }
                fillLI(jsonCode[i], $LI, depth);
                dest.append($LI);
                }
              }
      }
    };
    let fillLI = function(jsonCode, dest, depth) {
      
      if (typeof jsonCode === 'object') {
        if (jsonCode.children != undefined) {
          dest.on('click', function(e) {
          });

          if(jsonCode.icon != null && jsonCode.link == null){

          let level = ""
          if(jsonCode.parentId != 0)
          {
            level = "nav nav-third-level collapse"
          }
          else{
            level = "nav nav-second-level collapse"
          }
          
            let $UL = $(`<ul class="${level}"></ul>`)
            fillUL(jsonCode.children, $UL,depth+1);
            dest.append($UL);
          }  
        }
      }
    };

    let sessionStringes = localStorage.getItem("userrole")

    let userRole = JSON.parse(sessionStringes) || [];

    
   
   if (userRole.includes("USER") || userRole.includes("STORE") || userRole.includes("Voucher") || userRole.includes("GATE") || userRole.includes("FINANCE") || userRole.includes("QUALITY") || userRole.includes("Admin") || userRole.includes("Unload") || userRole.includes("Training") || userRole.includes("Flaw Fix") || userRole.includes("Visitor")) {


            

            fillUL(menus_data, $('.sidemenu'),1);
            jQuery(".sidemenu").metisMenu().show()
    

      
    //   $.ajax({
    //     url:`${[test[0].url]}/menumaster/menus`,
    //     headers: {
    //       'Authorization': 'Bearer ' + token,
    //     },
    //     success : function(data,status,xhr) {
    //       if(xhr.status == 200)
    //       { 
            
    //         fillUL(data.data, $('.sidemenu'),1);
    //         jQuery(".sidemenu").metisMenu().show()
    //       }
    //     },
    //     error: function(xhr){
    //       setTimeout(() => {
    //         if(xhr.status == 498)
    //         {
    //           $.tokenError();
    //         }
    //         else if(xhr.status >= 400 && xhr.status < 500){

    //           $.errorMessage(xhr.responseJSON.message);
    //         }
    //         else{
    //           $.errorMessage(xhr.responseJSON.error)
    //         }
    //       }, 500);

    //     },
    // })

      // $.ajax({
      //     url:`${[test[0].url]}/menumaster/menus`,
      //     headers: {
      //       'Authorization': 'Bearer ' + token,
      //     },
      //     complete:function(){
      //         // jQuery(".sidemenu").metisMenu().show();    
      //     }
      // })

    }
    else{
      // window.location.href = "/module/Basic/template/404.jsp"
    }


    
    
    
    
    return this;
  }

  let sessionStringg = localStorage.getItem('username');
  let username  = JSON.parse(sessionStringg);
  $(".name")[1].innerText = username; 

  $("#menulist").sidemenu();



  




  $(".log_out").click(()=>{

    $.ajax({
      url : `${[test[0].url]}/auth/signout`,
      method : `POST`,
      headers: {
        'Authorization': 'Bearer '+ token,
      },
      success : function(data,status,xhr){
        
          localStorage.clear();
          sessionStorage.clear();
          handleSignOut()
          window.open(`/ap_automation/module/Login/template/login.jsp` , "_self")
      },
      error: function(xhr){
             
        if(xhr.status == 498)
        {
          $.tokenError();
        }
        else{
          localStorage.clear();
          sessionStorage.clear();
          handleSignOut()
          window.open(`/ap_automation/module/Login/template/login.jsp` , "_self")
        }
                
              // localStorage.clear();
              // sessionStorage.clear();
            }
    })
  })


})


      


      
      




      