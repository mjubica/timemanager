
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    // load JSON data; then proceed
    // return JSON data from any file path (asynchronous)
    AllEvents = []
    if (localStorage.getItem("events") === null) {
        localStorage.setItem("events",JSON.stringify(AllEvents))
    }
    else {
        AllEvents =JSON.parse(localStorage.getItem("events") || "[]"); 
        console.log(AllEvents)
    }
 

    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,
      select: function(arg) {
        var title = prompt('Event Title:');
        if (title) {
          calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          })
          AllEvents.push({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          })
          localStorage.setItem("events",JSON.stringify(AllEvents))
        }
        calendar.unselect()
      },
      eventClick: function(arg) {
        if (confirm('Are you sure you want to delete this event?')) {
            AllEvents = AllEvents.filter(function( obj ) {
                return Date.parse(obj.start) !== Date.parse(arg.event.start) || ((Date.parse(obj.start) == Date.parse(arg.event.start))  && obj.title !== arg.event.title);
              });
          console.log(AllEvents)
          arg.event.remove()
          localStorage.setItem("events",JSON.stringify(AllEvents))

        }
      },
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: AllEvents
    });

    calendar.render();

  });
