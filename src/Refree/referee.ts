import { PieceType, TeamType,Piece, Position } from "../Constant";
import { pawnMove } from "./Rules/PawnRules";
import { knightMove } from "./Rules/KnightRules"; 
import { bishopMove } from "./Rules/BishopRules";
import { rookMove } from "./Rules/RookRules";
import { queenMove } from "./Rules/QueenRules";
import { kingMove } from "./Rules/KingRules";

export default class Referee{
    isEnpassant(initialPosition:Position,desiredPosition:Position,type:PieceType,team:TeamType,boardStatus:Piece[]){
        const pawndirection= (team===TeamType.own)? 1 : -1;
        if(type==PieceType.PAWN){
        if((desiredPosition.x-initialPosition.x===-1 || desiredPosition.x-initialPosition.x===1) && desiredPosition.y-initialPosition.y===pawndirection){
            const piece=boardStatus.find((p)=>p.position.x===desiredPosition.x && p.position.y===desiredPosition.y-pawndirection && p.Enpassant);
            
            if(piece){
                return true;
            }
        }
      }
      return false;
    }  

     isValid(initialPosition:Position,desiredPosition:Position,type:PieceType,team:TeamType,boardStatus:Piece[]){
        let validMove=false;

        switch(type){
            case PieceType.PAWN:
                validMove=pawnMove(initialPosition,desiredPosition,team,boardStatus);
                break;

            case PieceType.KNIGHT:
                validMove=knightMove(initialPosition,desiredPosition,team,boardStatus);
                break;

            case PieceType.BISHOP:
                validMove=bishopMove(initialPosition,desiredPosition,team,boardStatus);
                break;

            case PieceType.ROOK:
                validMove=rookMove(initialPosition,desiredPosition,team,boardStatus);
                break;

            case PieceType.QUEEN:
                 validMove=queenMove(initialPosition,desiredPosition,team,boardStatus);
                 break;

            case PieceType.KING:
                validMove=kingMove(initialPosition,desiredPosition,team,boardStatus);
                break;
                
            }
        
            return validMove;

}
}