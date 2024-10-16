import { CalendarEventI } from "../interfaces/interfaces";
import { CalendarDAO } from "../daos/CalendarDAO";

class CalendarAdmin {
  private calendarDAO: CalendarDAO = new CalendarDAO();

  constructor() {}

  public async registerEvent(event: CalendarEventI) {
    return await this.calendarDAO.registerEvent(event);
  }

  public async updateEvent(event: CalendarEventI) {
    return await this.calendarDAO.updateEvent(event);
  }

  public async deleteEvent(eventId: string) {
    return await this.calendarDAO.deleteEvent(eventId);
  }

  public async getEvent(eventId: string) {
    return await this.calendarDAO.getEvent(eventId);
  }

  public async getEvents() {
    return await this.calendarDAO.getEvents();
  }

  public async overlaps(event: CalendarEventI) {
    return await this.calendarDAO.overlaps(event);
  }
}

export { CalendarAdmin };
