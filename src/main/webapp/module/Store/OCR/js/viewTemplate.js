$(document).ready(() => {

    const token = JSON.parse(localStorage.getItem("token"));


    $("#handle").trigger("click")



    
    
   
    
   
    let i = 0;
    let vendorInfo = JSON.parse(sessionStorage.getItem("vendorInfo"));
   
    $("#vendor_code").val(vendorInfo.vendorCode)
    $("#vendor_name").val(vendorInfo.vendorName)
    $("#template_number").val(vendorInfo.vendorTemplate)

    
    fetch(`${[test[0].url]}/ocrtraining/get?supplier=${(vendorInfo.vendorCode)}&template=${(vendorInfo.vendorTemplate)}`,
    {
        headers: {
            'Authorization': 'Bearer '+ token,
          },
    })
        .then(response => response.json())
        .then(res => {

            res.forEach(label => {
 
                if (label.override_taxable_value) {
                  
                    $('#override_taxable_value').prop('checked', true);
                }
              });
            
            res.map((data)=>{
                console.log(data,'data');
                $("#assign_label").append(`<div class="box d-flex mt-1">
             
          
                <input type="text" value="${(data.display_name)}" readonly class="  label form-control mw-100 w-200px variation"  placeholder="Variation">
                <input type="text" class="label form-control mw-100 w-200px variation variation1 d-none"  placeholder="Variation">
                <input type="text" value="${data.boundingPoly.vertices[0].x}" class="form-control d-none startX" placeholder="startX">
                <input type="text" value="${data.boundingPoly.vertices[0].y}" class="form-control d-none startY" placeholder="startY">
                <input type="text" value="${data.boundingPoly.vertices[1].x}" class="form-control d-none endX" placeholder="endX">
                <input type="text" value="${data.boundingPoly.vertices[1].y}" class="form-control d-none endY" placeholder="endY">
          
        
                </div>`)
                $.ajax({
                    url: `${[test[0].url]}/label/labels`,
                    // async:false,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                      },
                    success: function (data, status, xhr) {
                      console.log(data);
                      data.data.map(value => {
                        $(`#label_${i}`).append(`<option value="${value.id}">${value.label_name}</option>`)
                      })
                      $("#handle").trigger("click")
                      // call();
                      // $('.new_labels').select2();
                    },
                    error: function (xhr) {
                        if(xhr.status == 498)
                        {
                            $.tokenError();
                        }
                    }
                    // complete: () => {
                    //   $(".new_labels").filterMultiSelect({
                    //     placeholderText: "Select Label",
                    //     // selectionLimit: 1,
                    //   });
                    //   $(".text-dark").siblings(".mr-2").addClass("d-none")
                    // }
                  })
                  i++;
            })
            
            $("#loader").removeClass("sk-loading");
            $("#loader").removeClass("ibox-content");
            $(".sk-spinner").addClass("d-none");
        }).catch((xhr)=>{
            if(xhr.status == 498)
                {
                    $.tokenError();
                }
        })
        

        $(".img-container").click(()=>{
            $("#handle").trigger("click")
        })

    $(".img-container").dblclick(()=>{
        $("#handle").trigger("click")
    })


    $("#back_invoice").click(()=>{
        window.open("../template/trainingList.jsp","_self")
    })
})


