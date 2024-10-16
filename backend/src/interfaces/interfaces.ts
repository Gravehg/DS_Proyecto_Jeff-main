import { Notification } from "../models/Notification";

interface CustomFields {
  name: string;
  value: string;
}

interface CalendarEventI {
  getCustomFields: () => CustomFields[];
  getDate: () => Date;
  getDescription: () => string;
  getEventId: () => string;
  getDuration: () => number;
  getType: () => string;
}

interface Observer {
  update: (n: Notification) => void;
}

export { CalendarEventI };
export { Observer };
export { CustomFields };
