import React, { useState } from 'react'
import './Board.css';
import Tile from '../Tile/Tile.tsx';
import { useRef } from 'react';
import Referee from '../../Refree/referee.ts';
import {vertical,horizontal,boardWidth,cellWidth, Position} from '../../Constant.ts';
import {PieceType,TeamType,Piece,piece,samePosition} from '../../Constant.ts';

export default function Board() {
  const [pieces,setPieces]=useState<Piece[]>(piece);
  // const [gridX,setGridX]=useState(0);
  // const [gridY,setGridY]=useState(0);
  const [grabPosition,setgrabPosition,]=useState<Position>({x:0,y:0});
  const [promotionPawn,setPromotionPawn]=useState<Piece>();
  const modalRef=useRef<HTMLDivElement>(null);
  const [activeElement,setActiveElemet]=useState<HTMLElement | null>(null);
  const chessBoardRef=useRef<HTMLDivElement>(null);
  const referee=new Referee();
//grab a piece
  function grabPiece(e:React.MouseEvent) {
    const el=e.target as HTMLElement;
    const chessbrd=chessBoardRef.current;

      if(el.classList.contains("chess-piece") && chessbrd){
       const grabX=Math.floor((e.clientX-chessbrd.offsetLeft)/cellWidth);
       const grabY=Math.abs(Math.ceil((e.clientY-chessbrd.offsetTop-boardWidth)/cellWidth));
       setgrabPosition({x:grabX,y:grabY});

        const x=e.clientX -cellWidth/2;
        const y=e.clientY -cellWidth/2;
        el.style.position="absolute";
        el.style.left=`${x}px`;
        el.style.top=`${y}px`;
        setActiveElemet(el);
      }
  }
  
  //move a piece
  function movePiece(e:React.MouseEvent){
    // const el=e.target as HTMLElement;
    const chessbrd=chessBoardRef.current;
    if(activeElement && chessbrd){
      // console.log(chessBoardRef);
      // console.log(chessbrd);
      const minX=chessbrd.offsetLeft -20;
      const minY=chessbrd.offsetTop -15;

      const maxX=chessbrd.offsetLeft + chessbrd.clientWidth -65;
      const maxY=chessbrd.offsetTop + chessbrd.clientHeight -70;

      const x=e.clientX-50;
      const y=e.clientY-50;
      activeElement.style.position="absolute";
      
      if(x<minX){
        activeElement.style.left=`${minX}px`; 
      }else if(x>maxX){
        activeElement.style.left=`${maxX}px`; 
      }
      else{
        activeElement.style.left=`${x}px`; 
      }

      if(y<minY){
        activeElement.style.top=`${minY}px`;
      }else if(y>maxY){
        activeElement.style.top=`${maxY}px`; 
      }
      else{
        activeElement.style.top=`${y}px`;
      }
    }
  }
  
  //drop a piece
  function dropPiece(e:React.MouseEvent){
    const chessbrd=chessBoardRef.current;
    if(activeElement && chessbrd){
      const x=Math.floor((e.clientX-chessbrd.offsetLeft)/cellWidth);
      const y=Math.abs(Math.ceil((e.clientY-chessbrd.offsetTop-boardWidth)/cellWidth));
      
      const currentPiece=pieces.find(p=>samePosition(p.position,grabPosition));

      if(currentPiece){
        const isEnpassantMove=referee.isEnpassant(grabPosition,{x,y},currentPiece.type,currentPiece.team,pieces);
        const validMove=referee.isValid(grabPosition,{x,y},currentPiece.type,currentPiece.team,pieces);

        const pawndirection= (currentPiece.team===TeamType.own)? 1 : -1;

        if(isEnpassantMove){
          const updatedPieces=pieces.reduce((results,piece)=>{
            if(samePosition(piece.position,grabPosition)){
              piece.Enpassant=false;
              piece.position.x=x;
              piece.position.y=y;
              results.push(piece);
            }
            else if(!samePosition(piece.position,{x,y:y-pawndirection})){
              if(piece.type===PieceType.PAWN){
                piece.Enpassant=false;
              }
              // console.log(piece);
              
              results.push(piece);
            }

            return results;
          },[] as Piece[])
          setPieces(updatedPieces);
          
        }
      else if(validMove){
        const updatedPieces=pieces.reduce((results,piece)=>{
          if(samePosition(piece.position,grabPosition)){
            if(Math.abs(grabPosition.y-y)===2 && piece.type===PieceType.PAWN){
              piece.Enpassant=true;
            
            }else{
              piece.Enpassant=false;
            }
            piece.position.x=x;
            piece.position.y=y;
             
            let promotionRow=(piece.team===TeamType.own && piece.type===PieceType.PAWN)? 7 : 0;
            if(y===promotionRow){
              modalRef.current?.classList.remove("hidden");
              setPromotionPawn(piece);
            }
            
            results.push(piece);
            // console.log(piece.position.x,piece.position.y,piece.image,piece.Enpassant);
          }else if(!samePosition(piece.position,{x,y})){
            // if(piece.type===PieceType.PAWN){
              // piece.Enpassant=false;
            // }
            results.push(piece);
          }
           
          return results;
        },[] as Piece[]);

        setPieces(updatedPieces);
    }else{
      activeElement.style.position="relative";
      activeElement.style.removeProperty("top");
      activeElement.style.removeProperty("left");
    }
  }

      setActiveElemet(null);
    }
  }

  function promotePawn(pieceType:PieceType){
    if(promotionPawn===undefined) return;

    const updatedPieces=pieces.reduce((result,piece)=>{
      if(samePosition(piece.position,promotionPawn.position)){
        piece.type=pieceType;
        let team=(promotionPawn.team===TeamType.own) ? "w": "b";
        let img;
        switch(pieceType){
          case PieceType.BISHOP :
            img="bishop";
            break;
          case PieceType.KNIGHT:
            img="knight";
            break;
          case PieceType.ROOK:
            img="rook";
            break;
          case PieceType.QUEEN:
            img="queen";
            break;
        }
        piece.image=`assets/images/${img}_${team}.png`;
        modalRef.current?.classList.add("hidden");
      }
      result.push(piece);
      return result;
    },[] as Piece[]);
    setPieces(updatedPieces);
  }

  function promotionPieceColor(){
    return (promotionPawn?.team===TeamType.own)? "w" : "b";
  }

  let board=[];
    for(let j=vertical.length-1;j>=0;j--){
        for(let i=0;i<horizontal.length;i++){
            let s=i+j;

          let image=undefined;
          pieces.forEach((p)=>{
            if(samePosition(p.position,{x:i,y:j})){
              image=p.image;
            }
          });
            board.push(<Tile key={`${i},${j}`} number={s} img={image}></Tile>)
        }
    }

  return (
    <>
    <div id="pawn-promotion" className='hidden' ref={modalRef}>
        <div className="modal-body">
            <img onClick={()=>promotePawn(PieceType.ROOK)} src={`assets/images/rook_${promotionPieceColor()}.png`}></img>
            <img onClick={()=>promotePawn(PieceType.KNIGHT)} src={`assets/images/knight_${promotionPieceColor()}.png`}></img>
            <img onClick={()=>promotePawn(PieceType.BISHOP)} src={`assets/images/bishop_${promotionPieceColor()}.png`}></img>
            <img onClick={()=>promotePawn(PieceType.QUEEN)} src={`assets/images/queen_${promotionPieceColor()}.png`}></img>
        </div>
    </div>
    <div id='board' ref={chessBoardRef} onMouseUp={e=>dropPiece(e)} onMouseMove={e=>movePiece(e)} onMouseDown={e=>grabPiece(e)}>{board}
    </div>
    </>
  );
}
