// stores/useSettingStore.js
import { create } from "zustand";

export const useSettingStore = create((set) => ({
	setting: null,
	setSetting: (data) => set({ setting: data }),
}));
