import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {createReservation} from "../utils/api";

export default function NewReservation() {
 
  const history = useHistory();

  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    people: ""
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
    createReservation(formData)
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
      <h2>Enter Your Reservation Details</h2>
      <form onSubmit={handleSubmitClick}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            className="form-control"
            name="first_name"
            type="text"
            id="first_name"
            required
            onChange={handleChange}
          >
          </input>
          <label htmlFor="last_name">Last Name</label>
          <input
            className="form-control"
            name="last_name"
            type="text"
            id="last_name"
            required
            onChange={handleChange}
          >
          </input>
          <label htmlFor="mobile_number">Phone Number</label>
          <input
            className="form-control"
            name="mobile_number"
            type="tel"
            id="mobile_number"
            required
            onChange={handleChange}
          >
          </input>
          <label htmlFor="reservation_date">Date you would like to reserve a table</label>
          <input
            className="form-control"
            name="reservation_date"
            type="date"
            id="reservation_date"
            required
            onChange={handleChange}
          ></input>
          <label htmlFor="reservation_time">Time you'd like to reserve</label>
          <input
            className="form-control"
            name="reservation_time"
            type="time"
            id="reservation_time"
            placeholder="Time you would like to reserve"
            required
            onChange={handleChange}
          ></input>
          <label htmlFor="people">Number of people in your party</label>
          <input
            className="form-control"
            name="people"
            type="number"
            id="people"
            placeholder="Minimum of 1"
            min="1"
            required
            onChange={handleChange}
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
