<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Record Reservation</title>
    <jsp:include page="../../../Basic/template/favicon.jsp" />
    <link href="../../../../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../../static/font-awesome/css/font-awesome.css" rel="stylesheet">

    <link href="../../../../static/css/animate.css" rel="stylesheet">
    <link href="../../../../static/css/style.css" rel="stylesheet">


    <link rel="stylesheet" href="../css/status.css">

    <link rel="stylesheet" href="../../../../cdn/css/responsive.dataTables.min.css">
    <link rel="stylesheet" href="../../../../cdn/css/jquery.dataTables.css">

    <script src="../../../../static/js/jquery-2.1.1.js"></script>

    <link rel="stylesheet" href="../../../../custom/css/filter_multi_select.css">
    <script src="../../../../custom/js/filter-multi-select-bundle.min.js"></script>
    <script src="../../../../cdn/js/sweetalert2.js"></script>

<style>
    .table{
    text-align: center;
   }
   .bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
   

   #Dtable_length>label{
    margin-bottom: 0rem;
    margin-top: 0.5rem;
}

#role_length>label{
    margin-bottom: 0rem;
    margin-top: 0.5rem;
   }

   .head>th{
    margin-bottom: 500px;
   }
   .search tr>td>input{
    padding: 5px 7px;
    outline: none;
   }
   .search{
    padding: 15px 0px;
   }

   #userlistadd {
       margin-right: 100px;
   }

   #userlistsearch {
       margin-right: 400px;
   }

   table.dataTable>tbody>tr.child span.dtr-title {
       min-width: 110px !important;
   }


   .my-2 {
       margin-top: .85rem !important;
       margin-bottom: .85rem !important;
   }

   .btn-outline-success {
       border-color: #24537f !important;
   }

   .btn-outline-success:hover {
       background-color: #24537f !important;
   }

   .btn-success {
       border: 1px solid #24537f !important;
       background-color: #24537f !important;
   }

   .paginate_button {
       border: 1px solid #24537f !important;
       background: white !important;
       transition: all .5s;

   }

   .paginate_button:hover {
       background: #24537f !important;
   }

   #Dtable_paginate {
       display: flex;
       justify-content: flex-start;
   }

   .paginate_button {
       border-radius: 0px !important;
   }

   .previous {
       border-top-left-radius: 5px !important;
       border-bottom-left-radius: 5px !important;
       border-right: none !important;
   }

   .paginate_button {
       margin: 0px !important;
       margin-top: .5rem !important;
       padding: 5px 10px !important;

   }

   .next {
       border-top-left-radius: 0px !important;
       border-bottom-left-radius: 0px !important;
       border-top-right-radius: 5px !important;
       border-bottom-right-radius: 5px !important;
       border-left: none !important;
   }

   #Dtable_paginate a:hover {
       color: #fff !important;
   }

   /* s */

   
    /* .modal-lg, .modal-xl {
    max-width: 800px !important;
    } */
   

   .inmodal .modal-header {
    text-align: left !important;
}

.modal-footer {
    padding-bottom: 0px !important;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
    color: #24537f !important;
    border-top-color: #24537f !important;

}

.nav-tabs .nav-link {
    border-top-width: 5px;

}

.inmodal .modal-header {
    text-align: left !important;
}

.modal-footer {
    padding-bottom: 0px !important;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
    color: #24537f !important;
    border-top-color: #24537f !important;

}

.nav-tabs .nav-link {
    border-top-width: 5px;

}

.space {
    overflow: scroll;
}

.form-control:focus, .single-line:focus {
border-color: #dde0e0;
}


