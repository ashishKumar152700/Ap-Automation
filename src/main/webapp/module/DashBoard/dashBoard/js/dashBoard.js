$(document).ready(function () {

  const token = JSON.parse(localStorage.getItem("token"))


  $(window).load(()=>{
    $('#year').trigger("change")

    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

      $("#selected-date").val(oneMonthAgo.toLocaleDateString('en-CA').split("-").reverse().join("-"))
      $("#selected-date2").val(new Date().toLocaleDateString('en-CA').split("-").reverse().join("-"))


      $("#search_invoices").trigger("click")
  })



  let inlineDatepicker = null;
  let inlineDatepicker2 = null;
  let count = 0;


    $("#selected-date").click(function () {
      if (!inlineDatepicker) {
        inlineDatepicker = flatpickr("#inline-datepicker", {
          inline: true,
          dateFormat: "d-m-Y",
          onClose: function (selectedDates, dateStr, instance) {
            console.log(selectedDates.length > 0);
            console.log(dateStr);
            console.log(instance);
            if (selectedDates && selectedDates.length > 0) {
              const selectedDate = selectedDates[0];
              const selectedDateFormatted = instance.formatDate(selectedDate, "d-m-Y");
              $("#selected-date").val(selectedDateFormatted);
              inlineDatepicker.destroy();
              inlineDatepicker = null;
            }
          },
        });
        inlineDatepicker.open();
      }
    });
    
    $("#selected-date2").click(function () {
      if (!inlineDatepicker2) {
        inlineDatepicker2 = flatpickr("#inline-datepicker2", {
          inline: true,
          dateFormat: "d-m-Y",
          onClose: function (selectedDates, dateStr, instance) {
            console.log(selectedDates.length > 0);
            console.log(dateStr);
            console.log(instance);
            if (selectedDates && selectedDates.length > 0) {
              const selectedDate = selectedDates[0];
              const selectedDateFormatted = instance.formatDate(selectedDate, "d-m-Y");
              $("#selected-date2").val(selectedDateFormatted);
              inlineDatepicker2.destroy();
              inlineDatepicker2 = null;
            }
            else if(count > 0){

            }
            else{
              // inlineDatepicker.destroy();
              // inlineDatepicker = null;
            }
          },
        });
        inlineDatepicker2.open();
      }
    });

    $(document).mouseup(function (e) {

      // const container = $("#inline-datepicker2");
      // console.log($(e.target)); 
      if ($(e.target).hasClass("flatpickr-prev-month") || $(e.target).hasClass("flatpickr-monthDropdown-months") || $(e.target).hasClass("cur-year") || $(e.target).attr("version") || $(e.target).hasClass("arrowUp") || $(e.target).hasClass("arrowDown") || $(e.target).hasClass("flatpickr-current-month") || $(e.target).hasClass("flatpickr-next-month")) {
        
      }
      else{
        if (inlineDatepicker) {
          inlineDatepicker.destroy();
          inlineDatepicker = null;
        }
        else if(inlineDatepicker2){
          inlineDatepicker2.destroy();
          inlineDatepicker2 = null;
        }
      }
    });



   

  

    // Populate year drop-down with options
    var currentYear = new Date().getFullYear();
    for (var i = currentYear; i >= 1900; i--) {
      $('#year').append($('<option>', {
        value: i,
        text: i
      }));
    }
    
    // Event listener for year selection
    $('#year').change(function() {
      
      var selectedYear = $('#year').val();
      populateMonthDropdown(selectedYear);
    });
  
    // Function to populate month drop-down based on selected year
    function populateMonthDropdown(year) {
      $('#month').empty(); // Clear existing options
      var currentDate = new Date();
      var lastMonth = 11;
  
      if (currentDate.getFullYear() == year) {
        lastMonth = currentDate.getMonth();
      }
  
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      for (var j = 0; j <= lastMonth; j++) {
        $('#month').append($('<option>', {
          value: j,
          text: months[j]
        }));
      }
    }
  
    // Event listener for button click
    $('#fetchDates').click(function() {
      var selectedYear = $('#year').val();
      var selectedMonth = $('#month').val();
  
      // Fetch current date and last date
      var currentDate = new Date();
      var lastDate = new Date(selectedYear, selectedMonth, 0);
  
      // Format dates as needed
      var currentDateString = currentDate.toISOString().split('T')[0];
      var lastDateString = lastDate.toISOString().split('T')[0];
  
      // Display dates
      console.log('Current Date:', currentDateString);
      console.log('Last Date:', lastDateString);
    });



    $(window).load(()=>{
      $('#yeardropdown').trigger("change")
    })
  
    // For Gate Entry View 
    var currentYear1 = new Date().getFullYear();
    for (var i = currentYear1; i >= 1900; i--) {
      $('#yeardropdown').append($('<option>', {
        value: i,
        text: i
      }));
    }
  
    // Event listener for year selection
    $('#yeardropdown').change(function() {
      var selectedYear1 = $('#yeardropdown').val();
      populateMonthDropdown1(selectedYear1);
    });
  
    // Function to populate month drop-down based on selected year
    function populateMonthDropdown1(yeardropdown) {
      $('#monthdropdown').empty(); // Clear existing options
      var currentDate1 = new Date();
      var lastMonth1 = 11;
  
      if (currentDate1.getFullYear() == yeardropdown) {
        lastMonth1 = currentDate1.getMonth();
      }
  
      var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      for (var j = 0; j <= lastMonth1; j++) {
        $('#monthdropdown').append($('<option>', {
          value: j,
          text: month[j]
        }));
      }
    } 
  
    // Event listener for button click
    $('#fetchDatesdropdown').click(function() {
      var selectedYear1 = $('#yeardropdown').val();
      var selectedMonth1 = $('#monthdropdown').val();
  
      // Fetch current date and last date
      var currentDate1 = new Date();
      var lastDate1 = new Date(selectedYear1, selectedMonth1, 0);
  
      // Format dates as needed
      var currentDateString1 = currentDate1.toISOString().split('T')[0];
      var lastDateString1 = lastDate1.toISOString().split('T')[0];
  
      // Display dates
      // console.log('Current Date:', currentDateString1);
      // console.log('Last Date:', lastDateString1);
    });

    

    // Retrieve the URL for the [test[0].url]
    var test = $.test()

    // Make an AJAX request

    




    $("#search_invoices").click(()=>{


      if($("#selected-date").val() == "")
        {

            const today = new Date();
            const oneMonthAgo = new Date(today);
            oneMonthAgo.setMonth(today.getMonth() - 1);

            const formattedDate = oneMonthAgo.toISOString().split('T')[0];
            // console.log(formattedDate);

            $("#selected-date").val(formattedDate.split("-").reverse().join("-"))
            
        }
        if($("#selected-date2").val() == "")
        {
            $("#selected-date2").val((new Date()).toISOString().split('T')[0].split("-").reverse().join("-"))
            
        }


        console.log(`${[test[0].url]}/gate/reporting/asonorder?startDate=${$("#selected-date").val()}&endDate=${$("#selected-date2").val()}&unitName=${$("#user_unit").val()}&storeId=${$("#unit_store").val()}`);

    $.ajax({
        url: `${[test[0].url]}/gate/reporting/asonorder?startDate=${$("#selected-date").val()}&endDate=${$("#selected-date2").val()}&unitName=${$("#user_unit").val()}&storeId=${$("#unit_store").val()}`,
        datasrc: "data",
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        success: function (data,status,xhr) {

          console.log(data);
          if(xhr.status == 200)
          {
            var result = data.data;
            var temp = ["primary", "info", "navy", "success", "warning" , "danger" , "warningg" , "infoo"];
            var pie = ["#7ed6df", "#D0F5BE", "#FAE392", "#20c997" , "#f8ac5975" , "#FFEADD" , "#E59866" , "#95A5A6"];


            console.log("result: " , result);

            result = result.sort((a, b) => a.code - b.code);
            
  
            // result = result.filter((value)=> 
            // {
            // if(value.code == 100 || value.code == 150 || value.code == 200 || value.code == 300 || value.code == 400 || value.code == 1000){
            //   return value
            // }

            // }
            // );

            if(count > 0)
            {
              $("#apiData").empty()
            }
  
            // Loop through the result data and generate HTML elements 
            result.map((item, key) => {
  
                // Append the generated HTML elements to the "apiData" element 
                $("#apiData").append( 
                    `<div class="col-lg-3"> 
                        <div class="ibox float-e-margins">
                            <div class="ibox-title px-2" style="background:${pie[key]}">
                                <div class="ibox-tools">
                                </div>
                                <span class="pull-right"></span>
                                <h5>${item.label}</h5> 
                            </div>
                            
                            
                            <div class="ibox-content py-2 px-2">
                                <div class="flexCenter">
                                    <h2 class="no-margins">${item.active}</h2>
                                </div>
                           
                                <div class="flexCenter">
                                    <h5 class="no-margins">Total</h5>
                                    <div class="stat-percent font-bold text-${temp[key]}">${item.total} <i class="fa fa-bolt"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>`
                )
            })
          }
          else{

              $.errorMessage(xhr.responseJSON.message);
        }
        

        },
        complete : ()=>{

            count++;
        },
        error: function (xhr) {

          count++;
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

    })

  })
})
