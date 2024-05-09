const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const device  = new escpos.USB;
const printer = new escpos.Printer(device);

// device.open(function() {
//   printer
//   .font('a')
//   .align('ct')
//   .text('EAN13 barcode example')
//   .size(1, 1)
//   .text('EAN13 barcode example')
//   .barcode('123456789012', 'EAN13') // code length 12
//   .barcode('109876543210') // default type 'EAN13'
//   .barcode('7654321', 'EAN8') // The EAN parity bit is automatically added.
//   .cut()
//   .close();
// });

device.open(function(err){

  printer
  .font('a')
  .align('ct')
  .style('bu')
  .size(1, 1)
  .text('The quick brown fox jumps over the lazy dog')
  .text('敏捷的棕色狐狸跳过懒狗')
  .barcode('1234567', 'EAN8')
  .qrimage('https://github.com/song940/node-escpos', function(err){
    this.cut();
    this.close();
  });

});
