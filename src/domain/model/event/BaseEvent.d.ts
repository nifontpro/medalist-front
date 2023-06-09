export interface BaseEvent {
  id: number;
  eventDate: number; // Дата события
  days: number; // ???
  eventName: string; 
  entityName: string; // ???
  imageUrl?: string;
  userId: number;
  deptId: number;
  deptName: string;
  deptClassname?: string; // ???
}
