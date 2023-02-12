const { Discord, Client, Message, Intents, MessageEmbed, Permissions, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
const oy_mongo_user = require("../../../models/oyver_user.js")
const oy_mongo_guild = require("../../../models/servers.js")
module.exports = { 

  name: "sunucu_listesi", 
  usage:"/sunucu_listes", 
  category:"Sunucu", 
  description: 'Tüm Sunucuları görürsünüz', 
  run: async(client, interaction, container) => {
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
    await interaction.deferReply();
    const guilds = await oy_mongo_guild.find({});
    let sorted = guilds.sort((a, b) => {
        return b.votes - a.votes;
    });
    let top10 = sorted.slice(0, 5);
    let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Top 10 Sunucular")
        .setFooter("Oy Verme Listesi")
        .setTimestamp()
    let say = 0;
    top10.forEach(async (sw) => {
      let sunucu = client.guilds.cache.get(sw.guildId);
            //guild rasgele kanal seç
            if(sunucu) {
            embed.addField(`${say}. Sunucu;` , `Sunucu: **${sw.guildName || "Bilinmiyor"}** \nVote: **${sw.votes}**\n[Sunucuya Katıl](${sw.serverInvite})`);
            }
        say++;
    });
    setTimeout(async () => {
        const row = new MessageActionRow()
            .addComponents(
				new MessageButton()
					.setCustomId('voteback_0')
					.setLabel('Önceki Sayfa')
					.setStyle('PRIMARY')
                    .setDisabled(true),
			)
            .addComponents(
                new MessageButton()
                    .setCustomId('vote_sil_msg')
                    .setLabel('Sil')
                    .setStyle('DANGER'),
            )
			.addComponents(
				new MessageButton()
					.setCustomId('votenext_1')
					.setLabel('Sonraki Sayfa')
					.setStyle('PRIMARY'),
			);
        await interaction.editReply({ embeds: [embed], components: [row] }).catch((err) => console.log("Hata Oluştu; " + err)); 
    });
  }
}