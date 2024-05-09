const escpos = require('escpos');
const usb = require('escpos-usb');
const path = require('path');

// Set up the printer
escpos.USB = usb;
let device = null;
let printer = null;

const maxLineWidth = 48;

async function printReceipt(content) {

  console.log(content);

  if (printer == null) {
    try {
      device = new escpos.USB();
      printer = new escpos.Printer(device);
    } catch (error) {
      console.log(error);
    }
  }

  if (printer != null) {
    try {
      const imagePath = path.join(__dirname, '../images/temple.jpeg');
  
      escpos.Image.load(imagePath, function(image){
  
        device.open(function(){
      
          printer.align("CT");
          printer.raster(image);
          printer.newLine();
          printer.newLine();
          printer.text(content.title);

          printer.align("RT");
          printer.text('Order number: ' + content.orderNumber);
          printDoubleLine();
          printer.newLine();

          printer.text(content.timestamp);
          printDoubleLine();
          printer.newLine();

          printer.align("LT");
          content.productInfo.forEach((product) => {
            const formattedLine = formatProductLine(product);
            printer.text(formattedLine);
          });
          
          printer.drawLine();
          printer.align("RT");
          printer.text('TOTAL :       ' + content.total_price.toFixed(2) + '  ');
          printer.drawLine();

          printer.align("LT");
          const payment = content.payment_method === 'card' ? 'Credit Card' : 'Cash';
          printer.text('Payment method: ' + payment);

          printDoubleLine();

          printer.newLine();
          printer.align("CT");
          printer.style("B");
          printer.text('ORDER TOTAL: ' + content.total_price.toFixed(2));
          printer.newLine();

          printer.style("NORMAL");
          printer.text('Thank you!');
          printer.newLine();
          printer.newLine();
          printer.newLine();
          printer.cut();

          // Printing internal receipt
          printer.text('Order number: ' + content.orderNumber);
          printer.drawLine();
          printer.align("LT");
          content.productInfo.forEach((product) => {
            printer.text(product.qty + ' * ' + product.name);
          });
          printer.newLine();
          printer.newLine();
          printer.cut();

          printer.close();
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Printer not found!");
  }
}

// Function to create a formatted product line
const formatProductLine = (product) => {
  const { name, price, qty } = product;

  const qtyName = `  ${qty} * ${name}`;
  const total = (price * qty).toFixed(2);
  const paddingSpace = maxLineWidth - qtyName.length - total.length - 2;
  const paddedPrice = ' '.repeat(paddingSpace) + total;

  return `${qtyName}${paddedPrice}`;
};

// Print a double line '===='
const printDoubleLine = () => {

  printer.text('='.repeat(maxLineWidth));
}

module.exports = {
  printReceipt,
};
