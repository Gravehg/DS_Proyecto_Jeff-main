import { CalendarEventI } from "../interfaces/interfaces";

class Decorator implements CalendarEventI {
  protected decoratedEvent: CalendarEventI;

  constructor(eventToDecorate: CalendarEventI) {
    this.decoratedEvent = eventToDecorate;
  }

  public getEventId() {
    return this.decoratedEvent.getEventId();
  }

  public getDate() {
    return this.decoratedEvent.getDate();
  }

  public getDuration() {
    return this.decoratedEvent.getDuration();
  }

  public getDescription() {
    return this.decoratedEvent.getDescription();
  }

  public getCustomFields() {
    return this.decoratedEvent.getCustomFields();
  }

  public getType() {
    return this.decoratedEvent.getType();
  }
}

export { Decorator };
