let count = 0;
let qrcode
let id

$( document ).ready(function() {
    qrcode =  new QRCode(document.getElementById("qrcode"),'');
    timeout();

})

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function timeout() {
    setTimeout(function () {
    
        qrcode.clear(); // clear the code.
        if ((count % 60) == 0 ){
            id = makeid(25)
            qrcode.makeCode(id); // make another code.
        }
        if ((count % 3) == 0 ){
            axios.get('https://whispering-waters-99783.herokuapp.com/qr/'+id,).then(({ data }) => {
                console.log(atob(data.content))
                if (data.status == "success") {
                    qrcode.clear();
                    document.cookie = "cookiename=" + id
                    $('#status').text("authenticated succesfully, redirecting....")
                    
                    window.location.href = atob(data.content);
                }
             });            
        }

       

        // Do Something Here
        // Then recall the parent function to
        // create a recursive loop.
        $('#status').text("above code expires in " + ( 60 - (count % 60))+ " seconds")
        count++
        timeout();
    }, 1000);
}