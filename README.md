# simple-react-pos

## Running the app
- Make sure MySQL server is running
- Setup the DB if not already done using `db.sql` file
- Update the DB configs in [/backend/server.js](https://github.com/vihanga-liyanage/simple-react-pos/blob/459f8b568a3c997b7e8638f8e6e92ff5eeadcd6d/backend/server.js#L10)
- Navigate to /backend and run `npm install ` to install dependencies. Then run `node server.js`
- Navigate to /frontend and run `npm install ` to install dependencies. Then run `npm start`
- UI will run on [http://localhost:3000](http://localhost:3000)

## Navigating the UI
- Go to the [Products](http://localhost:3000/products) to add all the products. You can use the same tab to update products or delete products as well.
  - Please note that if you update or delete a product, all previous orders will be updated or deleted as well.
- [Home](http://localhost:3000/) is where you can create new orders. All products will be listed in this page.
  - Unavailable products will be greyd out and cannot add to new orders.
  - To add multiples of the same product to the order, click on the product tile multiple times. The quantity will update accordingly.
  - Once all products are added to the order, select the payment method and enter the name of the customer to finish the order.
  - Customer bill and the internal bill will be printed once the order is placed.
- Use the [Order](http://localhost:3000/orders) page to view and update all orders.
  - Order lifecycle:
    - Pending -> Ready -> Delivered
- Use the [Status](http://localhost:3000/status) page in a separate monitor to display order status to customers. This page automatically refreshes to update order status.
- Use the [Menu](http://localhost:3000/menu) page as a digital menu for customers.
