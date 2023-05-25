/**
 * Папка галереи
 */
export interface Folder {
  id: number;
  parentId: number;
  name: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
}
 