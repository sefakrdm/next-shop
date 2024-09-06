import { OrderItemTypes, PaymentTypes, ShippingTypes } from "@/utils/definitions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Cart = {
  items: OrderItemTypes[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  selectedShipping: ShippingTypes | null;
  selectedPayment: PaymentTypes | null;
  isCartPopupOpen: boolean;
  toggleCartPopup: (isOpen: boolean) => void;
  addCart: (item: OrderItemTypes) => void;
  increase: (item: OrderItemTypes) => void;
  decrease: (item: OrderItemTypes) => void;
  removeCart: (item: OrderItemTypes) => void;
  selectShipping: (shipping: ShippingTypes) => void;
  selectPayment: (payment: PaymentTypes) => void;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  selectedShipping: null,
  selectedPayment: null,
  isCartPopupOpen: false,
  toggleCartPopup: () => {},
  addCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeCart: () => {},
  selectShipping: () => {},
  selectPayment: () => {},
};

export const cartStore = create<Cart>()(
  persist((set, get) => ({
    ...initialState,
    addCart: (item: OrderItemTypes) => {
      const { items } = get();
      const exist = items.find((x) => x.slug === item.slug);
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + item.qty } : x
          )
        : [...items, { ...item, qty: item.qty }];
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems, get().selectedShipping, get().selectedPayment);
      set({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      set({ isCartPopupOpen: true });
    },
    increase: (item: OrderItemTypes) => {
      const { items } = get();
      const exist = items.find((x) => x.slug === item.slug);
      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...x, qty: x.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }];
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems, get().selectedShipping, get().selectedPayment);
      set({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItemTypes) => {
      const { items } = get();
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;
      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x: OrderItemTypes) => x.slug !== item.slug)
          : items.map((x) =>
              x.slug === item.slug ? { ...x, qty: x.qty - 1 } : x
            );
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems, get().selectedShipping, get().selectedPayment);
      set({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    removeCart: (item: OrderItemTypes) => {
      const { items } = get();
      const updatedCartItems = items.filter((x) => x.slug !== item.slug);

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(updatedCartItems, get().selectedShipping, get().selectedPayment);

      set({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    selectShipping: (shipping: ShippingTypes) => {
      const { items } = get();
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(items, shipping, get().selectedPayment);
      set({
        selectedShipping: shipping,
        shippingPrice,
        totalPrice,
      });
    },
    selectPayment: (payment: PaymentTypes) => {
      const { items } = get();
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        calcPrice(items, get().selectedShipping, payment);
      set({
        selectedPayment: payment,
        totalPrice,
      });
    },
    toggleCartPopup: (isOpen: boolean) => set({ isCartPopupOpen: isOpen }),
  }), {
    name: "cartStore",
  })
);

export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice, selectedShipping, selectedPayment, isCartPopupOpen } = cartStore();
  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    selectedShipping,
    selectedPayment,
    isCartPopupOpen,
    addCart: cartStore.getState().addCart,
    increase: cartStore.getState().increase,
    decrease: cartStore.getState().decrease,
    removeCart: cartStore.getState().removeCart,
    selectShipping: cartStore.getState().selectShipping,
    selectPayment: cartStore.getState().selectPayment,
    toggleCartPopup: cartStore.getState().toggleCartPopup,
  };
}

const calcPrice = (items: OrderItemTypes[], selectedShipping: ShippingTypes | null, selectedPayment: PaymentTypes | null) => {
  const itemsTotalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = selectedShipping ? selectedShipping.price : 0;
  const taxPrice = 0; // %20 KDV
  const transactionCost = selectedPayment ? selectedPayment.transactionCost || 0 : 0;
  const totalPrice = itemsTotalPrice + shippingPrice + taxPrice + transactionCost;

  return {
    itemsPrice: itemsTotalPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  };
};
