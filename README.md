RPi-WaterbearNodeJS
===================

A nodejs server which serves Waterbear from the RaspberryPi and provides a way for nodejs scripts to be uploaded and run.


Installing
==========

Once you have got the code cd into the directory then run :-

git submodule init

git submodule update


sudo aptiptude install nodejs npm

sudo npm install fs ws sys url http path mime util


Running
=======

nodejs nodejs-server.js

then using a web browser on another machine visit

http://192.168.1.104:8000/garden.html?plugin=nodeminecraft

changing the IP to the one on your machine

