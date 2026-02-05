---
title: "Hook: useLocalStorage"
desc: "Persistir estado en el navegador automáticamente."
type: "frontend"
lang: "javascript"
tags: ["React", "Hooks", "Storage", "UX"]
---

### Descripción
Este hook funciona igual que `useState`, pero sincroniza el valor con `localStorage` para que la información no se pierda al recargar la página (ideal para temas oscuros o preferencias de usuario).

### El Hechizo (Código):

```javascript
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // 1. Inicializar estado con el valor guardado o el inicial
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 2. Escuchar cambios y actualizar LocalStorage
  const setValue = (value) => {
    try {
      // Permitir que el valor sea una función (igual que useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
