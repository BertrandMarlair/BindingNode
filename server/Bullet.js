import { Entity } from './Entity'
import { initPack } from '../server'
import { Player } from './Player'

export const Bullet = (parent, angle) => {
	let self = Entity()
	self.id = Math.random()
	self.x = -1000
	self.y = -1000
	self.speed = 8
	self.speedX = Math.cos(angle/180*Math.PI) * self.speed
	self.speedY = Math.sin(angle/180*Math.PI) * self.speed
	self.parent = parent
	self.timer = 0
	self.toRemove = false
	self.stop = false
	let superUpdate = self.update
	self.update = () => {
		if(self.timer ++ > 100){
			self.toRemove = true
		}
		superUpdate()

		for(let i in Player.list){
			let parent = Player.list[i]
			if(self.distance(parent) < 32 && self.parent !== parent.id){
				parent.hp --
				if(parent.hp <= 0){
					let shooter = Player.list[self.parent]
					if(shooter){
						shooter.score ++
					}
					parent.hp = parent.hpMax
					parent.respawn()
				}
				self.toRemove = true
			}
        }
	}
	Bullet.list[self.id] = self

	self.getInitPack = () => {
		return ({
			id: self.id,
			x: self.x,
			y: self.y,
		})
	}

	self.getUpdatePack = () => {
		return ({
			id: self.id,
			x: self.x,
			y: self.y,
		})
	}

	initPack.bullet.push(self.getInitPack())

	return self
}