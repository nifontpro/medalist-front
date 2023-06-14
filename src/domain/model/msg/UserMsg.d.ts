export interface UserMsg {
  id: number;
  fromId?: number; // Кто отправил
  toId: number; // Кому отправлено
  type: 'NONE' | 'SYSTEM' | 'USER';
  msg?: string; // Текст сообщения
  read: boolean; // Статус прочтения
  sendDate: number;
  imageUrl?: string; 
}
