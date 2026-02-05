---
title: "Java Stream Filter"
desc: "Filtrado eficiente de listas usando programación funcional."
type: "backend"
lang: "java"
tags: ["Java", "Streams", "Functional"]
---

### ¿Por qué usar Streams?
Los streams en Java nos permiten procesar colecciones de datos de manera declarativa. Es mucho más limpio que usar bucles `for` tradicionales.

### El Hechizo (Código):

```java
List<User> activeUsers = users.stream()
  .filter(User::isActive)
  .filter(u -> u.getAge() > 18)
  .collect(Collectors.toList());