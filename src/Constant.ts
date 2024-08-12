export const vertical=['1','2','3','4','5','6','7','8'];
export const horizontal=['a','b','c','d','e','f','g','h'];
export const cellWidth=100;
export const boardWidth=800;

export function samePosition(p1:Position,p2:Position){
    return p1.x===p2.x && p1.y===p2.y;
}
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
  export interface Position{
    x:number,
    y:number
  }
  export interface Piece{
    image:string;
    position:Position;
    type:PieceType;
    team:TeamType;
    Enpassant?:boolean;
  }

export const piece: Piece[]=[
{
  image:"assets/images/pawn_b.png", position:{ x:0,y:6 } ,type:PieceType.PAWN,team:TeamType.opponent
},

{
    image:"assets/images/pawn_b.png",position:{ x:1,y:6 },type:PieceType.PAWN,team:TeamType.opponent
  },

{
    image:"assets/images/pawn_b.png",position:{ x:2,y:6 },type:PieceType.PAWN,team:TeamType.opponent
  },
  {
    image:"assets/images/pawn_b.png",position:{ x:3,y:6 },type:PieceType.PAWN,team:TeamType.opponent
  },
  {
    image:"assets/images/pawn_b.png",position:{ x:4,y:6 },type:PieceType.PAWN,team:TeamType.opponent
  },
  {
    image:"assets/images/pawn_b.png",position:{ x:5,y:6 },type:PieceType.PAWN,team:TeamType.opponent
  },
  {
    image:"assets/images/pawn_b.png",position:{ x:6,y:6 },type:PieceType.PAWN,team:TeamType.opponent
  },
  {
    image:"assets/images/pawn_b.png",position:{ x:7,y:6 },type:PieceType.PAWN,team:TeamType.opponent
  },

{
    image:"assets/images/pawn_w.png",position:{ x:0,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/pawn_w.png",position:{ x:1,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/pawn_w.png",position:{ x:2,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/pawn_w.png",position:{ x:3,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/pawn_w.png",position:{ x:4,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/pawn_w.png",position:{ x:5,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/pawn_w.png",position:{ x:6,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/pawn_w.png",position:{ x:7,y:1 },type:PieceType.PAWN,team:TeamType.own
},

{
    image:"assets/images/rook_b.png",position:{ x:0,y:7 },type:PieceType.ROOK,team:TeamType.opponent

},
{
    image:"assets/images/rook_b.png",position:{ x:7,y:7 },type:PieceType.ROOK,team:TeamType.opponent},

{
    image:"assets/images/rook_w.png",position:{ x:0,y:0 },type:PieceType.ROOK,team:TeamType.own
},

{
    image:"assets/images/rook_w.png",position:{ x:7,y:0 },type:PieceType.ROOK,team:TeamType.own
},

{
    image:"assets/images/knight_b.png",position:{ x:1,y:7 },type:PieceType.KNIGHT,team:TeamType.opponent
},

{
    image:"assets/images/knight_b.png",position:{ x:6,y:7 },type:PieceType.KNIGHT,team:TeamType.opponent
},

{
    image:"assets/images/knight_w.png",position:{ x:1,y:0 },type:PieceType.KNIGHT,team:TeamType.own
},

{
    image:"assets/images/knight_w.png",position:{ x:6,y:0 },type:PieceType.KNIGHT,team:TeamType.own
},


{
    image:"assets/images/bishop_b.png",position:{ x:2,y:7 },type:PieceType.BISHOP,team:TeamType.opponent
},

{
    image:"assets/images/bishop_b.png",position:{ x:5,y:7 },type:PieceType.BISHOP,team:TeamType.opponent
},


{
    image:"assets/images/bishop_w.png",position:{ x:2,y:0 },type:PieceType.BISHOP,team:TeamType.own
},

{
    image:"assets/images/bishop_w.png",position:{ x:5,y:0 },type:PieceType.BISHOP,team:TeamType.own
},

{
    image:"assets/images/king_b.png",position:{ x:4,y:7 },type:PieceType.KING,team:TeamType.opponent
},

{
    image:"assets/images/queen_b.png",position:{ x:3,y:7 },type:PieceType.QUEEN,team:TeamType.opponent
},

{
    image:"assets/images/king_w.png",position:{ x:4,y:0 },type:PieceType.KING,team:TeamType.own
},

{
    image:"assets/images/queen_w.png",position:{ x:3,y:0 },type:PieceType.QUEEN,team:TeamType.own
},

];