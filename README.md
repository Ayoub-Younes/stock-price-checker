# Stock Price Checker Microservice

This project is a Stock Price Checker Microservice that allows users to retrieve the current stock price of any listed Nasdaq stock by submitting stock symbols through a simple interface or via API requests. Users can also like stocks, with likes tracked per IP address to ensure one like per user per stock.

## Project Overview

The Stock Price Checker Microservice provides a simple and efficient way for users to:

Retrieve Stock Price: Get the current price for a specific stock using the stock symbol.
Like a Stock: Users can like a stock, but only one like per IP is allowed. If a stock is already liked by the same IP, no additional like is counted.
Compare Stocks: Users can compare the prices and relative likes of two stocks.
This project serves as a demonstration of full-stack development, including front-end form handling, back-end API interaction, and security best practices using Helmet.

## Technologies Used

HTML5: Structures the front-end interface for users to interact with the stock checker.
CSS3: Provides styling and layout for a clean, responsive design.
JavaScript (Node.js with Express): Handles the server-side logic, including stock price retrieval and user interactions with the API.
Helmet: Adds security layers to the application, helping secure HTTP headers and enforce best security practices.
jQuery: Simplifies the interaction between the front-end forms and the API endpoints, handling AJAX requests.