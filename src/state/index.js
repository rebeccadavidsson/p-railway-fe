import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { createSlice, configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload.item];
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    clearCart: (state) => {
      state.cart = [];
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  clearCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default cartSlice.reducer;