$(document).ready(() => {

	let test = $.testUrl();
	let login = $.loginUrl();
	let vision = $.visionUrl();
  
  
	$("#kt_sign_in_form").submit((e) => {
	  e.preventDefault();
	  

	   // Get username and password from form inputs
	   var username = $("#username").val();
	   var password = $("#password").val();
   
	   console.log(username);
	   console.log(password);
 
 
	   if(username === "" || password === "") {
		 swal("", "Fields Should Not Be Empty", "error");
		 return; 
	 }
	 
	  // let menu = $.menu();
  
	  // Show loader while processing the form
	  $("#loader").addClass("ibox-content");
	  $("#loader").addClass("sk-loading");
	  $(".sk-spinner").removeClass("d-none");
  
	 
	
  
	  // Perform AJAX request to login endpoint
	  $.ajax({
		url: `${[test[0].url]}/auth/signin`,
		type: "POST",
		data: JSON.stringify({
		  username: username,
		  password: password,
		}),
		headers: {
		  Accept: "application/json",
		  "Content-Type": "application/json",
		},
		success: function (data, status, xhr) {
		  // Hide the loader after successful response
		  
  
		  if (xhr.status == 200) {
			// Extract relevant data from the response
			console.log(data);
  
			if(data.error != true)
			{

				handleSignIn()
  
			
  
			let username = data.username;
			let roles = data.userInfo.roles.map((value) => value);
			let gateId = data.userInfo.gate_id;
			let token = data.token;
			let refreshToken = data.refreshToken;
			let company = data.userInfo.company
			let store = data.userInfo.stores
			
			// Store username and roles in session storage
  
			localStorage.setItem("username", JSON.stringify(username));
			localStorage.setItem("userrole", JSON.stringify(roles));
			localStorage.setItem("gateId", JSON.stringify(gateId));
			localStorage.setItem("token", JSON.stringify(token));
			localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
			localStorage.setItem("comapny", JSON.stringify(company));
			localStorage.setItem("store", JSON.stringify(store));
			localStorage.setItem("testUrl", JSON.stringify(test));
			localStorage.setItem("loginUrl", JSON.stringify(login));
			localStorage.setItem("visionUrl", JSON.stringify(vision));
			
  
			let menuData = $.menuDefiend(token , test[0].url)
  
			console.log('menu ---->' ,menuData);

			
			// $.ajax({
			// 	url: `${test[0].url}/reservationMaster/delete?username=${username}`,
			// 	async : true,
			// 	type : "delete",
			// 	headers: {
			// 		'Authorization': 'Bearer ' + token,
			// 	  },
			// 	  success: function (data, status, xhr) {
			// 		console.log(data);
			// 	  },
			// 	  error : function(xhr)
			// 	  {
					
			// 	  }

			// })
  
  
  
			localStorage.setItem("menuData", JSON.stringify(menuData));
  
			console.log(data);
  
			// console.log(gate_id);
  
  
			// Open different URLs based on user roles

			
  
			if (
			  (roles.includes("GATE") &&
			  roles.includes("USER") &&
			  roles.includes("QUALITY") &&
			  roles.includes("STORE") &&
			  roles.includes("FINANCE") &&
			  roles.includes("Voucher") &&
			  roles.includes("Training") &&
			  roles.includes("Flaw Fix") && 
			  roles.includes("Visitor") &&
			  roles.includes("Unload")) ||
			  roles.includes("Admin")
			) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("USER")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("GATE")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("QUALITY")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("STORE")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("FINANCE")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("Unload")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("Training")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("Flaw Fix")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("Visitor")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			} else if (roles.includes("Voucher")) {
			  window.open("../../DashBoard/dashBoard/template/dashBoard.jsp","_self");
			}
		  }
		  else{
			swal("", data.message, "error");
		  }
  
		  //   // Reset the form
			$("form")[0].reset();
		  } 
		  else{
  
				$.errorMessage(xhr.responseJSON.message);
				$("form")[0].reset();
		  }
		},
  
		error: function (xhr, status) {
		  // Hide the loader on error
		  $("#loader").removeClass("sk-loading");
		  $("#loader").removeClass("ibox-content");
		  $(".sk-spinner").addClass("d-none");
  
		  console.log(xhr);
		  swal("", xhr.responseJSON.message, "error").then(() => {
			$("form")[0].reset();
		  });
		},
		complete : ()=>{
  
		  $("#loader").removeClass("sk-loading");
		  $("#loader").removeClass("ibox-content");
		  $(".sk-spinner").addClass("d-none");
		}
	  });
	});
  });
  