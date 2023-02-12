$(function () { 
    var url="https://www.cloudflare.com/cdn-cgi/trace";
    
    // $.ajax().done().fail();
    $.ajax({ method:"GET", url:url}).done(function (response) { 
            let veri=response.split('\n');
            console.log(veri);
            let ip=veri[2].split('=')[1];
            console.log(ip);

            let cihaz=veri[5].split('=')[1];
            console.log(cihaz);
            
            let konum=veri[8].split('=')[1];
            console.log(konum);

    }).fail(function () { 
        console.log('Veri Alırken Hata Oluştu')
    });
})