import { wallLeft, wallRigth, wallTop, wallBottom, doorTop, doorBottom, doorLeft, doorRigth } from './WallStructure'
import { EntityRoom } from './EntityRoom'

export const Room = (top, rigth, bottom, left, positionX, positionY) => {
    let self = EntityRoom()
    self.x = positionX
    self.y = positionY
    if(left){
        doorLeft(self)
    }else{
        wallLeft(self)
    }
    if(top){
        doorTop(self)
    }else{
        wallTop(self)
    }
    if(rigth){
        doorRigth(self)
    }else{
        wallRigth(self)
    }
    if(bottom){
        doorBottom(self)
    }else{
        wallBottom(self)
    }
}