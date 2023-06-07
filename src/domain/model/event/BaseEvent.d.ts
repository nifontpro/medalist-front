export interface BaseEvent {
  id: number;
  eventDate: number;
  days: number; // Сколько прошло дней от начала года о события
  eventName: string;
  entityName: string;
  imageUrl?: string;
  userId: number;
  deptId: number;
  deptName: string;
  deptClassname?: string;
}
