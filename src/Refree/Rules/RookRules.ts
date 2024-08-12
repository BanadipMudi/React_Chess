import { Piece, Position, TeamType } from "../../Constant";
import { isTileOccupied,isTileEmptyOrOccupiedOppenent } from "./GeneralRules";
import { samePosition } from "../../Constant";
export const rookMove=(initialPosition:Position,desiredPosition:Position,team:TeamType,boardStatus:Piece[]):boolean=>{
    if(initialPosition.x===desiredPosition.x){
        for(let i=1;i<8;i++){
            let multiplier=(desiredPosition.y<initialPosition.y) ? -1 : 1 ;

            let pos:Position={x:initialPosition.x, y:initialPosition.y+(i*multiplier)};
            if(samePosition(pos,desiredPosition)){
                if(isTileEmptyOrOccupiedOppenent(pos,boardStatus,team)){
                    return true;
                }
            }
            else{
                if(isTileOccupied(pos,boardStatus)){
                    break;
                }
            }
        }
    }

    if(initialPosition.y===desiredPosition.y){
        for(let i=1;i<8;i++){
            let multiplier=(desiredPosition.x<initialPosition.x) ? -1 : 1 ;

            let pos:Position={x:initialPosition.x+(i*multiplier), y:initialPosition.y};
            if(samePosition(pos,desiredPosition)){
                if(isTileEmptyOrOccupiedOppenent(pos,boardStatus,team)){
                    return true;
                }
            }
            else{
                if(isTileOccupied(pos,boardStatus)){
                    break;
                }
            }
        }
    }
    return false;
}