import { Wall } from './Wall'

export const wallLeft = (self) => {
    Wall.create({
        minX: self.x - self.innerSize,
        minY: self.y - self.innerSize,
        maxX: self.x - self.innerSize + self.wallThickness,
        maxY: self.y + self.innerSize,
        direction: 'left'
    })
}

export const wallRigth = (self) => {
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness,
        minY: self.y - self.innerSize,
        maxX: self.x + self.innerSize,
        maxY: self.y + self.innerSize,
        direction: 'rigth'
    })
}

export const wallTop = (self) => {
    Wall.create({
        minX: self.x - self.innerSize + self.wallThickness,
        minY: self.y - self.innerSize,
        maxX: self.x + self.innerSize - self.wallThickness,
        maxY: self.y - self.innerSize + self.wallThickness,
        direction: 'top'
    })
}

export const wallBottom = (self) => {
    Wall.create({
        minX: self.x - self.innerSize + self.wallThickness,
        minY: self.y + self.innerSize - self.wallThickness,
        maxX: self.x + self.innerSize - self.wallThickness,
        maxY: self.y + self.innerSize,
        direction: 'bottom'
    })
}

export const doorTop = (self) => {
    Wall.create({
        minX: self.x - self.innerSize + self.wallThickness,
        minY: self.y - self.innerSize,
        maxX: self.x - self.innerSize + self.wallThickness + self.middleWall,
        maxY: self.y - self.innerSize + self.wallThickness,
        direction: 'top'
    })
    Wall.create({
        minX: self.x - self.innerSize + self.wallThickness + self.middleWall,
        minY: self.y - self.innerSize - self.margin,
        maxX: self.x - self.innerSize + self.wallThickness + self.middleWall + self.wallThickness,
        maxY: self.y - self.innerSize + self.wallThickness,
        direction: 'left'
    })
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness - self.middleWall,
        minY: self.y - self.innerSize,
        maxX: self.x + self.innerSize - self.wallThickness,
        maxY: self.y - self.innerSize + self.wallThickness,
        direction: 'top'
    })
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness - self.middleWall - self.wallThickness,
        minY: self.y - self.innerSize - self.margin,
        maxX: self.x + self.innerSize - self.wallThickness - self.middleWall,
        maxY: self.y - self.innerSize + self.wallThickness,
        direction: 'rigth'
    })
}

export const doorBottom = (self) => {
    Wall.create({
        minX: self.x - self.innerSize + self.wallThickness,
        minY: self.y + self.innerSize - self.wallThickness,
        maxX: self.x - self.innerSize + self.wallThickness + self.middleWall,
        maxY: self.y + self.innerSize,
        direction: 'bottom'
    })
    Wall.create({
        minX: self.x - self.innerSize + self.wallThickness + self.middleWall,
        minY: self.y + self.innerSize - self.wallThickness,
        maxX: self.x - self.innerSize + self.wallThickness + self.middleWall + self.wallThickness,
        maxY: self.y + self.innerSize + self.margin,
        direction: 'left'
    })
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness - self.middleWall,
        minY: self.y + self.innerSize - self.wallThickness,
        maxX: self.x + self.innerSize - self.wallThickness,
        maxY: self.y + self.innerSize,
        direction: 'bottom'
    })
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness - self.middleWall - self.wallThickness,
        minY: self.y + self.innerSize - self.wallThickness,
        maxX: self.x + self.innerSize - self.wallThickness- self.middleWall,
        maxY: self.y + self.innerSize + self.margin,
        direction: 'rigth'
    })
}

export const doorLeft = (self) => {
    Wall.create({
        minX: self.x - self.innerSize,
        minY: self.y - self.innerSize,
        maxX: self.x - self.innerSize + self.wallThickness,
        maxY: self.y - self.innerSize + self.middleWall + self.wallThickness,
        direction: 'rigth'
    })
    Wall.create({
        minX: self.x - self.innerSize - self.margin,
        minY: self.y - self.innerSize + self.wallThickness + self.middleWall,
        maxX: self.x - self.innerSize + self.wallThickness,
        maxY: self.y - self.innerSize + self.wallThickness + self.middleWall + self.wallThickness,
        direction: 'top'
    })
    Wall.create({
        minX: self.x - self.innerSize,
        minY: self.y + self.innerSize - self.middleWall - self.wallThickness,
        maxX: self.x - self.innerSize + self.wallThickness,
        maxY: self.y + self.innerSize,
        direction: 'rigth'
    })
    Wall.create({
        minX: self.x - self.innerSize - self.margin,
        minY: self.y + self.innerSize - self.wallThickness - self.middleWall - self.wallThickness,
        maxX: self.x - self.innerSize + self.wallThickness,
        maxY: self.y + self.innerSize - self.wallThickness - self.middleWall,
        direction: 'bottom'
    })
}

export const doorRigth = (self) => {
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness,
        minY: self.y - self.innerSize,
        maxX: self.x + self.innerSize,
        maxY: self.y - self.innerSize + self.middleWall + self.wallThickness,
        direction: 'rigth'
    })
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness,
        minY: self.y - self.innerSize + self.wallThickness + self.middleWall,
        maxX: self.x + self.innerSize + self.margin,
        maxY: self.y - self.innerSize + self.wallThickness + self.middleWall + self.wallThickness,
        direction: 'top'   
    })
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness,
        minY: self.y + self.innerSize - self.wallThickness - self.middleWall,
        maxX: self.x + self.innerSize,
        maxY: self.y + self.innerSize,
        direction: 'rigth'
    })
    Wall.create({
        minX: self.x + self.innerSize - self.wallThickness,
        minY: self.y + self.innerSize - self.wallThickness - self.middleWall - self.wallThickness,
        maxX: self.x + self.innerSize + self.margin,
        maxY: self.y + self.innerSize - self.wallThickness - self.middleWall,
        direction: 'bottom'   
    })
}