const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js"); 
const moment = require("moment");
moment.locale('tr')
const servers = require("../../../models/servers.js");
module.exports = { 
   name: "güncelle" , 
   usage: "/güncelle", 
   category: "Bot", 
   description: "Oy Ver Sistemi için sunucunuzun verilerini günceller", 
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
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle(`Sunucu Kurulumu Yapın!`)
          .addField("Kurulum yapmak için",`\`\`/kurulum\`\` Komutunu Kullanın`)
          .setFooter(`${interaction.user.username} Sunucu Kurulmadan Güncelleyemezsiniz`, interaction.user.avatarURL())
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
    if(guild) {
  
      let guild_date =  moment().diff(guild.updateDate, "seconds");
      let guild_date_kalan = 604800 - guild_date;
      if(guild_date > 604800) {
             let owner = await interaction.guild.fetchOwner()
 let rasgele_kanal = interaction.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").first();
      
                      await servers.findOneAndUpdate({
                    guildId: server_id
                }, {
                    $set: {
  guildName: interaction.guild.name,
  updateDate: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss"),
  serverInvite: `${await rasgele_kanal.createInvite({ maxAge: 0, maxUses: 0 })}`,
  serverAvatarUrl: `${interaction.guild.iconURL() || "https://i.hizliresim.com/9gd10tf.png"}`,
  ownerId: `${owner.user.id || "0"}`,
  serverDescription: `${acıklama || "NaN"}`,
                      }
                });
      const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Sunucu Güncellemesi başarıyla kaydedildi `)
          .setDescription("Sunucunun Verileri Artık Güncel Sitemiz Üzerinden Güncel Verileri Artık Görebilirsiniz")
          .setFooter(`${interaction.user.username} Sunucu Güncellemesi Yapıldı • Sunucu Kurucusu: ${owner.user.username}`, interaction.user.avatarURL())
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

                await client.channels.cache.get(`1042896408639967362`).send({ embeds: [new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`${interaction.guild.name}, Adlı Güncellendi!`)
          .addField(`Sunucu bilgileri:`, `${interaction.guild.name}(\`${interaction.guild.id}\`)`)
          .addField(`Kullanıcı bilgileri:`, `${interaction.user.username}(\`${interaction.user.id}\`)`)
          .setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
          .setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
    } else {
            function kalan_suremiz(seconds) {
            let hours = Math.floor(seconds / 3600);
            let minutes = Math.floor((seconds - (hours * 3600)) / 60);
            let second = seconds - (hours * 3600) - (minutes * 60);
            if(hours > 0) {
              return `${hours} saat ${minutes} dakika ${second} saniye`;
            } else if(minutes > 0) {
              return `${minutes} dakika ${second} saniye`;
            } else {
              return `${second} saniye`;
            }
          }
          const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`${interaction.guild.name}, Sunucusu Güncellenemedi!`)
            .setDescription(`**${kalan_suremiz(guild_date_kalan)}** beklemeniz gerekli.`)
            .setFooter(`${interaction.user.username} Güncelleme Yapılamada 7 gün'de bir güncelleme yapılabilir`, interaction.user.avatarURL())
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
    }
    }
     
}
  }