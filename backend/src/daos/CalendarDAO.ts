import { addHours } from "date-fns";
import { CalendarEventI } from "../interfaces/interfaces";
import CalendarEvent from "../schemas/calendarEventS";

class CalendarDAO {
  constructor() {}

  public async registerEvent(event: CalendarEventI) {
    const newEvent = new CalendarEvent({
      date: event.getDate(),
      duration: event.getDuration(),
      description: event.getDescription(),
      type: event.getType(),
      customFields: event.getCustomFields(),
    });

    const regEvent = await newEvent.save();
    return regEvent;
  }

  public async updateEvent(event: CalendarEventI) {
    console.log("EN EL DAO");
    console.log(new Date());
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("User Time Zone:", userTimeZone);
    return await CalendarEvent.updateOne(
      { _id: event.getEventId() },
      {
        date: event.getDate(),
        duration: event.getDuration(),
        description: event.getDescription(),
        type: event.getType(),
        customFields: event.getCustomFields(),
      }
    );
  }

  public async deleteEvent(eventId: string) {
    return await CalendarEvent.deleteOne({ _id: eventId });
  }

  public async getEvent(eventId: string) {
    return await CalendarEvent.findOne({ _id: eventId });
  }

  public async getEventsInRange(initDate: Date, endDate: Date) {
    return await CalendarEvent.find({
      date: {
        $gte: initDate,
        $lte: endDate,
      },
    });
  }

  public async getEvents() {
    return await CalendarEvent.find();
  }

  public async overlaps(event: CalendarEventI) {
    // Calculamos horas de inicio y fin del evento
    const eventInit = new Date(event.getDate());
    const eventEnd = addHours(eventInit, event.getDuration());
    var overlap = false;

    // Obtenemos los eventos
    const events = await this.getEvents();

    // Por cada evento del día verificamos si chocan las horas
    for (const calEvent of events) {
      // Ignoramos el propio evento si ya estuviera registrado
      if (calEvent._id.toString() === event.getEventId()) {
        continue;
      }

      // Verificamos si la fecha inicial se traslapa
      const eventInit2 = new Date(calEvent.date);
      if (eventInit <= eventInit2 && eventInit2 < eventEnd) {
        overlap = true;
        break;
      }

      // Verificamos si la fecha de fin se traslapa
      const eventEnd2 = addHours(eventInit2, calEvent.duration);
      if (eventInit < eventEnd2 && eventEnd2 < eventEnd) {
        overlap = true;
        break;
      }
    }
    return overlap;
  }
}

export { CalendarDAO };
