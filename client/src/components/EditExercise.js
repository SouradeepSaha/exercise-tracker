import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./createExercise.css";

const EditExercise = (props) => {
  const exerciseId = props.match.params.id;

  const initialState = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleDateChange = (date) => {
    setState((prevState) => {
      return {
        ...prevState,
        date: date,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, description, duration, date } = state;
    const exercise = {
      username,
      description,
      duration,
      date,
    };
    console.log(exercise);
    axios
      .post(`/exercises/update/${exerciseId}`, exercise)
      .then((res) => console.log(res.data));
    window.location = "/";
  };

  useEffect(() => {
    axios
      .all([axios.get(`/exercises/${exerciseId}`), axios.get("/users")])
      .then(
        axios.spread((exercises, users) => {
          const { username, description, duration, date } = exercises.data;
          const userlist = users.data;
          setState({
            users: userlist.map((user) => user.username),
            username,
            description,
            duration,
            date: new Date(date),
          });
        })
      );
  }, []);

  console.log(state);

  return (
    <div>
      <h3>Edit exercise log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <select
            required
            name='username'
            className='form-control'
            value={state.username}
            onChange={handleChange}
          >
            {state.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            name='description'
            required
            className='form-control'
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Duration in minutes</label>
          <input
            type='number'
            name='duration'
            required
            className='form-control'
            value={state.duration}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={state.date} onChange={handleDateChange} />
          </div>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Edit exercise log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
