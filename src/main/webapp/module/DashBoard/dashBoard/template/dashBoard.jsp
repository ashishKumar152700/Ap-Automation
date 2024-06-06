<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>DashBoard</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="../css/chart.css" rel="stylesheet">
    <link rel="stylesheet" href="../../../../cdn/css/flatpicker.css">

    <script src="../../../../cdn/js/sweetalert.min.js"></script>



    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">


    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/jquery-2.1.1.js"></script>
    <script src="../../../../cdn/js/flatpicker.js"></script>
    <script src="../../../../cdn/js/flot.min.js"></script>
    <script src="../../../../cdn/js/flot.resize.js"></script>
    <script src="../../../../cdn/js/flot_categories.min.js"></script>
    <script src="../../../../cdn/js/flot_tooltip.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/patternomaly/1.0.0/patternomaly.min.js"></script> -->






    <style>
        .ibox-title {
            padding: 15px 15px 6px 15px;
        }

        #myInput {
            padding: 20px;
            margin-top: -6px;
            border: 0;
            border-radius: 0;
            background: #f1f1f1;
        }


        .flexCenter {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .flexContainer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
        }
        .filter{
            padding: 20px 10px !important;
        }
        .flatpickr-calendar.inline {
            position: absolute !important;
            top:65px !important;
            left: -110px;
            z-index: 3 !important;
        }

        #chart-container {
            width: 100%; /* Make the chart container responsive */
            max-width: 8000px; /* Set a max width if needed */
            position: relative;
            /* padding-bottom: 75%; */
            /* position: static; */
            /* min-height: 1000px !important; */
            /* min-height: 500px !important; */
            /* max-height: 5000px !important;  */
            /* margin: 0 auto; Center the container */
        }
        foreignObject{
          /* min-height: 500px !important; */
        }
        /* #apiData{
          flex-wrap: nowrap !important;
          overflow: hidden !important;
          overflow-x: hidden !important;
          transition: overflow-x 5s !important;
        }
        #apiData:hover {
          overflow-x: scroll !important;
        } */

       
        /* #chart-container .flot-overlay , #chart-container .flot-base{
            height: 700px !important;
        } */
                /* .select{
            padding: 4px;
            width: 100px;
        } */
    </style>
</head>


