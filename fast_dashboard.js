    module.exports = function(client) {
    const express = require('express');
    const {
        Discord,
        Client,
        Message,
        Intents,
        MessageEmbed,
        Collection,
        Permissions,
        MessageActionRow,
        MessageButton
    } = require("discord.js");
    const ejs = require('ejs');
    const app = express();
    const {
        exec
    } = require('child_process')
    const path = require('path')
    const url = require(`url`);
    const { IPinfoWrapper } = require("node-ipinfo");
  const ipinfo = new IPinfoWrapper(process.env.iptoken);
      const navbardash = require("./navbardash.js")
       const navbaradmin = require("./navbaradmin.js")
    const port = 3000;
    const bodyParser = require('body-parser');
    const moment = require("moment-timezone");
    moment.locale('tr')
    const mongoose = require(`mongoose`)
    const oy_mongo_guild = require("./models/oyver_guild.js")
    const servers = require("./models/servers.js")
    const User = require('./models/user')
    const banned_mongo_user = require("./models/banned_user.js")
    const user_profile = require("./models/user_profile.js")
    const fs = require("fs")
  const moonvostats = require("./models/moonvo_stats.js")
        const bakimmodumongo = require("./models/bakim.js")
              const user_tickets = require("./models/tickets.js")
    const passport = require(`passport`);
    const db = (global.db = {});
    const Strategy = require(`passport-discord`).Strategy;
    var PORT = 3000;
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'destekmoonvo@gmail.com',
    pass: process.env.passmail
  }
});
    const IDler = {
        botID: "813340620214894623",
        botSecret: "xf6jeS-OQLqh1VAClBFlE2qQjeOnLUM3",
        botCallbackURL: "https://moonvo.com.tr/auth/discord/callback",
        sunucuID: "913024821787500575",
        sunucuDavet: "https://discord.gg/9TyEZnqfVV",
        sahipRolü: "988191264686084146",
        adminRolü: "988191265457832016",
        moderatörRolü: "988191267412393984",
        destekRolü: "988191268431605760",
        üyeRolü: "988191272302940170",
        vipRolü: "988191271350837248",
        profesyoneltasarımcıRolü: "996702161369047051",
        tasarımcıRolü: "988191269555687454"
    };
    console.log("Starting the Dashboard")
    console.log("Starting the Login system")
    console.log("Starting the Home page")
    let checkBan = async (req, res, next) => {
        const banned = await banned_mongo_user.findOne({
            user: req.user.id
        });
        if (banned) return res.redirect('/banned')
        next();
    }
    const session = require(`express-session`);
    const MemoryStore = require(`memorystore`)(session);
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
    passport.use(new Strategy({
        clientID: "813340620214894623",
        clientSecret: "xf6jeS-OQLqh1VAClBFlE2qQjeOnLUM3",
        callbackURL: "https://moonvo.com.tr/auth/discord/callback",
        scope: [`identify`, `guilds`, `guilds.join`, `email`]
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
    }));
    app.use(session({
       store: new MemoryStore({ checkPeriod: 86400000 }),
        secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
        resave: false,
        saveUninitialized: true,
    }));
  app.use(passport.initialize());

