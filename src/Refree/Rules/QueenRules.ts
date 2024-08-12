import { Piece, Position, TeamType } from "../../Constant";
import { isTileOccupied,isTileEmptyOrOccupiedOppenent } from "./GeneralRules";
import { samePosition } from "../../Constant";
export const queenMove=(initialPosition:Position,desiredPosition:Position,team:TeamType,boardStatus:Piece[]):boolean=>{
    
    for(let i=1;i<8;i++){
        let multiplierX;
        let multiplierY;
        if(desiredPosition.x < initialPosition.x){
            multiplierX=-1;
        }else if(desiredPosition.x > initialPosition.x){
            multiplierX=1;
        }else{
            multiplierX=0;
        }

        if(desiredPosition.y < initialPosition.y){
            multiplierY=-1;
        }else if(desiredPosition.y > initialPosition.y){
            multiplierY=1;
        }else{
            multiplierY=0;
        }

        let pos: Position={x:initialPosition.x+(i*multiplierX), y:initialPosition.y+(i*multiplierY)};
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
    return false;

    }