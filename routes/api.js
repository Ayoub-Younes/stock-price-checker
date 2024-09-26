const hash = require('../controllers/hash.js');
const ip = require("ip");
const userIp = ip.address();
const Stock = require('../models/stock');

module.exports = function (app) {
  app.route('/api/stock-prices')
    .get(async function (req, res) {
      let { stock, like } = req.query;

      if (!Array.isArray(stock)) {
        stock = new Array(stock);
      }

      // Fetch stock data from the external API
      Promise.all(
        stock.map(st =>
          fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${st}/quote`).then(resp => resp.json())
        )
      ).then(async data => {

        async function getData() {
          let result = await Stock.find({ stock: stock });
          if (result.length === 1) {
            res.json({
              stockData: {
                stock: result[0].stock,
                price: result[0].price,
                likes: result[0].likes || 0 
              }
            });
          }
          if (result.length === 2) {
            let rel_likes = result[0].likes - result[1].likes;
            res.json({
              stockData: [
                { stock: result[0].stock, price: result[0].price, rel_likes: rel_likes },
                { stock: result[1].stock, price: result[1].price, rel_likes: -rel_likes }
              ]
            });
            return;
          }
        }

        async function dataProcess() {
         
          for (let d of data) {
            let fetch = await Stock.find({ stock: d.symbol });

            if (fetch.length === 0) {
              
              // Stock not found, create a new entry
              let obj = { stock: d.symbol, price: d.latestPrice };
              if (like === 'true') { 
                obj.likes = 1;
                obj.ips = [userIp]; 
              } else {
                obj.likes = 0;
              }
              await Stock.create(obj);
            } else {

              let stockRecord = fetch[0];
              if (like === 'true' && !stockRecord.ips.includes(userIp)) {
                stockRecord.likes += 1;
                stockRecord.ips.push(userIp);
                await Stock.findOneAndUpdate({ stock: d.symbol }, stockRecord, { new: true });
              }
            }
          }
        }

        await dataProcess();
        setTimeout(getData, 1000);
      });
    });
};
