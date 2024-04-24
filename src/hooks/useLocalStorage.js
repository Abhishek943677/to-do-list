import { useState } from "react";

// Custom hook to interact with localStorage for storing an array of objects
export function useLocalStorageArray(key, initialValue) {
  // Retrieve the initial value from localStorage if it exists, otherwise use the initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Function to update localStorage value
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage as JSON string
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  // Function to push a new object into the array in localStorage
  const pushValue = (newValue) => {
    let item = localStorage.getItem(key);
    if (item === null) {
      item = [];
      item.unshift(newValue);
      setValue(item);
    } else {
      let parsedItem = JSON.parse(item);
      parsedItem.unshift(newValue);
      setValue(parsedItem);
    }
  };

  // Function to remove an object from the array in localStorage
  const removeValue = (index) => {
    let item = localStorage.getItem(key);
    let parsedItem = JSON.parse(item);
    parsedItem.splice(index, 1);
    setValue(parsedItem);
  };

  const clearData = (key) => {
    localStorage.clear(key);
    setValue([]);
  };

  return [storedValue, setValue, pushValue, removeValue, clearData];
}
