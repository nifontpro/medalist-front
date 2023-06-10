export interface BaseEvent {
  id: number;
  eventDate: number; // Дата события
  days: number; // Кол дней прошедших от начала года до события
  eventName: string; 
  entityName: string; // ???
  imageUrl?: string;
  userId: number;
  deptId: number;
  deptName: string;
  deptClassname?: string; // ???
}
