const { Discord, Client, Message, Intents, MessageEmbed, Permissions } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");
const os = require("os")
const moment = require("moment");
require("moment-duration-format");
module.exports = {
name: "istatistik", 
usage: "/istatistik", 
category: "Bot", 
description: "İstatistik komutu",   
run: async (client, interaction) => {
  
function cpuAverage() {

  //Initialise sum of idle and time of cores and fetch CPU info
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  //Loop through CPU cores
  for(var i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    var cpu = cpus[i];

    //Total up the time in the cores tick
    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
  }

  //Return the average Idle and Tick times
  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

//Grab first CPU Measure
var startMeasure = cpuAverage();

    //Grab second Measure
  var endMeasure = cpuAverage(); 

  //Calculate the difference in idle and total time between the measures
  var idleDifference = endMeasure.idle - startMeasure.idle;
  var totalDifference = endMeasure.total - startMeasure.total;

  //Calculate the average percentage CPU usage
  var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

  //Output result to console
  //linkler\\
    let botdvt = `https://discord.com/oauth2/authorize?client_id=986755276537475082&permissions=8&scope=bot%20applications.commands`
  let sundvt = `https://discord.gg/9TyEZnqfVV`
  let site = `https://moonvo.me/`
  let oy = `https://top.gg/bot/813340620214894623/vote`
  //linkler\\
//MOMENT\\
let uptime = moment.duration(Date.now() - client.readyAt.getTime()).format(`D [gün,] H [saat,] m [dakika,] s [saniye]`);
//MOMENT\\


       let ramy = ""
if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 0 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 100 )
  {
    ramy = "%1"
  }
     if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 100 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 200 )
  {
    ramy = "%5"
  }
       if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 250 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 300 )
  {
    ramy = "%15"
  }
      if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 500 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 400 )
  {
    ramy = "%20"
  }
      if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 900 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 500 )
  {
    ramy = "%35"
  }
         if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 1200 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 600 )
  {
    ramy = "%50"
  }
              if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 1800 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 700 )
  {
    ramy = "%75"
  }
               if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 2100 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 800 )
  {
    ramy = "%85"
  }
          if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 2400 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 900 )
  {
    ramy = "%90"
  }
          if(((process.memoryUsage().rss / 1024) / 1024).toFixed(2) >= 3000 && ((process.memoryUsage().rss / 1024) / 1024).toFixed(2) < 1024 )
  {
    ramy = "%99"
  }

  
const embed = new MessageEmbed() 
.setAuthor(`${client.user.username} İstatistik`, client.user.avatarURL({size: 1024 }))
.setColor("RANDOM") 
.addField(`Piyasaya Sunuş Tarihi:`, `26.05.2022`,true)
.addField(`Ram Kullanım[${ramy}]:`, `[${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mb | 4096 Mb]`, true)
.addField(`Uptime:`, `${uptime}`, true)  
.addField(`CPU:`, `${percentageCPU}%`, true)  
.addField(`Bot Sahibi:`, `[Egehan#7658](https://discord.com/users/541282322121752579)`, true)
.addField(`Kütüphane`, `[JS](https://www.javascript.com/) ([DJS](https://discord.js.org/))`, true)
.addField(`Toplam sunucu:`, `${client.guilds.cache.size}`, true)
.addField(`Toplam üye:`, `${client.guilds.cache.reduce((a,b)=> a + b.memberCount, 0)}`, true)
.addField(`Gecikme:`, `${client.ws.ping}ms`, true)
.addField(`MoonVo Sürümü:`, `v6(beta)`, false)
.addField('Bağlantılarım', '[[Beni Sunucuna Ekle](' + botdvt + ')] [[Destek Sunucusu](' + sundvt + ')] [[Websitesi](' + site + ')] [[Oy](' + oy + ')]', true) 
.setFooter(`Sorgulayan: ${interaction.user.username} | Güncelleme: ${moment().format('L')} - ${moment().format('LTS')}`, interaction.user.avatarURL())
.setThumbnail(client.user.avatarURL())
interaction.reply({ embeds: [embed] }).catch((err) => console.log("Hata Oluştu; " + err));
 }
}