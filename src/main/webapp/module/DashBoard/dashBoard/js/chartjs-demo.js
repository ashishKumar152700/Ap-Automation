$(function () {

    const token = JSON.parse(localStorage.getItem("token"))

    $(window).load(()=>{
        $("#fetchDatesdropdown").trigger("click")
    })

    var test = $.test();
    var count = 0;
    // Define data for the polar chart
   

    $.ajax({
        url : `${[test[0].url]}/gate/reporting/transaction`,
        headers: {
            'Authorization': 'Bearer ' + token,
          },
          success : function(data,status,xhr)
          {

            let label_data =  data.data.map((value)=>value.ACTIVE)
            let labels =  data.data.map((value)=>value.LABEL)




           
            var polarData = {
                datasets: [{
                    data: label_data,
                    backgroundColor: [ 
                        "#079992", "#b8e994", "#f0932b" , "#dd8e75" , "#7ed6df" , "#A2D9CE" , "#8E44AD" , "#C0392B"
                    ],
                    label: [ 
                        "My Radar chart" 
                    ]
                }],
                labels: labels,
            };
        
            // Configure options for the polar chart
            var polarOptions = {
                segmentStrokeWidth: 2,
                responsive: true,
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        boxWidth: 14,
                        fontSize : 10
                        // usePointStyle: true,
                    },
                }
        
            }; 
        
            // Get the canvas element and initialize a polar chart
            var ctx3 = document.getElementById("polarChart").getContext("2d");
            new Chart(ctx3, {type: 'polarArea', data: polarData, options: polarOptions});
        
          }
          

    })




    // $("#search_invoices").click(()=>{

    //     console.log($("#selected-date").val());
    //     console.log($("#selected-date2").val());
  
    //   })

      var plot;



      var indexing, labeling , donutIndex , donutLabel , donutTotal;


