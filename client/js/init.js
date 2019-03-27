let selfId = null

socket.on('init', (data)=>{
    if(data.selfId)
        selfId = data.selfId
    for(let i in data.player)
        Player(data.player[i])
    for(let i in data.bullet)
        Bullet(data.bullet[i])
    for(let i in data.wall)
        Wall(data.wall[i])
})

socket.on('update', (data)=>{
    for(let i in data.player){
        let pack = data.player[i]
        let player = Player.list[pack.id]
        if(player){
            if(pack.x !== undefined)
                player.x = pack.x
            if(pack.y !== undefined)
                player.y = pack.y
            if(pack.hp !== undefined)
                player.hp = pack.hp
            if(pack.score !== undefined)
                player.score = pack.score
        }
    }

    for(let i in data.bullet){
        let pack = data.bullet[i]
        let bullet = Bullet.list[pack.id]
        if(bullet){
            if(pack.x !== undefined)
                bullet.x = pack.x
            if(pack.y !== undefined)
                bullet.y = pack.y
            
        }
    }
})

socket.on('remove', (data)=>{
    for(let i in data.player)
        delete Player.list[data.player[i]]
    for(let i in data.bullet)
        delete Bullet.list[data.bullet[i]]
})

let inventory = new Inventory(null);
socket.on('updateInventory',(items) => {
    inventory.items = items;
    inventory.refreshRender();
})

setInterval(()=>{
    if(selfId){
        ctx.clearRect(0,0,WIDTH, HEIGHT)
        drawmap()
        for(let i in Wall.list)
            Wall.list[i].draw()
        for(let i in Player.list)
            Player.list[i].draw()
        for(let i in Bullet.list)
            Bullet.list[i].draw()
        drawScore() 
        drawBulletCount()
    }
}, 1000/40)

const drawmap = () => {
    var x = WIDTH/2 - Player.list[selfId].x;
    var y = HEIGHT/2 - Player.list[selfId].y;
    ctx.drawImage(Img.map,x-2000,y-2000, 10000, 10000);
}

let lastScore = -1

const drawScore = () => {
    let player = Player.list[selfId]
    if(lastScore !== player.score){
        ctxUi.clearRect(0,0,WIDTH, HEIGHT)
        lastScore = player.score
        ctxUi.fillStyle = 'white'
        ctxUi.font = "15px Arial"
        ctxUi.fillText(`Score: ${player.score}`, 10, 30)
    }
}

const drawBulletCount = () => {
    let player = Player.list[selfId]
    ctx.fillStyle = 'white'
    ctx.font = "15px Arial"
    let string = '|'
    let count = string.repeat((player.maxBullet - player.bulletCount))
    if(player.maxBullet === player.bulletCount){
        ctx.fillText('reloading...', 10, 60)
    }else{
        ctx.fillText(count, 10,  60)
    }
}

socket.on('evalAnswer', (data)=>{
    console.log(data)
})

let attackPosition = new Set()

const pressed = () => {
    if(attackPosition.has(37) && attackPosition.has(38)){
        socket.emit('keyPress', {inputId: 'angle', state: 225})
    }else if(attackPosition.has(38) && attackPosition.has(39)){
        socket.emit('keyPress', {inputId: 'angle', state: 315})
    }else if(attackPosition.has(39) && attackPosition.has(40)){
        socket.emit('keyPress', {inputId: 'angle', state: 45})
    }else if(attackPosition.has(37) && attackPosition.has(40)){
        socket.emit('keyPress', {inputId: 'angle', state: 135})
    }else if(attackPosition.has(38)){
        socket.emit('keyPress', {inputId: 'angle', state: 270})
    }else if(attackPosition.has(40)){
        socket.emit('keyPress', {inputId: 'angle', state: 90})
    }else if(attackPosition.has(39)){
        socket.emit('keyPress', {inputId: 'angle', state: 0})
    }else if(attackPosition.has(37)){
        socket.emit('keyPress', {inputId: 'angle', state: 180})
    } 
    if(attackPosition.size === 0){
        socket.emit('keyPress', {inputId: 'attack', state: false})
    }else{
        socket.emit('keyPress', {inputId: 'attack', state: true})
    }
}

document.onkeydown = e => {
    // Mouvement Attack
    if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
        attackPosition.add(e.keyCode)
        socket.emit('anglePress', {state: true})
        pressed()
    }
    // Mouvement Player
    if(e.keyCode === 90)
        socket.emit('keyPress', {inputId: 'up', state: true})
    if(e.keyCode === 83)
        socket.emit('keyPress', {inputId: 'down', state: true})
    if(e.keyCode === 68)
        socket.emit('keyPress', {inputId: 'rigth', state: true})
    if(e.keyCode === 81)
        socket.emit('keyPress', {inputId: 'left', state: true})
    // Special Attack
    if(e.keyCode === 32)
        socket.emit('keyPress', {inputId: 'specialAttack', state: true})
}

document.onkeyup = e => {
    // Mouvement Attack
    if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
        attackPosition.delete(e.keyCode)
        socket.emit('anglePress', {state: false})
        pressed()
    }
    // Mouvement Player
    if(e.keyCode === 90)
        socket.emit('keyPress', {inputId: 'up', state: false})
    if(e.keyCode === 83)
        socket.emit('keyPress', {inputId: 'down', state: false})
    if(e.keyCode === 68)
        socket.emit('keyPress', {inputId: 'rigth', state: false})
    if(e.keyCode === 81)
        socket.emit('keyPress', {inputId: 'left', state: false})
    // // Special Attack
    if(e.keyCode === 32)
        socket.emit('keyPress', {inputId: 'specialAttack', state: false})
}

deleteBullets.onclick = e => {
    socket.emit('deleteBullets')
}