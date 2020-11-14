import React, { useState } from "react";
import axios from "axios";
const CreateUser = (props) => {
  const initialState = {
    username: "",
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { value } = e.target;
    setState({ username: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: state.username,
    };
    console.log(user);
    axios.post("/users/add", user).then((res) => console.log(res.data));
    setState({ username: "" });
  };

  return (
    <div>
      <h3>Create new User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input
            type='text'
            required
            className='form-control'
            value={state.username}
            onChange={handleChange}
          />
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

export default CreateUser;
