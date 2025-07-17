// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useWishlistStore = create(
// 	persist(
// 		(set, get) => ({
// 			wishlist: [],

// 			// Add item to wishlist
// 			addToWishlist: (item) => {
// 				const exists = get().wishlist.find((i) => i.id === item.id);
// 				if (!exists) {
// 					set((state) => ({
// 						wishlist: [...state.wishlist, item],
// 					}));
// 				}
// 			},

// 			// Remove item from wishlist
// 			removeFromWishlist: (id) => {
// 				set((state) => ({
// 					wishlist: state.wishlist.filter((item) => item.id !== id),
// 				}));
// 			},

// 			// Check if item is in wishlist
// 			isInWishlist: (id) => {
// 				return !!get().wishlist.find((item) => item.id === id);
// 			},

// 			// Clear the wishlist
// 			clearWishlist: () => {
// 				set({ wishlist: [] });
// 			},
// 		}),
// 		{
// 			name: "wishlist-storage", // 🔐 key in localStorage
// 			skipHydration: true, // optional, avoid issues with hydration in SSR
// 		},
// 	),
// );

// export default useWishlistStore;


import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],

      // Add item to wishlist
      addToWishlist: (item) => {
        const exists = get().wishlist.find((i) => i.id === item.id);
        if (!exists) {
          set((state) => ({
            wishlist: [...state.wishlist, { ...item, id: item.id || item._id }],
          }));
          console.log("Added to wishlist:", item);
        } else {
          console.log("Item already in wishlist:", item);
        }
      },

      // Remove item from wishlist
      removeFromWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        }));
        console.log("Removed from wishlist, ID:", id);
      },

      // Check if item is in wishlist
      isInWishlist: (id) => {
        const isIn = !!get().wishlist.find((item) => item.id === id);
        console.log("Checking if in wishlist, ID:", id, "Result:", isIn);
        return isIn;
      },

      // Clear the wishlist
      clearWishlist: () => {
        set({ wishlist: [] });
        console.log("Wishlist cleared");
      },
    }),
    {
      name: "wishlist-storage", // Key in localStorage
      onRehydrateStorage: (state) => {
        console.log("Wishlist store rehydrated from localStorage:", state);
        return (state, error) => {
          if (error) {
            console.error("Error rehydrating wishlist store:", error);
          } else {
            console.log("Wishlist store rehydration complete:", state);
          }
        };
      },
    }
  )
);

export default useWishlistStore;