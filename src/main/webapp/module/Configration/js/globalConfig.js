var token = JSON.parse(localStorage.getItem("token"));
var refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
var testUrlDefined = JSON.parse(localStorage.getItem("testUrl"));
var loginUrlDefined = JSON.parse(localStorage.getItem("loginUrl"));
var visonUrlDefined = JSON.parse(localStorage.getItem("visionUrl"));
var menuDataDefined = JSON.parse(localStorage.getItem("menuData"));



// #81 config  -- DV
// var urlDefined = "http://192.168.50.81:8080/ap_automation_backend/configmaster/configs";
// var emailTemplateUrl = `http://192.168.50.81:8080/ap_automation_backend/emailTemplate/emailTemplate`;
// var registerUrl = `http://192.168.50.81:8080/ap_automation_backend/register`;
// var emailConfig = `http://192.168.50.81:8080/ap_automation_backend/emailConfig/emailConfigs`;


// #82 config -- PY
// var urlDefined = "http://192.168.50.81:8082/ap_automation_backend/configmaster/configs";
// var emailTemplateUrl = `http://192.168.50.81:8082/ap_automation_backend/emailTemplate/emailTemplate`;
// var registerUrl = `http://192.168.50.81:8082/ap_automation_backend/register`;
// var emailConfig = `http://192.168.50.81:8082/ap_automation_backend/emailConfig/emailConfigs`;


// #82 config -- PD
var urlDefined = "http://192.168.50.82:9002/ap_automation_backend/configmaster/configs";
var emailTemplateUrl = `http://192.168.50.82:9002/ap_automation_backend/emailTemplate/emailTemplate`;
var registerUrl = `http://192.168.50.82:9002/ap_automation_backend/register`;
var emailConfig = `http://192.168.50.82:9002/ap_automation_backend/emailConfig/emailConfigs`;

$.testUrl = function () {
  let dataa = [];
  $.ajax({
    url: urlDefined,
    async: false,
    success: function (resp, status, xhr) {
      resp.data.map((value) => {
        // if (value.env == "DV" && value.type == "JAVA" && value.url_active) {
        // if (value.env == "PY" && value.type == "JAVA" && value.url_active) {
        if (value.env == "PD" && value.type == "JAVA" && value.url_active) {
          dataa.push(value);
        }
      });
    },
    error: function (xhr) {
      // alert(xhr.statusText)
      // swal("",xhr.responseJSON.message, "error")
    },
  });
  return dataa;
};


$.test = function () {
  return testUrlDefined;
};

console.log("url in global " ,$.test());


$.loginUrl = function () {
  let dataa = [];
  $.ajax({
    url: urlDefined,
    async: false,
    success: function (resp) {
      resp.data.map((value) => {
        // if (value.env == "DV" && value.type == "JDE" && value.url_active) {
        // if (value.env == "PY" && value.type == "JDE" && value.url_active) {
          if (value.env == "PD" && value.type == "JDE" && value.url_active) {
          dataa.push(value);
        }
      });
    },
    error: function () {},
  });
  return dataa;
};


$.login = function(){
  return loginUrlDefined;
}



$.visionUrl = function () {
  let dataa = [];
  $.ajax({
    url: urlDefined,
    async: false,
    success: function (resp, status, xhr) {
      resp.data.map((value) => {
        // if (value.env == "DV" && value.type == "OCR" && value.url_active) {
        // if (value.env == "PY" && value.type == "OCR" && value.url_active) {
        if (value.env == "PD" && value.type == "OCR" && value.url_active) {
          dataa.push(value);
        }
      });
    },
    error: function (xhr) {
    },
  });
  return dataa;
};

$.vision = function(){
  return visonUrlDefined;
}



// console.log('test  ---->' ,$.testUrl());
$.menuDefiend = function(token , testUrl){

  // console.log("token ", token);
  // console.log('testUrl ---->' ,testUrl);

  let menuData = []
  $.ajax({
    // url:`${[testUrl]}/menumaster/menus`,
    url:`${[testUrl]}/menugetmaster/menu`,
    async : false,
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    success : function(data,status,xhr) {
      if(xhr.status == 200)
      { 

        // console.log('menus data ---->' , JSON.parse(data.data[0].menu_data));

        menuData.push(...JSON.parse(data.data[0].menu_data))
        // fillUL(data.data, $('.sidemenu'),1);
        // jQuery(".sidemenu").metisMenu().show()
      }
    },
    error: function(xhr){

      console.log('xhr error ---->' ,xhr);
      setTimeout(() => {
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
      }, 500);

    },
})

  return menuData;

}

$.menus = function(){
  // console.log('menu data  ---->' ,menuDataDefined);

  return menuDataDefined;
}

// console.log('$.test() ---->' ,$.menuDefiend());

// console.log($.login()[0].url);

$.getCurrentVersion = function () {
  return Math.floor(Date.now() / 1000); // Using timestamp as version number
};





const broadCast = new BroadcastChannel('authStatusChannel');

  const updateStatus = (data)=> {
    let {isSignedIn} = data;
    isSignedIn == true ? "" : window.open(`/ap_automation/module/Login/template/login.jsp` , "_self");
  }

  broadCast.onmessage = (e) => {
    const {action} =  e.data;
    action === 'signin' ? updateStatus({isSignedIn : true}) : updateStatus({isSignedIn : false});

  }


  const handleSignIn = ()=>{
    updateStatus({isSignedIn : true});
    broadCast.postMessage({action:'signin'});
  }
  
  const handleSignOut = ()=>{
    updateStatus({isSignedIn : false});
    broadCast.postMessage({action:'signout'});
  }






// $.getCurrentVersion = function () {
//   return Math.floor(Date.now() / 1000); // Using timestamp as version number
// }

// console.log($.getCurrentVersion());

$.tokenError = function () {
  try {
    swal({
      title: "Session Expired",
      text: "Do You Want To Continue Session",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Sign-out",
          value: null,
          visible: true,
          closeModal: true,
        },
        confirm: {
          text: "Continue",
          value: true,
          visible: true,
          closeModal: true,
        },
      },
    }).then((value) => {
      if (value) {
        $.ajax({
          url: `${[$.test()[0].url]}/auth/refreshtoken`,
          type: "POST",
          data: JSON.stringify({
            refreshToken: refreshToken,
          }),
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          success: function (data, status, xhr) {
            if (xhr.status == 200) {
              localStorage.setItem("token", JSON.stringify(data.accessToken));
              window.location.reload();
            }
            else{
              localStorage.clear();
            sessionStorage.clear();
            handleSignOut();
            window.open(
              `/ap_automation/module/Login/template/login.jsp`,
              "_self"
            );
            }
          },
          error: function (xhr) {
            localStorage.clear();
            sessionStorage.clear();
            handleSignOut();
            window.open(
              `/ap_automation/module/Login/template/login.jsp`,
              "_self"
            );
          },
        });
      } else {
        localStorage.clear();
        sessionStorage.clear();
        handleSignOut()
        window.open(`/ap_automation/module/Login/template/login.jsp`, "_self");
      }
    });
  } catch (error) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-sm btn-success mx-1",
        cancelButton: "btn btn-sm btn-danger mx-1",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Session Expired",
        text: "Do You Want To Continue Session",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continue",
        cancelButtonText: "Sign-out",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // console.log('refresh token ---->' ,refreshToken);
          $.ajax({
            url: `${[$.test()[0].url]}/auth/refreshtoken`,
            type: "POST",
            data: JSON.stringify({
              refreshToken: refreshToken,
            }),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            success: function (data, status, xhr) {
              // console.log('xhr in refresh token ---->' ,xhr);
              if (xhr.status == 200) {
                localStorage.setItem("token", JSON.stringify(data.accessToken));
                window.location.reload();
              }
              else{
                localStorage.clear();
                sessionStorage.clear();
                handleSignOut();
                window.open(
                  `/ap_automation/module/Login/template/login.jsp`,
                  "_self"
                );

              }
            },
            error: function (xhr) {
              console.log('xhr in error refresh token ---->' ,xhr);
              localStorage.clear();
              sessionStorage.clear();
              handleSignOut();
              window.open(
                `/ap_automation/module/Login/template/login.jsp`,
                "_self"
              );
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.clear();
          sessionStorage.clear();
          handleSignOut();
          window.open(
            `/ap_automation/module/Login/template/login.jsp`,
            "_self"
          );
        }
      });
  }
};

