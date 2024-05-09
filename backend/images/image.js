'use strict';
const path = require('path');
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const device  = new escpos.USB;
const printer = new escpos.Printer(device);

const tux = path.join(__dirname, 'tanu.jpg');
escpos.Image.load(tux, function(image){

  device.open(function(){

    printer.align('ct')
           .image(image, 'd24')
           .then(() => { 
              printer.cut().close(); 
           });

    // OR non-async .raster(image, "mode") : printer.text("text").raster(image).cut().close();

  });

});