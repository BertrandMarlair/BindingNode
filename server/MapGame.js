import { Room } from './Room'

export const MapGame = () => {
    let map =  [
        [[0,1,1,0],[0,1,0,1],[0,0,1,1],[0,0,1,0],[0,0,1,0]],
        [[1,0,1,0],[0,0,1,0],[1,1,1,0],[1,1,0,1],[1,0,0,1]],
        [[1,1,1,0],[1,1,0,1],[1,1,1,1],[0,1,0,1],[0,0,1,1]],
        [[1,1,0,0],[0,0,1,1],[1,1,0,0],[0,0,1,1],[1,0,1,0]],
        [[0,1,0,0],[1,1,0,1],[0,1,0,1],[1,1,0,1],[1,0,0,1]]
    ]       
    
    const roomSize = 360
    let roomPositionX  = roomSize / 2
    let roomPositionY  = roomSize / 2
    for(let i = 0; map.length > i; i++){
        for(let j = 0; map[i].length > j; j++){
            let cases = map[i][j]
            Room(cases[0], cases[1], cases[2], cases[3], roomPositionX, roomPositionY)
            roomPositionX += roomSize;
        } 
        roomPositionX = roomSize / 2
        roomPositionY += roomSize
    }
}