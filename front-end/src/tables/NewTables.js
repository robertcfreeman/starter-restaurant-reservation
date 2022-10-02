import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {createTable} from "../utils/api";

export default function NewTables() {
 
  const history = useHistory();

  const initialFormData = {
    table_name: "",
    capacity: "",
  }

  const [formData, setFormData] = useState({...initialFormData})
  const [err, setErr] = useState();

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value
    })
  }

  const handleSubmitClick = event => {
    event.preventDefault();
    console.log("Submitted", formData);
    createTable(formData)
      .then(data => {
        setFormData({...initialFormData});
        history.push("/dashboard");
      })
      .catch(err => {
        setErr(err.message)
      })
    setErr("");
  }

  const handleCancelClick = (event) => {
    history.go(-1);
  }



  return (
    <>
      <h2>Enter Your Table Details</h2>
      <form onSubmit={handleSubmitClick}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name</label>
          <input
            className="form-control"
            name="table_name"
            type="text"
            id="table_name"
            required
            onChange={handleChange}
          >
          </input>
          <label htmlFor="capacity">Capacity</label>
          <input
            className="form-control"
            name="capacity"
            type="number"
            id="capacity"
            required
            onChange={handleChange}
            min="1"
          >
         </input>
          <button 
            type="submit"
            className="btn btn-primary"
          >Reserve</button>
          <button 
            type="btn"
            className="btn btn-secondary"
            onClick={handleCancelClick}
          >Cancel</button>
        </div>
      </form>
      {err && <div className="alert alert-danger">{err}</div>}
    </>
  )
}
