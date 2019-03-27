export const EntityWall = () => {
	let self = {
		minX: 250,
		minY: 250,
		maxX: 350,
        maxY: 350,
		id: ''
    }
	self.distanceX = (pt) => {
		return Math.max(self.minX - pt.x, 0, pt.x - self.maxX);
	}
	self.distanceY = (pt) => {
		return Math.max(self.minY - pt.y, 0, pt.y - self.maxY);
    }
    self.distance = (pt) => {
        var dx = Math.max(self.minX - pt.x, 0, pt.x - self.maxX);
        var dy = Math.max(self.minY - pt.y, 0, pt.y - self.maxY);
        return Math.sqrt(dx*dx + dy*dy);
    }

	return self
}
