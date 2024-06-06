

$.checkstatus = function (id,flag) {
    var dataa;
    let token = JSON.parse(localStorage.getItem("token"));
    // console.log(flag);
    let currentstatus = id;

    var test = $.test();

    if (flag) {
      
        $.ajax({
            url: `${[test[0].url]}/gate/getAll?id=${id}`,
            // async: false,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
              },
            success: function (data,status,xhr) {
                if(xhr.status == 200)
                {
                    currentstatus = data.data[0].status.code;

                    $.ajax({
                        url: `${[test[0].url]}/status/get`,
                        // async: false,
                        type: "GET",
                        headers: {
                            'Authorization': 'Bearer ' + token,
                          },
                        success: function (data,status,xhr) {
                
                
                            if(xhr.status == 200){
                            for(let i = 0 ; i < data.data.length ; i++)
                            {
                                // console.log();
                                // console.log(data.data[i].code);
                                // console.log(data.data[i].label);
                
                                $a=$(`<a class="stats" >${data.data[i].label}</a>`);
                                if (currentstatus == data.data[i].code) {
                                    $a.addClass("active")
                                }
                                $("#bread").append($a);
                            }
                        }
                        else{
                
                            $.errorMessage(xhr.responseJSON.message);
                       }
                            
                        },
                        error: function (xhr) {
                            if(xhr.status == 498){
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
                }
               else{
                    $.errorMessage(xhr.responseJSON.message)
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
    }

    // console.log(currentstatus);
    
}