<body>

    <script>
        let sessionString = localStorage.getItem("userrole")
        let menus = JSON.parse(localStorage.getItem("menuData"))
        let menuroles;
        let name = JSON.parse(sessionString);
        
        if(name != null)
        {
           let data_menu = menus.map((item)=> {
               if(item.id == 4){
                   menuroles = item.assignroles.map((value)=> value.rolecode)
               }
               }
           )
           let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(All roles are present)
             if(returned_arr.flat(Infinity).includes(true)) {

            }
            else {
                window.location.href = "../../Basic/template/404.jsp";
            }
        }
        else {
            window.location.href = "../../Basic/template/404.jsp";
        } 

    </script>
    <div id="wrapper">
        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />
  
        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />
  
        <div class="wrapper wrapper-content">
          <div
            class="row wrapper border-bottom white-bg page-heading filter d-none"
          >
            <div class="col-lg-3"></div>
  
            <!-- <div class="col-lg-2">
                      <h5>Unit Name</h5>
                      <select name="" class="form-control" id="">
                          <option value="RSB UNIT 1">RSB UNIT 1</option>
                      </select>
                     
                  </div>
  
  
                  <div class="col-lg-2">
                      <h5>Store</h5>
                      <select name="" class="form-control" id="">
                          <option value="Store 1">Store 1</option>
                      </select>
                     
                  </div>
  
  
  
  
                  <div class="col-lg-2">
                      <h5>From</h5>
                      <div class="container px-0">
                          <input type="text" id="selected-date" class="form-control" placeholder="Select a date">
                          <div id="inline-datepicker"></div>
                        </div>
                     
                  </div>
                  <div class="col-lg-2">
                      <h5>To</h5>
                      <div class="container px-0">
                          <input type="text" id="selected-date2" class="form-control" placeholder="Select a date">
                          <div id="inline-datepicker2"></div>
                        </div>
                     
                  </div>
                  <div class="col-lg-1 d-flex align-items-end">
                      
                      <button type="button" id="search_invoices" class="btn btn-primary"> Search </button>
                     
                  </div> -->
          </div>
  
          <br />
  
          <div class="row" id="apiData"></div>
  
          <div class="" id="loader1">
            <div class="sk-spinner sk-spinner-double-bounce d-none" id="spin1">
              <div class="sk-double-bounce1"></div>
              <div class="sk-double-bounce2"></div>
            </div>
            <div>
              <div class="row col-12 px-0 mx-0" id="all_charts">
                <div class="col-8 pl-0">
                  <div class="main_box d-flex flex-column">
                    <div class="ibox-title" style="flex: 1">
                      <div>
                        <h1>Error Monitoring</h1>
                      </div>
  
                      <div class="flexContainer d-none">
                        <select
                          id="yeardropdown"
                          class="form-control column_filter"
                          aria-label="Admin Theme"
                          aria-describedby="button-addon2"
                        ></select>
                        &nbsp;
                        <select
                          id="monthdropdown"
                          class="form-control column_filter"
                          aria-label="Admin Theme"
                          aria-describedby="button-addon2"
                        ></select>
                        &nbsp; &nbsp;
                        <button id="fetchDatesdropdown" class="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </div>
  
                    <div class="ibox-content px-0" style="flex: 2">
                      <div id="append_items5">
                        <div id="chart-container"></div>
                        <!-- <canvas id="doughnutChart2" height="140"></canvas> -->
                      </div>
                    </div>
                  </div>
                </div>
  
                <div
                  class="col-4 pr-0"
                  style="display: flex; flex-direction: column"
                >
                  <div class="">
                    <div class="ibox-title flexCenter">
                      <div>
                        <h5>Gate Entry View</h5>
                      </div>
                      <div class="flexContainer d-none">
                        <select
                          id="yeardropdown"
                          class="form-control column_filter"
                          aria-label="Admin Theme"
                          aria-describedby="button-addon2"
                        ></select>
                        &nbsp;
                        <select
                          id="monthdropdown"
                          class="form-control column_filter"
                          aria-label="Admin Theme"
                          aria-describedby="button-addon2"
                        ></select>
                        &nbsp; &nbsp;
                        <button id="fetchDatesdropdown" class="btn btn-primary">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div class="ibox-content px-0" style="flex: 1">
                    <div id="append_items">
                      <div id="doughnutChart"></div>
                    </div>
                  </div>
  
                  <br /><br />
  
                  <div class="">
                    <div class="ibox-title flexCenter">
                      <div>
                        <h5>Purchase Order Transaction Type</h5>
                      </div>
                    </div>
  
                    <div class="ibox-content px-0">
                      <div class="text-center">
                        <canvas id="polarChart"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <br /><br />
  
          <!--% including footer %-->
          <jsp:include page="../../../Basic/template/footer.jsp" />
        </div>
      </div>
    </div>

    <!-- Mainly scripts -->
    <!-- <script src="../../../../static/js/popper.min.js"></script> -->
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <script src="../../../Configration/js/globalConfig.js"></script>


    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>


    <!-- jQuery UI -->
    <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>


    <!-- DashBoard Js -->
    <script src="../js/dashBoard.js?v=" + $.getCurrentVersion()></script>

    <!-- ChartJS-->
    <script src="../js/dashBoard.min.js?v=" + $.getCurrentVersion()></script>


    <!-- ChartJS-->
    <script src="../js/Chart.min.js?v=" + $.getCurrentVersion()></script>
    <script src="../js/chartjs-demo.js?v=" + $.getCurrentVersion()></script>

    <!-- Breacrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>
    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>



</body>


</html>




    
