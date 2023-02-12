const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js") 
const moment = require("moment-timezone");
moment.locale('tr')
const banned_mongo_user = require("../../../models/banned_user.js")
const user_profile = require("../../../models/user_profile.js");
module.exports = { 

  name: "profil", 
 usage: "/profil [user] ", 
   category: "Bot", 
  options: [

{          

  name: 'kullanıcı',

            description: 'Profilini görmek istediğiniz kullanıcı',

            type: 'USER',

            required: true

        }

], 

    description: 'Belirtilen kullanıcının Profilini gösterir',

    run: async (client, interaction) => {

    let userr = interaction.options.getUser("kullanıcı");
      
    const hesap_data = await user_profile.findOne({
      user_id: userr.id,
    });
      const hesap_data1 = await user_profile.findOne({
      user_id: interaction.user.id,
    });
          const bandurum = await banned_mongo_user.findOne({ user: userr.id });
     let snc = userr
        let snc1 = interaction.guild.members.cache.filter(mr => mr.joinedTimestamp < snc.joinedTimestamp).size + 1
      let banned = `${bandurum ? `Banlı` : ` Banlı değil` }`

      let sebep = `${bandurum ? `${bandurum.sebep}` : ` Banlı değil` }`

          let balance = `${hesap_data ? `${hesap_data.balance}` : ` 0` }`
      if (interaction.channel.type === "DM") return await interaction.reply({ content: "Bu komutu dm'den kulanamazsın" }).catch((err) => console.log("Hata Oluştu; " + err)); 
      
         const hatas = new MessageEmbed()
          .setColor('RED') 
          .setTitle(`Hata!`)
          .setDescription("Bu Komutu sadece [Destek Sunucumda](https://discord.gg/9TyEZnqfVV) Kullanabilirsin.")
      .setFooter(client.user.username, client.user.avatarURL())
       .setTimestamp()
      
      if(interaction.guild.id != "913024821787500575") return await interaction.reply({ embeds: [hatas], ephemeral: true }).catch((err) => console.log("Hata Oluştu; " + err));
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
      if (interaction.user.id === userr.id) {
      if (!hesap_data) {
        await new user_profile({
user: (`${userr.username || "NaN"}`),
  user_id: (`${userr.id || "0"}`),
  first_name: "NaN",
  last_name: "NaN",
  age: "NaN",
  number: "NaN",
  mail: "NaN",
  balance: "0",
  description: "NaN",
  folowers: "0",
  folowers_user: "NaN",
  folowing: "0",             
  like: "0",
  ban: "false",
  like_user: "NaN",            
  lastip: (`NaN`),
  firstip: (`NaN`),
  country: "NaN",
  city: "NaN",
  hostname: "NaN",
  github: "NaN",
  ınstagram: "NaN",
  codepen: "NaN",  
  plan: "free",  
  status: "false",
    mail_send: "false",
          confirmationCode: "None",
  creationdate: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
  last_login_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
  avatarURL: (`${userr.avatarURL() || "https://i.hizliresim.com/9gd10tf.png"}`),
        }).save();
               interaction.reply({ content: `Hesabın oluşturuldu! Lütfen tekrar dene.` });
        }
            if (hesap_data) {
         const embed = new MessageEmbed()
      .setTitle(`MoonVo | Profil`)
      .addField(`Kullanıcı adı:`, `${userr.username}(\`\`${userr.id}\`\`)`, true)
      .addField(`Hesap Oluşturma Tarihi:`, moment(userr.createdTimestamp).format('LLLL'), true)
      .addField(`Sunucuya Katılma Tarihi:`, moment(snc.joinedTimestamp).format('LLLL'), true)
      .addField(`Ban Durumu:`, banned, true)
      .addField(`Ban Sebebi:`, sebep, true)
      .addField(`Bakiye:`, `${balance}`, true)
      .setFooter(`${client.user.username} Profil sistemi`, client.user.avatarURL())     
      .setTimestamp()
      .setThumbnail(
      userr.avatarURL() || `https://i.hizliresim.com/9gd10tf.png`
    )
      interaction.reply({ embeds: [embed] }).catch((err) => console.log("Hata Oluştu; " + err)); 
      }
      }
  if (interaction.user.id !== userr.id) {
          if (!hesap_data1 || !hesap_data) {
      if (!hesap_data1) {
      await new user_profile({
user: (`${interaction.user.username || "NaN"}`),
user_id: (`${interaction.user.id || "0"}`),
  first_name: "NaN",
  last_name: "NaN",
  age: "NaN",
  number: "NaN",
  mail: "NaN",
  description: "NaN",
  folowers: "0",
  folowers_user: "NaN",
  folowing: "0",          
  ban: "false",
  like: "0",
  like_user: "NaN",          
  balance: "0",
  lastip: (`NaN`),
  firstip: (`NaN`),
  country: "NaN",
  city: "NaN",
  hostname: "NaN",
  github: "NaN",
  ınstagram: "NaN",
  codepen: "NaN",   
  plan: "free",
  status: "false",
    mail_send: "false",
        confirmationCode: "None",
  creationdate: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
  last_login_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
  avatarURL: (`${interaction.user.avatarURL() || "https://i.hizliresim.com/9gd10tf.png"}`),
      }).save();
      }
      if (!hesap_data) {
        await new user_profile({
  user: (`${userr.username || "NaN"}`),
  user_id: (`${userr.id || "0"}`),
  first_name: "NaN",
  last_name: "NaN",
  age: "NaN",
  number: "NaN",
  mail: "NaN",
  description: "NaN",
  folowers: "0",
  folowers_user: "NaN",
  folowing: "0",     
  ban: "false",
  like: "0",
  like_user: "NaN",            
  balance: "0",
  lastip: (`NaN`),
  firstip: (`NaN`),
  country: "NaN",
  city: "NaN",
  hostname: "NaN",
  github: "NaN",
  ınstagram: "NaN",
  codepen: "NaN",  
  plan: "free",
  status: "false",
    mail_send: "false",
          confirmationCode: "None",
  creationdate: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
  last_login_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
  avatarURL: (`${userr.avatarURL() || "https://i.hizliresim.com/9gd10tf.png"}`),
        }).save();
        }
       interaction.reply({ content: `Senin veya Seçtiğin kişinin Hesabı oluşturuldu! Lütfen tekrar dene` });
    } else {
      const embed = new MessageEmbed()
      .setTitle(`MoonVo | Profil`)
      .addField(`Kullanıcı adı:`, `${userr.username}(\`\`${userr.id}\`\`)`, true)
      .addField(`Hesap Oluşturma Tarihi:`, moment(userr.createdTimestamp).format('LLLL'), true)
      .addField(`Sunucuya Katılma Tarihi:`, moment(snc.joinedTimestamp).format('LLLL'), true)
      .addField(`Ban Durumu:`, banned, true)
      .addField(`Ban Sebebi:`, sebep, true)
      .addField(`Bakiye:`, `${balance}`, true)
      .setFooter(`${client.user.username} Profil sistemi`, client.user.avatarURL())     
      .setTimestamp()
      .setThumbnail(
      userr.avatarURL() || `https://i.hizliresim.com/9gd10tf.png`
    )
      interaction.reply({ embeds: [embed] }).catch((err) => console.log("Hata Oluştu; " + err)); 
    }
  }
    }
}