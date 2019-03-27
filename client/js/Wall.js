const Wall = (init) => {
    let self = {}
    self.id = init.id 
    self.minX = init.minX
    self.minY = init.minY
    self.maxX = init.maxX
    self.maxY = init.maxY
    self.size = init.size
    self.direction = init.direction
    Wall.list[self.id] = self;  
    self.draw = () =>{ 
        var x = WIDTH/2 - Player.list[selfId].x;
        var y = HEIGHT/2 - Player.list[selfId].y;
        if(self.direction === 'left')
            image = Img.wallLeft
        if(self.direction === 'rigth')
            image = Img.wallRigth
        if(self.direction === 'bottom')
            image = Img.wallBottom
        if(self.direction === 'top')
            image = Img.wallTop
        ctx.drawImage(image, self.minX + x, self.minY + y, self.maxX - self.minX, self.maxY - self.minY)
    }    
    return self  
}

Wall.list = {}