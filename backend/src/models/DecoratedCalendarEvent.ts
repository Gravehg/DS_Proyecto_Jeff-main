import { Decorator } from "./Decorator";
import { CustomFields } from "../interfaces/interfaces";
import { CalendarEventI } from "../interfaces/interfaces";

class DecoratedCalendarEvent extends Decorator {
  private fieldName: string;
  private fieldValue: string;

  constructor(e: CalendarEventI, fieldName: string, fieldValue: string) {
    super(e);
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
  }

  public getCustomFields() {
    const customFields = this.decoratedEvent.getCustomFields();
    const result: CustomFields[] = customFields.concat([
      { name: this.fieldName, value: this.fieldValue },
    ]);
    return result;
  }
}

export { DecoratedCalendarEvent };
