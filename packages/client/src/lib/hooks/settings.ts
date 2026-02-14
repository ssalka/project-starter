import { useSettingsStore, type GlobalSettings } from '@/state/settings';

export const useSettingsActions = () => useSettingsStore(state => state.actions);

export const useDarkMode = () => useSettingsStore(store => store.darkMode);

export const useSettingsOpen = () => useSettingsStore(store => store.settingsOpen);

export const useGlobalSetting = <T extends keyof GlobalSettings>(setting: T): GlobalSettings[T] =>
  useSettingsStore(store => store[setting]);
