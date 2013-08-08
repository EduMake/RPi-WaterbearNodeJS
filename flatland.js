function rad2deg(rad){return rad/DEGREE}function deg2rad(deg){return deg*DEGREE}function range(start,end,step){var rg=[];void 0===end&&(end=start,start=0),void 0===step&&(step=1);var i,val;for(len=end-start,i=0;len>i&&(val=i*step+start,!(val>end-1));i++)rg.push(val);return rg}function randint(start,stop){void 0===stop&&(stop=start,start=0);var factor=stop-start+1;return Math.floor(Math.random()*factor)+start}function Position(x,y,z){this.x=x,this.y=y,this.z=z}function getPositionFromMC(data){var aData=data.toString().trim().split(",");return new Position(parseInt(aData[0],10),parseInt(aData[1],10),parseInt(aData[2],10))}Position.prototype.add=function(oPos){return new Position(this.x+oPos.x,this.y+oPos.y,this.z+oPos.z)},Position.prototype.equals=function(oPos){return this.x===oPos.x&&this.y===oPos.y&&this.z===oPos.z},Position.prototype.subtract=function(oPos){return new Position(this.x-oPos.x,this.y-oPos.y,this.z-oPos.z)},Position.prototype.set=function(x,y,z){return this.x=x,this.y=y,this.z=z,this};var directioncalcs={up:function(pos,distance){return{x:pos.x,y:pos.y+distance,z:pos.z}},down:function(pos,distance){return{x:pos.x,y:pos.y-distance,z:pos.z}},north:function(pos,distance){return{x:pos.x,y:pos.y,z:pos.z+distance}},south:function(pos,distance){return{x:pos.x,y:pos.y,z:pos.z-distance}},west:function(pos,distance){return{x:pos.x-distance,y:pos.y,z:pos.z}},east:function(pos,distance){return{x:pos.x+distance,y:pos.y,z:pos.z}},none:function(pos){return pos}},directions=["up","down","north","south","east","west","none"];

var Minecraft = require('./minecraft-pi/lib/minecraft.js');
var client = new Minecraft('localhost', 4711, function() {
var zeros={x:0, y:0, z:0};
var posA_6 = {
    x: -200,
    y: -1,
    z: -200
};
var posB_6 = null;
var position_6 = posA_6;
var posA_17 = {
    x: 200,
    y: 0,
    z: 200
};
var posB_17 = null;
var position_17 = posA_17;
client.getHeight({
    x: 0,
    y: 0,
    z: 0
}.x, {
    x: 0,
    y: 0,
    z: 0
}.z, function(height_10) {
    var groundposition = {
        x: {
            x: 0,
            y: 0,
            z: 0
        }.x,
        y: parseInt(height_10, 10),
        z: {
            x: 0,
            y: 0,
            z: 0
        }.z
    };
    var posA_8 = {
        x: -200,
        y: groundposition.y,
        z: -200
    };
    var posB_8 = null;
    var position_8 = posA_8;
    var position_3 = directioncalcs["up"](position_8, 20);
    client.setBlocks(position_17.x, position_17.y, position_17.z, position_3.x, position_3.y, position_3.z, client.blocks["AIR"]);
    client.setBlocks(position_6.x, position_6.y, position_6.z, position_17.x, position_17.y, position_17.z, client.blocks["DIRT"]);
});
});
