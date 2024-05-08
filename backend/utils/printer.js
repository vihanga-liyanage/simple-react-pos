const escpos = require('escpos');
const usb = require('escpos-usb');

// Set up the printer
// escpos.USB = usb;
// const device = new escpos.USB(); // Ensure this is the correct USB device for your printer
// const printer = new escpos.Printer(device);

function printReceipt(content) {

  console.log(content);
  // device.open(() => {
  //   printer.text(content);
  //   printer.cut();
  //   printer.close(); 
  // });
}

module.exports = {
  printReceipt,
};
