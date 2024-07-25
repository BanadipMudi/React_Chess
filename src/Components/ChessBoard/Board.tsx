import React, { useState } from 'react'
import './Board.css';
import Tile from '../Tile/Tile.tsx';
import { useRef } from 'react';
import Referee from '../../Refree/referee.ts';
const vertical=['1','2','3','4','5','6','7','8'];
const horizontal=['a','b','c','d','e','f','g','h'];
export enum PieceType{
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING
}

export enum TeamType{
  opponent,
  own
}
export interface Piece{
  image:string;
  x:number;
  y:number;
  type:PieceType;
  team:TeamType;
}


const piece: Piece[]=[];
for(let i=0;i<8;i++){
  piece.push({image:"assets/images/pawn_b.png",x:i,y:6,type:PieceType.PAWN,team:TeamType.opponent});
}

for(let i=0;i<8;i++){
  piece.push({image:"assets/images/pawn_w.png",x:i,y:1,type:PieceType.PAWN,team:TeamType.own});
}

piece.push({image:"assets/images/rook_b.png",x:0,y:7,type:PieceType.ROOK,team:TeamType.opponent});
piece.push({image:"assets/images/rook_b.png",x:7,y:7,type:PieceType.ROOK,team:TeamType.opponent});

piece.push({image:"assets/images/rook_w.png",x:0,y:0,type:PieceType.ROOK,team:TeamType.own});
piece.push({image:"assets/images/rook_w.png",x:7,y:0,type:PieceType.ROOK,team:TeamType.own});

piece.push({image:"assets/images/knight_b.png",x:1,y:7,type:PieceType.KNIGHT,team:TeamType.opponent});
piece.push({image:"assets/images/knight_b.png",x:6,y:7,type:PieceType.KNIGHT,team:TeamType.opponent});

piece.push({image:"assets/images/knight_w.png",x:1,y:0,type:PieceType.KNIGHT,team:TeamType.own});
piece.push({image:"assets/images/knight_w.png",x:6,y:0,type:PieceType.KNIGHT,team:TeamType.own});

piece.push({image:"../../assets/images/bishop_b.png",x:2,y:7,type:PieceType.BISHOP,team:TeamType.opponent});
piece.push({image:"assets/images/bishop_b.png",x:5,y:7,type:PieceType.BISHOP,team:TeamType.opponent});

piece.push({image:"assets/images/bishop_w.png",x:2,y:0,type:PieceType.BISHOP,team:TeamType.own});
piece.push({image:"assets/images/bishop_w.png",x:5,y:0,type:PieceType.BISHOP,team:TeamType.own});

piece.push({image:"assets/images/king_b.png",x:4,y:7,type:PieceType.KING,team:TeamType.opponent});
piece.push({image:"assets/images/queen_b.png",x:3,y:7,type:PieceType.QUEEN,team:TeamType.opponent});

piece.push({image:"assets/images/king_w.png",x:4,y:0,type:PieceType.KING,team:TeamType.own});
piece.push({image:"assets/images/queen_w.png",x:3,y:0,type:PieceType.QUEEN,team:TeamType.own});


export default function Board() {
  const [pieces,setPieces]=useState<Piece[]>(piece);
  const [gridX,setGridX]=useState(0);
  const [gridY,setGridY]=useState(0);
  const [hght,sethght]=useState<number>();
  const [wdth,setwdth]=useState<number>();
  const [activeElement,setActiveElemet]=useState<HTMLElement | null>(null);
  const chessBoardRef=useRef<HTMLDivElement>(null);
  const referee=new Referee();
//grab a piece
  function grabPiece(e:React.MouseEvent) {
    const el=e.target as HTMLElement;
    const chessbrd=chessBoardRef.current;

      if(el.classList.contains("chess-piece") && chessbrd){
        setGridX(Math.floor((e.clientX-chessbrd.offsetLeft)/100));
        setGridY(Math.abs(Math.ceil((e.clientY-chessbrd.offsetTop-800)/100)));

        const x=e.clientX -50;
        const y=e.clientY -50;
        el.style.position="absolute";
        el.style.left=`${x}px`;
        el.style.top=`${y}px`;
        setActiveElemet(el);
      }
  }
  
  //move a piece
  function movePiece(e:React.MouseEvent){
    const el=e.target as HTMLElement;
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
      const x=Math.floor((e.clientX-chessbrd.offsetLeft)/100);
      const y=Math.abs(Math.ceil((e.clientY-chessbrd.offsetTop-800)/100));
      // console.log(x,y);
      const currentPiece=pieces.find(p=>p.x===gridX && p.y===gridY);
      const attackedPiece=pieces.find(p=>p.x===x && p.y===y);

      if(currentPiece){
        const validMove=referee.isValid(gridX,gridY,x,y,currentPiece.type,currentPiece.team,pieces);

      if(validMove){
        const updatedPieces=pieces.reduce((results,piece)=>{
          if(piece.x===currentPiece.x && piece.y===currentPiece.y){
            piece.x=x;
            piece.y=y;
            results.push(piece);
          }else if(!(piece.x===x && piece.y===y)){
            results.push(piece);
          }
           
          return results;
        },[] as Piece[]);

        setPieces(updatedPieces);
    }else{
      activeElement.style.position="relative";
      activeElement.style.removeProperty('top');
      activeElement.style.removeProperty('left');
    }
  }

      setActiveElemet(null);
    }
  }
  let board=[];
    for(let j=vertical.length-1;j>=0;j--){
        for(let i=0;i<horizontal.length;i++){
            let s=i+j;

          let image=undefined;
          piece.forEach((p)=>{
            if(p.x==i && p.y==j){
              image=p.image;
            }
          });
            board.push(<Tile key={`${i},${j}`} number={s} img={image}></Tile>)
        }
    }

  return (
    <div id='board' ref={chessBoardRef} onMouseUp={e=>dropPiece(e)} onMouseMove={e=>movePiece(e)} onMouseDown={e=>grabPiece(e)}>{board}
    </div>
  );
}
