import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import axios from "axios";
import Header from "../Header/Header";
import "./ContactUs.css";
import cookies from "js-cookie";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

dayjs.extend(utc);
dayjs.extend(timezone);

const ContactUs = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const currentTimeZone = dayjs.tz.guess();
  const email = cookies.get("user"); // Replace with the actual email if available

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://edtestzassignmentmongodb1.onrender.com/api/appointments/${email}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments.");
    }
  }, [email]);

  useEffect(() => {
    // Fetch appointments when the component mounts
    fetchAppointments();
  }, [fetchAppointments]);

  const handleButtonClick = async () => {
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate)
        .tz(currentTimeZone)
        .format("YYYY-MM-DD HH:mm:ss");
      try {
        const response = await axios.post(
          "https://edtestzassignmentmongodb1.onrender.com/api/appointments",
          {
            email,
            date: formattedDate,
          }
        );
        console.log(response);
        // Fetch appointments again to update the list
        fetchAppointments();
      } catch (error) {
        console.error("Error creating appointment:", error);
        alert("Failed to create appointment.");
      }
    } else {
      alert("Please select a date.");
    }
  };

  return (
    <>
      <Header />
      <div>
        <div>
          <h1>Hi, I am Gabbug!</h1>
        </div>

        <div className="date1">
          <div>
            <div>
              <p>Current Time Zone: {currentTimeZone}</p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              />
            </LocalizationProvider>
            <div className="dsubmitbutton">
              <button className="submitbutton" onClick={handleButtonClick}>
                Submit Date
              </button>
            </div>
          </div>

          <div>
            <h2>Appointments: {appointments.length}</h2>
            <ol>
              {appointments.map((appointment) => (
                <li key={appointment._id}>{appointment.date.slice(0, 10)}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
