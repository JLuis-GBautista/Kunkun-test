# Kafka

## Crear un topic

```bash
docker exec -it kafka-cli kafka-topics --create \
  --topic mi-topic \
  --bootstrap-server kafka:9092 \
  --partitions 1 \
  --replication-factor 1
```

## Listar topics

```bash
docker exec -it kafka-cli kafka-topics --list --bootstrap-server kafka:9092
```

## Ver detalles de un topic

```bash
docker exec -it kafka-cli kafka-topics --describe \
  --topic mi-topic \
  --bootstrap-server kafka:9092
```

## Enviar mensajes (Producer)

```bash
docker exec -it kafka-cli kafka-console-producer \
  --topic mi-topic \
  --bootstrap-server kafka:9092
```

## Leer mensajes (Consumer)

```bash
docker exec -it kafka-cli kafka-console-consumer \
  --topic mi-topic \
  --bootstrap-server kafka:9092 \
  --from-beginning
```

## Eliminar un topic

```bash
docker exec -it kafka-cli kafka-topics --delete \
  --topic mi-topic \
  --bootstrap-server kafka:9092
```
