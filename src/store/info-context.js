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

const productReducer = (state, action) => {
    const { type, payload } = action;

    if (type === "SET_PRODUCT") {
        console.log("set_product");
        return { ...state, products: payload.products };
    }

    if (type === "SET_CURRENT_EDIT") {
        return { ...state, currentProductEdit: payload.currentProductEdit };
    }

    if (type === "SHOW_FORM") {
        return { ...state, showForm: !state.showForm };
    }

    return state;
};

export const InfoContextProvider = props => {
    const [productsState, dispatch] = useReducer(productReducer, {
        products: [],
        showForm: false,
        currentEdit: {},
    });

    const setProducts = products => {
        console.log(products);
        dispatch({ type: "SET_PRODUCT", payload: { products } });
    };

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);

    const contextValue = {
        products: productsState.products,
        setProducts,
        brands: { data: brands, setBrands },
        categories: { data: categories, setCategories },
        orders: { data: orders, setOrders },
        customers: { data: customers, setCustomers },
    };

    return <InfoContext.Provider value={contextValue}>{props.children}</InfoContext.Provider>;
};

export const useInfoContext = () => useContext(InfoContext);
