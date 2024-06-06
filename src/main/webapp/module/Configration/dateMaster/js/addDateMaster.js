$(document).ready(() => {
  const token = JSON.parse(localStorage.getItem("token"));
  // $("form")[0].reset();
  let test = $.test();

  $("#saveDate").click(function (e) {
    
    e.preventDefault();
    
    $("#exampleModalCenter").modal('toggle');
    
    var dateString = $("#date").val();
   

    $.ajax({
      url: `${[test[0].url]}/dateFormat/add`,
      method: "POST",
      data: JSON.stringify({
        dateFormat: dateString,
      }),

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },

      success: function (data, status, xhr) {
        console.log(data);

        if (xhr.status == 200) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false
            })


            swalWithBootstrapButtons.fire({
                title: 'Add Date',
                icon: 'success',
                confirmButtonText: 'OK',
                reverseButtons: true
            }).then((result) => {

                window.open("../template/dateMaster.jsp", "_self")
            })
        }
        else {

            $.errorMessage(xhr.responseJSON.message);
        }


    },
    error: function (xhr) {
        if (xhr.status == 498) {
            $.tokenError();
        }
        else if (xhr.status >= 400 && xhr.status < 500) {

            $.errorMessage(xhr.responseJSON.message);
        }
        else {
            $.errorMessage(xhr.responseJSON.error)
        }
    },
    });

  })
  $("#saveDate").click(function () {
    $("#exampleModalCenter").modal("hide");
});
});

