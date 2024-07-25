import { PieceType, TeamType,Piece } from "../Components/ChessBoard/Board";

export default class Referee{
    isTileOccupied(x:number,y:number,boardStatus:Piece[]){
        const pice=boardStatus.find(p=>p.x===x && p.y===y)
        if(pice) return true;
        return false;
    }

    isTileOccupiedOppenent(x:number,y:number,team:TeamType,boardStatus:Piece[]){
        const pice=boardStatus.find(p=>p.x===x && p.y===y && p.team!=team);
        if(pice) return true;
        return false;
    }

     isValid(px:number,py:number,x:number,y:number,type:PieceType,team:TeamType,boardStatus:Piece[]){
        // console.log("previous loc:"+px,py);
        // console.log("previous loc:"+x,y);
        // console.log(type);
        // console.log(team);

        if(type==PieceType.PAWN){
       const specialRow= (team===TeamType.own)? 1 : 6;
       const pawndirection= (team===TeamType.own)? 1 : -1;

         if(px===x && py===specialRow && y-py===2*pawndirection){
                if(!this.isTileOccupied(x,y,boardStatus) && !this.isTileOccupied(x,y-pawndirection,boardStatus)){
                    console.log("valid move");
                    return true;
                    }
            }
           else if(px===x && y-py===1*pawndirection){
                if(!this.isTileOccupied(x,y,boardStatus)){
                    console.log("valid move");
                    return true;
                    } 
            }

            else if(x-px===-1 && y-py===pawndirection){
                if(this.isTileOccupiedOppenent(x,y,team,boardStatus)){
                    console.log("upper/bottom left");
                    return true;
                }
            }
            else if(x-px===1 && y-py===pawndirection){
                if(this.isTileOccupiedOppenent(x,y,team,boardStatus)){
                    console.log("upper/bottom right");
                    return true;
                }
            }

        } 
        return false;
    }
}