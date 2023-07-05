/**
 * Объект галереи
 */
export interface GalleryItem {
  id: number;
  folderId: number;
  name: string;
  description?: string;
  imageUrl: string;
  createdAt?: number;
  updatedAt?: number;
}
