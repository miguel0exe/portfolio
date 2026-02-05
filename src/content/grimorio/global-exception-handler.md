---
title: "Global Exception Handler"
desc: "Patrón para capturar errores en toda la API y devolver respuestas JSON limpias."
type: "backend"
lang: "java"
tags: ["Spring Boot", "Error Handling", "Best Practices"]
---

### El Problema
Por defecto, cuando Spring Boot falla, devuelve trazas de error gigantes que exponen la estructura interna de tu código. Eso es inseguro y feo para el frontend.

### La Solución
Usamos `@ControllerAdvice` para interceptar las excepciones y formatearlas en un DTO estándar.

### El Hechizo (Código):

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            "Recurso no encontrado",
            ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        // Loguear el error real en consola, pero no mostrarlo al usuario
        ex.printStackTrace();
        
        ErrorResponse error = new ErrorResponse(
            LocalDateTime.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Error Crítico del Servidor",
            "Contacte al administrador del sistema."
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}