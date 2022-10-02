import React, {useState, useEffect} from 'react'
import {listTables, updateTable} from "../utils/api"
import {useParams} from "react-router-dom"

export default function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  
  const {reservationId} = useParams();
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listTables()
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }
  
  const handleSubmitClick = event => {
    event.preventDefault();
    console.log("Submitted", formData);
    updateTable(formData)
      .then(data => {
        setFormData({...initialFormData});
        history.push("/dashboard");
      })
      .catch(err => {
        setErr(err.message)
      })
    setErr("");
  }
  
  return (
    <form onSubmit={handleSubmitClick}>
      <label for="table">Choose a table</label>
      <select name="table" id="table">
        {tables.map((table) => (
          <option value={table.table_id}>{table.table_name}</option>
        ))}
      </select>
    </form>
  )
}
