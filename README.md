RPi-WaterbearNodeJS
===================

A nodejs server which serves Waterbear from the RaspberryPi and provides a way for nodejs scripts to be uploaded and run.

Requirements
============

Get & install Minecraft Pi Edition from http://pi.minecraft.net/?p=68


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

Get Minecraft Pi edition running and start a  game.

```bash
forever nodejs-server.js
```

then using a web browser on another machine visit

http://<ip>:8000/garden.html?plugin=nodeminecraft

changing the IP to the one on your machine


Running Forever
===============

```bash
sudo aptitude install g++
sudo npm install forever -g
```

Running on the PC version (V.V. Buggy)
======================================

Install a bukkit server from  http://wiki.bukkit.org/Main_Page (I'm using the dev build )

Install the RaspberryJuice plugin from http://dev.bukkit.org/server-mods/raspberryjuice/

Follow the rest of the Raspberry Pi instructions about installing and running nodejs and the web page. 

Try not to make 40000 blocks of TNT touch lava.
