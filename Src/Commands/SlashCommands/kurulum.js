const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js"); 
const moment = require("moment");
const servers = require("../../../models/servers.js");
module.exports = { 
   name: "kurulum" , 
   usage: "/kurulum", 
   category: "Bot", 
   description: "Oy Ver Sistemi için sunucunuzun verilerini kaydeder", 
     options: [

{          
              name: `sunucu_acıklamasi`,
              description: 'Sitemizde Görünecek Olan Sunucunun Açıklaması',
              type: 'STRING',
              required: true,

        }

], 
   run: async (client, interaction) => { 
 if (interaction.channel.type === "DM") return await interaction.reply({ content: "Bu komutu dm'den kulanamazsın" }).catch((err) => console.log("Hata Oluştu; " + err));
     
                 const embed1 = new MessageEmbed()
                .setTitle('Yetkin Yok!')
                .setDescription('Kurulum Komutunu Kullanabilmen İçin \`ADMINISTRATOR\` Yetkisine İhtiyacın Var.')
                .setColor('RED')
     
 if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return await interaction.reply({ embeds: [embed1] }).catch((err) => console.log("Hata Oluştu; " + err));
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
                     let acıklama = interaction.options.getString("sunucu_acıklamasi");
    let server_id = interaction.guild.id;
    let user_id = interaction.user.id;
     
     let owner = await interaction.guild.fetchOwner()
 let rasgele_kanal = interaction.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").first();
 const guild = await servers.findOne({ guildId: server_id });
if(!guild) {
        await new servers({
  guildName: interaction.guild.name,
  guildId: server_id,
  votes: 1,
  createDate: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss"),
  updateDate: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss"),
  serverInvite: await rasgele_kanal.createInvite({ maxAge: 0, maxUses: 0 }),
  ownerId: `${owner.user.id || "0"}`,
  kurulumId: `${interaction.user.id || "0"}`,
  serverDescription: `${acıklama || "NaN"}`,
  serverAvatarUrl: `${interaction.guild.iconURL() || "https://i.hizliresim.com/9gd10tf.png"}`,
        votes_detail: [{
          userId: interaction.user.id,
          userName: interaction.user.username,
          date: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")
        }],
      }).save();
   const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Sunucu Kurulumu Başarıyla Tamamlandı!`)
          .setDescription("Sunucuya Artık Oy Verebilir ve Sitemizden Görüntüleyebilirsiniz ")
          .setFooter(`${interaction.user.username} Sunucu Kurulumunu Yaptı • Sunucu Kurucusu: ${owner.user.username}`, interaction.user.avatarURL())
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
    await interaction.reply({ embeds: [embed] }).catch((err) => console.log("Hata Oluştu; " + err)); 

      await client.channels.cache.get(`1042896196685017108`).send({ embeds: [new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`${interaction.guild.name}, Adlı Sunucu Kuruldu!`)
          .addField(`Sunucu bilgileri:`, `${interaction.guild.name}(\`${interaction.guild.id}\`)`)
          .addField(`Kullanıcı bilgileri:`, `${interaction.user.username}(\`${interaction.user.id}\`)`)
          .setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
          .setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
} else {
   const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle(`Bu Sunucu Zaten Kurulmuş`)
          .addField("Sunucuya Tekrardan Kurulum Yapmak İstiyor iseniz",`\`\`/güncelle\`\` Komutunu Kullanın`)
          .setFooter(`${interaction.user.username} Sunucu Kurulumu Zaten Yapılmış! • Kurulumun Yapıldığı Tarih: ${guild.createDate}`, interaction.user.avatarURL())
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
     return await interaction.reply({ embeds: [embed] }).catch((err) => console.log("Hata Oluştu; " + err)); 
}
     
}
  }