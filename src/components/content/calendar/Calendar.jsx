import React, { useState, useEffect } from "react";
import HeaderContent from "../static/HeaderContent";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddTask from "../tasks/AddTask";

function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [etat, setEtat] = useState([]);
  const [startDate, setStartDate]= useState([]);

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
      const endDate = new Date(startDate.setDate(startDate.getDate() + a.dure));
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
    // const eventNamePrompt = prompt("Enter, event name");
    // if (eventNamePrompt) {
    //   setEvents([...events,{
    //     startStr,
    //     endStr,
    //     title: eventNamePrompt,
    //     allDay: false,
    //     backgroundColor: "red",
    //     id: "000",
    //   }]);
    // }
    setStartDate(startStr)
  };

  // const EventItem = ({info})=>{
  //   const { event } = info;
  //   return (
  //     <div>
  //       <p>{event.title}</p>
  //       <p>{event.backgroundColor}</p>
  //     </div>
  //   );
  // };


  useEffect(() => {
    getAllData()
    getEvent()
  }, [])

  return (
    <div className="calendar-content">
      <HeaderContent title = "Calendrier"/>
      <AddTask startDate ={startDate} />
      <div className="box-content">
        <div className="box-body">
          <FullCalendar
            events={events}
            // eventContent={info=><EventItem info={info} />}
            // editable
            selectable
            select={handleSelect}

            headerToolbar={{
              left: "today prev next",
              center: "title",
              end: "dayGridMonth dayGridWeek dayGridDay",
            }}
            plugins={[daygridPlugin, interactionPlugin]}
            views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
          />
        </div>
      </div>
    </div>
  );
}
export default Calendar;