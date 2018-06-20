import React from 'react';
import {getDate} from '../../../../utils/dateHelper';
import { Link } from 'react-router-dom';


const Card = ({question, isDone}) => {
    const { author, timestamp, id } = question;
    if (question === null) {
        return <p>This question doesn't exist</p>;
      }
    return(
        <Link to={`/questions/${id}`}>
            <h2>{author}</h2>
            <h3>{getDate(timestamp)}</h3>
        </Link>
    );
};

export default Card;