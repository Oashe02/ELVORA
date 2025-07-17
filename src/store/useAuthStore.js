import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
	persist(
		(set) => ({
			user: null,
			isAuthenticated: false,
			status: "loading", // "unauthenticated", "authenticated", "loading"

			setSession: (session) => {
				if (session && session.user) {
					set({
						user: session.user,
						isAuthenticated: true,
						status: "authenticated",
					});
				} else {
					set({
						user: null,
						isAuthenticated: false,
						status: "unauthenticated",
					});
				}
			},

			setStatus: (status) => set({ status }),

			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					status: "unauthenticated",
				}),
		}),
		{
			name: "auth-storage", // unique name for localStorage
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				status: state.status,
			}),
		},
	),
);
