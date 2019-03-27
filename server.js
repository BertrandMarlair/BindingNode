import express from 'express'
import mongo from 'mongojs'
import { Player } from './server/Player'
import { Wall } from './server/Wall'
import { Bullet } from './server/Bullet'
import { MapGame } from './server/MapGame'

const db = mongo('localhost:27017/myGame', ['accout', 'progress'])
let app = express()
let serv = require('http').Server(app)
let port = 2000

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/index.html')
})

app.use('/client',express.static(__dirname + '/client'))

serv.listen(port)
console.log(`Server started at ${port}`)

let socketList = {}

const debug = true

Player.list = {}

Player.update = () => {
	let pack = []
	for(let i in Player.list){
		let player = Player.list[i]
		player.update()
		pack.push(player.getUpdatePack())
	}
	return pack
}

Player.onConnect = (socket, socket_room) => {
	let player = Player(socket_room, socket)
	socket.on('keyPress', (data)=>{
		if(data.inputId === 'rigth')
			player.perssingRight = data.state
		if(data.inputId === 'left')
			player.perssingLeft = data.state
		if(data.inputId === 'up')
			player.perssingUp = data.state
		if(data.inputId === 'down')
			player.perssingDown = data.state
		if(data.inputId === 'attack')
			player.perssingAttack = data.state
		// if(data.inputId === 'specialAttack')
		// 	player.perssingSpecialAttack = data.state
		if(data.inputId === 'angle')
			player.angle = data.state
		player.inventory.addItem('potion', 1)
		socket.emit('init', {
            selfId: socket.id,
			player: Player.getAllInitPack(), 
			bullet:Bullet.getAllInitPack()
		})
    })
    
    socket.on('anglePress', (data) => {
        player.angleSelect = data.state
        socket.emit('init', {
            selfId: socket.id,
            player: Player.getAllInitPack(), 
            bullet:Bullet.getAllInitPack()
        })
    })
}

Player.getAllInitPack = () => {
	let players = []
	for(let i in Player.list){
		players.push(Player.list[i].getInitPack())
	}
	return players
}

Player.onDisconnect = (userId) => {
	delete Player.list[userId]
	removePack.player.push(userId)
}

Bullet.list = {}

Bullet.update = () => {
	let pack = []
	for(let i in Bullet.list){
		let bullet = Bullet.list[i]
		bullet.update()
		if(bullet.toRemove){
			delete Bullet.list[bullet.id]
			removePack.bullet.push(bullet.id)
		}else{
			pack.push(bullet.getUpdatePack())
		}
	}
	return pack
}

Bullet.getAllInitPack = () => {
	let bullets = []
	for(let i in Bullet.list){
		bullets.push(Bullet.list[i].getInitPack())
	}
	return bullets 
}

Wall.getAllInitPack = () => {
	let wall = []
	for(let i in wall.list){
		wall.push(Wall.list[i].getInitPack())
	}
	return wall 
}

Wall.create = (data) => {
	Wall(data)
}

Wall.update = () => {
	let pack = []
	for(let i in Wall.list){
		let wall = Wall.list[i]
		wall.update()
		if(wall.toRemove){
			delete Wall.list[wall.id]
			removePack.wall.push(wall.id)
		}else{
			pack.push(wall.getUpdatePack())
		}
    }
	return pack
}

Wall.list = {}

const isValidPassword = (login, pass, callback) => {
	db.account.find({username: login, password: pass}, (err, res)=>{
		if(res.length > 0){
			callback(true)
		}else{
			callback(false)
		}
	})
}

const isUserNameTaken = (login, callback) => {
	db.account.find({username: login}, (err, res)=>{
		if(res.length > 0){
			callback(true)
		}else{
			callback(false)
		}
	})
}

const addUser = (login, pass, callback) => {
	db.account.insert({username: login, password: pass}, (err, res)=>{
		callback()
	})
}

let io = require('socket.io')(serv,{})
io.sockets.on('connection', (socket)=> {
	var userId = socket.id
	socketList[userId] = socket

	socket.on('sendMsgToServer', (data)=>{
		let playerName = ('' + userId).slice(2,7)
		for(let i in socketList){
			socketList[i].emit('addToChat', playerName + ': ' + data)
		}
	})

	socket.on('evalServer', (data)=>{
		if(!debug){
			return
		}
		let res = eval(data)
		socket.emit('evalAnswer', res)
	})

	socket.on('deleteBullets', ()=>{
		Bullet.list = {}
	})

	socket.on('signIn', (data)=>{
		isValidPassword(data.login, data.password, (res)=>{
			if(res){
				Player.onConnect(socket, userId)
				socket.emit('signInResponse', { success: true })
			}else{
				socket.emit('signInResponse', { success: false })
			}
		})
	})

	socket.on('signUp', (data)=>{
		isUserNameTaken(data.login, (res)=>{
			if(res){
				socket.emit('signUpResponse', { success: false })
			}else{
				addUser(data.login, data.password, ()=>{
					socket.emit('signUpResponse', { success: true })
				})
			}
		})
	})

	socket.on('disconnect', ()=>{
		delete socketList[userId]
		Player.onDisconnect(userId)
    })
})

export let initPack = {player: [], bullet: [], wall: []}
let removePack = {player: [], bullet: [], wall: []}   

setInterval(()=>{
	let pack = {
		player: Player.update(),
        bullet: Bullet.update(),
        wall: Wall.update()
	}
	for(let i in socketList){
		let socket = socketList[i]
		socket.emit('update', pack)
		socket.emit('init', initPack)
		socket.emit('remove', removePack)
	}
	initPack.player = []
	initPack.bullet = []
	removePack.player = []
	removePack.bullet = []
	removePack.walls = []
}, 1000/50)

MapGame()