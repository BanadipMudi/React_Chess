import { Piece, Position, TeamType } from "../../Constant";
import { isTileEmptyOrOccupiedOppenent } from "./GeneralRules";
export const knightMove=(initialPosition:Position,desiredPosition:Position,team:TeamType,boardStatus:Piece[]):boolean=>{
    for(let i=-1;i<2;i+=2){
        for(let j=-1;j<2;j+=2){
            if(desiredPosition.y-initialPosition.y==2*i){
                if(desiredPosition.x-initialPosition.x===j){
                    // console.log("top/bottom left/right knight move");
                    if(isTileEmptyOrOccupiedOppenent(desiredPosition,boardStatus,team)){
                    return true;
                }
            }
        }
        if(desiredPosition.x-initialPosition.x===2*i){
            if(desiredPosition.y-initialPosition.y===j){
                // console.log("left/right top/bottom knight move");
                    if(isTileEmptyOrOccupiedOppenent(desiredPosition,boardStatus,team)){
                    return true;
                }
        }
    }
}
}
    return false;
}