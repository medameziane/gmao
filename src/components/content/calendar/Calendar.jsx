import React, { useState, useEffect } from "react";
import HeaderContent from "../static/HeaderContent";
import axios from "axios";
import AddTask from "../tasks/AddTask";
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [etat, setEtat] = useState([]);
  const [betDate, setBetDate]= useState([]);

  const getAllData = () => {
    axios.get("http://localhost/gmao-react/backend/tables/task.php").then(res=>setTasks(res.data))
    axios.get("http://localhost/gmao-react/backend/tables/etat.php").then(res=>setEtat(res.data))
  };

  const getColorEtat = (id)=>{
    const color = etat.filter(et=>et.id === id)
    return color[0].couleur
  }
  
  const getEvent = () => {
    const event = tasks.map(a => {
      const startDate = new Date(a.date);
      const endDate = new Date(a.end_date);
      return (
        {
          title: a.description,
          start: startDate,
          end: endDate,
          borderColor:getColorEtat(a.etat_id),
          backgroundColor:getColorEtat(a.etat_id),
          }
        )
    })
    setEvents(event)
  };
  
  const handleSelect = (info)=>{
    document.querySelector(".add-task .add-form").classList.add("showTaskForm");
    document.querySelector(".overly").style.display = "block";
    const {startStr,endStr} = info;
    setBetDate({startStr,endStr})
  };

  useEffect(() => {
    getAllData()
    getEvent()
  },[events])

  const eventInfo = (info)=>{
    console.log(info)
  }
  return (
    <div className="calendar-content">
      <HeaderContent title = "Calendrier"/>
      <AddTask bet_date ={betDate} />
      <div className="box-content">
        <div className="box-body">
          <FullCalendar
            initialView='dayGridMonth'
            events={events}
            // eventContent={info=><EventItem info={info} />}
            // editable
            selectable
            select={handleSelect}
            eventClick={eventInfo}
            headerToolbar={{
              left: "today prev next",
              center: "title",
              // end: "dayGridMonth dayGridWeek dayGridDay",
              end: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}

            plugins={[daygridPlugin, timeGridPlugin, interactionPlugin]}
            views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
          />
        </div>
      </div>
    </div>
  );
}
export default Calendar;