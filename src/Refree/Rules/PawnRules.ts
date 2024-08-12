import { Piece, Position, TeamType } from "../../Constant";
import { isTileOccupied,isTileOccupiedOppenent } from "./GeneralRules";

export const pawnMove=(initialPosition:Position,desiredPosition:Position,team:TeamType,boardStatus:Piece[]):boolean=>{
    const specialRow= (team===TeamType.own)? 1 : 6;
   const pawndirection= (team===TeamType.own)? 1 : -1;

     if(initialPosition.x===desiredPosition.x && initialPosition.y===specialRow && desiredPosition.y-initialPosition.y===2*pawndirection){
            if(!isTileOccupied(desiredPosition,boardStatus) && !isTileOccupied({x:desiredPosition.x,y:desiredPosition.y-pawndirection},boardStatus)){
                console.log("valid move");
                return true;
                }
        }
       else if(initialPosition.x===desiredPosition.x && desiredPosition.y-initialPosition.y===1*pawndirection){
            if(!isTileOccupied(desiredPosition,boardStatus)){
                console.log("valid move");
                return true;
                } 
        }

        else if(desiredPosition.x-initialPosition.x===-1 && desiredPosition.y-initialPosition.y===pawndirection){
            if(isTileOccupiedOppenent(desiredPosition,team,boardStatus)){
                console.log("upper/bottom left");
                return true;
            }
        }
        else if(desiredPosition.x-initialPosition.x===1 && desiredPosition.y-initialPosition.y===pawndirection){
            if(isTileOccupiedOppenent(desiredPosition,team,boardStatus)){
                console.log("upper/bottom right");
                return true;
            }
        }
        return false;
}