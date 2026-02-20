"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./data";

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar?: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    paymentMethod: "bank_transfer" | "qris";
    status: "pending" | "waiting_payment" | "processing" | "shipped" | "delivered";
    createdAt: string;
    bankName?: string;
    accountNumber?: string;
    qrisImage?: string;
    paymentProof?: string;
    trackingNumber?: string;
}

interface StoreState {
    // Cart
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;

    // Auth
    user: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateProfile: (user: Partial<User>) => void;

    // Orders
    orders: Order[];
    currentOrder: Order | null;
    createOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
    uploadPaymentProof: (orderId: string, proof: string) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            // Cart
            cartItems: [],
            addToCart: (product, quantity = 1) => {
                set((state) => {
                    const existing = state.cartItems.find(
                        (item) => item.product.id === product.id
                    );
                    if (existing) {
                        return {
                            cartItems: state.cartItems.map((item) =>
                                item.product.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }
                    return { cartItems: [...state.cartItems, { product, quantity }] };
                });
            },
            removeFromCart: (productId) => {
                set((state) => ({
                    cartItems: state.cartItems.filter(
                        (item) => item.product.id !== productId
                    ),
                }));
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set((state) => ({
                    cartItems: state.cartItems.map((item) =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                }));
            },
            clearCart: () => set({ cartItems: [] }),
            getCartTotal: () => {
                const { cartItems } = get();
                return cartItems.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },
            getCartCount: () => {
                const { cartItems } = get();
                return cartItems.reduce((total, item) => total + item.quantity, 0);
            },

            // Auth
            user: null,
            isLoggedIn: false,
            login: (user) => set({ user, isLoggedIn: true }),
            logout: () => set({ user: null, isLoggedIn: false }),
            updateProfile: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),

            // Orders
            orders: [],
            currentOrder: null,
            createOrder: (orderData) => {
                const newOrder: Order = {
                    ...orderData,
                    id: `ORD-${Date.now()}`,
                    createdAt: new Date().toISOString(),
                };
                set((state) => ({
                    orders: [...state.orders, newOrder],
                    currentOrder: newOrder,
                }));
                return newOrder;
            },
            uploadPaymentProof: (orderId, proof) => {
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.id === orderId
                            ? { ...order, paymentProof: proof, status: "processing" }
                            : order
                    ),
                    currentOrder:
                        state.currentOrder?.id === orderId
                            ? { ...state.currentOrder, paymentProof: proof, status: "processing" }
                            : state.currentOrder,
                }));
            },
        }),
        {
            name: "ananta-sehat-store",
        }
    )
);
