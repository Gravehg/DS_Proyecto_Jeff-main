import { CustomFields, CalendarEventI } from "../interfaces/interfaces";

class CalendarEvent implements CalendarEventI {
  private eventId: string | null;
  private date: Date;
  private duration: number;
  private description: string;
  private type: string;

  constructor(
    date: Date,
    duration: number,
    description: string,
    type: string,
    eventId?: string
  ) {
    this.eventId = eventId;
    this.date = date;
    this.duration = duration;
    this.description = description;
    this.type = type;
  }

  public setEventId(eventId: string) {
    this.eventId = eventId;
  }

  public getEventId() {
    return this.eventId;
  }

  public getDate() {
    return this.date;
  }

  public getDuration() {
    return this.duration;
  }

  public getDescription() {
    return this.description;
  }

  public getCustomFields(): CustomFields[] {
    return [];
  }

  public getType() {
    return this.type;
  }
}

export { CalendarEvent };