$.errorMessage = function (message) {
  try {
    swal("", `${message}`, "error");
  } catch (error) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-sm btn-success mx-1",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: "",
      text: `${message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};



$.voucherMatch = function(login , voucherNo, vendor_codes , obj){

  // console.log('url login ---->' ,login);
  // console.log('voucher ---->' ,voucherNo);
  // console.log('vendor code  ---->' ,vendor_codes);

  let po_numbers = [];
  let loop_length ;



  if(obj.transactionType == "ServiceWithMaterial")
      {
        obj.details.map((value)=>po_numbers.push({po_number:value.po_number , po_type : value.po_type , voucher_number : value.voucher_number})) 
        
        var uniqueArray = [];
        var seen = {};
      
        $.each(po_numbers, function(index, val) {
            var key = val.po_number + '|' + val.po_type; // Concatenate both properties
            if (!(key in seen)) {
                uniqueArray.push(val);
                seen[key] = true;
            }
        });
      
        console.log("details po array : ",uniqueArray);

        loop_length = uniqueArray.length;

        
      }
      else{

        loop_length  = 1;
        
      }
  
      for(let i = 0 ; i < loop_length ; i++)
      {

        $.ajax({
          url : `${[login[0].url]}/jderest/v2/dataservice/view/V75I411A?$filter=F0411.DOC EQ ${ loop_length > 1 ? uniqueArray[i].voucher_number : voucherNo}&$filter=F0411.DCT EQ PV&$filter=F0411.KCO EQ 00201&$filter=F0411.MCU EQ 20100&$filter=F0411.AN8 EQ ${vendor_codes}`,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
            },
          success : function(data , status , xhr)
          {
            if(xhr.status == 200)
            {

              try {
                voucher_table.destroy()
              } catch (error) {
                
              }
      
              console.log('data voucher ---->' ,data );
              let data_length = data.fs_DATABROWSE_V75I411A.data.gridData.rowset.length
      
              let data_body = data.fs_DATABROWSE_V75I411A.data.gridData.rowset


              console.log('data body ---->' ,data_body);
      
              for(let i = 0 ; i < data_length ; i++)
              {
      
                let inputDate = data_body[i].F0411_DICJ;
                let formattedDate = `${inputDate.substr(0, 4)}-${inputDate.substr(4, 2)}-${inputDate.substr(6, 2)}`
                let inputDate2 = data_body[i].F0411_DGJ;
                let formattedDate2 = `${inputDate2.substr(0, 4)}-${inputDate2.substr(4, 2)}-${inputDate2.substr(6, 2)}`
                let inputDate3 = data_body[i].F0411_DIVJ;
                let formattedDate3 = `${inputDate3.substr(0, 4)}-${inputDate3.substr(4, 2)}-${inputDate3.substr(6, 2)}`
      
      
                console.log('voucher data print ---->' ,data_body[i].F75I411_YTYP == " ");
                // $(user_date).val(formattedDate.split("-").reverse().join("-"))
                $("#voucher_body").append(`<tr><td>${data_body[i].F0411_AN8}</td><td>${data_body[i].F0411_KCO}</td><td>${data_body[i].F0411_DOC}</td><td>${data_body[i].F0411_DCT}</td><td>${data_body[i].F0411_VINV}</td><td>${data_body[i].F0411_PST}</td><td>${formattedDate3.split("-").reverse().join("-")}</td><td>${formattedDate2.split("-").reverse().join("-")}</td><td>${data_body[i].F0411_AG}</td><td>${data_body[i].F0411_AAP}</td><td>${data_body[i].F0411_ICU}</td><td>${formattedDate.split("-").reverse().join("-")}</td><td>${data_body[i].F0411_YTYP == " " || data_body[i].F75I411_YTYP == "" ? "-" : data_body[i].F75I411_YTYP}</td></tr>`)
              }
      
              try {
                
                voucher_table = $("#voucher_table").DataTable()
              } catch (error) {
                
              }
            }
      
          },
          error : function(xhr)
          {
      
            console.log("error :" ,xhr);
      
          },
          
        })

      }
  

}


$.fetch_btn = function(login ,obj , vendor , arr , overAllCurrency){
  console.log("function : ",login);
  console.log("function 1: ",obj);
  console.log("function 2: ",vendor);

  $("#loader4").addClass("ibox-content")                     
  $("#loader4").addClass("sk-loading")                     
  $("#spin4").removeClass("d-none")                     

  

      let po_numbers = [];
      let data, next, loop_length , conditionCheck;
      let recieptNumberAvail = false;

      if(obj.transactionType == "ST/OT")
      {
      next  = 279
      }
      else if(obj.deliveryChallanNumber != null)
      {
      next  = 280
      }
      else{
      next = 400
      }
      conditionCheck = obj.details.map((values)=> values.receipt_number != null);

      if(obj.receipt_number)
      {
        recieptNumberAvail = true;
      }
      else if(conditionCheck.includes(true)){
        
        recieptNumberAvail = true;
      }
      else{
        recieptNumberAvail = false;
      }

      if(obj.transactionType == "ServiceWithMaterial")
      {
        obj.details.map((value)=>po_numbers.push({po_number:value.po_number , po_type : value.po_type})) 
        
        var uniqueArray = [];
        var seen = {};
      
        $.each(po_numbers, function(index, val) {
            var key = val.po_number + '|' + val.po_type; // Concatenate both properties
            if (!(key in seen)) {
                uniqueArray.push(val);
                seen[key] = true;
            }
        });
      
        console.log("details po : ",uniqueArray);

        loop_length = uniqueArray.length;

        
      }
      else{

        loop_length  = 1;
        
      }
  


  for(let i = 0 ; i < loop_length ; i++)
  {

  if(obj.transactionType == "ServiceWithMaterial")
  {
        data = {
          po_number: uniqueArray[i].po_number,
          po_type: uniqueArray[i].po_type,
          supplier : vendor,
          next_status : next
      }
  }
  else{

    data = {
            po_number: obj.po_number,
            po_type: obj.po_type,
            supplier : vendor,
            next_status : next
        }

  }

    console.log("loop counts " ,i);

    $.ajax({
      url: `${[login[0].url]}/jderest/v3/orchestrator/ORCH_PurchaseOrder`,
      type: "POST",
      // async : false,
      data: JSON.stringify(data),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Basic " + btoa(`${[login[0].username]}` + ":" + `${[login[0].password]}`)
      },

      success: function (data) {


        let Purchase_order = data.order_number

        try {
          $("#business_unit").val(data.busines_unit.trim())
        } catch (error) {
          
        }

        if (arr.flat(5000).includes(Purchase_order) == false && data.amount != 0 && (overAllCurrency.length == 0 || overAllCurrency.includes(data.currency_code) == true)) {
          console.log("fetched data in loop : ", data);

          console.log('arr ---->' ,arr.flat(5000));
          console.log('amount ---->' ,data.amount);
          console.log('currency ---->' ,overAllCurrency);
  
          let validate = $(".Monee")[0]
          let validates = $(".onee")[0]
  
     
          
          $("#loader4").removeClass("ibox-content")                     
          $("#loader4").removeClass("sk-loading")                     
          $("#spin4").addClass("d-none") 
  
  
          
  
          $("#tab_logics_body").append(`<tr>
              <td class="text-center minus_box"><span class="minus-box head_delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
                  <td><input type="text" class="form-control input_size po text-right" required="" readonly value="${data.order_number}"></td>
                  <td><input type="text" class="form-control input_size line_num text-right" required="" readonly id="line_num" value="${data.order_type}"></td>
                  <td><input type="text" class="form-control input_size head_company text-right" required="" readonly  value="${data.order_company}"></td>
                  <td><input type="text" class="form-control input_size currency_head text-right" required="" readonly id="" value="${data.currency_code}"></td>
                  <td><input type="text" readonly class="form-control input_size details_gate_id text-right" value="${data.amount}"></td>
              </tr>`)
  
         
  
         
          try {
              modal_table.destroy();
              // $("#modal_table_body").empty();
          } catch (error) {
              
          }
  
          console.log("data object ", data.po_details);
          let receipt = [];

          if(obj.receipt_number)
          {
              receipt.push(obj.receipt_number ? true : false);
          }
          else{
              receipt = obj.details.map((value)=> value.receipt_number ? true : false)
          }

          console.log("receipt values in table" , receipt);
         
          for (let i = 0 , j = 0 ; i < data.po_details.length  ; i++ , j++)
          {


            

            if(recieptNumberAvail ? true :  data.po_details[i].quantity_open != 0){
  
            try {
              
              let modalRow = `<tr>
              <td class="text-center Mdetail_company_code">${data.po_details[i].order_company}</td>
              <td class="text-center Monee">${data.po_details[i].order_number}</td>
              <td class="text-center Mpo_type">${data.po_details[i].order_type}</td>
              <td class="text-center Mline_numm">${data.po_details[i].line_number}</td>
              <td class="text-center Mpo_item">${data.po_details[i].item_number}</td>
              <td class="text-center Mpo_Description">${data.po_details[i].description}</td>
              <td class="text-center Mcost_rule">${data.po_details[i].cost_rule}</td>
              <td class="text-center Mcurrency">${data.po_details[i].uom}</td>
              <td class="text-center Munit_cost">${data.po_details[i].unit_cost}</td>
              <td class="text-center Mdetails_statuss d-none">${data.po_details[i].quantity_ordered}</td>
              <td class="text-center Mopen_quantity">${data.po_details[i].quantity_open}</td>
              <td class="text-center Maccept_quantity"></td>
              <td class="text-center Mtaxable_value"></td>
              <td class="text-center Mtaxable_amount_payload"></td>
              <td class="text-center Mdescription d-none">${data.po_details[i].description}</td>
              <td class="text-center Mbusiness_detail d-none">${data.po_details[i].business_unit}</td>
          </tr>`
  
       
            $("#modal_table_body").append(modalRow)
            } catch (error) {

              console.log(error);
              
            }
  
              if(window.location.href.includes("view") || obj.status.code == 400 || $("title").html() == 'Finance'){

                console.log("view page");

                let newRow = `<tr>
                      <td class="text-center p-0"><input type="text" readonly class="form-control input_size detail_company_code text-center" id="" value="${data.po_details[i].order_company}"></td>
                      <td class="text-center p-0"><input type="text" readonly class="form-control input_size onee text-center" id="po_number" value="${data.po_details[i].order_number}"></td>
                      <td class="text-center p-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-center" value="${data.po_details[i].order_type}"></td>
                      <td class="text-center p-0"><input type="text" readonly class="form-control input_size line_numm text-center" id="line_number" value="${data.po_details[i].line_number}"></td>
                      <td class="text-center p-0"><input type="text" readonly class="form-control input_size po_item text-center" id="item_code" value="${data.po_details[i].item_number}"></td>
                      <td class="text-center p-0"><input type="text" readonly class="form-control input_size description_item text-center" id="" value="${data.po_details[i].description}"></td>
                      <td class="text-center p-0"><input type="text" readonly class="form-control input_size cost_rule text-center" id="" value="${data.po_details[i].cost_rule}"></td>
                      <td class="text-center p-0"><input type="text" readonly id="uom" class="form-control input_size currency text-center" value="${data.po_details[i].uom}"></td>
                      <td class="text-center p-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-center" value="${data.po_details[i].unit_cost}"></td>
                      <td class="text-center p-0 d-none"><input type="text" class="form-control input_size details_statuss text-center" id="" value="${data.po_details[i].quantity_ordered}"></td>
                      <td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-center" id="" value="${data.po_details[i].quantity_open}"></td>
                      <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-center"></td>
                      <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-center" value="${data.po_details[i].quantity_received}"></td>
                      <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size Sacnned_qty text-center" id="quantity"></td>
                      <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size accept_quantity check_grn text-center"></td>
                      <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size short_quantity text-center"></td>
                      <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_value text-center" value="${receipt.includes(true) ? obj.taxable_value : ""}"></td>
                      <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_amount_payload text-center" value="${receipt.includes(true) ? obj.taxable_amount : ""}"></td>
                      <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size description text-center" value="${data.po_details[i].description}"></td>
                      <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size business_detail text-center" value="${data.po_details[i].business_unit}"></td>
                      </tr>`;
                      // <td class="d-flex"><button type="button" class="btn btn-secondary recieved-row p-1 mt-1"  data-toggle="modal" data-target="#myModal13">Recieve</button></td>
                      $('#table-body').append(newRow);

                        if(obj.transactionType == "ServiceWithMaterial" || obj.transactionType == "Service_PO" || obj.transactionType == "Credit_Note" || obj.transactionType == "Debit_Note")
                        {
                          $(".Sacnned_qty").parents("td").addClass("d-none")
                          $(".short_quantity").parents("td").addClass("d-none")
                          $(".scanned_code").addClass("d-none")
                          $(".short_code").addClass("d-none")
                        }
                      

              }
              else if(obj.transactionType == "ServiceWithMaterial" || obj.transactionType == "Credit_Note" || obj.transactionType == "Debit_Note")
              {

                // alert("yes")
                
                      let newRow = `<tr>
          
                    <td class="text-center"><span class="minus-box delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size detail_company_code text-left" id="" value="${data.po_details[i].order_company}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size onee text-left" id="po_number" value="${data.po_details[i].order_number}"></td>
                    <td class="text-center p-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-left" value="${data.po_details[i].order_type}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size line_numm text-left" id="line_number" value="${data.po_details[i].line_number}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size po_item text-left" id="item_code" value="${data.po_details[i].item_number}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size description_item text-left" id="" value="${data.po_details[i].description}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size cost_rule text-left" id="" value="${data.po_details[i].cost_rule}"></td>
                    <td class="text-center p-0"><input type="text" readonly id="uom" class="form-control input_size currency text-left" value="${data.po_details[i].uom}"></td>
                    <td class="text-center p-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-right" value="${data.po_details[i].unit_cost}"></td>
                    <td class="text-center p-0 d-none"><input type="text" class="form-control input_size details_statuss text-right" id="" value="${data.po_details[i].quantity_ordered}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-right" id="" value="${data.po_details[i].quantity_open}"></td>
                    <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-right"></td>
                    <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-right" value="${data.po_details[i].quantity_received}"></td>
                    <td class="text-center p-0"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-right"></td>
                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size CGST_Amount text-center" value="${receipt.includes(true) ? obj.cgst_amount : ""}"></td>
                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size SGST_Amount text-center" value="${receipt.includes(true) ? obj.sgst_amount : ""}"></td>
                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size IGST_Amount text-center" value="${receipt.includes(true) ? obj.igst_amount : ""}"></td>
                    <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_value text-right" value="${receipt.includes(true) ? obj.taxable_value : ""}"></td>
                    <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_amount_payload text-right" value="${receipt.includes(true) ? obj.taxable_amount : ""}"></td>
                    <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size description text-right" value="${data.po_details[i].description}"></td>
                    <td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size Location text-center"></td>
                    <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size business_detail text-right" value="${data.po_details[i].business_unit}"></td>

                    </tr>`;
                    
                    $('#table-body').append(newRow);

              }
              else if(obj.transactionType == "Service_PO")
              {

                // alert("yes")
                
                      let newRow = `<tr>
          
                    <td class="text-center"><span class="minus-box delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size detail_company_code text-left" id="" value="${data.po_details[i].order_company}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size onee text-left" id="po_number" value="${data.po_details[i].order_number}"></td>
                    <td class="text-center p-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-left" value="${data.po_details[i].order_type}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size line_numm text-left" id="line_number" value="${data.po_details[i].line_number}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size po_item text-left" id="item_code" value="${data.po_details[i].item_number}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size description_item text-left" id="" value="${data.po_details[i].description}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size cost_rule text-left" id="" value="${data.po_details[i].cost_rule}"></td>
                    <td class="text-center p-0"><input type="text" readonly id="uom" class="form-control input_size currency text-left" value="${data.po_details[i].uom}"></td>
                    <td class="text-center p-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-right" value="${data.po_details[i].unit_cost}"></td>
                    <td class="text-center p-0 d-none"><input type="text" class="form-control input_size details_statuss text-right" id="" value="${data.po_details[i].quantity_ordered}"></td>
                    <td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-right" id="" value="${data.po_details[i].quantity_open}"></td>
                    <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-right"></td>
                    <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-right" value="${data.po_details[i].quantity_received}"></td>
                    <td class="text-center p-0"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-right"></td>
                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size CGST_Amount text-center" value="${receipt.includes(true) ? obj.cgst_amount : ""}"></td>
                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size SGST_Amount text-center" value="${receipt.includes(true) ? obj.sgst_amount : ""}"></td>
                    <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size IGST_Amount text-center" value="${receipt.includes(true) ? obj.igst_amount : ""}"></td>
                    <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_value text-right" value="${receipt.includes(true) ? obj.taxable_value : ""}"></td>
                    <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_amount_payload text-right" value="${receipt.includes(true) ? obj.taxable_amount : ""}"></td>
                    <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size description text-right" value="${data.po_details[i].description}"></td>
                    <td class="text-center p-0 d-none"><input type="text" id=""  readonly class="form-control input_size Location text-center"></td>
                    <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size business_detail text-right" value="${data.po_details[i].business_unit}"></td>
                    <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size row_increment text-right" value="${j + 1}"></td>
                    </tr>`;
                    
                    $('#table-body').append(newRow);

              }
              else{     

                newRow = `<tr>
    
                  <td class="text-center"><span class="minus-box delete-icon bg-danger"><i class="fa fa-minus"></i></span></td>
                  <td class="text-center p-0"><input type="text" readonly class="form-control input_size detail_company_code text-center" id="" value="${data.po_details[i].order_company}"></td>
                  <td class="text-center p-0"><input type="text" readonly class="form-control input_size onee text-center" id="po_number" value="${data.po_details[i].order_number}"></td>
                  <td class="text-center p-0"><input type="text" readonly id="po_type" class="form-control input_size po_type text-center" value="${data.po_details[i].order_type}"></td>
                  <td class="text-center p-0"><input type="text" readonly class="form-control input_size line_numm text-center" id="line_number" value="${data.po_details[i].line_number}"></td>
                  <td class="text-center p-0"><input type="text" readonly class="form-control input_size po_item text-center" id="item_code" value="${data.po_details[i].item_number}"></td>
                  <td class="text-center p-0"><input type="text" readonly class="form-control input_size description_item text-center" id="" value="${data.po_details[i].description}"></td>
                  <td class="text-center p-0"><input type="text" readonly class="form-control input_size cost_rule text-center" id="" value="${data.po_details[i].cost_rule}"></td>
                  <td class="text-center p-0"><input type="text" readonly id="uom" class="form-control input_size currency text-center" value="${data.po_details[i].uom}"></td>
                  <td class="text-center p-0"><input type="text" readonly id="unit_cost" class="form-control input_size unit_cost text-center" value="${data.po_details[i].unit_cost}"></td>
                  <td class="text-center p-0 d-none"><input type="text" class="form-control input_size details_statuss text-center" id="" value="${data.po_details[i].quantity_ordered}"></td>
                  <td class="text-center p-0"><input type="text" readonly class="form-control input_size open_quantity text-center" id="" value="${data.po_details[i].quantity_open}"></td>
                  <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_quantity text-center"></td>
                  <td class="text-center p-0 d-none"><input type="text" readonly id="" class="form-control input_size order_recieved text-center" value="${data.po_details[i].quantity_received}"></td>
                  <td class="text-center p-0"><input type="text" id=""  readonly class="form-control input_size Sacnned_qty text-center" id="quantity"></td>
                  <td class="text-center p-0"><input type="text" id="" class="form-control input_size accept_quantity check_grn text-center"></td>
                  <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size short_quantity text-center"></td>
                  <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size CGST_Amount text-center" value="${receipt.includes(true) ? obj.cgst_amount : ""}"></td>
                  <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size SGST_Amount text-center" value="${receipt.includes(true) ? obj.sgst_amount : ""}"></td>
                  <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size IGST_Amount text-center" value="${receipt.includes(true) ? obj.igst_amount : ""}"></td>
                  <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_value text-center" value="${receipt.includes(true) ? obj.taxable_value : ""}"></td>
                  <td class="text-center p-0"><input type="text" id="" readonly class="form-control input_size taxable_amount_payload text-center" value="${receipt.includes(true) ? obj.taxable_amount : ""}"></td>
                  <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size description text-center" value="${data.po_details[i].description}"></td>
                  <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size Location text-center"></td>
                  <td class="text-center p-0 d-none"><input type="text" id="" readonly class="form-control input_size business_detail text-center" value="${data.po_details[i].business_unit}"></td>
                  </tr>`;
                  // <td class="d-flex"><button type="button" class="btn btn-secondary recieved-row p-1 mt-1"  data-toggle="modal" data-target="#myModal13">Recieve</button></td>
                  $('#table-body').append(newRow);

              }

           
                    let status = $(".details_statuss")[$('#table-body tr').length -1];
  
  
                    let color =  $.td_back(data.po_details[i].quantity_ordered)
  
                    $(status).parent().parent().addClass(`${color}`)
                    $(status).parent().parent().children().children().css("background-color" ,"transparent")
                    $(status).parent().parent().children().children().css("border" , "none")
                    $("button").removeClass(`${color}`)
  
            }
            else{

              j--;
              
            }
  
          }
      
  
      $("#delete_unnessary").trigger("click")

      // try {

      //   // $("#modal_delete_unnessary").trigger("click")
        
      //   modal_table = $('#modal_table').DataTable({
      //       language: {
      //           'paginate': {
      //           'previous': '<span class="prev-icon"><i class="fa fa-angle-left"></i></span>',
      //           'next': '<span class="next-icon"><i class="fa fa-angle-right"></i></span>'
      //           }
      //   },
      //   dom: '<"top">t<"bottom"ip>',
      //   ordering: true,
      //   lengthMenu : [5,10,20,25,50],
      //   pagingType: "simple_numbers",
      //   select: true,
      //   });
      //   modal_table.column(14).visible(false);
      //   modal_table.column(12).visible(false);
      //   modal_table.column(11).visible(false);
      //   modal_table.column(10).visible(false);
      // } catch (error) {

      //   console.log(error);
        
      // }
  
  
  
      

        match = Purchase_order;
        arr.push(Purchase_order)
        overAllCurrency.push(data.currency_code)

        }
        else if(data.amount == 0)
        {
    
            const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-secondary mx-1',
                // cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false
        })
    
            swalWithBootstrapButtons.fire({
            // title: 'Are you sure?',
            title: `Amount is 0`,
            icon: 'warning',
            // showCancelButton: true,
            confirmButtonText: 'OK',
            // cancelButtonText: 'cancel!',
            reverseButtons: true
        })
        }
    
        else if(overAllCurrency.includes(data.currency_code) == false && overAllCurrency.length != 0)
        {

          
            const swalWithBootstrapButtonss = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-secondary mx-1',
                // cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false
        })
    
            swalWithBootstrapButtonss.fire({
            // title: 'Are you sure?',
            title: `The Currency is not same`,
            icon: 'warning',
            // showCancelButton: true,
            confirmButtonText: 'OK',
            // cancelButtonText: 'cancel!',
            reverseButtons: true
        })
        }


          
      },
      error : function(xhr)
      {
        console.log('error  ---->' ,xhr);

        $("#loader1").removeClass("sk-loading")
        $("#loader1").removeClass("ibox-content")
        $("#spin1").addClass("d-none")
        $("#loader2").removeClass("sk-loading")
        $("#loader2").removeClass("ibox-content")
        $("#spin2").addClass("d-none")
        $("#loader4").removeClass("ibox-content")                     
        $("#loader4").removeClass("sk-loading")                     
        $("#spin4").addClass("d-none")

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-sm btn-secondary mx-1',
                cancelButton: 'btn btn-sm btn-danger mx-1'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            text: `${xhr.responseJSON.jde__simpleMessage}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'cancel!',
            reverseButtons: true
        })


      },
      complete : ()=>{
        $("#loader1").removeClass("sk-loading")
        $("#loader1").removeClass("ibox-content")
        $("#spin1").addClass("d-none")
        $("#loader2").removeClass("sk-loading")
        $("#loader2").removeClass("ibox-content")
        $("#spin2").addClass("d-none")
        $("#loader4").removeClass("ibox-content")                     
        $("#loader4").removeClass("sk-loading")                     
        $("#spin4").addClass("d-none") 
      }
  })

  }



}

