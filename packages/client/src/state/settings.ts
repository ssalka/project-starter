import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SettingsActions {
  setTrackingEnabled: (enabled: boolean) => void;
  toggleDarkMode(): void;
  toggleSettingsPanel(): void;
  updateGlobalSettings(settings: Partial<GlobalSettings>): void;
}

export interface GlobalSettings {
  /** Whether dark mode is enabled */
  darkMode: boolean;
  settingsOpen: boolean;
  trackingEnabled: boolean;
}

interface SettingsStore extends GlobalSettings {
  actions: SettingsActions;
}

// Helper to apply dark mode class to document
const applyDarkMode = (darkMode: boolean) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', darkMode);
  }
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    immer(set => ({
      settingsOpen: false,
      darkMode: false,
      trackingEnabled: false,

      actions: {
        setTrackingEnabled(enabled) {
          set({ trackingEnabled: enabled });
        },

        toggleDarkMode() {
          set(state => {
            state.darkMode = !state.darkMode;
            applyDarkMode(state.darkMode);
          });
        },

        toggleSettingsPanel() {
          set(state => {
            state.settingsOpen = !state.settingsOpen;
          });
        },

        updateGlobalSettings(settings) {
          set(settings);
        },
      },
    })),
    {
      name: 'app-settings',
      partialize: state => ({ darkMode: state.darkMode }),
      onRehydrateStorage: () => state => {
        // Apply dark mode on initial load from persisted state
        if (state?.darkMode) {
          applyDarkMode(state.darkMode);
        }
      },
    },
  ),
);
