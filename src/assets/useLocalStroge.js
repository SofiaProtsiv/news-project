

import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        // assuming no duplicates for demo purposes
        setItems([...items, item]);
    };

    const removeItem = (itemToBeDeleted) => {
        setItems(items.filter((item) => itemToBeDeleted !== item));
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'));
        if (items) {
            setItems(items);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

}