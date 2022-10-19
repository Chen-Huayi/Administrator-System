'use strict'

const{describe, expect, test, beforeAll}=require('@jest/globals')
// require('dotenv').config()
// const assert = require("assert");
const request = require('supertest');
const mysql = require('mysql')
const accountRouter=require('../router/account')
// const db=mysql.createConnection({
//     host: "my-azure-server.mysql.database.azure.com",
//     port: 3306,
//     user: "chenhuayi",
//     password: "0131)!#!Wyy",
//     database: "react-db"
// })

function sum(a, b) {
    return a + b;
}

beforeAll(()=>{

})



describe('Test 1', ()=>{
    test('1', ()=>{
        expect(sum(1, 2)).toBe(3);
    })

})
