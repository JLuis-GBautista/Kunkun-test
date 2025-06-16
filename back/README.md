Sección 1: Conceptos básicos de programación (30 minutos)
Ejercicio 1.1: Sistema de tipos TypeScript
Diseña un sistema de tipos TypeScript para gestionar pedidos en una plataforma de comercio electrónico.  Debe incluir:
Estados del pedido (pendiente, en proceso, enviado, entregado, cancelado)
Inventario de productos con control de stock
Roles de usuario (cliente, administrador, gestor de almacén)
Payloads de eventos con tipado seguro para las transiciones de estado de los pedidos.


Pregunta 1.2: Operaciones asíncronas y gestión de errores
Implemente una función que procese varios pedidos simultáneamente con los siguientes requisitos:
Procesar pedidos en lotes de 5
Implementar lógica de reintento (máximo 3 intentos) para pedidos fallidos
Usar la tipificación correcta de TypeScript
Gestionar adecuadamente diferentes escenarios de error

Parte 2: Resolución de problemas y lógica (45 minutos)
Pregunta 2.1: Algoritmo de limitación de tasa
Diseña e implementa un sistema para limitar la tasa de peticiones a los endpoints de tu API.  Debe cumplir con lo siguiente:
* Soporta múltiples estrategias de limitación (ventana fija, ventana deslizante).
* Permite diferentes límites según el nivel del usuario (gratuito: 100 peticiones/hora, premium: 1000 peticiones/hora).
* Debe ser eficiente incluso con un tráfico muy alto.
* Integra Redis para sistemas distribuidos.

La consulta la mejore con subconsultas ya que estas solo consideran nodos importantes y hacen calculos complejos solo una vez guardándola para otras partes de la consulta. mejora la indexacion

Parte 3: Diseño del sistema - Microservicios basados ​​en eventos (60 minutos)
Escenario
Diseñe un sistema de procesamiento de pedidos basado en eventos para una plataforma de comercio electrónico con los siguientes microservicios:
Servicio de pedidos
Servicio de inventario
Servicio de pagos
Servicio de envíos
Servicio de notificaciones
Requisitos:
Diseño de la arquitectura

Dibuje el diagrama de la arquitectura del sistema
Defina los límites y las responsabilidades del servicio
Especifique los patrones de comunicación entre los servicios
Diseño del esquema de eventos

Defina los eventos para el ciclo de vida del pedido
Incluya una estrategia de control de versiones de eventos
Gestione la consistencia final
Detalles de implementación: Proporcione ejemplos de código para:

Implementación del publicador de eventos
Consumidor de eventos con gestión de errores
Patrón Saga para transacciones distribuidas
Gestión de colas de mensajes fallidos.

Respuestas

Para validacion de los microservicios en la red se usa mTLS.
Se puede validar