var debitNoteTable;

$.debitNote = function(obj){

  let copiedObj = JSON.parse(JSON.stringify(obj))
  

  try {
    copiedObj.short_jde_msg = copiedObj.short_jde_msg.replace(/\((\d+)\)/g, '<br>($1)')
  } catch (error) {
    
  }

  if(copiedObj.short_order_number != null || copiedObj.short_jde_msg != null)
  {
     debitNoteTable = $("#debit_table").DataTable({
      dom: '<"top">t<"bottom"ilp>',
      data : [copiedObj],
    columns: [
  
        { data: "short_order_number"},
        { data: "short_receipt_document"},
        { data: "short_voucher_number"},
        { data: "short_jde_msg" },
        
    ],
  
    columnDefs: [
      {
        "defaultContent": "-",
        "targets": "_all"
      },
      { "targets": [0], "className": "nowrap" },
      { "targets": [1], "className": "nowrap" },
      { "targets": [2], "className": "nowrap" },
        
    ],
    
      })
      
  }
  else{

    $("#data_list4").addClass("d-none")

  }


  $('#debit_table td:nth-child(1)').css('width', '10%');
  $('#debit_table td:nth-child(2)').css('width', '10%');
  $('#debit_table td:nth-child(3)').css('width', '10%');

  // setTimeout(() => {
    
  //   console.log('tab values  ---->' , tab.columns.adjust() )
  //    tab.columns.adjust().draw()
  // }, 2000);

}








