(function () {
    const server = 'http://127.0.0.1:3000'
    const socket = io(server);
    const userID="";

    socket.on('notification', (data) => {
        console.log('Message depuis le seveur:', data);
        userID = data;
    })

    function getUserName(){
        let name = document.getElementsByName('my-account');
         
    }

    const el = document.getElementById('btn-submit-chat');

    el.addEventListener('submit',(e) => {
        e.preventDefault();

        let message = document.getElementById('text-area').value;
        let date = new Date();
        let time = date.getHours() + " : " + date.getMinutes();
        console.log(time);
        io.emit('chat', {id : userID, msg : message});


        fetch(`${server}/msg`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
          })
    })()
    socket.on('chat', (msg) => {
        console.log(`${msg.chat}`);
    });

    function render(){
        let chatList = document.getElementsByClassName('chat-list');


    }
})
    