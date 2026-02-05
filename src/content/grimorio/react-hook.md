---
title: "Custom Hook: useFetch"
desc: "Hook reutilizable para peticiones HTTP."
type: "frontend"
lang: "javascript"
tags: ["React", "Hooks", "Async"]
---

Este hook encapsula la lógica de `fetch` para reutilizarla en cualquier componente.

```javascript
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);

  return { data };
};