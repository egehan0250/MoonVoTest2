const { MessageEmbed } = require("discord.js"); 
 module.exports = { 
   name: "ping", 
   usage: "/ping", 
   category: "Bot", 
   description: "Ping komutu", 
   run: async (client, interaction) => { 
     const Embed = new MessageEmbed() 
       .setColor('RANDOM') 
       .setTitle(`Ping! - ` + client.user.username) 
       .setDescription(`${client.ws.ping} ms`) 
       .setFooter(client.user.username, client.user.avatarURL())
       .setTimestamp(); 
         interaction.reply({ embeds: [Embed] }).catch((err) => console.log("Hata Oluştu; " + err));  
   } 
 } 