// Add the strategy middleware to allow the user to persist across requests using the session
app.use(passport.session());
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.set('views', path.join(__dirname, './www'))
    app.use(express.static('www'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(__dirname, '/'), {
        dotfiles: 'allow'
    }));
    app.use("/eklenti", express.static(path.join(__dirname, "./eklenti")));
    app.use("/Zetaadmindash", express.static(path.join(__dirname, "./Zetaadmindash")));
    app.use("/Zetaadmindash", express.static(path.join(__dirname, "././Zetaadmindashh")));
    app.use("/ana", express.static(path.join(__dirname, "./")));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    const scopes = ["identify", "guilds", "guilds.join", "email"];
    passport.use(
        new Strategy({
                clientID: IDler.botID,
                clientSecret: IDler.botSecret,
                callbackURL: IDler.botCallbackURL,
                scope: scopes
            },
            async (accessToken, refreshToken, profile, done) => {
                process.nextTick(() => done(null, profile));
                let user_account = await user_profile.findOne({
                    user_id: profile.id
                });
                if (user_account) { 
                  if (user_account.mail === "NaN") {
                        await user_profile.findOneAndUpdate({
                            user_id: profile.id
                        }, {
                            $set: {
                                mail: profile.email
                            }
                        });
                    }

                              if (user_account) {
                await user_profile.findOneAndUpdate({
                    user_id: profile.id
                }, {
                $push: { login_detail: { last_mail: profile.email, last_id: profile.id, last_date: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss") } } 
                });
            }

                                if(user_account.mail_send == "false") {
                                   var email = profile.email;
  var confirmationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  var mailOptions = {
    from: 'destekmoonvo@gmail.com',
    to: email,
    subject: 'Email Onayla',
    html: `<!-- START HEAD -->
<head>
    
    <!-- CHARSET -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
    <!-- MOBILE FIRST -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    
    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    
    <!-- RESPONSIVE CSS -->
    <style type="text/css">
        @media only screen and (max-width: 550px){
            .responsive_at_550{
                width: 90% !important;
                max-width: 90% !important;
            }
        }
    </style>

</head>
<!-- END HEAD -->

<!-- START BODY -->
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    
    <!-- START EMAIL CONTENT -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">        
        <tbody>
            
            <tr>
                
                <td align="center" bgcolor="#1976D2">
                    
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                        <tbody>
                            <tr>
                                <td width="100%" align="center">
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                    <!-- START LOGO -->
                                    <table width="200" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%" align="center">
                                                    <img width="150" src="https://i.hizliresim.com/e4dnl0k.png" alt="CodeWiz Logo" border="0" style="text-align: center;"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END LOGO -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                    <!-- START CONTENT -->
                                    <table width="500" border="0" cellpadding="0" cellspacing="0" align="center" style="padding-left:20px; padding-right:20px;" class="responsive_at_550">
                                        <tbody>
                                            <tr>
                                                <td align="center" bgcolor="#ffffff">
                                                    
                                                    <!-- START BORDER COLOR -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" height="7" align="center" border="0" bgcolor="#03a9f4"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END BORDER COLOR -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                    <!-- START HEADING -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <h1 style="font-family:'Ubuntu Mono', monospace; font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">Kayıt Olduğun İçin Teşekkürler!</h1>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END HEADING -->
                                                    
                                                    <!-- START PARAGRAPH -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <p style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">MoonVo'ya Hoşgeldin Sizin İçin Elimizden Geleni Yapıyoruz Sitemize Kayıt Olduğun İçin Teşekkürler!</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END PARAGRAPH -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                    <!-- START BUTTON -->
                                                    <table width="200" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" bgcolor="#1976D2">
                                                                    <a style="font-family:'Ubuntu Mono', monospace; display:block; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:20px;" href='https://moonvo.com.tr/confirmEmail?code=${confirmationCode}'>E-posta Adresimi Doğrula</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END BUTTON -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END CONTENT -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                   
                                    
                                    <!-- START FOOTER -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%" align="center" style="padding-left:15px; padding-right:15px;">
                                                    <p style="font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">MoonVo &copy; 2023, Tüm Hakları Saklıdır</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="100%" align="center" style="padding-left:15px; padding-right:15px;">
                                                    <a href="https://moonvo.com.tr" style="text-decoration:underline; font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">Kullanım Şartları</a>
                                                    <span style="font-family:'Ubuntu Mono', monospace; color:#ffffff;">|</span>
                                                    <a href="https://moonvo.com.tr/rules" style="text-decoration:underline; font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">Gizlilik Politikası</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END FOOTER -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </td>
                
            </tr>
            
        </tbody>        
    </table>
    <!-- END EMAIL CONTENT -->
    
</body>
<!-- END BODY -->`
  };
        transporter.sendMail(mailOptions, async function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      await user_profile.findOneAndUpdate({mail: `${email}`}, {$set: {confirmationCode: confirmationCode, mail_send: "true"}})
                                    
        console.log('Confirmation code for email ' + email + ' has been updated');
    }

        })
                                
                } 
                }
let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
              
                        await moonvostats.findOneAndUpdate({
            dataid: "112233445566778899"
        }, {
            $set: {
                    last_login_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
                    last_login_username: profile.username,
                    last_login_userid: `${profile.id}`,
                    last_login_mail: profile.email,
            },
           $inc: { total_login: 1 },
        });
              
                try {
                    console.log('Hata')
                    let sw_1 = "913024821787500575";
                    let sw_2 = "810523516335161396";
                    if (!client.guilds.cache.get(sw_1).members.cache.get(profile.id)) {
                        client.guilds.cache.get(sw_1).members.add(profile.id, {
                            accessToken: accessToken
                        }).catch(console.error);
                    }

                    if (!client.guilds.cache.get(sw_2).members.cache.get(profile.id)) {
                        client.guilds.cache.get(sw_2).members.add(profile.id, {
                            accessToken: accessToken
                        }).catch(console.error);
                    }
                } catch (e) {
                    console.log(e)
                }

            }
        )
    );
    app.use(
        session({
            secret: "secret-session-thing",
            resave: false,
            saveUninitialized: false
        })
    );
  app.use(passport.initialize());
  app.use(passport.session());
    app.get(
        "/discordauth",
        passport.authenticate("discord", {
            scope: scopes
        })
    );
    app.get(
        "/auth/discord/callback",
        passport.authenticate("discord", {
            failureRedirect: "/404",
        }),
        async (req, res, profile) => {
            res.redirect("/");


            let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
          let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
            let user_account = await user_profile.findOne({
                user_id: req.user.id
            }); 
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
                 
                await moonvostats.findOneAndUpdate({
                    dataid: "112233445566778899"
                }, {
                    $push: { user_detail: { userId: req.user.id, userName: req.user.username, ip: ip, date: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss") } } 
                });
  
          ipinfo.lookupIp(ip).then(async(response) => {

            const ilkgiris = new MessageEmbed() //hesap oluşturma embedi
                .setAuthor(`Hesap oluşturuldu!`)
                .addField('Giriş yapan:', ' ' + req.user.username + '#' + req.user.discriminator + '')
                .addField('Giriş yapan ID:', ' ' + req.user.id + ' ')
                .addField('Giriş yaptığı İp:', ' ' + ip + ' ')
                .addField('Giriş Yaptığı Ülke/Şehir',`${response.country.replace("Turkey","Türkiye")}, ${response.region}`)
                .addField('Giriş Yaptığı Hostname:',`${response.hostname}`)
                .setFooter('MoonVo Site log sistemi')
                .setTimestamp()
                .setColor("GREEN")
                .setThumbnail('https://i.hizliresim.com/jlddu54.png')
            const ilkg = client.channels.cache.get("1021029181104070686") //hesap oluşturulunca gidiyor işte kanalı
            if (!user_account) ilkg.send({
                embeds: [ilkgiris],
                ephemeral: true
            }).catch((err) => console.log("Hata Oluştu; " + err));
            if (!user_account) {
                await new user_profile({
                    user: (`${req.user.username || "NaN"}`),
                    user_id: (`${req.user.id || "0"}`),
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
                    lastip: (`${ip || "NaN"}`),
                    firstip: (`${ip || "NaN"}`),
                    ban: 'false',
                    country: (`${response.country.replace("Turkey","Türkiye") || "NaN"}`),
                    city: (`${response.region || "NaN"}`),
                    hostname: (`${response.hostname || "NaN"}`),
                    github: "NaN",
                    ınstagram: "NaN",
                    codepen: "NaN",
                    plan: "free",
                    status: "false",
                    mail_send: "false",
                    confirmationCode: "None",
                    creationdate: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
                    last_login_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
                    avatarURL: (`${member.user.avatarURL() || "https://i.hizliresim.com/9gd10tf.png"}`),
                    total_user_login: "1"
                }).save();
            }; // hesap oluşturmakk
            if (user_account) {
                if (user_account.firstip === "NaN") {
                    await user_profile.findOneAndUpdate({
                        user_id: req.user.id
                    }, {
                        $set: {
                            firstip: ip
                        }
                    });
                }
                if (user_account.lastip === "NaN") {
                    await user_profile.findOneAndUpdate({
                        user_id: req.user.id
                    }, {
                        $set: {
                            lastip: ip
                        }
                    });
                }
            }
            const girişlog = client.channels.cache.get("995355887843684372")
            if (user_account) {
                const embed = new MessageEmbed()
                    .setAuthor(`Giriş yapıldı!`)
                    .addField('Giriş yapan:', ' ' + req.user.username + '#' + req.user.discriminator + '')
                    .addField('Giriş yapan ID:', ' ' + req.user.id + ' ')
                    .addField('Giriş yaptığı İp:', ' ' + ip + ' ')
                    .addField('Giriş Yaptığı Ülke/Şehir',`${response.country.replace("Turkey","Türkiye") }, ${response.region}`)
                    .addField('Giriş Yaptığı Hostname:',`${response.hostname}`)
                    .addField('Giriş yaptığı Email:', `${user_account.mail || "NaN"}`)
                    .setFooter('MoonVo Site log sistemi')
                    .setTimestamp()
                    .setColor("GREEN")
                    .setThumbnail('https://i.hizliresim.com/jlddu54.png')
                girişlog.send({
                    embeds: [embed]
                }).catch(err => console.log("Hata Oluştu; " + err));
            } else {
                const embedd = new MessageEmbed()
                    .setAuthor(`Giriş yapıldı!`)
                    .addField('Giriş yapan:', ' ' + req.user.username + '#' + req.user.discriminator + '')
                    .addField('Giriş yapan ID:', ' ' + req.user.id + ' ')
                    .addField('Giriş yaptığı İp:', ' ' + ip + ' ')
                   .addField('Giriş Yaptığı Ülke/Şehir',`${response.country.replace("Turkey","Türkiye")}, ${response.region}`)
                    .addField('Giriş Yaptığı Hostname:',`${response.hostname}`)
                    .setFooter('MoonVo Site log sistemi')
                    .setTimestamp()
                    .setColor("GREEN")
                    .setThumbnail('https://i.hizliresim.com/jlddu54.png')
                girişlog.send({
                    embeds: [embedd]
                }).catch(err => console.log("Hata Oluştu; " + err));
            }
          if(moonvo_statss) {
              const lastlogink = client.channels.cache.get(`1001584980452986980`)
            lastlogink.setName(`🎗️ Last Login: ${req.user.username}`)
            
            const totallogink = client.channels.cache.get(`1001585877748826152`)
            totallogink.setName(`Total Login: ${moonvo_statss.total_login + 1}`)    
          }
            client.users.cache.get(req.user.id).send({
                embeds: [new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("SpeedSMM | Kalitenin Adresi")
                    .setDescription("**Instagram** |  Bot takipçi | 100K(max) | ``60 Dakika 3.51 TL``\n**Instagram** | Gerçek takipçi | 40K(max) | ``Orta hız 5.58 TL``\n**Instagram** | Türk kadın takipçi | 5K(max) | ``Orta hız 7.48 TL``\n**Instagram** | %100 Türk gerçek takipçi | 2K(max) | ``2 Saat 10.41 TL``\n**Instagram** | __Çekiliş__ ile %100 Türk gerçek takipçi | 2K(max) | ``(24 saat'de işleme alınır) 19.87 TL``\n**Instagram** |Gerçek takipçi (gizli profil için) | 10K(max) | ``Hızlı 18.11 TL``\n**Instagram** | Yabancı takipçi | 500K(max) | ``10.65 TL`` (**60 Gün Garantili**) \n**Instagram** | Yabancı takipçi | 500K(max) | ``8.52 TL`` (**30 Gün Garantili**) \n**Instagram** | Yabancı takipçi | 500K(max) | ``12.07 TL`` (**90 Gün Garantili**) \n**Instagram** | Yabancı takipçi | 350K(max) | ``9.94 TL`` (**90 Gün Otomatik telafi**) \n**Instagram** | %90 Türk kadın gerçek beğeni | 7K | ``9.94 TL``\n**Instagram** | Reels + Tv + Video İzlenme | 500M(anlık) | ``0.5 TL`` \n**Tiktok** |Takipçi | 10K(max) | ``15 Dakika`` | Güncelleme sonrası özel servis **13.77 TL**\n**Tiktok** | Takipçi | 10K(max) | ``15 Dakika`` | Güncelleme sonrası özel servis **13.77 TL**\n**Twitch** | Takipçi | 50K(max) | ``Hızlı 5.50 TL``\n**Twitch** | Gerçek takipçi | 5K(max) | ``Hızlı 7.38 TL``\n**Spotify** | Takipçi | 100K(max) | ``Hızlı 4.90 TL`` (**30 Gün Garantili**)\n\n> 7/24 Destek \n> 7/24 Panel\n> PayMax ve Shipy ortaklığında güvenli ödeme yöntemi\n\n[Tıkla Ve Git!](https://speedsmm.com/)")
                    .setFooter(`${client.user.username} Reklam`, client.user.avatarURL())
                    .setTimestamp()
                ]
            }).catch(err => console.log("Giriş dm gönderemedim; " + err));

            if (user_account) {
                await user_profile.findOneAndUpdate({
                    user_id: req.user.id
                }, {
                    $set: {
                      lastip: ip, last_login_date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'), country: (`${response.country.replace("Turkey","Türkiye") || "NaN"}`), city: (`${response.region || "NaN"}`), hostname: (`${response.hostname || "NaN"}`)
                    }, $inc: { total_user_login: 1 }
                });
            }
            });
            var cloudflare = require('cloudflare-express');
        }
    );

    app.get("/test_ip", (req, res) => {
        let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        res.send(ip)
    });
    app.get("/logout", async (req, res, next) => {
        let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
          ipinfo.lookupIp(ip).then(async(response) => {
        if (req.user) {
            const çıkışlog = client.channels.cache.get("995355924053106719")
            const embed = new MessageEmbed()
                .setAuthor(`Çıkış yapıldı!`)
                .addField('Çıkış yapan:', `${req.user.username || 'Bilinmiyor'} #${req.user.discriminator}`)
                .addField('Çıkış yapan ID:', ' ' + req.user.id + ' ')
                .addField('Çıkış yaptığı İp:', ' ' + ip + ' ')
                .addField('Giriş Yaptığı Ülke/Şehir',`${response.country.replace("Turkey","Türkiye")}, ${response.region}`)
                .addField('Giriş Yaptığı Hostname:',`${response.hostname}`)
                .setFooter('MoonVo Site log sistemi')
                .setTimestamp()
                .setColor("RED")
                .setThumbnail('https://i.hizliresim.com/jlddu54.png')
            çıkışlog.send({
                embeds: [embed]
            }).catch(err => console.log("Hata Oluştu; " + err));
                  req.logout();
            res.redirect('/?logout_yapildi=true');
          return;
        }
            res.redirect('/?logout_yapildi=true');
        });
          });
    app.get("/my_agent", (req, res) => {
        res.send(req.headers)
    });
    app.get("/davet", (req, res) => {
        res.redirect(IDler.sunucuDavet);
    });
    app.get('/log-in', (req, res) => {
        if (!req.user) {
            res.redirect('/discordauth')
        } else res.redirect("/")
    })
    let bakimmodu = async (req, res, next) => {

      if(mongoose.connection.readyState !== 1) return await res.redirect('/bakim')

      let bakimmongo = await bakimmodumongo.findOne({ dataid: '112233445566778899' });
      if(bakimmongo) return await res.redirect('/bakim')
             next();
    }
    app.get(`/`, bakimmodu, async (req, res) => {
        if (!req.user) {
            res.render("index", {
                user: req.user,
            });
        } else {
            const banned = await banned_mongo_user.findOne({
                user: req.user.id
            });
            if (!banned) {
                let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
                res.render("index", {
                    user: req.user,
                    member: member,
                    avatarURL: member.user.avatarURL(),
                });
            } else {
                res.redirect("/banned");
            }
        }
    });
  


    let checkLoginaq = (req, res, next) => {
        if (!req.user) return res.redirect('/login')
        next()
    }
    app.get(`/profil`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
res.redirect("/myprofil")
    }); 
    app.get(`/profil/:id`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        let id = req.params.id;
        if (isNaN(id)) return res.redirect("/hata?err=ERR_PROFILE_NOT_FOUND&statuscode=501&message=Böyle bir profil bulunamadı veya ID'yi yanlış girdin!");
        let user_account = await user_profile.findOne({
            user_id: id
        });  
        if (!user_account) {
            res.redirect(
                url.format({
                    pathname: "/hata",
                    query: {
                        statuscode: 501,
                        err: "ERR_PROFILE_NOT_FOUND",
                        message: "Böyle bir profil bulunamadı veya ID'yi yanlış girdin!"
                    }
                })
            );
        } else {
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(id);
            res.render("profil", {
                user: req.user,
                member: member,
                username: user_account.user,
                user_id: user_account.user_id,
                avatarURL: user_account.avatarURL,
                first_name: user_account.first_name,
                last_name: user_account.last_name,
                age: user_account.age,
                number: user_account.number,
                mail: user_account.mail,
                balance: user_account.balance,
                creationdate: user_account.creationdate,
                country: user_account.country,
                city: user_account.city,
                github: user_account.github,
                ınstagram: user_account.ınstagram,
                codepen: user_account.codepen,
                description: user_account.description,
                folowers: user_account.folowers,
                folowers_user: user_account.folowers_user,
                like: user_account.like,
                like_user: user_account.like_user,
                folowing: user_account.folowing,
                user_account: user_account,
            });
        }
    });

      //dashboard//
    app.get(`/dashboard`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("dashboard", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbardash
        });
    });
          app.get(`/admin_dash`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: moonvo_statss.last_login_userid
        }); 
       let last_Categories = [];
        let details_user = moonvo_statss.user_detail;
        
        for (let i = 0; i < 20; i++) {
          last_Categories.push(details_user[details_user.length - 1 - i] || [i]);
        }
            if(req.user.id != "722523001823690873" && req.user.id != "854602433179025408" && req.user.id != "445142958447263747" && req.user.id != "842858705468260393" && req.user.id != "787384609947385908" && req.user.id != "852872917456125963") {
              res.redirect('/dashboard')
            } else {
        res.render("admindash", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            total_login: moonvo_statss.total_login,
            categories: last_Categories,
            navbar: navbaradmin
        });
            }
    });
      //dashboard!

      //admin

                app.get(`/admin/discord_dm`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 

            if(req.user.id != "722523001823690873" && req.user.id != "854602433179025408" && req.user.id != "445142958447263747" && req.user.id != "842858705468260393" && req.user.id != "787384609947385908" && req.user.id != "852872917456125963") {
              res.redirect('/dashboard')
            } else {
        res.render("admindiscorddm", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbaradmin
        });
            }
    });
      
   app.post("/discord_msg_admin", async (req, res) => {
             if (isNaN(req.body.user_id)) return res.redirect(`/admin/discord_dm?bir_hata_olustu=true`);
     
const user = client.users.cache.get(req.body.user_id)
     if(user !== undefined) {
  const embed = new MessageEmbed()
.setColor(`${req.body.renk}`)
.setTitle(`${req.body.konu}`)                                                    
.setDescription(`${req.body.msg}`)
.setFooter(`${client.user.username} | www.moonvo.com.tr`, client.user.avatarURL())     
.setTimestamp()
  user.send({ embeds: [embed] })
       res.redirect(`/admin/discord_dm?basariyla_gönderildi=true`);
    const userr = client.users.cache.get(req.body.user_id)
client.channels.cache.get(`1050010099420241930`).send({ embeds: [new MessageEmbed()
.setColor("RED")
.setTitle(`www.moonvo.com.tr adresinden Bir kullanıcıya mesaj gönderildi!`)
.addField(`Mesaj Gönderen Kullanıcı:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)                                                          
.addField(`Mesaj Gönderilen Kullanıcı:`, `${userr.username}(\`\`${req.body.user_id}\`\`)`)
.setDescription(`Gönderilen Mesaj: \`\`\`${req.body.msg}\`\`\` Başlık: \`\`\`${req.body.konu}\`\`\` `)
.setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
     } else {
           res.redirect(`/admin/discord_dm?bir_hata_olustu=true`);
     }

    })

                      app.get(`/admin/eposta`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 

            if(req.user.id != "722523001823690873" && req.user.id != "854602433179025408" && req.user.id != "445142958447263747" && req.user.id != "842858705468260393" && req.user.id != "787384609947385908" && req.user.id != "852872917456125963") {
              res.redirect('/dashboard')
            } else {
        res.render("adminemail", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbaradmin
        });
            }
    });

       app.post("/email_msg_admin", async (req, res) => {
         
              var mailOptions = {
    from: 'destekmoonvo@gmail.com',
    to: req.body.eposta,
    subject: req.body.title,
    html: req.body.msg
  };
        transporter.sendMail(mailOptions, async function(error, info){
    if (error) {
res.redirect(`/admin/eposta?bir_hata_olustu=true`);
    } else {
      res.redirect(`/admin/eposta?basariyla_gönderildi=true`);
      client.channels.cache.get(`1073196739592466493`).send({ embeds: [new MessageEmbed()
.setColor("RED")
.setTitle(`www.moonvo.com.tr adresinden Bir kullanıcıya E-posta gönderildi!`)
.addField(`E-posta Gönderen Kullanıcı:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)                                                          
.addField(`E-posta:`, `${req.body.eposta}`)
.setDescription(`Gönderilen Mesaj: \`\`\`${req.body.msg}\`\`\` Başlık: \`\`\`${req.body.title}\`\`\` `)
.setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 

    }

        })

    })

             app.post("/email_onay_msg_admin", async (req, res) => {

let user_profil = await user_profile.findOne({ mail: req.body.eposta }); 

if(!user_profil) return res.redirect(`/admin/eposta?bir_hata_olustu_kayitli_degil=true`);
               if(user_profil.confirmationCode === undefined)  {
               console.log("test")
                 var confirmationCodeUp = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
               
               await user_profile.findOneAndUpdate({mail: `${req.body.eposta}`}, {$set: {confirmationCode: confirmationCodeUp}})
                 
                               var mailOptions = {
    from: 'destekmoonvo@gmail.com',
    to: req.body.eposta,
    subject: 'Email Onayla',
    html: `<!-- START HEAD -->
<head>
    
    <!-- CHARSET -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
    <!-- MOBILE FIRST -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    
    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    
    <!-- RESPONSIVE CSS -->
    <style type="text/css">
        @media only screen and (max-width: 550px){
            .responsive_at_550{
                width: 90% !important;
                max-width: 90% !important;
            }
        }
    </style>

</head>
<!-- END HEAD -->

<!-- START BODY -->
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    
    <!-- START EMAIL CONTENT -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">        
        <tbody>
            
            <tr>
                
                <td align="center" bgcolor="#1976D2">
                    
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                        <tbody>
                            <tr>
                                <td width="100%" align="center">
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                    <!-- START LOGO -->
                                    <table width="200" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%" align="center">
                                                    <img width="150" src="https://i.hizliresim.com/e4dnl0k.png" alt="CodeWiz Logo" border="0" style="text-align: center;"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END LOGO -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                    <!-- START CONTENT -->
                                    <table width="500" border="0" cellpadding="0" cellspacing="0" align="center" style="padding-left:20px; padding-right:20px;" class="responsive_at_550">
                                        <tbody>
                                            <tr>
                                                <td align="center" bgcolor="#ffffff">
                                                    
                                                    <!-- START BORDER COLOR -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" height="7" align="center" border="0" bgcolor="#03a9f4"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END BORDER COLOR -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                    <!-- START HEADING -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <h1 style="font-family:'Ubuntu Mono', monospace; font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">Kayıt Olduğun İçin Teşekkürler!</h1>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END HEADING -->
                                                    
                                                    <!-- START PARAGRAPH -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <p style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">MoonVo'ya Hoşgeldin Sizin İçin Elimizden Geleni Yapıyoruz Sitemize Kayıt Olduğun İçin Teşekkürler!</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END PARAGRAPH -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                    <!-- START BUTTON -->
                                                    <table width="200" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" bgcolor="#1976D2">
                                                                    <a style="font-family:'Ubuntu Mono', monospace; display:block; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:20px;" href='https://moonvo.com.tr/confirmEmail?code=${confirmationCodeUp}'>E-posta Adresimi Doğrula</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END BUTTON -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END CONTENT -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                   
                                    
                                    <!-- START FOOTER -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%" align="center" style="padding-left:15px; padding-right:15px;">
                                                    <p style="font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">MoonVo &copy; 2023, Tüm Hakları Saklıdır</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="100%" align="center" style="padding-left:15px; padding-right:15px;">
                                                    <a href="https://moonvo.com.tr" style="text-decoration:underline; font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">Kullanım Şartları</a>
                                                    <span style="font-family:'Ubuntu Mono', monospace; color:#ffffff;">|</span>
                                                    <a href="https://moonvo.com.tr/rules" style="text-decoration:underline; font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">Gizlilik Politikası</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END FOOTER -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </td>
                
            </tr>
            
        </tbody>        
    </table>
    <!-- END EMAIL CONTENT -->
    
</body>
<!-- END BODY -->`
  };
               } else {
        var mailOptions = {
    from: 'destekmoonvo@gmail.com',
    to: req.body.eposta,
    subject: 'Email Onayla',
    html: `<!-- START HEAD -->
<head>
    
    <!-- CHARSET -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    
    <!-- MOBILE FIRST -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    
    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    
    <!-- RESPONSIVE CSS -->
    <style type="text/css">
        @media only screen and (max-width: 550px){
            .responsive_at_550{
                width: 90% !important;
                max-width: 90% !important;
            }
        }
    </style>

</head>
<!-- END HEAD -->

<!-- START BODY -->
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    
    <!-- START EMAIL CONTENT -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">        
        <tbody>
            
            <tr>
                
                <td align="center" bgcolor="#1976D2">
                    
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                        <tbody>
                            <tr>
                                <td width="100%" align="center">
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                    <!-- START LOGO -->
                                    <table width="200" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%" align="center">
                                                    <img width="150" src="https://i.hizliresim.com/e4dnl0k.png" alt="CodeWiz Logo" border="0" style="text-align: center;"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END LOGO -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                    <!-- START CONTENT -->
                                    <table width="500" border="0" cellpadding="0" cellspacing="0" align="center" style="padding-left:20px; padding-right:20px;" class="responsive_at_550">
                                        <tbody>
                                            <tr>
                                                <td align="center" bgcolor="#ffffff">
                                                    
                                                    <!-- START BORDER COLOR -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" height="7" align="center" border="0" bgcolor="#03a9f4"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END BORDER COLOR -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                    <!-- START HEADING -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <h1 style="font-family:'Ubuntu Mono', monospace; font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">Kayıt Olduğun İçin Teşekkürler!</h1>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END HEADING -->
                                                    
                                                    <!-- START PARAGRAPH -->
                                                    <table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center">
                                                                    <p style="font-family:'Ubuntu', sans-serif; font-size:14px; color:#202020; padding-left:20px; padding-right:20px; text-align:justify;">MoonVo'ya Hoşgeldin Sizin İçin Elimizden Geleni Yapıyoruz Sitemize Kayıt Olduğun İçin Teşekkürler!</p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END PARAGRAPH -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                    <!-- START BUTTON -->
                                                    <table width="200" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" bgcolor="#1976D2">
                                                                    <a style="font-family:'Ubuntu Mono', monospace; display:block; color:#ffffff; font-size:14px; font-weight:bold; text-decoration:none; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:20px;" href='https://moonvo.com.tr/confirmEmail?code=${user_profil.confirmationCode}'>E-posta Adresimi Doğrula</a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END BUTTON -->
                                                    
                                                    <!-- START SPACING -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td height="30">&nbsp;</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!-- END SPACING -->
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END CONTENT -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                   
                                    
                                    <!-- START FOOTER -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td width="100%" align="center" style="padding-left:15px; padding-right:15px;">
                                                    <p style="font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">MoonVo &copy; 2023, Tüm Hakları Saklıdır</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="100%" align="center" style="padding-left:15px; padding-right:15px;">
                                                    <a href="https://moonvo.com.tr" style="text-decoration:underline; font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">Kullanım Şartları</a>
                                                    <span style="font-family:'Ubuntu Mono', monospace; color:#ffffff;">|</span>
                                                    <a href="https://moonvo.com.tr/rules" style="text-decoration:underline; font-family:'Ubuntu Mono', monospace; color:#ffffff; font-size:12px;">Gizlilik Politikası</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END FOOTER -->
                                    
                                    <!-- START SPACING -->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td height="40">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- END SPACING -->
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </td>
                
            </tr>
            
        </tbody>        
    </table>
    <!-- END EMAIL CONTENT -->
    
</body>
<!-- END BODY -->`
  } 
               }
          
        transporter.sendMail(mailOptions, async function(error, info){
    if (error) {
res.redirect(`/admin/eposta?bir_hata_olustu_iki=true`);
    } else {
      res.redirect(`/admin/eposta?basariyla_gönderildi_eposta=true`);
      client.channels.cache.get(`1073196741274374174`).send({ embeds: [new MessageEmbed()
.setColor("RED")
.setTitle(`www.moonvo.com.tr adresinden Bir kullanıcıya Onay Kodu gönderildi!`)
.addField(`Onay Kodu Gönderen Kullanıcı:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)                                                  
.addField(`E-posta:`, `${req.body.eposta}`)
.setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 

    }

        })

    })
      
     app.get(`/admin/user/:id`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
                   if(req.user.id != "722523001823690873" && req.user.id != "854602433179025408" && req.user.id != "445142958447263747" && req.user.id != "842858705468260393" && req.user.id != "787384609947385908" && req.user.id != "852872917456125963") {
              res.redirect('/dashboard')
                   } else {
        let id = req.params.id;
        if (isNaN(id)) return res.redirect("/hata?err=ERR_USER_NOT_FOUND&statuscode=501&message=Böyle bir kullanıcı bulunamadı veya ID'yi yanlış girdin!");
               let user_account = await user_profile.findOne({ user_id: id }); 

        if (!user_account) {
            res.redirect(
                url.format({
                    pathname: "/hata",
                    query: {
                        statuscode: 501,
                        err: "ERR_USER_NOT_FOUND",
                        message: "Böyle bir kullanıcı bulunamadı veya ID'yi yanlış girdin!"
                    }
                })
            );
        } else {
                  let id = req.params.id;
  let user = await user_profile.findOne({ user_id: id })
       let last_Categories = [];
        let details_user = user.login_detail;
        
        for (let i = 0; i < 20; i++) {
          last_Categories.push(details_user[details_user.length - 1 - i] || [i]);
        }


        res.render("admindashuserdetail", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            user_detail: last_Categories,
            navbar: navbaradmin
        });
        }
                   }
    });
     app.get(`/admin/server/:id`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
                   if(req.user.id != "722523001823690873" && req.user.id != "854602433179025408" && req.user.id != "445142958447263747" && req.user.id != "842858705468260393" && req.user.id != "787384609947385908" && req.user.id != "852872917456125963") {
              res.redirect('/dashboard')
                   } else {
        let id = req.params.id;
        if (isNaN(id)) return res.redirect("/hata?err=ERR_SERVER_NOT_FOUND&statuscode=501&message=Böyle bir Sunucu bulunamadı veya ID'yi yanlış girdin!");
               let serverr = await servers.findOne({ guildId: id }); 

        if (!serverr) {
            res.redirect(
                url.format({
                    pathname: "/hata",
                    query: {
                        statuscode: 501,
                        err: "ERR_USER_NOT_FOUND",
                        message: "Böyle bir Sunucu bulunamadı veya ID'yi yanlış girdin!"
                    }
                })
            );
        } else {
                  let id = req.params.id;
  let serverss = await servers.findOne({ guildId: id })
       let last_Categories = [];
        let details_server = serverss.votes_detail;
        
        for (let i = 0; i < 20; i++) {
          last_Categories.push(details_server[details_server.length - 1 - i] || [i]);
        }


        res.render("admindashserverdetail", {  
            user: req.user,
            username: req.user.username,
            server: serverss,
            server_detail: last_Categories,
            navbar: navbaradmin
        });
        }
                   }
    });
          app.get(`/admin/searchuser`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            if(req.user.id != "722523001823690873" && req.user.id != "854602433179025408" && req.user.id != "445142958447263747" && req.user.id != "842858705468260393" && req.user.id != "787384609947385908" && req.user.id != "852872917456125963") {
              res.redirect('/dashboard')
            } else {
        res.render("adminusersearch", {  
            user: req.user,
            username: req.user.username,
            navbar: navbaradmin
        });
            }
    });

          app.get(`/admin/searchserver`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            if(req.user.id != "722523001823690873" && req.user.id != "854602433179025408" && req.user.id != "445142958447263747" && req.user.id != "842858705468260393" && req.user.id != "787384609947385908" && req.user.id != "852872917456125963") {
              res.redirect('/dashboard')
            } else {
        res.render("adminsearchserver", {  
            user: req.user,
            username: req.user.username,
            navbar: navbaradmin
        });
            }
    });
    app.post("/admin_user_search", async (req, res) => {
        res.redirect(`/admin/user/${req.body.searchpanel}`);
        console.log(req.body.searchpanel)
    })
          app.post("/admin_server_search", async (req, res) => {
        res.redirect(`/admin/server/${req.body.searchpanel}`);
        console.log(req.body.searchpanel)
    })
       app.post("/admin_ban_user", async (req, res) => {
        console.log(req.body.userid)
    const user = await banned_mongo_user.findOne({ user: req.body.userid });
      if(!user) {
                  let user_account = await user_profile.findOne({
                user_id: req.body.userid
            }); 
      await new banned_mongo_user({
        user: req.body.userid,
        date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
        sebep: "site ban sistemi",
        banlayanname: req.user.username,
        banlayanıd: req.user.id
      }).save();
      await user_profile.findOneAndUpdate({
                        user_id: req.body.userid
                    }, {
                        $set: {
                            ban: 'true'
                        }
                    });
      let kullanıcıiste = client.users.cache.get(req.body.userid)
client.users.cache.get(req.body.userid).send({ embeds: [new MessageEmbed()
.setColor("RED")
.setTitle(`Sitemizden Banlandın!`)                                                    
.addField(`Banlayan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.addField(`Sebep:`, `Site Ban Sistemi`)  
.setFooter(`${client.user.username} | www.moonvo.com.tr`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 


client.channels.cache.get(`1005068383009640479`).send({ embeds: [new MessageEmbed()
.setColor("RED")
.setTitle(`www.moonvo.com.tr adresinden Bir kullanıcı banlandı!`)
.addField(`Banlanan Kullanıcı:`, `${kullanıcıiste}(\`\`${req.body.userid}\`\`)`)                                                                     
.addField(`Banlayan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.addField(`Sebep:`, `Site Ban Sistemi`)  
.setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
      }
              res.redirect(`/admin/user/${req.body.userid}`);
    });
    app.post("/admin_unban_user", async (req, res) => {
        console.log(req.body.userid)
    const user = await banned_mongo_user.findOne({ user: req.body.userid });
    if(user) {
        await banned_mongo_user.deleteOne({ user: req.body.userid }, )
      await user_profile.findOneAndUpdate({
                        user_id: req.body.userid
                    }, {
                        $set: {
                            ban: 'false'
                        }
                    });
            let kullanıcıiste = client.users.cache.get(req.body.userid)
client.users.cache.get(req.body.userid).send({ embeds: [new MessageEmbed()
.setColor("GREEN")
.setTitle(`Sitemizden Banın Açıldı!`)
.addField(`Banını Açan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.setFooter(`${client.user.username} | www.moonvo.com.tr`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err));    
      client.channels.cache.get(`1005068414383050812`).send({ embeds: [new MessageEmbed()
.setColor("GREEN")
.setTitle(`www.moonvo.com.tr adresinden Bir kullanıcının banı açıldı!`)
.addField(`Banı Açılan Kullanıcı:`, `${kullanıcıiste}(\`\`${req.body.userid}\`\`)`)                                                                 
.addField(`Banını Açan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
    }
              res.redirect(`/admin/user/${req.body.userid}`);
    });     



       app.post("/admin_ban_user_dashb", async (req, res) => {
        console.log(req.body.userid)
    const user = await banned_mongo_user.findOne({ user: req.body.userid });
      if(!user) {
                  let user_account = await user_profile.findOne({
                user_id: req.body.userid
            }); 
      await new banned_mongo_user({
        user: req.body.userid,
        date: moment().tz('Europe/Istanbul').locale('tr').format('LLL'),
        sebep: "site ban sistemi",
        banlayanname: req.user.username,
        banlayanıd: req.user.id
      }).save();
      await user_profile.findOneAndUpdate({
                        user_id: req.body.userid
                    }, {
                        $set: {
                            ban: 'true'
                        }
                    });
      let kullanıcıiste = client.users.cache.get(req.body.userid)
client.users.cache.get(req.body.userid).send({ embeds: [new MessageEmbed()
.setColor("RED")
.setTitle(`Sitemizden Banlandın!`)                                                    
.addField(`Banlayan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.addField(`Sebep:`, `Site Ban Sistemi`)  
.setFooter(`${client.user.username} | www.moonvo.com.tr`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 


client.channels.cache.get(`1005068383009640479`).send({ embeds: [new MessageEmbed()
.setColor("RED")
.setTitle(`www.moonvo.com.tr adresinden Bir kullanıcı banlandı!`)
.addField(`Banlanan Kullanıcı:`, `${kullanıcıiste}(\`\`${req.body.userid}\`\`)`)                                                                     
.addField(`Banlayan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.addField(`Sebep:`, `Site Ban Sistemi`)  
.setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
      }
              res.redirect(`/admin_dash`);
    });
    app.post("/admin_unban_user_dashb", async (req, res) => {
        console.log(req.body.userid)
    const user = await banned_mongo_user.findOne({ user: req.body.userid });
    if(user) {
        await banned_mongo_user.deleteOne({ user: req.body.userid }, )
      await user_profile.findOneAndUpdate({
                        user_id: req.body.userid
                    }, {
                        $set: {
                            ban: 'false'
                        }
                    });
            let kullanıcıiste = client.users.cache.get(req.body.userid)
client.users.cache.get(req.body.userid).send({ embeds: [new MessageEmbed()
.setColor("GREEN")
.setTitle(`Sitemizden Banın Açıldı!`)
.addField(`Banını Açan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.setFooter(`${client.user.username} | www.moonvo.com.tr`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err));    
      client.channels.cache.get(`1005068414383050812`).send({ embeds: [new MessageEmbed()
.setColor("GREEN")
.setTitle(`www.moonvo.com.tr adresinden Bir kullanıcının banı açıldı!`)
.addField(`Banı Açılan Kullanıcı:`, `${kullanıcıiste}(\`\`${req.body.userid}\`\`)`)                                                                 
.addField(`Banını Açan Admin:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
.setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())     
.setTimestamp()]}).catch((err) => console.log("Hata Oluştu; " + err)); 
    }
              res.redirect(`/admin_dash`);
    });      
      //admin
      
    app.get(`/pricing`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("pricing", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbardash
        });
    });

          app.get(`/balance`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("bakiye", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbardash
        });
    });
      //mypage

    app.get(`/my/servers`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
 let serverss = await servers.find({ ownerId: req.user.id })
            let user_servers = []
                   for (let ı = 0; ı < serverss.length; ı++) {
           user_servers.push(serverss[serverss.length - 1 - ı] || [ı]);
        }
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("myservers", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            server: user_servers,
            navbar: navbardash
        });
    });

          app.get(`/my/profil`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
       let last_Categories = [];
        let details_user = user_account.login_detail;
        
        for (let i = 0; i < 10; i++) {
          last_Categories.push(details_user[details_user.length - 1 - i] || [i]);
        }

        res.render("myprofile", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbardash,
            categories: last_Categories
        });
    });

                app.get(`/my/tickets`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
         let user_ticket = await user_tickets.find({
            userid: req.user.id
        }); 
       let last_Categories = [];
        let details_user = user_ticket;
        
        for (let i = 0; i < details_user.length; i++) {
          last_Categories.push(details_user[details_user.length - 1 - i] || [i]);
        }

        res.render("mytickets", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            user_ticket: user_ticket,
            navbar: navbardash,
            categories: last_Categories
        });
    });

          app.post("/my_tickets/new", async (req, res) => {
         let user_ticket = await user_tickets.find({
            userid: req.user.id
        }); 
             var viewid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
             await new user_tickets({
    name: req.body.support_name,
    surname: req.body.support_lastname,
    email: req.body.support_email,
    subject: req.body.support_title,
    userid: req.user.id,
    priority: req.body.support_level,
    status: `true`,
    createDate: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss"),
    view_id: viewid,
    messages: [{
      userid: req.user.id,
      message: req.body.support_reason,
      type: `user`,
      created_at: moment().tz('Europe/Istanbul').locale('tr').format("YYYY-MM-DD HH:mm:ss")
    }]
      }).save();
                res.redirect(`/my/tickets`);
    })
      
      //mypage!

          app.get(`/searchserver`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
 let serverss = await servers.find({ ownerId: req.user.id })
            let user_servers = []
                   for (let ı = 0; ı < serverss.length; ı++) {
           user_servers.push(serverss[serverss.length - 1 - ı] || [ı]);
        }
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("serversearch", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            server: user_servers,
            navbar: navbardash  
        });
    });
    app.post("/server_search", async (req, res) => {
        res.redirect(`/sunucu/${req.body.searchpanel}`);
        console.log(req.body.searchpanel)
    })
  app.get(`/sss`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("faq", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            total_login: moonvo_statss.total_login,
            navbar: navbardash  
        });
    });
  app.get(`/kadromuz`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("kadro", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbardash  
        });
    });
  app.get(`/contacts`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        res.render("contacts", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            navbar: navbardash  
        });
    });
   app.get(`/test`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
            let moonvo_statss = await moonvostats.findOne({ dataid: "112233445566778899" }); 
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
    let user = await user_profile.findOne({ user_id: req.user.id })
    let serverss = await servers.find({})
       let last_Categories = [];
      let top_Servers = []
        let details_user = user.login_detail;
        
        for (let i = 0; i < 10; i++) {
          last_Categories.push(details_user[details_user.length - 1 - i] || [i]);
        }
             for (let ı = 0; ı < serverss.length; ı++) {
           top_Servers.push(serverss[serverss.length - 1 - ı] || [ı]);
        }
        res.render("test", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            total_login: moonvo_statss.total_login,
            categories: last_Categories,
            server: top_Servers,
            serverr: serverss
        });
    });
     app.get(`/top50sunucu`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
    let user = await user_profile.findOne({ user_id: req.user.id })
    let serverss = await servers.find({})
      let top_Servers = []
            let sorted = serverss.sort((a, b) => {
        return a.votes - b.votes;
    });
    let say = 1;
             for (let ı = 0; ı < sorted.length; ı++) {
           top_Servers.push(sorted[sorted.length - 1 - ı] || [ı]);
        }
        res.render("top50servers", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            server: top_Servers,
            serverr: serverss,
            sıra: say,
            navbar: navbardash  
        });
    });
     app.get(`/sunucu/:id`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        let id = req.params.id;
        if (isNaN(id)) return res.redirect("/hata?err=ERR_SERVER_NOT_FOUND&statuscode=501&message=Böyle bir sunucu bulunamadı veya ID'yi yanlış girdin!");
               let user_account = await user_profile.findOne({
            user_id: req.user.id
        }); 
        let serversss = await servers.findOne({ guildId: id  }); 

        if (!serversss) {
            res.redirect(
                url.format({
                    pathname: "/hata",
                    query: {
                        statuscode: 501,
                        err: "ERR_SERVER_NOT_FOUND",
                        message: "Böyle bir sunucu bulunamadı veya ID'yi yanlış girdin!"
                    }
                })
            );
        } else {
                  let id = req.params.id;
            let own = client.guilds.cache.get(id).members.cache.get(serversss.ownerId);
              let last_server_detail = [];
                         let details_server = serversss.votes_detail;
               for (let i = 0; i < 1; i++) {
          last_server_detail.push(details_server[details_server.length - 1 - i] || [i]);
        }
        res.render("server", {  
            user: req.user,
            username: req.user.username,
            user_account: user_account,
            server: serversss,
            server_detail: last_server_detail,
            own: own,
            navbar: navbardash  
        });
        }
    });

    app.get(`/profilsettings`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        if (!req.user) {
            res.render("profilsettings", {
                user: req.user,
            });
        } else {
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
            let user_account = await user_profile.findOne({
                user_id: req.user.id
            }); 
            res.render("profilsettings", {
                user: req.user,
                member: member,
                username: user_account.user,
                user_id: user_account.user_id,
                avatarURL: user_account.avatarURL,
                first_name: user_account.first_name,
                last_name: user_account.last_name,
                age: user_account.age,
                number: user_account.number,
                mail: user_account.mail,
                balance: user_account.balance,
                creationdate: user_account.creationdate,
                country: user_account.country,
                city: user_account.city,
                github: user_account.github,
                ınstagram: user_account.ınstagram,
                codepen: user_account.codepen,
                description: user_account.description,
                folowers: user_account.folowers,
                folowers_user: user_account.folowers_user,
                like: user_account.like,
                like_user: user_account.like_user,
                folowing: user_account.folowing,
                user_account: user_account,
            });
        }
    });
    app.post("/account_update", async (req, res) => {
        let user_account = await user_profile.findOne({
            user_id: req.user.id
        });
        await user_profile.findOneAndUpdate({
            user_id: req.user.id
        }, {
            $set: {
                first_name: req.body.firstname || "NaN",
                last_name: req.body.lastname || "NaN",
                mail: req.body.mail || "NaN",
                number: req.body.number || "NaN",
                description: req.body.description || "NaN",
                country: req.body.ulke || "test",
                city: req.body.sehır || "test2",
            }
        });
        res.redirect('/profilsettings?account_update_basarili=true');
      const okanal = client.channels.cache.get('1024307561006108673')
                  okanal.send({
                embeds: [new MessageEmbed()
                    .setTitle(`Bir Hesap ayarları güncellendi`)
                    .addField(`Güncellenen hesap:`, `${req.user.username}(\`${req.user.id}\`)`)
                    .addField(`Güncellediği isim:`, req.body.firstname || "NaN")
                    .addField(`Güncellediği Soy isim:`, req.body.lastname || "NaN")
                    .addField(`Güncellediği mail:`, req.body.mail || "NaN")
                    .addField(`Güncellediği numara:`, req.body.number || "NaN")
                    .addField(`Güncellediği Açıklama:`, req.body.description || "NaN")  
                    .addField(`Güncellediği numara:`, req.body.ulke || "NaN")
                    .addField(`Güncellediği Açıklama:`, req.body.sehır || "NaN")    
                    .setFooter('MoonVo Site log sistemi')
                    .setTimestamp()
                    .setColor("GREEN")
                    .setThumbnail('https://i.hizliresim.com/jlddu54.png')
                ]
            }).catch(err => console.log("hesapşeysihatası; " + err));
    })
    app.post("/socialmedia_update", async (req, res) => {
         let user_account = await user_profile.findOne({
            user_id: req.user.id
        });
        await user_profile.findOneAndUpdate({
            user_id: req.user.id
        }, {
            $set: {
                ınstagram: req.body.ınstagram || "NaN",
                github: req.body.github || "NaN",
                codepen: req.body.codepen || "NaN"
            }
        });
        res.redirect('/profilsettings?social_update_basarili=true');
            const ookanal = client.channels.cache.get('1024307588164222996')
                  ookanal.send({
                embeds: [new MessageEmbed()
                    .setTitle(`Bir Hesap ayarları güncellendi`)
                    .addField(`Güncellenen hesap:`, `${req.user.username}(\`${req.user.id}\`)`)
                    .addField(`Güncellediği instagram linki:`, req.body.ınstagram || "NaN")
                    .addField(`Güncellediği github linki:`, req.body.github || "NaN")
                    .addField(`Güncellediği codepen linki:`, req.body.codepen || "NaN")
                    .setFooter('MoonVo Site log sistemi')
                    .setTimestamp()
                    .setColor("GREEN")
                    .setThumbnail('https://i.hizliresim.com/jlddu54.png')
                ]
            }).catch(err => console.log("hesapşeysihatası; " + err));
    })

    app.get(`/login`, async (req, res) => {
        if (!req.user) {
            res.render("login", {
                user: req.user,
            });
        } else {
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
            res.render("login", {
                user: req.user,
                member: member,
                avatarURL: member.user.avatarURL(),
            });
        }
    });
    app.get(`/sifreuretici`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        if (!req.user) return res.redirect("/log-in?girişyap=true");
        if (!req.user) {
            res.render("sifreuretici", {
                user: req.user,
            });
        } else {
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
            res.render("sifreuretici", {
                user: req.user,
                member: member,
                avatarURL: member.user.avatarURL(),
            });
        }
    });
    app.get(`/status`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        if (!req.user) return res.redirect("/log-in?girişyap=true");
        if (!req.user) {
            res.render("status", {
                user: req.user,
                ping: Math.round(client.ws.ping),
            });
        } else {
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
            res.render("status", {
                user: req.user,
                member: member,
                avatarURL: member.user.avatarURL(),
                ping: Math.round(client.ws.ping),
            });
        }
    });
    app.get(`/rules`, async (req, res) => {
            res.render("rules", {
                user: req.user,
            });
    });
      app.get(`/support`, async (req, res) => {
            res.render("support", {
                user: req.user,
            });
    });
    app.get(`/register`, bakimmodu, checkLoginaq, checkBan, async (req, res) => {
        if (!req.user) return res.redirect("/log-in?girişyap=true");
        if (!req.user) {
            res.render("register", {
                user: req.user,
            });
        } else {
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
            res.render("register", {
                user: req.user,
                member: member,
                avatarURL: member.user.avatarURL(),
            });
        }
    });
    app.get(`/banned`, async (req, res) => {
        if (!req.user) return res.redirect("/log-in?girişyap=true");
        const banned = await banned_mongo_user.findOne({
            user: req.user.id
        });
        if (!banned) {
            res.redirect("/");
        } else {
            let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(req.user.id);
            const banned = await banned_mongo_user.findOne({
                user: req.user.id
            });
            client.channels.cache.get(`1006866099582816256`).send({
                embeds: [new MessageEmbed()
                    .setTitle(`Banned sayfasına yönlendirildi`)
                    .addField(`Yölendirilen Kullanıcı:`, `${req.user.username}(\`\`${req.user.id}\`\`)`)
                    .setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())
                    .setTimestamp()
                ]
            }).catch((err) => console.log("Hata Oluştu; " + err));
            res.render("banned", {
                user: req.user,
                member: member,
                avatarURL: member.user.avatarURL(),
                date: banned.date,
                sebep: banned.sebep,
                banlayanname: banned.banlayanname,
                banlayanıd: banned.banlayanıd,
            });
        }
    });
    app.get("/yönlendirme/?url", (req, res) => {
        let url = new URLSearchParams(window.location.search);
        res.render("yönlendirme", {
            user: req.user,
            urll: url.get(url)
        });
    });

    app.get('/hata', async (req, res) => {
      let status = req.query.statuscode || "404";
      let msg = req.query.message || "Bilinmiyor";
      let err = req.query.err || "ERR_NOT_FOUND"
        res.render("hata", {
            errorcode: status,
            message: msg,
            error: err
        });
    })
          app.get('/bakim', async (req, res) => {
        if(mongoose.connection.readyState !== 1) return res.render("bakim", {
      title: "MongoDB'ye Bağlanılamadı",
      description: "MongoDB'ye Bağlanılamadığı için sistem bir süreliğine bakıma girdi"
        });
                                let bakimmongo = await bakimmodumongo.findOne({ dataid: '112233445566778899' });
            if(bakimmongo) {
      let title = bakimmongo.title
      let description = bakimmongo.description
        res.render("bakim", {
      title: title,
      description: description,
        });
              return;
               }
         res.redirect('/404')
return;
    })
              app.get('/confirmEmail', function(req, res) {
  var confirmationCode = req.query.code;
  user_profile.findOne({confirmationCode: confirmationCode}, function(err, user) {
    if (err) throw err;
    if (user) {
      if(user.status == "true") return res.redirect('/?eposta_zaten=true')
      user_profile.updateOne({mail: user.mail}, {$set: {status: "true"}}, function(err, result) {
        res.redirect('/?eposta_onaylandi=true')
        if (err) throw err;
        console.log('Email for user with ID ' + user._id + ' has been confirmed');
        const onaykanal = client.channels.cache.get('1072871662892097536')

        const onaylandi = new MessageEmbed()
                    .setTitle(`Bir Hesap Onaylandı`)
                    .addField(`Onaylanan Hesap:`, `${user.user}(\`\`${user.mail}\`\`)`)
                    .setFooter(`${client.user.username} Log sistemi`, client.user.avatarURL())
                    .setTimestamp()
        onaykanal.send({ embeds: [onaylandi] })
      });
    } else {
      res.redirect('/?eposta_onaylanamadi=true')
    }
  });
});
              
    app.listen(port, () =>
        console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
    );
    /////////////////////////SHUTDOWN/////////////////////////
    app.get("/shutdown/:pass", async (req, res) => {
        if (req.params.pass !== process.env.pass) return res.redirect("/");
        await client.destroy();
        process.exit(0);
    });
    /////////////////////////SHUTDOWN/////////////////////////
    /////////////////////////404/////////////////////////
    app.get('/404', (req, res) => {
        res.render('404', {
            user: req.user,
        });
    });

    app.use((req, res) => {
        res.status(404).redirect("/404");
    });
    /////////////////////////404/////////////////////////

    //sayflar//



}