$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));
    var test = $.test();
    // Function to handle form submission
    $('#form').submit(function(e) {
        e.preventDefault();

        // Retrieve values from form inputs
        var role = $("#form6Example1").val();
        var des = $("#form6Example5").val();

        // Perform AJAX request to add a new role
        $.ajax({
            type: "POST",
            url: `${[test[0].url]}/rolemaster/addrole`,  // Use a relative URL instead of relying on 'test' variable
            data: JSON.stringify({
                rolecode: role,
                role_description: des,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            success: function(data, status, xhr) {
                console.log(xhr.status);
                console.log(data);

                if (xhr.status == 200) {
                    window.open("../template/roles.jsp", "_self");
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

    // Handle cancel button click
    $(".cancel").click(() => {
        window.open("../template/roles.jsp", "_self");
    });

    // Fetch existing roles
    $.ajax({
        url: `${[test[0].url]}/rolemaster/roles`,  // Use a relative URL instead of relying on 'test' variable
        headers: {
            'Authorization': 'Bearer '+ token
        },
        success: function(data,status,xhr) {
            if(xhr.status == 200)
            {
                var roles = data.data;
                roles.map(value => {
                    $("#countries").append(`<option value="${value.rolecode}">${value.rolecode}</option>`);
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
