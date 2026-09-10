"use client";

import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import type { Product } from "@/app/types";

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextValue {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (
        productId: number,
        quantity: number,
    ) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<
    CartContextValue | undefined
>(undefined);

function getDiscountedPrice(product: Product) {
    const discountPercentage =
        product.discountPercentage ?? 0;

    return product.price *
        (1 - discountPercentage / 100);
}

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [isCartOpen, setIsCartOpen] =
        useState(false);

    function addToCart(product: Product) {
        const stock = product.stock;

        if (!stock || stock <= 0) {
            return;
        }

        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id,
            );

            if (existingItem) {
                return currentItems.map((item) => {
                    if (item.product.id !== product.id) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: Math.min(
                            item.quantity + 1,
                            stock,
                        ),
                    };
                });
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity: 1,
                },
            ];
        });
    }

    function removeFromCart(productId: number) {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId,
            ),
        );
    }

    function updateQuantity(
        productId: number,
        quantity: number,
    ) {
        if (quantity <= 0) {
            removeFromCart(productId);

            return;
        }

        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.product.id !== productId) {
                    return item;
                }

                return {
                    ...item,
                    quantity: Math.min(
                        quantity,
                        item.product.stock ?? quantity,
                    ),
                };
            }),
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const itemCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const subtotal = cartItems.reduce(
        (total, item) =>
            total +
            getDiscountedPrice(item.product) *
            item.quantity,
        0,
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                itemCount,
                subtotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used within CartProvider",
        );
    }

    return context;
}