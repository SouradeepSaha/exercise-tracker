import React from "react";
import { Link } from "react-router-dom";

const Exercise = (props) => {
  const { username, description, duration, date, _id } = props.exercise;
  return (
    <tr>
      <td>{username}</td>
      <td>{description}</td>
      <td>{duration}</td>
      <td>{date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${_id}`}>Edit</Link>
        <button
          style={{ marginLeft: "20px" }}
          className='btn btn-primary'
          type='button'
          onClick={() => {
            props.deleteExercise(_id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Exercise;
