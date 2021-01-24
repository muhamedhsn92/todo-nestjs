import {TypeOrmModuleOptions} from '@nestjs/typeorm';
export const TypeOrmConfig :TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestjs',
    password: 'KqG4xZC#3L',
    database: 'nestjs',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true, 
}

/* 
based on this. tutorial https://docs.nestjs.com/techniques/database
Mysql database connection use this tut 
import {TypeOrmModuleOptions} from '@nestjs/typeorm';
export const TypeOrmConfig :TypeOrmModuleOptions ={
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestjs',
    password: 'KqG4xZC#3L',
    database: 'nestjs',
    entities: [],
    synchronize: true, 
}
and you will face this error 
use this solution on stackoverflow 
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
*/