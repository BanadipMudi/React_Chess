import { Piece, Position, samePosition, TeamType } from "../../Constant";

export const isTileEmptyOrOccupiedOppenent=(position:Position,boardStatus:Piece[],team:TeamType)=>{
    return ( !isTileOccupied(position,boardStatus) || isTileOccupiedOppenent(position,team,boardStatus));
 }

export const isTileOccupied=(position:Position,boardStatus:Piece[])=>{
    const pice=boardStatus.find(p=>samePosition(p.position,position))
    if(pice) return true;
    return false;
}

export const isTileOccupiedOppenent=(position:Position,team:TeamType,boardStatus:Piece[])=>{
    const pice=boardStatus.find(p=>samePosition(p.position,position) && p.team!=team);
    if(pice) return true;
    return false;
}