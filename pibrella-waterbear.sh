#!/bin/bash
gpio export 27 out
gpio export 17 out
gpio export 4 out
gpio export 22 out
gpio export 23 out
gpio export 24 out
gpio export 25 out
gpio export 18 out

gpio export 11 in
gpio export 9 in
gpio export 7 in
gpio export 8 in
gpio export 10 in

gpio -g mode 11 down
gpio -g mode 9 down
gpio -g mode 7 down
gpio -g mode 8 down
gpio -g mode 10 down

/opt/node/bin/node waterbear.js
