CREATE DATABASE IF NOT EXISTS `_localhost_`;
CREATE USER '_localhost_' @'%' IDENTIFIED WITH mysql_native_password BY '_localhost_';
GRANT ALL PRIVILEGES ON *.* TO '_localhost_' @'%';

FLUSH PRIVILEGES;