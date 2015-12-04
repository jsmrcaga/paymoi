-- ********************
-- CREATION OF DB
-- ********************
CREATE DATABASE paymoi;

USE paymoi;
-- ******************
-- CREATION OF TABLES
-- ******************
CREATE TABLE users (
	login varchar(8) COLLATE utf8_unicode_ci UNIQUE NOT NULL,
	gcm_registration varchar(150) COLLATE utf8_unicode_ci
);

CREATE TABLE payments (
	id int(11) UNIQUE AUTO_INCREMENT,
	payer varchar(8) COLLATE utf8_unicode_ci NOT NULL,
	price int(11) NOT NULL,
	FOREIGN KEY (payer) REFERENCES users(login)
);

CREATE TABLE debts (
	id int(11) UNIQUE AUTO_INCREMENT,
	id_payment int(11) NOT NULL,
	participant varchar(8) COLLATE utf8_unicode_ci,
	-- list int(11),
	payed BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (id_payment) REFERENCES payments(id),
	FOREIGN KEY (participant) REFERENCES users(login),
	FOREIGN KEY (list) REFERENCES lists(id)
);

CREATE TABLE lists (
	id int(11) UNIQUE AUTO_INCREMENT,
	name varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	created_by varchar(8) COLLATE utf8_unicode_ci,
	FOREIGN KEY (created_by) REFERENCES users(login)
);

CREATE TABLE list_members (
	login varchar(8) COLLATE utf8_unicode_ci NOT NULL,
	list int(11) NOT NULL,
	FOREIGN KEY (login) REFERENCES users(login),
	FOREIGN KEY (list) REFERENCES lists(id)
);

-- ********************
-- CREATION OF TRIGGERS
-- ********************

	-- For cascading deletion

CREATE TRIGGER `CascadeDeletionAfterPaymentDeletion` AFTER DELETE ON `payments` FOR EACH ROW DELETE FROM `debts` WHERE `id_payment` = old.id;