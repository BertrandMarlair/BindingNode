export const Entity = () => {
	let self = {
		x: 250,
		y: 250,
		speedX: 0,
		speedY: 0,
		id: ''
	}
	self.update = () => {
		self.updatePosition()
	}
	self.updatePosition = () => {
		if(!self.stop){
			self.x += self.speedX
			self.y += self.speedY
		}
	}
	self.distance = (pt) => {
		return Math.sqrt(Math.pow(self.x-pt.x, 2) + Math.pow(self.y-pt.y, 2))
	}

	return self
}