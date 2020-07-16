let count = 0;
let qrcode
let id
let completed = false
let ws = new WebSocket("ws://localhost:3000");


$(document).ready(function () {
    id = makeid(25)
    qrcode = new QRCode(document.getElementById("qrcode"), '');
    let el;
    ws.onmessage = (event) => {
        let response = JSON.parse(event.data)
        if (response.action == "id") {
            qrcode.clear(); // clear the code.
            qrcode.makeCode(response.id); // make another code.
        }
        console.log(response);
        if (response.status == "success") {
            qrcode.clear();
            if (response.type == "image") {
                let d = 'data:image/' + response.type + ';base64,' + response.content;
                let w = window.open('about:blank');
                let image = new Image();
                image.src = d;
                setTimeout(function () {
                    w.document.write(image.outerHTML);
                }, 0);
            } else if (response.type == "url") {
                window.location.href = atob(response.content);
            }
           
        }
    };
  //  timeout(ws);



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

