export interface UserSettingsRequest {
  userId: number;
  showOnboarding: boolean;
  pageOnboarding?: number;
}

export interface UserSettings extends UserSettingsRequest {
  notFound: boolean; // Если настройки не найдены
}
