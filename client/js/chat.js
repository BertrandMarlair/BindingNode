let chatForm = document.querySelector('#chat-form');
let chatText = document.querySelector('#chat-text');

const chatFormSubmit = (e) => {
    e.preventDefault()
    if(e.target.chat.value[0] === '/'){
        socket.emit('evalServer', e.target.chat.value.slice(1))
    }else{
        socket.emit('sendMsgToServer', e.target.chat.value)
    }
    e.target.chat.value = ''
}

chatForm.addEventListener('submit', chatFormSubmit)

socket.on('addToChat', (data)=>{
    chatText.innerHTML+= '<div>'+data+'</div>'
})
