#DROP database apuSql;
CREATE database apuSql;
USE apuSql;

CREATE TABLE products (
    id_item INT AUTO_INCREMENT,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    specs VARCHAR(300) NOT NULL,
    stock INT NOT NULL,
    PRIMARY KEY (id_item)
);

INSERT INTO products
VALUES (null, "Apple", "Iphone 14",979,"pantalla 6.1,memoria 128GB,IOS",20),

		(null, "Realme", "C33",159,"pantalla 6.5,memoria 128GB,ANDROID",20),

		(null, "Xiaomi", "12X",399,"pantalla 6.28,memoria 256GB,ANDROID",20);


CREATE TABLE users (
    id_user INT AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    surname_1 VARCHAR(100) NOT NULL,
    surname_2 VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    email VARCHAR(100)NOT NULL,
    user_pass VARCHAR(10) NOT NULL,
    PRIMARY KEY (id_user)
);

INSERT INTO users
VALUES (null, "Antonio", "Ruiz","Del Monte","Calle Manzana 12","antonio@gmail.com","1234"),

		(null, "Gonzalo", "Pérez","Del Camino","Calle Pera","gonzalo@gmail.com","1234"),

		(null, "Jorge", "González","Cansado","Calle Limón","jorge@gmail.com","1234");

CREATE TABLE app_admins (
    id_admin INT AUTO_INCREMENT,
    admin_name VARCHAR(100) NOT NULL,
    surname_1 VARCHAR(100) NOT NULL,
    surname_2 VARCHAR(100) NOT NULL,
    email VARCHAR(100)NOT NULL,
    admin_pass VARCHAR(10) NOT NULL,
    PRIMARY KEY (id_admin)
);

INSERT INTO app_admins
VALUES (null, "Apu", "Abdel","Martínez","apu@gmail.com","9999");


    CREATE TABLE bills (
    id_bill INT AUTO_INCREMENT,
    total INT NOT NULL,
    nif VARCHAR(9) NOT NULL,
    bill_date DATE NOT NULL,
	fk_id_user INT,
    PRIMARY KEY (id_bill),
    FOREIGN KEY (fk_id_user) REFERENCES users(id_user)
);

INSERT INTO bills
VALUES (null, 5000, "11111111G","2022-11-17",1),

		(null, 2000, "22222222H","2022-11-18",2),

		(null, 1000, "33333333K","2022-11-19",3);

CREATE TABLE sales (
    id_sale INT AUTO_INCREMENT,
    q_sale INT NOT NULL,
    total INT NOT NULL,
    sale_date DATE NOT NULL,
	fk_id_bill INT,
    PRIMARY KEY (id_sale),
    FOREIGN KEY (fk_id_bill) REFERENCES bills(id_bill)
);

INSERT INTO sales
VALUES (null, 1, 5000,"2022-11-17",1),

		(null, 2, 3000,"2022-11-18",2),

		(null, 3, 4000,"2022-11-19",3);

CREATE TABLE services (
    id_service INT AUTO_INCREMENT,
    service_type VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    lab VARCHAR(100) NOT NULL,
	duration VARCHAR(10),
    fk_id_bill INT,
    PRIMARY KEY (id_service),
    FOREIGN KEY (fk_id_bill) REFERENCES bills(id_bill)
);

INSERT INTO services
VALUES (null, "screen", 100,"lab1","1 hora",1),

		(null, "batery", 200,"lab2","2 horas",2),

		(null, "connector", 150,"lab3","3 horas",3);

CREATE TABLE repair_sales (
    id_repair_sale INT AUTO_INCREMENT,
    repair_date DATE NOT NULL,
    total INT NOT NULL,
	fk_id_bill INT,
    fk_id_service INT,
    PRIMARY KEY (id_repair_sale),
    FOREIGN KEY (fk_id_bill) REFERENCES bills(id_bill),
    FOREIGN KEY (fk_id_service) REFERENCES services(id_service)
);

INSERT INTO repair_sales
VALUES (null, "2022-11-17", 100,1,1),

		(null, "2022-11-18", 200,2,2),

		(null, "2022-11-19", 300,3,3);


select * from users;
select * from products;
select * from app_admins;
select * from bills;
select * from sales;
select * from services;
select * from repair_sales;