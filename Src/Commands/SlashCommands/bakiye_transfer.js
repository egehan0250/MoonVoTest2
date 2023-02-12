const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const moment = require("moment-timezone");
moment.locale('tr')
const user_profile = require("../../../models/user_profile.js");
module.exports = {
  name: "bakiye_transfer",
  usage: "/bakiye_transfer [user] [mikar]",
  category: "Bot",
  options: [
    {
      name: "user",
      description: "Transfer yapılacak kullanıcı",
      type: "USER",
      required: true,
    },
    {
      name: "miktar",
      description: "Transfer yapılacak miktar",
      type: "STRING",
      required: true,
    },
  ],
  description: "Belirlenen kişiye bakiyenizden transfer yapar",

  run: async (client, interaction) => {
    if (interaction.channel.type === "DM")
      return await interaction.reply({ content: "Bu komutu dm'den kulanamazsın" }).catch((err) => console.log("Hata Oluştu; " + err));
    const hatas = new MessageEmbed()
      .setColor("RED")
      .setTitle(`Hata!`)
      .setDescription(
        "Bu Komutu sadece [Destek Sunucumda](https://discord.gg/9TyEZnqfVV) Kullanabilirsin."
      )
      .setFooter(client.user.username, client.user.avatarURL())
      .setTimestamp();

    if (interaction.guild.id != "913024821787500575")
      return await interaction
        .reply({ embeds: [hatas], ephemeral: true })
        .catch((err) => console.log("Hata Oluştu; " + err));

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
    const user = interaction.options.getUser("user");

    const miktar = interaction.options.getString("miktar");

    const hesap_data = await user_profile.findOne({ user_id: user.id });

    const hesap_data1 = await user_profile.findOne({
      user_id: interaction.user.id,
    });

    if (isNaN(miktar))
      return await interaction.reply({
        content: "Lütfen Geçerli Bir Miktar Giriniz.",
      });
if (interaction.user.id === user.id) 
    return await interaction.reply({
        content: "Kendine bakiye transferi yapamazsın!",
      });
    
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
  like: "0",
  like_user: "NaN",          
  balance: "0",
  lastip: (`NaN`),
  firstip: (`NaN`),
  country: "NaN",
  city: "NaN",
  hostname: "NaN",
  ban: "false",
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
user: (`${user.username || "NaN"}`),
user_id: (`${user.id || "0"}`),
  first_name: "NaN",
  last_name: "NaN",
  ban: "false",
  age: "NaN",
  number: "NaN",
  mail: "NaN",
  description: "NaN",
  folowers: "0",
  folowers_user: "NaN",
  folowing: "0",            
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
  avatarURL: (`${user.avatarURL() || "https://i.hizliresim.com/9gd10tf.png"}`),
        }).save();
        }
       interaction.reply({ content: `Senin veya Seçtiğin kişinin Hesabı oluşturuldu! Lütfen tekrar dene` });
    } else {

        if (hesap_data1) {
          if (hesap_data1.balance < miktar)
            return await interaction.reply({ content: "Bakiyeniz yetersiz!" });

          await user_profile.findOneAndUpdate(
            { user_id: user.id },
            { $inc: { balance: miktar } }
          );
            await user_profile.findOneAndUpdate(
                { user_id: interaction.user.id },
                { $inc: { balance: -miktar } }
            );
          await interaction.reply({
            content: `${user} adlı kullanıcıya \`\`${miktar}\`\` miktarında transfer gerçekleşti!`,
          });
          var hs1 = hesap_data1.balance;
          var hs = hesap_data.balance;          
          var mk = miktar;
          var mkk = miktar;
          var hs1bl = hs1 - mk
          var hsbl = hs + parseInt(mkk)
          await client.channels.cache.get(`1015181398098858004`).send({ embeds: [new MessageEmbed()
          .setColor("RED")
          .setTitle(`Bakiye transfer yapıldı!`)
          .addField(`Transfer yapan kullanıcı:`, `${interaction.user.tag}(\`\`${interaction.user.id}\`\`)`)                              
          .addField(`Transfer Yapılan kullanıcı:`, `${user.tag}(\`\`${user.id}\`\`)`)
          .addField(`Transfer yapılan miktar:`, `${miktar}`)
          .addField(`Transfer yapanın İşlem sonu bakiyesi:`, `${hs1bl}`)
          .addField(`Transfer yapılanın İşlem sonu bakiyesi:`, `${hsbl}`)                                                  
          .addField(`Transfer yapanın İşlem öncesi bakiyesi:`, `${hesap_data1.balance}`)
          .addField(`Transfer yapılanın İşlem öncesi bakiyesi:`,`${hesap_data.balance}`)       
          .setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
          .setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
        }
    }
  },
};
