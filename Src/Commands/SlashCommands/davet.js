const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"); 
 module.exports = { 
   name: "davet" , 
   usage: "/davet", 
   category: "Bot", 
   description: "Botun davet linki", 
   run: async (client, interaction) => { 
 
const row = new MessageActionRow()
      .addComponents(new MessageButton()
          .setLabel("Botu davet et")
          .setStyle("LINK")
          .setURL("https://top.gg/bot/813340620214894623"),
        new MessageButton()
          .setLabel("Destek sunucusu")
          .setStyle("LINK")
          .setURL("https://discord.gg/9TyEZnqfVV"),
          new MessageButton()
          .setLabel("Site")
          .setStyle("LINK")
          .setURL("https://moonvo.com.tr"),             
        new MessageButton()
          .setLabel("Bota Oy ver")
          .setStyle("LINK")
          .setURL("https://top.gg/bot/813340620214894623/vote")       
    );
    const embed1 = new MessageEmbed()
  .setTitle("Davet Linkleri Altta Belirtilmiştir")
  .setColor("GREEN")
    .addField("» **Botun Sahibi**", "<@!722523001823690873>| Egehan#7658 ")
    .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/9TyEZnqfVV)", )
    .addField("**» Davet Linki**", " [Botu Davet Et](https://top.gg/bot/813340620214894623)", )
    .addField("**» Botun sitesi**", " [Site](https://moonvo.com.tr)", )        
    .addField("**» Oy linki**", " [Bota Oy ver](https://top.gg/bot/813340620214894623/vote)", )    
 .setFooter(client.user.username, client.user.avatarURL())
       .setTimestamp(); 
   
await interaction.reply({ embeds: [embed1], components: [row] }).catch(err => console.log("Hata Oluştu; " + err));
}
  }