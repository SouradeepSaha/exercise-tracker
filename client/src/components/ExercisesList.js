import React, { useState, useEffect } from "react";
import axios from "axios";
import Exercise from "./Exercise";

const ExerciseList = () => {
  const [state, setState] = useState({ exercises: [] });

  useEffect(() => {
    axios
      .get("/exercises")
      .then((response) => {
        setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`/exercises/${id}`).then((res) => console.log(res.data));
    setState({
      exercises: state.exercises.filter((exercise) => exercise._id !== id),
    });
  };

  const exercises = () => {
    return state.exercises.map((currentExercise) => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exercises()}</tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
