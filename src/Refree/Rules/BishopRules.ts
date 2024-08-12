import { Piece, Position, TeamType } from "../../Constant";
import { isTileOccupied,isTileEmptyOrOccupiedOppenent } from "./GeneralRules";
import { samePosition } from "../../Constant";
export const bishopMove=(initialPosition:Position,desiredPosition:Position,team:TeamType,boardStatus:Piece[]):boolean=>{
    for(let i=1;i<8;i++){

        if(desiredPosition.x>initialPosition.x && desiredPosition.y>initialPosition.y){
        let pos:Position={x:initialPosition.x+i,y:initialPosition.y+i};
        if(samePosition(pos,desiredPosition)){
            if(isTileEmptyOrOccupiedOppenent(pos,boardStatus,team)){
                return true;
            }
        }else{
            if(isTileOccupied(pos,boardStatus)){
                break;
            }
        }
    }
    
      if(desiredPosition.x>initialPosition.x && desiredPosition.y<initialPosition.y){
        let pos:Position={x:initialPosition.x+i,y:initialPosition.y-i};
        if(samePosition(pos,desiredPosition)){
            if(isTileEmptyOrOccupiedOppenent(pos,boardStatus,team)){
                return true;
            }
        }else{
            if(isTileOccupied(pos,boardStatus)){
                break;
            }
        }
    }

    if(desiredPosition.x<initialPosition.x && desiredPosition.y<initialPosition.y){
        let pos:Position={x:initialPosition.x-i,y:initialPosition.y-i};
        if(samePosition(pos,desiredPosition)){
            if(isTileEmptyOrOccupiedOppenent(pos,boardStatus,team)){
                return true;
            }
        }else{
            if(isTileOccupied(pos,boardStatus)){
                break;
            }
        }
    }

    if(desiredPosition.x<initialPosition.x && desiredPosition.y>initialPosition.y){
        let pos:Position={x:initialPosition.x-i,y:initialPosition.y+i};
        if(samePosition(pos,desiredPosition)){
            if(isTileEmptyOrOccupiedOppenent(pos,boardStatus,team)){
                return true;
            }
        }else{
            if(isTileOccupied(pos,boardStatus)){
                break;
            }
        }
    }
    
    }
    return false;
}