import { EntityWall } from './EntityWall'
import { initPack } from '../server'
import { Bullet } from './Bullet'

export const Wall = (data) => {
	let self = EntityWall()
	self.id = Math.random()
    self.minX = data.minX
    self.minY = data.minY
    self.maxX = data.maxX
    self.maxY = data.maxY
    self.direction = data.direction
    self.toRemove = false
    self.marge = 20
	self.update = () => {
		for(let i in Bullet.list){
            let parent = Bullet.list[i]
            let distanceX = self.distanceX(parent)
            let distanceY = self.distanceY(parent)
            if(distanceX < 0) distanceX *= -1
            if(distanceY < 0) distanceY *= -1
            if(distanceX < 15 && distanceY < 15){
                parent.stop = true
                setTimeout(()=>{
                    parent.toRemove = true
                }, 500)
            }
		}

	}
	Wall.list[self.id] = self

	self.getInitPack = () => {
		return ({
			id: self.id,
            minX: self.minX,
            minY: self.minY,
            maxX: self.maxX,
            maxY: self.maxY,
            size: self.size,
            direction: self.direction,
		})
	}

	self.getUpdatePack = () => {
		return ({
			id: self.id,
            minX: self.minX,
            minY: self.minY,
            maxX: self.maxX,
            maxY: self.maxY,
            size: self.size,
            direction: self.direction,
		})
    }

	initPack.wall.push(self.getInitPack())

	return self
}
