RPi-WaterbearNodeJS
===================

A nodejs server which serves Waterbear from the RaspberryPi and provides a way for nodejs scripts to be uploaded and run.


Installing
==========

Once you have got the code cd into the directory then run: 

```bash
git submodule update --init --recursive
# If not installed: sudo aptitude install nodejs npm
npm install
```


Running
=======

```bash
nodejs nodejs-server.js
```

then using a web browser on another machine visit

http://<ip>:8000/garden.html?plugin=nodeminecraft

changing the IP to the one on your machine