$.dynamicMailSender = function(role ,  gate_number)
{

  $.ajax({
    url : `${$.test()[0].url}/register?role=${role}&gateNumber=${gate_number}`,
    type : "Post",
    success : function(data, status , xhr) 
    {
      console.log('success dynamicMailSender ---->' ,xhr);
    },
    error : function(xhr)
    {
      console.log("error : ",xhr);
    }
  })

}








$.sendEmail = async function (object,role,attachment,to_email) {
  let subject, to, from;

  console.log(object);

  try {
    const response = await $.ajax({
      url: emailTemplateUrl,

      type: "get",

      headers: {
        Authorization: "Bearer " + token,
      },

      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        } else if (xhr.status >= 400 && xhr.status < 500) {
          $.errorMessage(xhr.responseJSON.message);
        } else {
          $.errorMessage(xhr.responseJSON.error);
        }
      },
    });

    const emailConfigResponse = await $.ajax({
      url: emailConfig,

      type: "get",

      headers: {
        Authorization: "Bearer " + token,
      },

      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        } else if (xhr.status >= 400 && xhr.status < 500) {
          $.errorMessage(xhr.responseJSON.message);
        } else {
          $.errorMessage(xhr.responseJSON.error);
        }
      },
    });

    const configEmail = emailConfigResponse.data;

    // console.log(configEmail[0].name);

    const emailTemplates = response.data;

    // console.log(emailTemplates);

    for (const value of emailTemplates) {
      if (role === "Unload" && value.name === "Unloading") {
        // console.log("Hi");

        // console.log(value);

        subject = value.subject;

        to = value.to_email;

        from = value.send_email;

        var htmlContent = atob(value.html_content);

        var foundText = findTextBetweenBrackets(htmlContent);

        if (foundText != null) {
          for (let i = 0; i < foundText.length; i++) {
            // console.log(object[`${foundText[i]}`]);

            var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
              [foundText[i]]: object[`${foundText[i]}`],
            });

            htmlContent = modifiedHtmlContent;
          }

          $("#content").empty();

          $("#content").append(removeSquareBrackets(modifiedHtmlContent));
        }
      } else if (role === "Error" && value.name === "Error") {
        // console.log("Hi");

        // console.log(value);

        subject = value.subject;

        to = value.to_email;

        from = value.send_email;

        var htmlContent = atob(value.html_content);

        var foundText = findTextBetweenBrackets(htmlContent);

        if (foundText != null) {
          for (let i = 0; i < foundText.length; i++) {
            // console.log(object[`${foundText[i]}`]);

            var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
              [foundText[i]]: object[`${foundText[i]}`],
            });

            htmlContent = modifiedHtmlContent;
          }

          $("#content").empty();

          $("#content").append(removeSquareBrackets(modifiedHtmlContent));
        }
      } else if (role === "Store" && value.name === "Store") {
        // console.log(value);

        // console.log(object);

        subject = value.subject;

        // to = to_email.join(",");

        to = value.to_email;

        // to = `shashi.rai@kirtitec.com,ravinder.singh@kirtitec.com,`;

        from = value.send_email;

        var htmlContent = atob(value.html_content);

        var foundText = findTextBetweenBrackets(htmlContent);

        if (foundText != null) {
          for (let i = 0; i < foundText.length; i++) {
            // console.log(object[`${foundText[i]}`]);

            var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
              [foundText[i]]: object[`${foundText[i]}`],
            });

            htmlContent = modifiedHtmlContent;
          }

          $("#content").empty();

          $("#content").append(removeSquareBrackets(modifiedHtmlContent));
        }
      } else if (role === "Quanity" && value.name === "Quanity") {
        // console.log(value);

        // console.log(object);

        subject = value.subject;

        // to = to_email.join(",");

        to = value.to_email;

        // to = `shashi.rai@kirtitec.com,ravinder.singh@kirtitec.com,`;

        from = value.send_email;

        var htmlContent = atob(value.html_content);

        var foundText = findTextBetweenBrackets(htmlContent);

        if (foundText != null) {
          for (let i = 0; i < foundText.length; i++) {
            // console.log(object[`${foundText[i]}`]);

            var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
              [foundText[i]]: object[`${foundText[i]}`],
            });

            htmlContent = modifiedHtmlContent;
          }

          $("#content").empty();

          $("#content").append(removeSquareBrackets(modifiedHtmlContent));
        }
      }else if (role === "Finance" && value.name === "Finance") {
        // console.log(value);

        // console.log(object);

        subject = value.subject;

        // to = to_email.join(",");

        to = value.to_email;

        // to = `shashi.rai@kirtitec.com,ravinder.singh@kirtitec.com,`;

        from = value.send_email;

        var htmlContent = atob(value.html_content);

        var foundText = findTextBetweenBrackets(htmlContent);

        if (foundText != null) {
          for (let i = 0; i < foundText.length; i++) {
            // console.log(object[`${foundText[i]}`]);

            var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
              [foundText[i]]: object[`${foundText[i]}`],
            });

            htmlContent = modifiedHtmlContent;
          }

          $("#content").empty();

          $("#content").append(removeSquareBrackets(modifiedHtmlContent));
        }
      }else if (role === "Cancel" && value.name === "Cancel") {
        // console.log(value);

        // console.log(object);

        subject = value.subject;

        // to = to_email.join(",");

        to = value.to_email;

        // to = `shashi.rai@kirtitec.com,ravinder.singh@kirtitec.com,`;

        from = value.send_email;

        var htmlContent = atob(value.html_content);

        var foundText = findTextBetweenBrackets(htmlContent);

        if (foundText != null) {
          for (let i = 0; i < foundText.length; i++) {
            // console.log(object[`${foundText[i]}`]);

            var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
              [foundText[i]]: object[`${foundText[i]}`],
            });

            htmlContent = modifiedHtmlContent;
          }

          $("#content").empty();

          $("#content").append(removeSquareBrackets(modifiedHtmlContent));
        }
      }

      // $('#content').append(modifiedHtmlContent);
    }

    

    for (const values of configEmail) {
      if (role === "Unload" && values.name === "Gate") {
        // alert("hi");

        let mailDetails = {
          subject: subject,
    
          email: to,
    
          from: from,
    
          smtp_server: values.smtp_server,
    
          smtp_port: values.smtp_port,
    
          username: values.username,
    
          password: values.password,
    
          debugging: values.debugging,
    
          name: values.name,
    
          body: $("#content").html(),
        };
    
        let sendmail = new FormData();
    
        sendmail.append("file", attachment);
    
        sendmail.append("json", JSON.stringify( mailDetails ));

        // console.log(values);

        await $.ajax({
          url: registerUrl,

          type: "post",

          data: sendmail,

          // async: false,

          processData: false,

          contentType: false,

          success: function (data, status) {
            // console.log(data);
            // alert("Email sent successfully");
          },

          error: function (xhr) {
            if (xhr.status == 498) {
              $.tokenError();
            } else if (xhr.status >= 400 && xhr.status < 500) {
              $.errorMessage(xhr.responseJSON.message);
            } else {
              $.errorMessage(xhr.responseJSON.error);
            }
          },
        });
      } else if (role === "Error" && values.name === "Gate") {
        // alert("hi");


        let mailDetails = {
          subject: subject,
    
          email: to,
    
          from: from,
    
          smtp_server: values.smtp_server,
    
          smtp_port: values.smtp_port,
    
          username: values.username,
    
          password: values.password,
    
          debugging: values.debugging,
    
          name: values.name,
    
          body: $("#content").html(),
        };

    
        let sendmail = new FormData();
    
        sendmail.append("file", attachment);
    
        sendmail.append("json", JSON.stringify(mailDetails));

        // console.log(values);

        await $.ajax({
          url: registerUrl,

          type: "post",

          data: sendmail,

          // async: false,

          processData: false,

          contentType: false,

          success: function (data, status) {
            // console.log(data);
          },

          error: function (xhr) {

            console.log("xhr :" ,xhr);
            if (xhr.status == 498) {
              $.tokenError();
            } else if (xhr.status >= 400 && xhr.status < 500) {
              $.errorMessage(xhr.responseJSON.message);
            } else {
              $.errorMessage(xhr.responseJSON.error);
            }
          },
        });
      } else if (role === "Store" && values.name === "Gate") {


        let mailDetails = {
          subject: subject,
    
          email: to,
    
          from: from,
    
          smtp_server: values.smtp_server,
    
          smtp_port: values.smtp_port,
    
          username: values.username,
    
          password: values.password,
    
          debugging: values.debugging,
    
          name: values.name,
    
          body: $("#content").html(),
        };


        console.table(mailDetails);
    
        let sendmail = new FormData();
    
        sendmail.append("file", attachment);
    
        sendmail.append("json", JSON.stringify(mailDetails ));

        
        await $.ajax({
          url: registerUrl,

          type: "post",

          data: sendmail,

          // async: false,

          processData: false,

          contentType: false,

          success: function (data, status) {
            // console.log(data);
            // alert("Email sent successfully");
          },

          error: function (xhr) {
            if (xhr.status == 498) {
              $.tokenError();
            } else if (xhr.status >= 400 && xhr.status < 500) {
              $.errorMessage(xhr.responseJSON.message);
            } else {
              $.errorMessage(xhr.responseJSON.error);
            }
          },
        });
      } else if (role === "Quanity" && values.name === "Gate") {

        let mailDetails = {
          subject: subject,
    
          email: to,
    
          from: from,
    
          smtp_server: values.smtp_server,
    
          smtp_port: values.smtp_port,
    
          username: values.username,
    
          password: values.password,
    
          debugging: values.debugging,
    
          name: values.name,
    
          body: $("#content").html(),
        };


        console.table(mailDetails);
    
        let sendmail = new FormData();
    
        sendmail.append("file", attachment);
    
        sendmail.append("json", JSON.stringify(mailDetails ));

        await $.ajax({
          url: registerUrl,

          type: "post",

          data: sendmail,

          // async: false,

          processData: false,

          contentType: false,

          success: function (data, status) {
            // console.log(data);
            // alert("Email sent successfully");
          },

          error: function (xhr) {
            if (xhr.status == 498) {
              $.tokenError();
            } else if (xhr.status >= 400 && xhr.status < 500) {
              $.errorMessage(xhr.responseJSON.message);
            } else {
              $.errorMessage(xhr.responseJSON.error);
            }
          },
        });
      }else if (role === "Finance" && values.name === "Gate") {

        let mailDetails = {
          subject: subject,
    
          email: to,
    
          from: from,
    
          smtp_server: values.smtp_server,
    
          smtp_port: values.smtp_port,
    
          username: values.username,
    
          password: values.password,
    
          debugging: values.debugging,
    
          name: values.name,
    
          body: $("#content").html(),
        };


        console.table(mailDetails);
    
        let sendmail = new FormData();
    
        sendmail.append("file", attachment);
    
        sendmail.append("json", JSON.stringify(mailDetails ));

        await $.ajax({
          url: registerUrl,

          type: "post",

          data: sendmail,

          // async: false,

          processData: false,

          contentType: false,

          success: function (data, status) {
            // console.log(data);
            // alert("Email sent successfully");
          },

          error: function (xhr) {
            if (xhr.status == 498) {
              $.tokenError();
            } else if (xhr.status >= 400 && xhr.status < 500) {
              $.errorMessage(xhr.responseJSON.message);
            } else {
              $.errorMessage(xhr.responseJSON.error);
            }
          },
        });
      }else if (role === "Cancel" && values.name === "Gate") {

        let mailDetails = {
          subject: subject,
    
          email: to,
    
          from: from,
    
          smtp_server: values.smtp_server,
    
          smtp_port: values.smtp_port,
    
          username: values.username,
    
          password: values.password,
    
          debugging: values.debugging,
    
          name: values.name,
    
          body: $("#content").html(),
        };


        console.table(mailDetails);
    
        let sendmail = new FormData();
    
        sendmail.append("file", attachment);
    
        sendmail.append("json", JSON.stringify(mailDetails ));

        await $.ajax({
          url: registerUrl,

          type: "post",

          data: sendmail,

          // async: false,

          processData: false,

          contentType: false,

          success: function (data, status) {
            // console.log(data);
            // alert("Email sent successfully");
          },

          error: function (xhr) {
            if (xhr.status == 498) {
              $.tokenError();
            } else if (xhr.status >= 400 && xhr.status < 500) {
              $.errorMessage(xhr.responseJSON.message);
            } else {
              $.errorMessage(xhr.responseJSON.error);
            }
          },
        });
      }
    }
  } catch (error) {
    // Handle error

    console.error(error);

    // swal("", error.responseJSON.message, "error")

    // $("form")[0].reset();
  }
};

