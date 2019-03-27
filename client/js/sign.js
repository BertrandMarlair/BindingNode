let signIn = document.querySelector('#signIn');
let signUp = document.querySelector('#signUp');
let gameDiv = document.querySelector('#gameDiv');

const signInForm = (e) => {
    e.preventDefault()
    socket.emit('signIn', { login: e.target.login.value, password: e.target.pass.value })
}

const signUpForm = (e) => {
    e.preventDefault()
    socket.emit('signUp', { login: e.target.login.value, password: e.target.pass.value })
}

signIn.addEventListener('submit', signInForm)
signUp.addEventListener('submit', signUpForm)

socket.on('signInResponse', (data)=> {
    if(data.success){
        signIn.style.display = 'none'
        signUp.style.display = 'none'
        gameDiv.style.display = 'block'
    }else{
        alert('Sign in unsuccessfull')
    }
})

socket.on('signUpResponse', (data)=> {
    if(data.success){
        alert('Sign in successfull')
    }else{
        alert('Sign in unsuccessfull')
    }
})