import { AuthenticatedUser } from "./login.model";

export class Event {
  id: string;
  event_name: string;
  event_type: Type;
  event_place: string;
  event_address: string;
  event_category: Category;
  event_initial_date: Date;
  event_final_date: Date;
  thumbnail: string;
  user: AuthenticatedUser;
}

export class Type {
  id: number;
  name: string;
}

export class Category {
  id: number;
  name: string;
}

