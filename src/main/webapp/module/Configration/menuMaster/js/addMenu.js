$(document).ready(() => {

  const token = JSON.parse(localStorage.getItem("token"))
  var parentData = [];
  var test = $.test();
  function call(){
    $("#roleCode").filterMultiSelect();
  }



  $.ajax({
    url: `${[test[0].url]}/rolemaster/roles`,
    headers : {
      "Authorization" : `Bearer ${token}`
    },
    success: function (data, status, xhr) {
     if(xhr.status == 200)
     {
       data.data.map(value => {
         $("#roleCode").append(`<option value="${value.rolecode}">${value.rolecode}</option>`)
         $("#roleCode").attr("multiple", "")
       })
       call();
     }
     else{

      $.errorMessage(xhr.responseJSON.message);
    }
    
    },
    error: function (xhr) {
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

  let all_menus = []


  $.ajax({
    // url: `${test[0].url}/menumaster/menus`,
    url: `${test[0].url}/menugetmaster/menu`,
    headers : {
      "Authorization" : `Bearer ${token}`
    },
    success: function (data, status, xhr) {

      if(xhr.status == 200)
      {
        // parentData = data.data;
        parentData = JSON.parse(data.data[0].menu_data);
        console.log(data);

        let menu_data = JSON.parse(data.data[0].menu_data)

        menu_data.forEach((value) => {
          console.log(value.id);
          all_menus.push(value.sorting)
          $("#parentid").append(
            `<option value="${value.id}">${value.name}</option>`
          );
        });
      }
      else{

        $.errorMessage(xhr.responseJSON.message);
      }
      
      // call(); // Call the 'call' function
    },
    error: function (xhr) {
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
  // Initialize the filterMultiSelect plugin
  // function call() {
  //   $("#parentid").filterMultiSelect({
  //     placeholderText: "No ParentId Selected",
  //   });
  // }

  $("#menu_type").change(function () {
    if ($("#menu_type").val()=="Parent") {

      $("#icon").removeAttr("readonly")
      
      let menuorder = Math.max(...all_menus);
      $("#parentid").attr("disabled","disabled");
      $("#parentid").val("0");
      $("#sorting").attr("value",menuorder+1)
      $("#sorting").attr("readonly","readonly")

      $("#link").attr("readonly","readonly")
      $("#link").attr("value","")
      $("#link").attr("placeholder","")
      
    }else if($("#menu_type").val()=="Child"){
      $("#parentid").removeAttr("disabled")
      $("#sorting").attr("value","")
      $("#link").removeAttr("readonly")
      
      $("#icon").attr("readonly","readonly")
      $("#icon").attr("value","")
      $("#icon").attr("placeholder","")
      $("#sorting").attr("value","")
      $("#sorting").attr("readonly","readonly")
      $("#sorting").attr("placeholder","")
    }else if($("#menu_type").val()=="PC"){
      $("#link").removeAttr("readonly")
      $("#icon").removeAttr("readonly")

      let menuorder = Math.max(...all_menus);
      $("#parentid").attr("disabled","disabled");
      $("#sorting").attr("value",menuorder+1)
      $("#sorting").attr("readonly","readonly")
    }
    
  });

  function loadChildOptions(parentId) {
    var selectedParent = [];
    for (i = 0; i < parentData.length; i++) {
      if (parentData[i].id == parentId) {
        selectedParent = parentData[i];
        break;
      }
    }

    console.log(selectedParent);

    if (selectedParent) {
      var childOptions = selectedParent.children;
      console.log(childOptions);
    }
  }

  $("#form").submit(function (e) {

    $("#loader").addClass("ibox-content")
    $("#loader").addClass("sk-loading")
    $("#spin").removeClass("d-none")
    var array = [];

    var assignroles = [];

            var span = $(".item");

            span.map((index, value) => {
            rolecode = value.innerText.split("\n")[0];
            assignroles.push({ rolecode })
            });

    e.preventDefault();
    $(".item").map((index, value) => {
      array.push(value.innerText.split("\n")[0]);
    });

    var menuname = $("#menuname").val();
    var icon = $("#icon").val();
    var link = $("#link").val();
    var sorting = $("#sorting").val();
    let parentId;
    if ($("#parentid").val() == null) {
      parentId = 0;
    }else{
      parentId = $("#parentid").val();
    }

    $.ajax({
      type: "POST",
      url: `${test[0].url}/menumaster/addmenu`,
      data: JSON.stringify({
        name: menuname,
        icon: icon,
        link: link,
        parentId: parentId,
        sorting: sorting,
        assignroles:assignroles
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      success: function (data, status, xhr) {
        console.log(data);

        if (xhr.status == 200) {


          $("#loader").removeClass("ibox-content")
          $("#loader").removeClass("sk-loading")
          $("#spin").addClass("d-none")

          window.open("menu.jsp", "_self");
          
        }
        else{

          $("#loader").removeClass("ibox-content")
          $("#loader").removeClass("sk-loading")
          $("#spin").addClass("d-none")

          $.errorMessage(xhr.responseJSON.message);
        }
       
      },
      error: function (xhr) {

        $("#loader").removeClass("ibox-content")
        $("#loader").removeClass("sk-loading")
        $("#spin").addClass("d-none")

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
      },
    });
    
  });

  $(".cancel").click(() => {
    window.open("menu.jsp", "_self");
  });
});
