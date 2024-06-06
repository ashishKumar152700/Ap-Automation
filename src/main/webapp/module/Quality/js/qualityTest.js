let sessionStrings = sessionStorage.getItem('gateid')
    let gate_number = JSON.parse(sessionStrings);
    var checkstatus = $.checkstatus(gate_number, "ture")

    let gateno = sessionStorage.getItem('gateno')
    let gate = JSON.parse(gateno);

    console.log(gate_number);

    $(window).load(() => {
        $("#btn_panel").trigger("click");
        $("#gate_number").html(gate)
    })