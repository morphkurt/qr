let count = 0;
let qrcode
let id
let completed = false

$(document).ready(function () {
    qrcode = new QRCode(document.getElementById("qrcode"), '');
    timeout();

})

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function timeout() {
    setTimeout(function () {

        qrcode.clear(); // clear the code.
        if ((count % 120) == 0) {
            id = makeid(25)
            qrcode.makeCode(id); // make another code.
        }
        if (((count % 3) == 0) && (!completed)) {
            axios.get('https://whispering-waters-99783.herokuapp.com/qr/' + id,).then(({ data }) => {
                if (data.status == "success") {
                    completed = true;
                    qrcode.clear();
                    if (data.type) {
                        let d = 'data:image/' + data.type + ';base64,' + data.content;
                        let w = window.open('about:blank');
                        let image = new Image();
                        image.src = d;
                        setTimeout(function () {
                            w.document.write(image.outerHTML);
                        }, 0);
                    } else {
                        window.location.href = atob(data.content);
                    }
                }
            });
        }



        // Do Something Here
        // Then recall the parent function to
        // create a recursive loop.
        $('#status').text("above code expires in " + (120 - (count % 120)) + " seconds")
        count++
        timeout();
    }, 1000);
}