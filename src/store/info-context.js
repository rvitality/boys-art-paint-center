import { createContext, useContext, useReducer, useState } from "react";

const InfoContext = createContext({
    brands: [],
    categories: [],
    products: [],
    orders: [],
    customers: [],
});

// const initialState = { brands: [], categories: [], products: [], orders: [], customers: [] };

// const reducer = (state, action) => {
//     const {type, payload} = action;

//     if

//     return state;
// };

export const InfoContextProvider = props => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    const contextValue = {
        brands: { data: brands, setBrands },
        categories: { data: categories, setCategories },
        products: { data: products, setProducts },
        orders: { data: orders, setOrders },
        customers: { data: customers, setCustomers },
    };

    return <InfoContext.Provider value={contextValue}>{props.children}</InfoContext.Provider>;
};

export const useInfoContext = () => useContext(InfoContext);