$("#search_invoices").click(()=>{

    $("#loader1").addClass("ibox-content")
    $("#loader1").addClass("sk-loading")
    $("#spin1").removeClass("d-none")

        // $(ctx4).remove();


        


        if(count > 0)
        {
            $("#doughnutChart").remove();
            $("#append_items").append(`<div id="doughnutChart" height="140"></div>`)
            // $("#doughnutChart2").remove();
            // $("#append_items2").append(`<canvas id="doughnutChart2" height="140"></canvas>`)
        }


        console.log($("#selected-date").val());
        console.log($("#selected-date2").val());



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

    $.ajax({
        url: `${[test[0].url]}/gate/reporting/asonorder?startDate=${$("#selected-date").val()}&endDate=${$("#selected-date2").val()}&unitName=${$("#user_unit").val()}&storeId=${$("#unit_store").val()}`,
        datasrc: "data",
        headers: {
            'Authorization': 'Bearer ' + token,
          },
        success: function (data,status,xhr) { 
            // console.log(data.data);
        
    // Define data for the doughnut chart  
    // var doughnutData = { 
    //     labels: [`${data.data[0]?.label}`,`${data.data[1]?.label}`,`${data.data[2]?.label}`,`${data.data[3]?.label}` , `${data.data[4]?.label}` , `${data.data[5]?.label}` , `${data.data[6]?.label}`],
    //     datasets: [{
    //         data: [data.data[0]?.active, data.data[1]?.active , data.data[2]?.active , data.data[3]?.active , data.data[4]?.active , data.data[5]?.active , data.data[6]?.active],
    //         backgroundColor: ["#079992", "#f0932b","#7ed6df","#5C4033","#b8e994" , "#dd8e75" , "#f64941"]
    //     }]  
    // }; 
    
    // // Configure options for the doughnut chart
    // var doughnutOptions = {
    //     responsive: true,
    //     legend: {
    //         display: true,
    //         position: 'right',
    //         labels: {
    //             boxWidth: 14,
    //             fontSize: 10
    //             // usePointStyle: true,
    //         },
    //     }
    // };
 
    // // Get the canvas element and initialize a doughnut chart
    // var ctx4 = document.getElementById("doughnutChart").getContext("2d");
    // new Chart(ctx4, {type: 'doughnut', data: doughnutData, options: doughnutOptions});

            if(xhr.status == 200)
            {
                        // console.log(data.data);

                        console.log('data of dougnut ---->' ,data.data);

                        data.data.sort((a, b) => a.code - b.code)
                        // let overlayWidth = $("#doughnutChart").width();
                        // let newHeight = overlayWidth * 0.80;

                        donutIndex = data.data.map((value)=> value.active)
                        donutLabel = data.data.map((value)=> value.label)
                        donutTotal = data.data.reduce((total, value) => total + value.active, 0)



                        var options = {
                            chart: {
                              type: 'donut',
                            },
                            series: data.data.map((value)=> value.active),
                            labels: data.data.map((value)=> value.label),
                            plotOptions: {
                              pie: {
                                donut: {
                                    labels: {
                                        show: true,
                                        total: {
                                          showAlways: true,
                                          show: true
                                        }
                                      }
                                },
                              },
                              
                            },
                            colors : ["#079992", "#f0932b","#7ed6df","#5C4033","#b8e994" , "#dd8e75" , "#f64941" , "#f64941"],
                            legend: {
                                fontSize : "10px",
                                markers: {
                                    width: 14,
                                    height: 9,
                                    radius: 0, // Set radius to 0 for rectangle
                                },
                            },
                          };

                          console.log('options  ---->' ,options);
                          console.log('total count  ---->' ,data.data.reduce((total, value) => total + value.active, 0));
                      
                          // Create ApexCharts instance
                          var donutChart = new ApexCharts(document.getElementById("doughnutChart"), options);
                      
                          // Render the donut chart
                          donutChart.render();



                    
                // // Define data for the doughnut chart
                // var doughnutData = {
                //     // labels: [`${data.data[0]?.label}`,`${data.data[1]?.label}`,`${data.data[2]?.label}`,`${data.data[3]?.label}` , `${data.data[4]?.label}` , `${data.data[5]?.label}` , `${data.data[6]?.label}` , `${data.data[7]?.label}`],
                //     labels: data.data.map((value)=> value.label),
                //     datasets: [{
                //         // data: [data.data[0]?.active, data.data[1]?.active , data.data[2]?.active , data.data[3]?.active , data.data[4]?.active , data.data[5]?.active , data.data[6]?.active, data.data[7]?.active],
                //         data: data.data.map((value)=> value.active),
                //         backgroundColor: ["#079992", "#f0932b","#7ed6df","#5C4033","#b8e994" , "#dd8e75" , "#f64941" , "#f64941"]
                //     }]
                // };
                
                // // Configure options for the doughnut chart
                // var doughnutOptions = {
                //     responsive: true,
                //     legend: {
                //         display: true,
                //         position: 'right',
                //         labels: {
                //             // usePointStyle: true,
                //             boxWidth : 14,
                //             fontSize: 10
                //         },
                //     }
                // };
                
                // // Get the canvas element and initialize a doughnut chart
                // var ctx4 = document.getElementById("doughnutChart").getContext("2d");
                // new Chart(ctx4, {type: 'doughnut', data: doughnutData, options: doughnutOptions});



                // var ctx42 = document.getElementById("doughnutChart2").getContext("2d");
                // new Chart(ctx42, {type: 'doughnut', data: doughnutData, options: doughnutOptions});
            
                // $("#loader1").removeClass("ibox-content")
                // $("#loader1").removeClass("sk-loading")
                // $("#spin1").addClass("d-none")                                          

            // var doughnutData = { 
            //     labels: ["PO Not Found","Vendor GSTIN Not Matched","Item Cross Ref Not Found ","PO Item Rate Not Match"],
            
            //     datasets: [{
            //         data: [250,100,50,30],
            //         backgroundColor: ["#079992", "#f0932b","#7ed6df","#5C4033",]
            //     }]  
            // }; 





    
    
    // Configure options for the doughnut chart
    // var doughnutOptions = {
    //     responsive: true,
    //     legend: {
    //         display: true,
    //         position: 'right',
    //         labels: {
    //             boxWidth: 14
    //             // usePointStyle: true,
    //         },
    //     }
    };



    // // Get the canvas element and initialize a doughnut chart
    // var ctx6 = document.getElementById("doughnutChart1").getContext("2d");
    // new Chart(ctx6, {type: 'doughnut', data: doughnutData, options: doughnutOptions});

    
},
error : function(xhr){
    $("#loader1").removeClass("ibox-content")
    $("#loader1").removeClass("sk-loading")
    $("#spin1").addClass("d-none")

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
complete : ()=>{

    $.ajax({
        url : `${[test[0].url]}/gate/reporting/error`,
        headers: {
            'Authorization': 'Bearer ' + token,
          },
          success : function(data,status,xhr)
          {
            

            console.log(' gate reporting data ---->' ,data);

            let overlayWidth = $("#chart-container").width();
            let newHeight = overlayWidth * 0.72;

            //  foreignObject.css("background-color" , "blue")
            
            // overlayWidth.css("height", newHeight + "px");
            // $("#chart-container").height(newHeight);
            console.log(newHeight + " - Updated height");

            indexing = data.data.map((value,index)=> [ index + 1, value.ACTIVE])

            labeling = data.data.map((value,index)=> value.LABEL )


            var options = {
                chart: {
                  type: 'line',
                  height: newHeight,
                },
                series: [{
                  name: 'Count',
                  type: 'column',
                  data: data.data.map((value,index)=> [ index + 1, value.ACTIVE]),
                  style: {
                    fontSize: '16px', // Set the desired font size
                  },
            }],
                xaxis: {
                  categories: data.data.map((value,index)=> value.LABEL ),
                  labels: {
                    style: {
                      fontSize: '9px', // Set the desired font size
                    }
                  },
                  tooltip: {
                    enabled: false, // Disable tooltips for x-axis labels
                  },
                },
                dataLabels: {
                    enabled: true,
                  
                },
               
              };
          
              // Create ApexCharts instance
              var mixedChart = new ApexCharts(document.querySelector("#chart-container"), options);
          
              // Render the mixed chart
              mixedChart.render();




            // var flot_data = []
            // var xLabels = {}

            // flot_data = data.data.map((value,index)=> [ index + 1, value.ACTIVE])

            // console.log('flot_data ---->' , flot_data);

            // flot_data.unshift([0 , null])
            // flot_data.push([flot_data.length, null])

            // data.data.map((value,index)=> xLabels[`${index+1}`] = value.LABEL )

            // console.log('xLabel ---->' ,xLabels);

            // xLabels["0"] = "'";
            // xLabels[`${flot_data.length - 1}`] = "'";


            // // Flot chart options
            // var options = {
            //     series: {
            //         bars: {
            //             show: true,
            //             lineWidth: 0,
            //             fillColor: { colors: [{ opacity: 0.9 }, { opacity: 0.9 }] },
            //             barWidth: 0.5, // Adjust the bar width
            //             align: 'center' // Center align bars
            //         }
            //     },
            //     xaxis: {
            //         tickDecimals: 0, // Display whole numbers on the x-axis
            //         tickFormatter: function (val, axis) {
            //             // Use xLabels to display custom labels
            //             return xLabels[val] || val;
            //         }
            //     },
            //     grid: {
            //         hoverable: true // Enable tooltips on hover
            //     },
            //     tooltip: false, // Show tooltips
            //     colors: ['#1adfb4'] // Set the color of the bars
            // };



            // function updateOverlayHeight() {
            //     var chartwidth = $("#chart-container").width();
               
            //     var newHeight = chartwidth * 0.68; 
            
                
            
            //     $("#chart-container").height(newHeight);
            //     console.log(newHeight + " - Updated height");
            // }
            
            // updateOverlayHeight();
            
            // $(window).resize(function () {
            //     updateOverlayHeight();
            // });
            




            // // Initialize the chart with flot_data
            // plot = $.plot($("#chart-container"), [{ data: flot_data, label: "" }], options);

            // // Add tooltips
            // $("#chart-container").bind("plothover", function (event, pos, item) {
            //     if (item) {
            //         // console.log(item);
            //         var x = item.datapoint[0].toFixed(0);
            //         var y = item.datapoint[1].toFixed(0);
            //         // console.log(x);
            //         // console.log(y);
            //         $("#tooltip").html(y)
            //             .css({ top: item.pageY + 5, left: item.pageX + 5 })
            //             .fadeIn(200);
            //     } else {
            //         $("#tooltip").hide();
            //     }
            // });

            // // Tooltip container
            // $("<div id='tooltip'></div>").css({
            //     position: "absolute",
            //     display: "none",
            //     border: "1px solid #fdd",
            //     padding: "15px",
            //     "background-color": "#fee",
            //     opacity: 1
            // }).appendTo("body");
            

            

          },
          complete : ()=>{
            $("#loader1").removeClass("ibox-content")
            $("#loader1").removeClass("sk-loading")
            $("#spin1").addClass("d-none")
          }
    })


    // function updateOverlayHeight() {
    //     var overlayWidth = $("#chart-container").width();
    //     var newHeight = overlayWidth * 0.65;
     
    //     $("#chart-container").height(newHeight);
    //     console.log(newHeight + " - Updated height");
    // }
     
    // updateOverlayHeight();

    // $(window).resize(function () {
    //     updateOverlayHeight();
    // });


    
    


    // function resizeChart() {
    //     try {
           
    //         // updateOverlayHeight();
    //         $(plot)[0].resize();
    //         $(plot)[0].setupGrid();
    //         $(plot)[0].draw();
    //     } catch (error) {
            
    //     }
    //   }

    //   $(window).on("resize", resizeChart);


    //   resizeChart();

    
    
}
    })

    count++;
    });




    function calculateDynamicHeight() {
        // var chartContainer = $("#chart-container");
        // var minHeight = 500; // Set your minimum height
        // var maxHeight = 8000; // Set your maximum height

        console.log('calculated');
        // $("#doughnutChart").destroy

        
  
        // chartContainer.css("height", "auto");
        // Set a temporary height to measure the content
            
            var overlayWidth = $("#chart-container").width();
            var newHeight = overlayWidth * 0.75;
    
            //  foreignObject.css("background-color" , "blue")
            
            // overlayWidth.css("height", newHeight + "px");
            // $("#chart-container").height(newHeight);
            console.log(newHeight + " - Updated height");


            try {
                
                overlayWidth.destroy()
            } catch (error) {
                
            }

    
    
            var options = {
                chart: {
                  type: 'line',
                  height: newHeight,
                },
                series: [{
                  name: 'Count',
                  type: 'column',
                  data: indexing,
                  style: {
                    fontSize: '16px', // Set the desired font size
                  }
                 
            }],
                xaxis: {
                  categories: labeling,
                  labels: {
                    style: {
                      fontSize: '9px', // Set the desired font size
                    }
                  }
                },
                dataLabels: {
                    enabled: true,
                    // formatter: function(val, opts) {
                    //   // Display data labels only for the line series
                    //   return opts.seriesIndex === 1 ? val : '';
                    // }
                }
                // dataLabels: {
                //     enabled: true,
                   
                //   }
              };
          
              // Create ApexCharts instance
              var mixedChart = new ApexCharts(document.querySelector("#chart-container"), options);
          
              // Render the mixed chart
              mixedChart.render();


      }
     

    //   calculateDynamicHeight();


      $(window).resize(function() {

        calculateDynamicHeight();
      });

});





