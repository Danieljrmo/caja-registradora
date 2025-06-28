CREATE DATABASE IF NOT EXISTS caja_registradora;
USE caja_registradora;

CREATE TABLE IF NOT EXISTS ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto VARCHAR(100),
  precio DECIMAL(10, 2),
  fecha DATE
);