$.addUserSendEmail = async function (object, role, attachment) {
  let subject, to, from;

  try {
    await $.ajax({
      url: emailTemplateUrl,

      type: "get",

      // async: false,

      headers: {
        Authorization: "Bearer " + token,
      },

      success: function (data) {
        // console.log(data);

        // alert("emailTemplateUrl")

        data.data.map((value) => {
          if (role === "Add User" && value.name === "Add User") {
            console.log(value);

            subject = value.subject;

            to = object.email;

            from = value.send_email;

            var htmlContent = atob(value.html_content);

            var foundText = findTextBetweenBrackets(htmlContent);

            if (foundText != null) {
              for (let i = 0; i < foundText.length; i++) {
                // console.log(object[`${foundText[i]}`]);

                var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
                  [foundText[i]]: object[`${foundText[i]}`],
                });

                htmlContent = modifiedHtmlContent;
              }

              $("#content").empty();

              $("#content").append(removeSquareBrackets(modifiedHtmlContent));
            }
          }
          if (role === "Change Password" && value.name === "Change Password") {
            console.log(value);

            subject = value.subject;

            to = object.email;

            from = value.send_email;

            var htmlContent = atob(value.html_content);

            var foundText = findTextBetweenBrackets(htmlContent);

            if (foundText != null) {
              for (let i = 0; i < foundText.length; i++) {
                // console.log(object[`${foundText[i]}`]);

                var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
                  [foundText[i]]: object[`${foundText[i]}`],
                });

                htmlContent = modifiedHtmlContent;
              }

              $("#content").empty();

              $("#content").append(removeSquareBrackets(modifiedHtmlContent));
            }
          }
        });
      },

      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        } else if (xhr.status >= 400 && xhr.status < 500) {
          $.errorMessage(xhr.responseJSON.message);
        } else {
          $.errorMessage(xhr.responseJSON.error);
        }
      },

      complete: () => {
        $.ajax({
          url: emailConfig,

          type: "get",

          // async: false,

          headers: {
            Authorization: "Bearer " + token,
          },

          success: function (data) {
            // alert("emailConfig")

            for (const values of data.data) {
              if (role === "Add User" && values.name === "Gate") {
                console.log(values);

                let mailDetails = {
                  subject: subject,

                  email: to,

                  from: from,

                  smtp_server: values.smtp_server,

                  smtp_port: values.smtp_port,

                  username: values.username,

                  password: values.password,

                  debugging: values.debugging,

                  name: values.name,

                  body: $("#content").html(),
                };

                let sendmail = new FormData();

                sendmail.append("file", attachment);

                sendmail.append("json", JSON.stringify(mailDetails));

                console.log(sendmail);

                $.ajax({
                  url: registerUrl,

                  // url: `http://192.168.0.214:8050/register`,

                  type: "post",

                  data: sendmail,

                  // async: false,

                  processData: false,

                  contentType: false,

                  success: function (data, status) {
                    // console.log(data);
                    // alert("Email sent successfully");
                  },

                  error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status >= 400 && xhr.status < 500) {
                      $.errorMessage(xhr.responseJSON.message);
                    } else {
                      $.errorMessage(xhr.responseJSON.error);
                    }
                  },
                });
              }
              if (role === "Change Password" && values.name === "Gate") {
                console.log(values);

                let mailDetails = {
                  subject: subject,

                  email: to,

                  from: from,

                  smtp_server: values.smtp_server,

                  smtp_port: values.smtp_port,

                  username: values.username,

                  password: values.password,

                  debugging: values.debugging,

                  name: values.name,

                  body: $("#content").html(),
                };

                let sendmail = new FormData();

                sendmail.append("file", attachment);

                sendmail.append("json", JSON.stringify(mailDetails));

                console.log(sendmail);

                $.ajax({
                  url: registerUrl,

                  // url: `http://192.168.0.214:8050/register`,

                  type: "post",

                  data: sendmail,

                  // async: false,

                  processData: false,

                  contentType: false,

                  success: function (data, status) {
                    // console.log(data);
                    // alert("Email sent successfully");
                  },

                  error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status >= 400 && xhr.status < 500) {
                      $.errorMessage(xhr.responseJSON.message);
                    } else {
                      $.errorMessage(xhr.responseJSON.error);
                    }
                  },
                });
              }
            }
          },

          error: (xhr) => {
            console.log(xhr);

            if (xhr.status == 498) {
              $.tokenError();
            }

            console.log(xhr.message);
          },
        });
      },
    });
  } catch (error) {
    console.error(error);
  }
};


