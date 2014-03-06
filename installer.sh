#!/bin/bash

#installer
startingdir="`pwd`"
echo "running in $startingdir"

#install node 
#is node installed?
nodepath="/opt/node/bin/node"

if [ -e "$nodepath" ]
then
    echo "Node already installed in $nodepath"
else
    echo "Installing Node @ $nodepath."
    
    wget http://nodejs.org/dist/v0.10.21/node-v0.10.21-linux-arm-pi.tar.gz
    tar -zxvf node-v0.10.21-linux-arm-pi.tar.gz
    sudo mkdir /opt/node
    sudo cp -r node-v0.10.21-linux-arm-pi/* /opt/node
    
    # TODO : Add /opt/node to the PATH
    # sudo vi /etc/profile
    #Add the following lines to the configuration file before the ‘export’ command.
    #NODE_JS_HOME="/opt/node"
    #PATH="$PATH:$NODE_JS_HOME/bin"
    #export PATH  
fi

cd ~
pifacepath="piface"
#is piface installed
if [ -e "$pifacepath" ]
then
    echo "PiFace already installed in $pifacepath"
else
    echo "Installing Piface @ $pifacepath."
    
    sudo apt-get update
    sudo apt-get install automake libtool git
    git clone https://github.com/thomasmacpherson/piface.git
    cd piface/c
    ./autogen.sh && ./configure && make && sudo make install
    sudo ldconfig
    cd ../scripts
    sudo ./spidev-setup    
fi

cd ~
wiringpipath="wiringPi"
#is wiringpi installed
if [ -e "$wiringpipath" ]
then
    echo "wiringPi already installed in $wiringpipath"
else
    git clone git://git.drogon.net/wiringPi
    cd wiringPi
    ./build
fi


cd $startingdir
echo "staring node.js library install with npm"
/opt/node/bin/npm install

# TODO : Server setup
#ask about PiBrella?
#server setup start

#get waterbear
waterbearpath="waterbear/index.html"
#is piface installed
if [ -e "$waterbearpath" ]
then
    echo "Waterbear already installed in $waterbearpath"
else
    echo "Installing Waterbear @ $waterbearpath."
    
    git submodule init
    git submodule update
    cd waterbear
    #git checkout master
    cd ..
fi

echo "Installer finished ..."
echo "Type waterbear.sh"
