let ctx = document.querySelector('#ctx').getContext('2d');
let ctxUi = document.querySelector('#ctx-ui').getContext('2d');
let ctxInv = document.querySelector('#ctx-inv').getContext('2d');

let deleteBullets = document.querySelector('#delete-bullets');
ctxUi.font = '30px Arial';

let Img = {}
Img.playerTop = new Image()
Img.playerTop.src = '/client/img/isaacTop.png'
Img.playerBottom = new Image()
Img.playerBottom.src = '/client/img/isaacBottom.png'
Img.playerLeft = new Image()
Img.playerLeft.src = '/client/img/isaacLeft.png'
Img.playerRigth = new Image()
Img.playerRigth.src = '/client/img/isaacRigth.png'
Img.bullet = new Image()
Img.bullet.src = '/client/img/bullet.png'
Img.map = new Image()
Img.map.src = '/client/img/background.png'
Img.wallTop = new Image()
Img.wallTop.src = '/client/img/wallTop.png'
Img.wallBottom = new Image()
Img.wallBottom.src = '/client/img/wallBottom.png'
Img.wallLeft = new Image()
Img.wallLeft.src = '/client/img/wallLeft.png'
Img.wallRigth = new Image()
Img.wallRigth.src = '/client/img/wallRigth.png'