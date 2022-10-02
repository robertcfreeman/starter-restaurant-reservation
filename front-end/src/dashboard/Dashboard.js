import React, { useEffect, useState } from "react";
import { listReservations, listReservationsByDate, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listReservations({date}, abortController.signal)
      .then(setReservations)
      .catch(setError);
    listTables()
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }



  const listElements = (reservation, index) => {
    const {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people
    } = reservation;

    return (
      <li key={index}>{`${first_name} ${last_name} reserved a table on ${reservation_date} at ${reservation_time} for a party of ${people}. Contact number is ${mobile_number}.`}</li>
    )
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={error} />
      <ul>
        {reservations.map((reservation, index) => listElements(reservation, index))}
      </ul>
      <ul>
        {tables.map((table, index) => (
          <li key={index}>{table.table_name} has {table.capacity} seated</li>
        ))}
      </ul>
    </main>
  );
}

export default Dashboard;