$.appointmentRequest = async function (object, role, attachment) {
  let subject, to, from;

  console.log("attachment",attachment);

  try {
    await $.ajax({
      url: emailTemplateUrl,
      type: "get",
      // async: false,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (data) {
        // alert("emailTemplateUrl")
        data.data.map((value) => {
          if (role === "Appointment Request" && value.name === "Appointment Request") {
            console.log(value);

            subject = `${value.subject} ${object.toMeet}`;
            to = object.visitorEmail;
            from = value.send_email;

            var htmlContent = atob(value.html_content);
            var foundText = findTextBetweenBrackets(htmlContent);

            if (foundText != null) {
              for (let i = 0; i < foundText.length; i++) {

                var modifiedHtmlContent = replaceTextInHtml(htmlContent, {
                  [foundText[i]]: object[`${foundText[i]}`],
                });

                htmlContent = modifiedHtmlContent;
              }

              $("#content").empty();

              $("#content").append(removeSquareBrackets(modifiedHtmlContent));
            }
          }
        });
      },

      error: function (xhr) {
        if (xhr.status == 498) {
          $.tokenError();
        } else if (xhr.status >= 400 && xhr.status < 500) {
          $.errorMessage(xhr.responseJSON.message);
        } else {
          $.errorMessage(xhr.responseJSON.error);
        }
      },

      complete: () => {
        // $("#content").append(`Below bar Code is for Gate entry. <br> <img id="barcode" src="" alt="Barcode">`)
        //  // Replace these values with your barcode data
        //  var barcodeData = "[barcodeData]";
        
        //  // Generate the barcode using the barcode.js library
        //  JsBarcode("#barcode", barcodeData, {
        //      format: "CODE128",  // Specify the barcode format (e.g., CODE128)
        //      width: 2,           // Specify the barcode width
        //      height: 60          // Specify the barcode height
        //  });
        $.ajax({
          url: emailConfig,
          type: "get",
          // async: false,
          headers: {
            Authorization: "Bearer " + token,
          },
          success: function (data) {
            // alert("emailConfig")
            for (const values of data.data) {
              if (role === "Appointment Request" && values.name === "Gate") {
                console.log(values);

                let mailDetails = {
                  subject: subject,
                  email: to,
                  from: from,
                  smtp_server: values.smtp_server,
                  smtp_port: values.smtp_port,
                  username: values.username,
                  password: values.password,
                  debugging: values.debugging,
                  name: values.name,
                  body: $("#content").html(),
                };

                let sendmail = new FormData();
                sendmail.append("file", attachment);
                sendmail.append("json", JSON.stringify(mailDetails));
                console.log(sendmail);

                $.ajax({
                  url: registerUrl,
                  type: "post",
                  data: sendmail,
                  // async: false,
                  processData: false,
                  contentType: false,
                  success: function (data, status) {
                    // console.log(data);
                    // alert("Email sent successfully");
                  },
                  error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status >= 400 && xhr.status < 500) {
                      $.errorMessage(xhr.responseJSON.message);
                    } else {
                      $.errorMessage(xhr.responseJSON.error);
                    }
                  },
                });
              }
              if (role === "Change Password" && values.name === "Gate") {
                console.log(values);

                let mailDetails = {
                  subject: subject,

                  email: to,

                  from: from,

                  smtp_server: values.smtp_server,

                  smtp_port: values.smtp_port,

                  username: values.username,

                  password: values.password,

                  debugging: values.debugging,

                  name: values.name,

                  body: $("#content").html(),
                };

                let sendmail = new FormData();

                sendmail.append("file", attachment);

                sendmail.append("json", JSON.stringify(mailDetails));

                console.log(sendmail);

                $.ajax({
                  url: registerUrl,

                  // url: `http://192.168.0.214:8050/register`,

                  type: "post",

                  data: sendmail,

                  // async: false,

                  processData: false,

                  contentType: false,

                  success: function (data, status) {
                    // console.log(data);
                    // alert("Email sent successfully");
                  },

                  error: function (xhr) {
                    console.log(xhr);

                    if (xhr.status >= 400 && xhr.status < 500) {
                      $.errorMessage(xhr.responseJSON.message);
                    } else {
                      $.errorMessage(xhr.responseJSON.error);
                    }
                  },
                });
              }
            }
          },

          error: (xhr) => {
            console.log(xhr);

            if (xhr.status == 498) {
              $.tokenError();
            }

            console.log(xhr.message);
          },
        });
      },
    });
  } catch (error) {
    console.error(error);
  }
};


function removeSquareBrackets(str) {
  const pattern = /\[|\]/g;
  const cleanedStr = str.replace(pattern, "");
  return cleanedStr;
}

function findTextBetweenBrackets(content) {
  var regex = /\[(.*?)\]/g;
  var matches = content.match(regex);
  // console.log(matches);
  var foundText = matches
    ? matches.map((match) => match.substring(1, match.length - 1))
    : [];
  return foundText;
}

function replaceTextInHtml(htmlContent, replacements) {
  let modifiedHtmlContent = htmlContent;

  for (const searchText in replacements) {
    if (replacements.hasOwnProperty(searchText)) {
      const replacementText = replacements[searchText];
      const searchRegex = new RegExp(searchText, "g");
      modifiedHtmlContent = modifiedHtmlContent.replace(
        searchRegex,
        replacementText
      );
    }
  }
  return modifiedHtmlContent;
  // $.audit("GUARAV" , "DV" , "http://192.168.0.177:8080" , JSON.stringify({comapny: "505" , state : "AB" , business_unit : "101"}) , "sucess" , "P")
}
