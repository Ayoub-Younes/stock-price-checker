const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const ip = require("ip");
const userIp =  ip.address();

chai.use(chaiHttp);
suite('Functional Tests', function() {
 this.timeout(20000);
 //1
 test('Viewing one stock: GET request to /api/stock-prices/',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .get('/api/stock-prices?stock=GOOG')
    .end((err,res)=>{
     assert.equal(res.status, 200);
     assert.equal(res.type, 'application/json');
     assert.nestedProperty(res.body, 'stockData.stock');
     assert.nestedProperty(res.body, 'stockData.price');
     assert.nestedProperty(res.body, 'stockData.likes');
     assert.nestedPropertyVal(res.body, 'stockData.stock', 'GOOG')
     done()
    })
 })

 //2
 test('Viewing one stock and liking it: GET request to /api/stock-prices/',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .get('/api/stock-prices?stock=GOOG&like=true')
    .end((err,res)=>{
     assert.equal(res.status, 200);
     assert.equal(res.type, 'application/json');
     assert.notNestedPropertyVal(res.body, 'stockData.likes', 0)
     done()
    })
 })
 
 //3
 test('Viewing the same stock and liking it again: GET request to /api/stock-prices/',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .get('/api/stock-prices?stock=GOOG&like=true')
    .end((err,res)=>{
     assert.equal(res.status, 200);
     assert.equal(res.type, 'application/json');
     assert.notNestedPropertyVal(res.body, 'stockData.likes', 0)
     done()
    })
 })
 //4
 test('Viewing two stocks: GET request to /api/stock-prices/',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .get('/api/stock-prices?stock=GOOG&stock=MSFT')
    .end((err,res)=>{
     assert.equal(res.status, 200);
     assert.equal(res.type, 'application/json');
     assert.property(res.body.stockData[0], 'stock');
     assert.property(res.body.stockData[0], 'price');
     assert.equal(res.body.stockData[0].stock, 'GOOG');
     assert.equal(res.body.stockData[1].stock, 'MSFT');
     done()
    })
 })
 //5
 test('Viewing two stocks and liking them: GET request to /api/stock-prices/',(done)=>{
    chai
    .request(server)
    .keepOpen()
    .get('/api/stock-prices?stock=GOOG&stock=MSFT&like=true')
    .end((err,res)=>{
     assert.equal(res.status, 200);
     assert.equal(res.type, 'application/json');
     assert.notEqual(res.body.stockData[0].likes, 0);
     assert.notEqual(res.body.stockData[1].likes, 0);
     done()
    })
 })
 
});
