const { Discord, Client, Message, Intents, MessageEmbed, Permissions } = require("discord.js");
const moment = require("moment");
const momentn = require("moment")
const oy_mongo_user = require("../../../models/oyver_user.js")
const oy_mongo_guild = require("../../../models/servers.js")
  require('moment-duration-format')
module.exports = { 

  name: "oyver", 
  usage:"/oyver", 
  category:"Sunucu", 
  description: 'Sunucuya oy verirsiniz', 
  run: async(client, interaction, container, msg) => {
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
    let user_id = interaction.user.id;
    const guild = await oy_mongo_guild.findOne({ guildId: server_id });
    const user = await oy_mongo_user.findOne({ user: user_id });




    if(!guild && user) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle(`Sunucu Kurulumu Yapın!`)
          .addField("Kurulum İçin",`\`\`/kurulum\`\` Komutunu Kullanın`)
          .setFooter(`${interaction.user.username} Bu Sunucunun Kurulumu Yapılmamış`, interaction.user.avatarURL())
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
    } else {
       if(!user && guild) {
   await new oy_mongo_user({
        user: user_id,
        votes: [{
          guild: server_id,
          date: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")
        }],
        total_vote: "1",
        date: momentn().locale('tr').format("YYYY-MM-DD HH:mm:ss"),
        last_vote_server_name: interaction.guild.name,
        last_vote_server_id: interaction.guild.id,
        last_vote_server_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
      }).save();
      await oy_mongo_guild.findOneAndUpdate({ guildId: server_id }, { $inc: { votes: 1 } });
                 const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`Oww, İlk Oy'unu ${interaction.guild.name} Sunucusunda verdin! 🎉`)
          .addField("Sunucunun Toplam Oy sayısı:", `${guild.votes +1}`)
          .setFooter(`${interaction.user.username} oy verdi! • İlk Oy'unu Verdin! böyle devam!`, interaction.user.avatarURL())
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
    if(user) {
      //saat user.date
      let sunucuya_verdigi_oy = 1;
      let user_votes = user.votes;
      user_votes.forEach(async(vote) => {
        if(vote.guild == server_id) {
          sunucuya_verdigi_oy++;
        }
      });
      let user_date =  momentn().diff(user.date, "seconds");
      let user_date_kalan = 21600 - user_date;
      if(user_date > 21600) {
        await oy_mongo_user.findOneAndUpdate({ user: user_id }, { $push: { votes: { guild: server_id, date: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss") } } } );
        await oy_mongo_user.findOneAndUpdate({ user: user_id }, { $set: { last_vote_server_name: interaction.guild.name,
        last_vote_server_id: interaction.guild.id, last_vote_server_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'), date: momentn().format("YYYY-MM-DD HH:mm:ss") } })
        await oy_mongo_user.findOneAndUpdate({ user: user_id }, { $inc: { total_vote: 1 }})
        await oy_mongo_guild.findOneAndUpdate({ guildId: server_id }, { $inc: { votes: 1 } });
        await oy_mongo_guild.findOneAndUpdate({ guildId: server_id }, { $push: { votes_detail: { userId: user_id, userName: interaction.user.username, date: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss") } } });       
        const embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`${interaction.guild.name}, Sunucusuna Oy Verildi 🎉`)
          .setDescription(`[Sunucu Detayları](https://moonvo.com.tr/sunucu/${interaction.guild.id})`)
          .addField("Sunucunun Toplam Oy sayısı:", `${guild.votes + 1}`)
          .setFooter(`${interaction.user.username} oy verdi! • Bu sunucuya toplam ${sunucuya_verdigi_oy} oy verdin! • Toplamda ${user.total_vote +1} oy verdin`, interaction.user.avatarURL())
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
        await client.channels.cache.get(`1035596268795342919`).send({ embeds: [new MessageEmbed()
          .setColor("GREEN")
          .setTitle(`${interaction.guild.name}, Adlı sunucuya oy verildi!`)
          .addField(`Sunucu bilgileri:`, `${interaction.guild.name}(\`${interaction.guild.id}\`)`)
          .addField(`Kullanıcı bilgileri:`, `${interaction.user.username}(\`${interaction.user.id}\`)`)
          .addField(`Sunucunun Toplam oy sayısı:`, `${guild.votes + 1}`)
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
            .setTitle(`${interaction.guild.name}, sunucusuna oy verilemedi`)
            .setDescription(`**${kalan_suremiz(user_date_kalan)}** beklemeniz gerekli.`)
            .setFooter(`${interaction.user.username} oy verilemedi! `, interaction.user.avatarURL())
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