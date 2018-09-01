create database marble;
use marble;

create table VENDOR (
    VENDOR_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FIRM_NAME varchar(50) UNIQUE NOT NULL,
    GST_NUMBER varchar(50) UNIQUE NOT NULL
)


