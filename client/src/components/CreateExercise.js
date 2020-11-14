import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./createExercise.css";

const CreateExercise = (props) => {
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
    axios.post("/exercises/add", exercise).then((res) => console.log(res.data));
    window.location = "/";
  };

  useEffect(() => {
    axios.get("/users").then((response) => {
      if (response.data.length > 0) {
        setState((prevState) => {
          return {
            ...prevState,
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          };
        });
      }
    });
  }, []);

  console.log(state);

  return (
    <div>
      <h3>Create new Exercise log</h3>
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
            value='Create exercise log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
