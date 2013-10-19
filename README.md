RPi-WaterbearNodeJS
===================

A nodejs server which serves Waterbear from the RaspberryPi and provides a way for nodejs scripts to be uploaded and run.

For news follow @EduMakeCoop on Twitter

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
nodejs nodejs-server.js
```

then using a web browser on another machine visit

http://IP:8000/garden.html?plugin=nodeminecraft

changing the IP to the one for your Raspberry Pi


Running on the PC version (V.V. Buggy)
======================================

Install a bukkit server from  http://wiki.bukkit.org/Main_Page (I'm using the dev build )

Install the RaspberryJuice plugin from http://dev.bukkit.org/server-mods/raspberryjuice/

Follow the rest of the Raspberry Pi instructions about installing and running nodejs and the web page. 

Try not to make 40000 blocks of TNT touch lava.

License
=======

Copyright 2011 EduMake Limited

Waterbear code licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<a href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/">
<img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a>
<br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">RPi-WaterbearNodeJS Documentation</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://edumake.org/" property="cc:attributionName" rel="cc:attributionURL">EduMake Limited</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.<br />Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.apache.org/licenses/LICENSE-2.0" rel="cc:morePermissions">http://www.apache.org/licenses/LICENSE-2.0</a>.

