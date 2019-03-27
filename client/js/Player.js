const Player = (init) => {
    let self = {}
    self.x = init.x 
    self.y = init.y
    self.id = init.id 
    self.hp = init.hp;
    self.hpMax = init.hpMax;
    self.score = init.score;
    self.angle = init.angle;
    self.number = init.number
    self.maxBullet = init.maxBullet
    self.perssingUp = init.perssingUp
    self.angleSelect = init.angleSelect
    self.bulletCount = init.bulletCount
    self.perssingDown = init.perssingDown
    self.perssingRight = init.perssingRight
    self.perssingLeft = init.perssingLeft
    self.draw = () =>{
        let hpWidth = 30 * self.hp / self.hpMax

        let x = self.x - Player.list[selfId].x + WIDTH / 2
        let y = self.y - Player.list[selfId].y + HEIGHT / 2

        ctx.fillStyle = 'red'
        ctx.fillRect(x - hpWidth/2, y - 40, hpWidth, 4)

        let width = Img.playerTop.width/2
        let height = Img.playerTop.height/2
        let image

        if(self.angleSelect){
            if(self.angle >= 0 && self.angle < 90){
                image = Img.playerRigth
            }else if(self.angle === 90){
                image = Img.playerTop
            }else if(self.angle > 90 && self.angle <= 180){
                image = Img.playerLeft
            }else if(self.angle > 180){
                image = Img.playerBottom
            }
        }else{
            if(self.perssingUp)
                image = Img.playerBottom
            else if(self.perssingLeft)
                image = Img.playerLeft
            else if(self.perssingRight)
                image = Img.playerRigth
            else
                image = Img.playerTop
        }

        ctx.drawImage(image,
            0,0,Img.playerTop.width,Img.playerTop.height,
            x-width/2,y-height/2,width,height);
    }
    Player.list[self.id] = self;      
    return self  
}

Player.list = {}