.ibox-content {
    border-width: 0px !important;
  }
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
                 if(item.id == 13){
                     menuroles = item.assignroles.map((value)=> value.rolecode)
                 }
     
                 }
             )
             let returned_arr = menuroles.map((value)=> name.map((item)=> value == item)) 
            //  if(name.includes("Admin"))
            if(returned_arr.flat(Infinity).includes(true))
            {
        
            }
            else{
               window.location.href = "../../../Basic/template/404.jsp";
            }
        }
        else{
            window.location.href = "../../../Basic/template/404.jsp";
        }
    
    </script>

    <div id="wrapper">
        <!--% including header %-->
        <jsp:include page="../../../Basic/template/header.jsp" />

        <!--% including breadcrumb %-->
        <jsp:include page="../../../Basic/template/breadcrumb.jsp" />

        <div class="wrapper wrapper-content animated fadeInRight ecommerce">

            <div class="row">
                <div class="col-sm-8">
                    <div class="ibox ">
                        <div class="ibox-content py-3">
                            <table cellspacing="0" cellpadding="4">
                                <tbody>
                                    <tr id="filter_col2" data-column="1" class=" ">
                                        <td class=" col ">
                                            <div class="d-flex ">
                                                <div class="input-group ">
                                                    <input type="text" class="form-control column_filter"
                                                        placeholder="Gate Number" aria-label="Admin Theme"
                                                        aria-describedby="button-addon2" id="col1_filter">
                                                    <div class="input-group-append" id="search">
                                                        <button class="btn btn-primary" type="button"
                                                            id="button-addon2"><i class="fa fa-search"></i>
                                                            Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td align="center"><input type="checkbox" class="column_filter invisible"
                                                id="col1_smart" checked="checked">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="ibox ">
                        <div class="ibox-content py-2">
                            <div class="text-center my-2 d-flex justify-content-around">
                                <button id="deleteAll" class="btn btn-primary ">Delete Selected </button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row ">
                <div class="col-lg-12">
                    <div class="ibox">
                        <div class="ibox-content">
                            <table id="Dtable" class="display responsive nowrap text-left" style="width: 100%">
                                <thead>
                                    <th class="text-left" data-hide="phone"><input type="checkbox" name="" id="select_all" ></th>
                                    <!-- <th class="text-left" data-hide="phone">ID</th> -->
                                    <th class="text-left" data-hide="phone">Gate Number</th>
                                    <th class="text-left" data-hide="phone">Username </th>
                                    <th class="text-left" data-hide="phone">Host </th>
                                    <th class="text-left" data-sort-ignore="true">ACTIONS</th>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-12 ">
                                      <div class="card  mx-auto p-4 white-bg">
                                        <div class="card-body ">
                                          <div class="container ">
                                            <form class="contact-form" id="form">
                                              <div class="controls">
                                                <div class="row">
                                                  <div class="col-1"></div>
                                                  <div class="col-md-4">
                                                    <div class="form-group"><label>Code*</label> <input type="text" placeholder="Code" class="form-control" id="code" required="" maxlength="12 " disabled ></div>
                                                    <div class="form-group"><label>Description*</label> <input type="text" placeholder="Description" class="form-control" id="description" required="" maxlength="12 " disabled ></div>
                                                  </div>
                                                  <div class="col-2"></div>
                                                  <div class="col-md-4">
                                                    <div class="form-group"><label>Status*</label><input type="text"  placeholder="Status" class="form-control" id="label" required="" maxlength="12" disabled></div>
                                                  </div>
                                                  </div>
                                              
                                                </div>
                                              </div>
                                            </form>

                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  
                            </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-white " data-dismiss="modal">Close</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--% including footer %-->
        <jsp:include page="../../../Basic/template/footer.jsp" />
    </div>

    <!-- Mainly scripts -->
    <script src="../../../../static/js/popper.min.js"></script>
    <script src="../../../../static/js/bootstrap.js"></script>
    <script src="../../../../static/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="../../../../static/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>


    <!-- Custom and plugin javascript -->
    <script src="../../../../static/js/inspinia.js"></script>
    <script src="../../../../static/js/plugins/pace/pace.min.js"></script>

    <!-- jQuery UI -->
    <script src="../../../../static/js/plugins/jquery-ui/jquery-ui.min.js"></script>


    <!-- Status JS -->
    
    <script src="../../../Configration/js/globalConfig.js"></script>
    <script src="../js/reservation.js" + $.getCurrentVersion()></script>
    

    <!-- breadcrumb JS -->
    <script src="../../../../custom/js/breadcrumb.js"></script>


    <script src="../../../../cdn/js/jquery.dataTables.min.js"></script>
    <script src="../../../../cdn/js/dataTables.responsive.min.js"></script>

   


</body>

</html>