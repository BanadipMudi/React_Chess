import React from 'react'
import './Tile.css'
interface Props{
    img?:string;
    number:number;
}

export default function Tile({number,img}:Props) {
  let clsList=['tile'];
            if(number%2===0){
                clsList.push("dark-tile");
            }
            else{
                clsList.push("white-tile");
            }
  return (
    <div className={clsList.join(" ")}>
      {img && <div style={{backgroundImage:`url(${img})`}} className='chess-piece'> </div>}
        </div>
  )
}
