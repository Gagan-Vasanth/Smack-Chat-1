import React from 'react';
import './Card.css';

/**
* @author
* @function Card
**/

const Card = (props) => {
  return(
    <div className="card">{props.children}</div>
   )

 }

export default Card;