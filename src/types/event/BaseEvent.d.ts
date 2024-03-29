export interface ShortEvent {
  id: number;
  eventDate: number;
  days: number; // Сколько прошло дней от начала года о события
  eventName: string;
}

export interface BaseEvent extends ShortEvent {
  entityName: string;
  imageUrl?: string;
  userId: number;
  deptId: number;
  deptName: string;
  deptClassname?: string;
}
