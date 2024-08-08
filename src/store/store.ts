import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const useStore = create(
    persist(
        (set, get) => ({
            CoffeeList: CoffeeData,
            BeansList: BeansData,
            CartPrice: 0,
            FavouritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: (cartItem: any) =>
                set(
                    produce(state => {
                        let found = false;
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == cartItem.id) {
                                found = true;
                                let size = false;
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == cartItem.prices[0]) {
                                        size = true;
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                                if (size == false) {
                                    state.CartList[i].prices.push(cartItem.prices[0]);
                                }
                                state.CartList[i].prices.sort((a: any, b: any) => {
                                    if (a.size > b.size) {
                                        return -1;
                                    }
                                    if (a.size < b.size) {
                                        return 1;
                                    }
                                    return 0;
                                })
                                break;
                            }
                        }
                        if (found == false) {
                            state.CartList.push(cartItem);
                        }
                    })
                ),
            calculateCartPrice: () =>
                set(
                    produce(state => {
                        let totalPrice = 0;
                        for (let i = 0; i < state.CartList.length; i++) {
                            let tempPrice = 0;
                            for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                tempPrice = tempPrice + parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity;
                            }
                            state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
                            totalPrice = totalPrice + tempPrice;
                        }
                        console.log('CartPrice before: ', state.CartPrice);
                        state.CartPrice = totalPrice.toFixed(2).toString();
                        console.log('CartPrice after: ', state.CartPrice);
                    })
                ),
            addToFavouritesList: (type: string, id: string) =>
                set(
                    produce(state => {
                        if (type == 'Coffee') {
                            for (let i = 0; i < state.CoffeeList.length; i++) {
                                if (state.CoffeeList[i].id == id) {
                                    if (state.CoffeeList[i].favourite == false) {
                                        state.CoffeeList[i].favourite = true;
                                        state.FavouritesList.unshift(state.CoffeeList[i]);
                                    } else {
                                        state.CoffeeList[i].favourite = false;
                                    }
                                    break;
                                }
                            }
                        } else if (type == 'Bean') {
                            for (let i = 0; i < state.BeanList.length; i++) {
                                if (state.BeanList[i].id == id) {
                                    if (state.BeanList[i].favourite == false) {
                                        state.BeanList[i].favourite = true;
                                        state.FavouritesList.unshift(state.BeanList[i]);
                                    } else {
                                        state.BeanList[i].favourite = false;
                                    }
                                    break;
                                }
                            }
                        }
                    }),
                ),
            deleteFromFavouritesList: (type: string, id: string) =>
                set(
                    produce(state => {
                        if (type == 'Coffee') {
                            for (let i = 0; i < state.CoffeeList.length; i++) {
                                if (state.CoffeeList[i].id == id) {
                                    if (state.CoffeeList[i].favourite == true) {
                                        state.CoffeeList[i].favourite = false;
                                    } else {
                                        state.CoffeeList[i].favourite = true;
                                    }
                                    break;
                                }
                            }
                        } else if (type == 'Beans') {
                            for (let i = 0; i < state.BeanList.length; i++) {
                                if (state.BeanList[i].id == id) {
                                    if (state.BeanList[i].favourite == true) {
                                        state.BeanList[i].favourite = false;
                                    } else {
                                        state.BeanList[i].favourite = true;
                                    }
                                    break;
                                }
                            }
                        }
                        let spliceIndex = -1;
                        for (let i = 0; i < state.FavouritesList.length; i++) {
                            if (state.FavouritesList[i].id == id) {
                                spliceIndex = i;
                                break;
                            }
                        }
                        state.FavouritesList.splice(spliceIndex, 1);
                    }),
                ),
            incrementCartItemQuantity: (id: string, size: string) =>
                set(
                    produce(state => {
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == id) {
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == size) {
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                            }
                        }
                    })
                ),
            decrementCartItemQuantity: (id: string, size: string) =>
                set(
                    produce(state => {
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == id) {
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == size) {
                                        if (state.CartList[i].prices.length > 1) {
                                            if (state.CartList[i].prices[j].quantity > 1) {
                                                state.CartList[i].prices[j].quantity--;
                                            } else {
                                                state.CartList[i].prices.splice(j, 1);
                                            }
                                        } else {
                                            if (state.CartList[i].prices[j].quantity > 1) {
                                                state.CartList[i].prices[j].quantity--;
                                            } else {
                                                state.CartList.splice(i, 1);
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    })
                ),
            addToOrderHistoryListFromCart: () =>
                set(
                    produce(state => {
                        // Get the current date and time
                        const currentDate = new Date();

                        // Add 5 hours to the current time
                        currentDate.setHours(currentDate.getHours() + 5);

                        // Format the adjusted date and time
                        const adjustedDate = currentDate.toDateString();
                        const adjustedTime = currentDate.toLocaleTimeString();

                        let temp = state.CartList.reduce(
                            (accumulator: number, currentValue: any) =>
                                accumulator + parseFloat(currentValue.ItemPrice),
                            0,
                        );

                        // Add to order history
                        if (state.OrderHistoryList.length > 0) {
                            state.OrderHistoryList.unshift({
                                orderDate: adjustedDate + " " + adjustedTime,
                                cartList: state.CartList,
                                cartListPrice: temp.toFixed(2).toString(),
                            });
                        } else {
                            state.OrderHistoryList.push({
                                orderDate: adjustedDate + " " + adjustedTime,
                                cartList: state.CartList,
                                cartListPrice: temp.toFixed(2).toString(),
                            });
                        }
                        state.CartList = [];
                    })
                )
        }),
        {
            name: 'coffee-app',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
