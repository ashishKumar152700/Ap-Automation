$("#pagename1")[0].innerText = $("title")[0].innerText;
// // $("#pagename2")[0].innerText = $("title")[0].innerText;
var heads = null;
let count=null;
var breadcrumbitem = [];


    $('#menu a').on('click', function() {

                heads = ` / ${$(this)[0].innerText} `

                if (heads != count) {
                    count = heads
                    breadcrumbitem.push(`${$(this)[0].innerText}`)
                    console.log(true,breadcrumbitem);
                    breadcrumbitem.map((data=>{
                        $(".itemss").append(` <li class="list-item breadcrumb-item">${data}</li>`)
                    }))
                    breadcrumbitem.pop();
                }else{
                    console.log(false);
                }
                
            }
        
        )
