$(document).ready(() => {

  const token = JSON.parse(localStorage.getItem("token"));
  // Retrieve roles from sessionStorage
  var sessionString = sessionStorage.getItem('roles');
  var roles = JSON.parse(sessionString);
  var test = $.test(); // Replace with your own logic

  // Assign rolecode and role_description to input fields
  var role = $("#form6Example1").val(roles.rolecode);
  var des = $("#form6Example5").val(roles.role_description);

  // Submit form
  $("#form").submit((e) => {
    e.preventDefault();

    // Make AJAX call to update the role

    $.ajax({
      type: "PUT",
      url: `${[test[0].url]}/rolemaster/updaterole/${roles.roleid}`,
      dataSrc: "",
      data: JSON.stringify({
        "rolecode": role[0].value,
        "role_description": des[0].value,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      success: function (data, status, xhr) {

        if(xhr.status == 200)
        {

          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
            },
            buttonsStyling: false
          });
  
          swalWithBootstrapButtons.fire({
            title: 'User updated',
            icon: 'success',
            confirmButtonText: 'OK',
            reverseButtons: true
          }).then((result) => {
            // Redirect to roles.jsp page
            window.open("../template/roles.jsp", "_self");
          });
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
    });
  });

  // Cancel button click event
  $(".cancel").click(() => {
    // Redirect to roles.jsp page
    window.open("../template/roles.jsp", "_self");
  });
});
