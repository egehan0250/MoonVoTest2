  (async () => {
const { Client, Message, Intents, MessageEmbed, Collection, Permissions, MessageActionRow, MessageButton, WebhookClient, GatewayIntentBits, REST, Routes } = require("discord.js");
const Discord = require("discord.js")
const { clientId, guildId, token, config } = require('./config.json');
const moment = require("moment");
  const mongoose = require('mongoose');
      const moonvostats = require("./models/moonvo_stats.js")
    const servers = require("./models/servers.js")
    const user_profile = require("./models/user_profile.js")
const path = __dirname;
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_BANS,
    ],
    partials: ["CHANNEL"]
});
const oy_mongo_guild = require("./models/servers.js")
    const { AutoKill } = require('autokill')
AutoKill({Client: client, Time: 10000}) 
  const { get } = require("https");
/////////////////////////////EVENTS//////////////////////////////
  
// Connect to the database
mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
})
/////////////////////////////EVENTS//////////////////////////////
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
    const message = interaction.message;
    let istenen = interaction.customId;
    let back_or_next = istenen.split("_")[0];
    let page = istenen.split("_")[1];
    if(back_or_next === "votenext") {
      await interaction.deferReply();
        const guilds = await oy_mongo_guild.find({}); 
        var atla = page * 5;
        let servisler = guilds.sort((a, b) => {
            return b.votes - a.votes;
        });
        servisler = servisler.slice(atla, atla + 5);
        if(page >= Math.ceil(guilds.length / 5)) return await interaction.editReply({ content: "**Sonraki Sayfa Yok!**", ephemeral: true });
      let yeni_page = Number(page) + 1;
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Sunucular ")
            .addField('Sayfa: ', yeni_page + "/" + Math.ceil(guilds.length / 5))
            .setTimestamp();
        let say = atla;
        for(let i = 0; i < servisler.length; i++) {
            say++;
            let sw = servisler[i];
            let sunucu = client.guilds.cache.get(sw.guildId);
            //guild rasgele kanal seç
            if(sunucu) {
            embed.addField(`${say}. Sunucu;` , `Sunucu: **${sw.guildName || "Bilinmiyor"}** \nVote: **${sw.votes}**\n[Sunucuya Katıl](${sw.serverInvite})`);
            }
        }
        var sonraki_sayfa = Number(page) + 1;
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('voteback_' + page)
                    .setLabel('Önceki Sayfa')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('vote_sil_msg')
                    .setLabel('Sil')
                    .setStyle('DANGER'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('votenext_' + sonraki_sayfa)
                    .setLabel('Sonraki Sayfa')
                    .setStyle('PRIMARY'),
            );
        try {
            setTimeout(async () => {
              
                message.edit({ embeds: [embed], components: [row] }).catch((err) => console.log("Hata Oluştu; " + err)); 
                await interaction.editReply({ content: `** ${sonraki_sayfa}.** Sayfaya Geçildi!`, ephemeral: true }).catch((err) => console.log("Hata Oluştu; " + err)); 
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    if(back_or_next === "voteback") {
        const guilds = await oy_mongo_guild.find({}); 
        var atla = page * 5;
        let servisler = guilds.sort((a, b) => {
            return b.votes - a.votes;
        });
       servisler = servisler.slice(atla - 5, atla);
        if(atla - 5 < 0) return await interaction.reply({ content: "**Önceki Sayfa Yok!**", ephemeral: true });
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Sunucular ")
            .addField('Sayfa: ', page + "/" + Math.ceil(guilds.length / 5))
            .setTimestamp();
        let say = atla - 5;
        for(let i = 0; i < servisler.length; i++) {
            say++;
            let sw = servisler[i];
            if(say > atla) return;
            let sunucu = client.guilds.cache.get(sw.guildId);
      
            if(sunucu) {
            embed.addField(`${say}. Sunucu;` , `Sunucu: **${sw.guildName || "Bilinmiyor"}** \nVote: **${sw.votes}**\n[Sunucuya Katıl](${sw.serverInvite})`);
            }
        }
        var onceki_sayfa = Number(page) - 1;
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('voteback_' + onceki_sayfa)
                    .setLabel('Önceki Sayfa')
                    .setStyle('PRIMARY'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('vote_sil_msg')
                    .setLabel('Sil')
                    .setStyle('DANGER'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('votenext_' + page)
                    .setLabel('Sonraki Sayfa')
                    .setStyle('PRIMARY'),
            );
        try {
            setTimeout(async () => {
                message.edit({ embeds: [embed], components: [row] });
            await interaction.reply({ content: `** ${page}.** Sayfaya Geçildi!`, ephemeral: true });
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    if(istenen === "vote_sil_msg") {
        try {
            message.delete();
            await interaction.reply({ content: "**Silindi!**", ephemeral: true });
        }
        catch (e) {
            console.log(e);
        }
    }
});
/////////////////////////////EVENTS//////////////////////////////
require('./fast_dashboard.js')(client);
/////////////////////////////EVENTS//////////////////////////////
exports.client = client;
exports.path = path;
exports.config = config;
client.commands = {};
client.events = new Collection();
client.commands.messageCommands = new Collection();
client.commands.messageCommands.aliases = new Collection();
client.commands.contextMenus = new Collection();
client.commands.slashCommands = new Collection();
client.commands.buttonCommands = new Collection();
client.commands.selectMenus = new Collection();
    
const Handler = require(`${path}/Src/Structures/Handlers/Handler`);
await Handler.loadMessageCommands(client, path);
await Handler.loadEvents(client);

await client.login(process.env.token).then(async() => {

  console.log(`Bot\`a giriş yaptım! || ${client.user.tag}`)
}).catch((err) => {
    console.log('Bot\`a giriş yapamadım! .\nError: ' + err)
})
await Handler.loadSlashCommands(client, path);
await Handler.loadContextMenus(client, path);
await Handler.loadButtonCommands(client, path);
await Handler.loadSelectMenus(client, path);  


  
client.on("ready", async () => {
  let a = " ";
let mses = " ";
let b = mongoose.connection.readyState

if(b === 0) a = "Bağlantı Yok"

if(b === 1) a = "Bağlı"

if(b === 2) a = "Bağlanılıyor"

if(b === 3) a = "Bağlantı Kesiliyor"

if(b === 99) a = "Aktif Değil"

if(b === 0) mses = "🔴 MongoDB: Bağlantı yok"

if(b === 1) mses = "🟢 MongoDB: Bağlı"

if(b === 2) mses = "🟡 MongoDB: Bağlanılıyor"

if(b === 3) mses = "🔴 MongoDB: Bağlantı kesiliyor"

if(b === 99) mses = "🔴 MongoDB: Aktif değil"

let mongoses = client.channels.cache.get("1051524937925525644")
     mongoses.setName(mses).catch(err => console.log("Hata Oluştu; " + err)); 
    let mongo_kanal = client.channels.cache.get('1051515791406809168')
  if(b === 1 || b === 2) {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
  const mongoembed = new MessageEmbed()
  .setTitle('MongoDB Başlatıldı')
  .addField(`MongoDB Durumu:`,`${a}`)
  .addField('Ping:', `${client.ws.ping}`)
  .setFooter('MoonVo MongoDB Control(s) system!')
  .setTimestamp()
  .setColor("GREEN")
  .setThumbnail('https://i.hizliresim.com/jlddu54.png')
  mongo_kanal.send({ embeds: [mongoembed] }).catch(err => console.log("Hata Oluştu; " + err)); 
  } else {
  const mongoembed = new MessageEmbed()
  .setTitle('MongoDB Başlatılamadı!')
  .setDescription('Tekrar Bağlanmayı Deneniyorum.')
  .addField(`MongoDB Durumu:`,`${a}`)
  .addField('Ping:', `${client.ws.ping}`)
  .setFooter('MoonVo MongoDB Control(s) system!')
  .setTimestamp()
  .setColor("RED")
  .setThumbnail('https://i.hizliresim.com/jlddu54.png')
  mongo_kanal.send({ embeds: [mongoembed] }).catch(err => console.log("Hata Oluştu; " + err)); 
    mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
})
  }

    const myTimeout = setTimeout(myGreeting, 5000);

  async function myGreeting() {
        let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
  let kontrol_kanal = client.channels.cache.get('1036690790266703992')
  const clientembed = new MessageEmbed()
  .setTitle('Uygulama Başlatıldı!')
  .addField('Son Kontrol zamanı:', `${moonvo_statss.last_control_time || 'NaN'}`)
  .addField('Ping:', `${client.ws.ping}`)
  .setFooter('MoonVo Client Control(s) system!')
  .setTimestamp()
  .setColor("GREEN")
  .setThumbnail('https://i.hizliresim.com/jlddu54.png')
  kontrol_kanal.send({ embeds: [clientembed] }).catch(err => console.log("Hata Oluştu; " + err));
  }
  console.log("No barriers ready!")
});
  
////////////////////////////////////////////////
client.on("messageCreate", msg => {
  var dm = client.channels.cache.get("988191301839253555")
  if (msg.channel.type === "DM") {  
    if (msg.author.id === client.user.id) return;
     dm.send(`${msg.author.id}`) 
    const embed = new MessageEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setColor("RED")
      .setThumbnail("https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar)
      .addField("Gönderen", msg.author.tag)
      .addField("Gönderen ID", msg.author.id)
      .addField("Gönderilen Mesaj", msg.content)
.setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp() 
    dm.send({ embeds: [embed] }).catch((err) => {
    const embed1 = new MessageEmbed()
      .setTitle(`${client.user.username} Hata!`)
      .setColor("RED")
      .setThumbnail("https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar)
      .addField("Gönderen", msg.author.tag)
      .addField("Gönderen ID", msg.author.id)
      .addField("Gönderilen Mesaj", `\`\`\`
Mesaj içeriği çok uzun gösterilemiyor
\`\`\``) 
.setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp() 
      dm.send({ embeds: [embed1] })
})
   } 
  if (msg.channel.bot) return;
});

  client.on("messageCreate", async msg => {
  	if (!msg.member || msg.author.bot) return

const etiket = [client.user.id, "<@"+client.user.id+">"]; 
if (etiket.some(etkt => msg.content.includes(etkt))) {
msg.channel.send({ embeds: [new MessageEmbed()
  .setTitle(`Hey ${msg.author.username}, Banamı seslendin?`)
      .setColor("GREEN")
      .addField("Prefix", `Slash(/) komutlarını kullanıyorum`)
.setFooter(client.user.username, client.user.avatarURL())
  .setTimestamp()]}).catch(err => console.log("Hata Oluştu; " + err)); 
}})  
   
///////////////////////DMBİLDİRİ/////////""//////////////////////// 
   client.on("guildMemberAdd", async member => {
const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1071717512212926486/0bXhhSEcbaNPa2O4lwxARpRxzsXI23fSP0-ylFQsvtT-x7LDQAQoARFjAFj63RbLgKIZ' });

  var hoşgeldin = ["umarım pizzaları getirmişsindir!","geldiğine çok sevindik.","umarım eğlenceye hazırsındır!","için bir hoşgeldin yok mu?","uçarak sunucuya giriş yaptı!","aramıza hoşgeldin!","spawn oldu!","Roket hızında giriş yaptı!","MoonVo'ya Hoşgeldin!","Destek lazımmı? <#1001475141143900190>","Hoşgeldin seni bir yerden tanıyormuyum?"]
     if(member.guild.id == "913024821787500575") hook.send(`${member}, ${hoşgeldin[Math.floor(Math.random() * hoşgeldin.length)]}`).catch(err => console.log("Hata Oluştu; " + err)); 
  
});

client.on("messageCreate", async (msg)=> {
  	if (!msg.member || msg.author.bot) return
  var nasılsın = ["Hoş Geldin!","Nasılsın?","Geldiğine sevindik.","Umarım iyisindir","Bugün seni iyi gördüm.","Kimleri görüyorum"]
  
const saas = [`sa`,`sea`,`selam`,`selamün aleyküm`,`selamun aleykum`]; 
  
if(saas.includes(msg.content.toLowerCase())){
  
if(msg.guild.id == "913024821787500575") msg.reply(`Aleyküm Selam, ${nasılsın[Math.floor(Math.random() * nasılsın.length)]}`).catch(err => console.log("Hata Oluştu; " + err)); 
}
})



  setInterval(() => {
const pingkanal = client.channels.cache.get(`1001585213761134774`)
    const ping = client.ws.ping
    var sonucc = ping < 500 ? `🟢 Ping: ${ping}ms`:`🔴 Ping: ${ping}ms`;
  pingkanal.setName(sonucc)
  
   }, 60000); 



  
//////////////////////////////////////////////////////////////////////////////////////////////////////



async function mongostatus() {
let a = " ";
let mses = " ";
let b = mongoose.connection.readyState

if(b === 0) a = "Bağlantı Yok"

if(b === 1) a = "Bağlı"

if(b === 2) a = "Bağlanılıyor"

if(b === 3) a = "Bağlantı Kesiliyor"

if(b === 99) a = "Aktif Değil"

if(b === 0) mses = "🔴 MongoDB: Bağlantı yok"

if(b === 1) mses = "🟢 MongoDB: Bağlı"

if(b === 2) mses = "🟡 MongoDB: Bağlanılıyor"

if(b === 3) mses = "🔴 MongoDB: Bağlantı kesiliyor"

if(b === 99) mses = "🔴 MongoDB: Aktif değil"

  console.log(`MongoDB Kontrol Edildi Durum: ${a} |  ${moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")}`);
if(b === 1) {
          let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
   
     await moonvostats.findOneAndUpdate({
            dataid: "112233445566778899"
        }, {
            $set: {
                    last_mongo_control_time: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")
            },
        });
  let mongo_kanal = client.channels.cache.get('1051515791406809168')
  const clientembed = new MessageEmbed()
  .setTitle('MongoDB Kontrol Edildi')
  .addField(`MongoDB Durumu:`,`${a}`)
  .addField('Kontrol zamanı:', `${moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")}`)
  .addField('Bundan Önceki Kontrol zamanı:', `${moonvo_statss.last_mongo_control_time || 'NaN'}`)
  .addField('Ping:', `${client.ws.ping}`)
  .setFooter('MoonVo MongoDB Control(s) system!')
  .setTimestamp()
  .setColor("YELLOW")
  .setThumbnail('https://i.hizliresim.com/jlddu54.png')
  mongo_kanal.send({ embeds: [clientembed] }).catch(err => console.log("Hata Oluştu; " + err)); 

} else {
  let mongo_kanal = client.channels.cache.get('1051515791406809168')
  const clientembed = new MessageEmbed()
  .setTitle('MongoDB Kontrol Edildi! Bağlanılamadı.')
  .setDescription('Tekrar Bağlanmayı Deneniyorum.')
  .addField(`MongoDB Durumu:`,`${a}`)
  .addField('Kontrol zamanı:', `${moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")}`)
  .addField('Ping:', `${client.ws.ping}`)
  .setFooter('MoonVo MongoDB Control(s) system!')
  .setTimestamp()
  .setColor("RED")
  .setThumbnail('https://i.hizliresim.com/jlddu54.png')
  mongo_kanal.send({ embeds: [clientembed] }).catch(err => console.log("Hata Oluştu; " + err)); 
  mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Unable to connect to MongoDB Database.\nError: ' + err)
})
}
    let mongolastses = client.channels.cache.get(`1051530427300597790`)
  const mdblast = `Mdb lst Control: ${moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")}`
   mongolastses.setName(mdblast).catch(err => console.log("Hata Oluştu; " + err)); 
let mongoses = client.channels.cache.get(`1051524937925525644`)

  mongoses.setName(mses).catch(err => console.log("Hata Oluştu; " + err)); 
}

setInterval(mongostatus, 600000);



  
async function killauto() {
    get(`https://discord.com/api/v10/gateway`, async ({ statusCode }) => {
      if (statusCode == 429) {
        process.kill(1);
      }
     console.log(`Client kontrol edildi | ${moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")} | Status: ${statusCode}`);
          let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
    let uptime = moment.duration(Date.now() - client.readyAt.getTime()).format(`D [gün,] H [saat,] m [dakika,] s [saniye]`);
     await moonvostats.findOneAndUpdate({
            dataid: "112233445566778899"
        }, {
            $set: {
                    last_control_time: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")
            },
        });
  let kontrol_kanal = client.channels.cache.get('1036690790266703992')
  const clientembed = new MessageEmbed()
  .setTitle('Uygulama Kontrol edildi ve aktif!')
  .addField('Kontrol zamanı:', `${moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")}`)
  .addField('StatusCode:',`${statusCode}`)
  .addField('Bundan Önceki Kontrol zamanı:', `${moonvo_statss.last_control_time || 'NaN'}`)
  .addField('Uptime:', `${uptime}`)
  .addField('Ping:', `${client.ws.ping}`)
  .setFooter('MoonVo Client Control(s) system!')
  .setTimestamp()
  .setColor("YELLOW")
  .setThumbnail('https://i.hizliresim.com/jlddu54.png')
  kontrol_kanal.send({ embeds: [clientembed] }).catch(err => console.log("Hata Oluştu; " + err)); 
    });

 
}

setInterval(killauto, 600000);






client.on("guildMemberRemove", async (member) => {
  if(member.guild.id !== "913024821787500575") return;
          let data = await user_profile.findOne({ user_id: member.id }); 
  if(!data) return;
await user_profile.deleteOne({ user_id: member.id })
});
  
client.on("guildDelete", async (guild) => {
  
          let data = await servers.findOne({ guildId: guild.id }); 
  if(!data) return;
await servers.deleteOne({ guildId: guild.id })
});


    localStorage.clear();
     ////bundpan sonra kod yazamazsın // Yo yazarım
})()
////bundan sonra kod yazamazsın client kapanışı bu async


