const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"); 
const oy_mongo_guild = require("../../../models/servers.js")
module.exports = { 
name: "sunucu_istatistik", 
usage: "/sunucu_istatistik", 
category: "Sunucu", 
description: "Sunucu hakkında bilgi verir", 
run: async (client, interaction) => { 
        if (interaction.channel.type === "DM") return await interaction.reply({ content: "Bu komutu dm'den kulanamazsın" }).catch((err) => console.log("Hata Oluştu; " + err)); 
        const mongoose = require('mongoose');
    const hatamongo = new MessageEmbed()
      .setColor("RED")
      .setTitle(`MongoDB'ye Bağlanılamadı Lütfen Daha Sonra Deneyin!`)
      .setDescription(
        "MongoDB'ye Bağlanılamadı Lütfen Daha Sonra Tekrar Deneyin ve Bir Yetkiliye Haber Verin."
      )
      .setFooter(client.user.username, client.user.avatarURL())
      .setTimestamp();
    
    if(mongoose.connection.readyState !== 1) return await interaction.reply({ embeds: [hatamongo], ephemeral: true }).catch((err) => console.log("Hata Oluştu; " + err));
let server_id = interaction.guild.id;
const sunucui = await oy_mongo_guild.findOne({ guildId: server_id });
           let last_Categories = [];
        let details_server = sunucui.votes_detail;
          for (let i = 0; i < 1; i++) {
          last_Categories.push(details_server[details_server.length - 1 - i] || [i]);
        }

if(!sunucui) {
const hata = new MessageEmbed()
.setColor("RED")
.setTitle(`Çok Üzgünüm ama Bu sunucunun Hiç Oy'u yok!`)
.setDescription(`Hemen \`\`\` /oyver \`\`\` yazarak sunucunun ilk oy'unu ver.`)
.setFooter(`${interaction.user.username} • /oyver yazarak sunucunun ilk oy'unu verebilirsin.`, interaction.user.avatarURL())
.setTimestamp()
.setThumbnail(
interaction.guild.iconURL({
dynamic: true,
format: "gif",
format: "png",
format: "jpg",
size: 2048
}) || `https://i.hizliresim.com/9gd10tf.png`
);
return await interaction.reply({ embeds: [hata] }).catch((err) => console.log("Hata Oluştu; " + err));            
} else {
 last_Categories.forEach( async sv => {
const ist = new MessageEmbed()
.setTitle(`${interaction.guild.name}, İstatistikleri`)
.setColor("GREEN")
.addField(`Sunucunun Oy sayısı:`, `${sunucui.votes}`)
.addField(`Sunucuya son oy veren:`, `${sv.userName}(\`${sv.userId}\`)`)
.addField(`Sunucuya verilen son oy tarihi:`, `${sv.date}`)
.addField(`Sunucunun ilk oy'u aldığı tarih:`, `${sunucui.createDate}`)
.setFooter(`${interaction.user.username}, tarafından istendi • /oyver yazarak sunucuya oy ver!`, interaction.user.avatarURL())
.setTimestamp()
.setThumbnail(
interaction.guild.iconURL({
dynamic: true,
format: "gif",
format: "png",
format: "jpg",
size: 2048
}) || `https://i.hizliresim.com/9gd10tf.png`
);
return await interaction.reply({ embeds: [ist] }).catch((err) => console.log("Hata Oluştu; " + err));     
})
}
  

}, 
};