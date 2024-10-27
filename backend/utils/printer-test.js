const escpos = require('escpos');
const usb = require('escpos-usb');
const path = require('path');

// Set up the printer
escpos.USB = usb;
let device = null;
let printer = null;

const maxLineWidth = 48;

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
    
        printer
          .size(0, 0)
          .text("Misafir")
          .size(0, 1)
          .text("Misafir")
          .size(1, 1)
          .text("Misafir")
          .size(1, 0)
          .text("Misafir")
          .size(2, 0)
          .text("Misafir")
          .size(2, 1)
          .text("Misafir")
          .size(2, 2)
          .text("Misafir")
          .newLine()
          .cut()
          .close();
      });
    });
  } catch (error) {
    console.log(error);
  }
} else {
  console.log("Printer not found!");
}
