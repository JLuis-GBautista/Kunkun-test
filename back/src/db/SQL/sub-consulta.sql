SELECT
  u.id AS user_id,
  u.email,
  COUNT(o.id) AS order_count,
  SUM(o.total_amount) AS total_spent,
  AVG(o.total_amount) AS avg_order_value
FROM
  users u
JOIN
  (
    SELECT id, user_id, total_amount
    FROM orders
    WHERE created_at >= NOW() - INTERVAL '30 days'
  ) o ON o.user_id = u.id
GROUP BY
  u.id, u.email
HAVING
  COUNT(o.id) > 5
ORDER BY
  total_spent DESC
LIMIT 10;


WITH recent_orders AS (
  SELECT user_id, total_amount
  FROM orders
  WHERE created_at >= NOW() - INTERVAL '30 days'
)
SELECT
  u.id AS user_id,
  u.email,
  COUNT(ro.total_amount) AS order_count,
  SUM(ro.total_amount) AS total_spent,
  AVG(ro.total_amount) AS avg_order_value
FROM
  users u
JOIN
  recent_orders ro ON ro.user_id = u.id
GROUP BY
  u.id, u.email
HAVING
  COUNT(ro.total_amount) > 5
ORDER BY
  total_spent DESC
LIMIT 10;
