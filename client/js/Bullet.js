const Bullet = (init) => {
    let self = {}
    self.id = init.id 
    self.x = init.x 
    self.y = init.y 
    Bullet.list[self.id] = self;  
    self.draw = () =>{ 
        let width = Img.bullet.width/2
        let height = Img.bullet.height/2

        let x = self.x - Player.list[selfId].x + WIDTH / 2
        let y = self.y - Player.list[selfId].y + HEIGHT / 2

        ctx.drawImage(Img.bullet, 0, 0, Img.bullet.width, Img.bullet.height, x-width/2, y-height/2, width, height)

    }    
    return self  
}

Bullet.list = {}