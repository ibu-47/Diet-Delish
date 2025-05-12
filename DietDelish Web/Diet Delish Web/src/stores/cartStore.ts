import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MealPlan } from '../lib/supabase';

interface CartItem {
  mealPlan: MealPlan;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (mealPlan: MealPlan) => void;
  removeItem: (mealPlanId: string) => void;
  updateQuantity: (mealPlanId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (mealPlan) => set((state) => {
        const existingItem = state.items.find(item => item.mealPlan.id === mealPlan.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.mealPlan.id === mealPlan.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { mealPlan, quantity: 1 }]
        };
      }),
      
      removeItem: (mealPlanId) => set((state) => ({
        items: state.items.filter(item => item.mealPlan.id !== mealPlanId)
      })),
      
      updateQuantity: (mealPlanId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.mealPlan.id === mealPlanId 
            ? { ...item, quantity }
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.mealPlan.price * item.quantity, 
          0
        );
      }
    }),
    {
      name: 'diet-delish-cart',
    }
  )
);