import { Entity } from './Entity'
import { initPack } from '../server'
import { Wall } from './Wall'
import { Bullet } from './Bullet'
import { Inventory } from './Inventory'

export const Player = (id, socket) => {
	let self = Entity()
	self.id = id
	self.number = Math.floor(10 * Math.random())
	self.perssingRight = false
	self.perssingLeft = false
	self.perssingUp = false
	self.perssingDown = false
    self.perssingAttack = false
    self.collsitionLeft = false
    self.collsitionRigth = false
    self.collsitionTop = false
    self.collsitionBottom = false
	self.angleSelect = false
	self.perssingSpecialAttack = false
	self.angle = 0
	self.maxSpeed = 4
	self.maxBullet = 15
	self.bulletCount = 0
	self.reloadTime = 1000
	self.reloading = false
	self.fireRate = 200
	self.fire = true
	self.hpMax = 5
	self.hp = 5
	self.score = 0
	self.inventory = new Inventory(socket)
	self.directionCollisionX = ''
	self.directionCollisionY = ''


	let superUpdate = self.update
	self.update = () => {
        self.getCollistion()
        self.updateSpeed()
		superUpdate()
		if(self.perssingAttack){
			if(self.maxBullet > self.bulletCount && self.fire){
				self.shootBullet(self.angle)
				self.bulletCount ++
				self.fire = false
				setTimeout(()=>{
					self.fire = true
				}, self.fireRate)
			}else if(self.maxBullet === self.bulletCount && !self.reloading){
				self.reloading = true
				setTimeout(()=>{
					self.bulletCount = 0
					self.reloading = false
				}, self.reloadTime)
			}
		}

		if(self.perssingSpecialAttack){
			for(let i = -3; i < 3; i++)
				self.shootBullet(self.angle + i * 10)
		}
	}

	self.shootBullet = (angle) => {
		let b = Bullet(self.id, angle)	
		b.x = self.x
		b.y = self.y
	}

	self.updateSpeed = () => {
        if(self.perssingRight && !self.collsitionLeft)
            self.speedX = self.maxSpeed
        else if(self.perssingLeft && !self.collsitionRigth)
            self.speedX = -self.maxSpeed
        else	
            self.speedX = 0
        if(self.perssingUp && !self.collsitionBottom)
            self.speedY = -self.maxSpeed
        else if(self.perssingDown && !self.collsitionTop)
            self.speedY = self.maxSpeed
        else	
            self.speedY = 0
    }
    
    self.getCollistion = () => {
        let toucheLeft = false
        let toucheRigth = false
        let toucheTop = false
        let toucheBottom = false
        for(let i in Wall.list){
            let wall = Wall.list[i]
            let player = self
            let distanceX = wall.distanceX(player)
            let distanceY = wall.distanceY(player)
            if(player.x <= wall.minX && distanceX <= 20 && distanceY <= 10)
                toucheLeft = true
            else if(player.x >= wall.maxX && distanceX <= 20 && distanceY <= 10)
                toucheRigth = true
            if(player.y <= wall.minY && distanceY <= 20 && distanceX <= 10)
                toucheTop = true
            else if(player.y >= wall.maxY && distanceY <= 20 && distanceX <= 10)
                toucheBottom = true
        }
        self.collsitionLeft = toucheLeft
        self.collsitionRigth = toucheRigth
        self.collsitionTop = toucheTop
        self.collsitionBottom = toucheBottom
    }

	Player.list[id] = self

	self.getInitPack = () => {
		return({
			x: self.x,
			y: self.y,
			id: self.id,
			hp: self.hp,
			hpMax: self.hpMax,
            angle: self.angle,
            score: self.score,
			number: self.number,
			maxBullet: self.maxBullet,
			angleSelect: self.angleSelect,
			bulletCount: self.bulletCount,
            perssingUp: self.perssingUp,
            perssingDown: self.perssingDown,
            perssingRight: self.perssingRight,
            perssingLeft: self.perssingLeft,
		})
	}

	self.getUpdatePack = () => {
		return({
			x: self.x,
			y: self.y,
			id: self.id,
			hp: self.hp,
            angle: self.angle,
            score: self.score,
			maxBullet: self.maxBullet,
			angleSelect: self.angleSelect,
			bulletCount: self.bulletCount,
            perssingUp: self.perssingUp,
            perssingDown: self.perssingDown,
            perssingRight: self.perssingRight,
            perssingLeft: self.perssingLeft,
		})
	}

	self.respawn = () => {
		self.x = 180 + 360 * (Math.round(Math.random() * 5))
		self.y = 180 + 360 * (Math.round(Math.random() * 5))
	}

	initPack.player.push(self.getInitPack())

	return self
}