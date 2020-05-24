# Overview
[hookz.dev](https://hookz.dev) is a free and open source web tool to help developers quickly test webhooks or catch and inspect all http requests.

The frontend code is in the `client` and backend in `api` folder. 

# Screenshots
![hookz.dev Homepage][hookz_home]

[hookz_home]: /screenshots/hookz.dev.home.png


![hookz.dev Hookz Data][hookz_data]

[hookz_data]: /screenshots/hookz.dev.data.png

## Frontend (Client)

The application is built in [reactjs](https://reactjs.org/) and relies on APIs provided by the backend service to create and display hookz data.

## Backend (REST API)

The backend of hookz.dev is built in nodejs, leveraging the expressjs framework. The database system used is mysql.

## Node Packages Used
- [express](https://www.npmjs.com/package/express) : Fast, unopinionated, minimalist web framework for node.
- [cors](https://www.npmjs.com/package/cors) : CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [dotenv](https://www.npmjs.com/package/dotenv) : Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
- [ip](https://www.npmjs.com/package/ip) : IP address utility for node.js
- [mysql](https://www.npmjs.com/package/mysql) : A node.js driver for mysql.
- [uniqid](https://www.npmjs.com/package/uniqid) : Unique ID Generator

### Database Structure
The database structure for hookz.dev is very simple. There are two tables. The hookz table and the hookz_data table. You can rename the tables to your preference.

#### hookz table structure
|Column|Datatype|Description|
|------|--------|-----------|
|id |INT|primary key (auto increment)|
|name |NVARCHAR|UUID of the hook|
|created_at|Timestamp||
|updated_at|Timestamp||

### hookz data table structure
|Column|Datatype|Description|
|------|--------|-----------|
|id |INT|primary key (auto increment)|
|webhook |NVARCHAR|name of the webhook - primary key (hookz.name)|
|data|TEXT|payload of webhook request||
|created_at|Timestamp||
|updated_at|Timestamp||

#### Example of Entire Database mysqldump
```xml
<?xml version="1.0" encoding="UTF-8"?>
<mysqldump xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <database name="webhookz">
      <table_structure name="hookz">
         <field Field="id" Type="int(11)" Null="NO" Key="PRI" Extra="auto_increment" Comment="" />
         <field Field="name" Type="varchar(255)" Null="NO" Key="UNI" Extra="" Comment="" />
         <field Field="created_at" Type="datetime" Null="NO" Key="" Extra="" Comment="" />
         <key Table="hookz" Non_unique="0" Key_name="PRIMARY" Seq_in_index="1" Column_name="id" Collation="A" Cardinality="64" Null="" Index_type="BTREE" Comment="" Index_comment="" />
         <key Table="hookz" Non_unique="0" Key_name="name_UNIQUE" Seq_in_index="1" Column_name="name" Collation="A" Cardinality="64" Null="" Index_type="BTREE" Comment="" Index_comment="" />
         <options Name="hookz" Engine="InnoDB" Version="10" Row_format="Dynamic" Rows="67" Avg_row_length="244" Data_length="16384" Max_data_length="0" Index_length="16384" Data_free="0" Auto_increment="72" Create_time="2020-01-29 16:52:17" Update_time="2020-04-23 03:08:00" Collation="utf8mb4_general_ci" Create_options="" Comment="" />
      </table_structure>
      <table_structure name="hookz_data">
         <field Field="id" Type="int(10) unsigned" Null="NO" Key="PRI" Extra="auto_increment" Comment="" />
         <field Field="webhook" Type="varchar(255)" Null="NO" Key="" Extra="" Comment="" />
         <field Field="data" Type="longtext" Null="YES" Key="" Extra="" Comment="" />
         <field Field="created_at" Type="datetime" Null="YES" Key="" Extra="" Comment="" />
         <key Table="hookz_data" Non_unique="0" Key_name="PRIMARY" Seq_in_index="1" Column_name="id" Collation="A" Cardinality="4785" Null="" Index_type="BTREE" Comment="" Index_comment="" />
         <options Name="hookz_data" Engine="InnoDB" Version="10" Row_format="Dynamic" Rows="4785" Avg_row_length="1208" Data_length="5783552" Max_data_length="0" Index_length="0" Data_free="4194304" Auto_increment="5690" Create_time="2020-01-29 16:52:24" Collation="utf8mb4_general_ci" Create_options="" Comment="" />
      </table_structure>
   </database>
</mysqldump>
```

#### Database Migration Script
The init migration script to create the tables can be found in `/docker_compose/mysql/init.sql`.

```sql
DROP TABLE IF EXISTS `hookz_data`;
CREATE TABLE `hookz_data` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `webhook` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `webhook` (`webhook`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `hookz`;
CREATE TABLE `hookz` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  CONSTRAINT `hookz_ibfk_1` FOREIGN KEY (`name`) REFERENCES `hookz_data` (`webhook`) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

# License
(The MIT License)

Copyright (c) 2020 [mandeeya.io](https://mandeeya.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
