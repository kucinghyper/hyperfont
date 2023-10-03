require("./config")
const { Telegraf, Context } = require('telegraf')
const { simple } = require("./lib/myfunc")
const fs = require('fs')
const os = require('os')
const speed = require('performance-now')
const fetch = require('node-fetch')

if (BOT_TOKEN == 'YOUR_TELEGRAM_BOT_TOKEN') {
    return console.log(lang.noToken)
}

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')

const bot = new Telegraf(BOT_TOKEN)
async function startitsuka() {
    bot.on('callback_query', async (itsuka) => {
        action = itsuka.callbackQuery.data.split(' ')
        args = action
        user_id = Number(action[1])
        if (itsuka.callbackQuery.from.id != user_id) return itsuka.answerCbQuery('Uppss... this button not for you!', {
            show_alert: true
        })
        const timestampi = speed();
        const latensii = speed() - timestampi
        const user = simple.getUserName(itsuka.callbackQuery.from)
        const {
            isUrl,
            fetchJson
        } = simple
        const pushname = user.full_name;
        const username = user.username ? user.username : "pnggilajacn";
        const isCreator = [itsuka.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(user.username ? user.username : "-")
        const reply = async (text) => {
            for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await itsuka.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        try {
            switch (action[0]) {
                case "menucmd": {
                    let hit_total;
                    try {
                        hit_total = await simple.fetchJson('https://api.countapi.xyz/hit/ItsukaChan/visits')
                    } catch {
                        hit_total = {
                            value: "-"
                        }
                    }
                    hitall = `${hit_total.value == undefined ? '-' : hit_total.value}`
                    let dnew = new Date(new Date + 3600000)
                    let week = dnew.toLocaleDateString('en', {
                        weekday: 'long'
                    })
                    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(dnew / 84600000) % 5]
                    let date = dnew.toLocaleDateString('en', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                    let dateIslamic = Intl.DateTimeFormat('en' + '-TN-u-ca-islamic', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).format(dnew)
                    lang.menu(itsuka, THUMBNAIL, pushname, OWNER_NAME, OWNER, "/", hitall, latensii, os, simple, week, date, dateIslamic, username, isCreator, user.id.toString())
                }
                break
                case "downloadcmd": {
                    lang.downloadcmd(itsuka, THUMBNAIL, user_id.toString())
                }
                break
                case "donasicmd": {
                    lang.donasicmd(itsuka, THUMBNAIL, user_id.toString())
                }
                break
                case "owner": {
                    // await itsuka.sendContact(OWNER_NUMBER, OWNER_NAME)
                    reply(`Owner [${OWNER_NAME}](${OWNER})`)
                }
                break
                case "ytmp3": {
                if (!args[2]) return reply(`*Putting URL YouTube*`)
                if (!isUrl(args[2])) return reply(`Invalid URL\n\nMungkin kamu salah memasukkan url atau memberikan spasi saat menggunakan fitur ini\n\nUsahakan tidak ada spasi.\nContoh: ${prefix+command} url`)
                if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`*Invalid URL*\n\nMungkin kamu salah memasukkan url atau memberikan spasi saat menggunakan fitur ini\n\nUsahakan tidak ada spasi.\nContoh: ${prefix+command} url`)
                await itsuka.deleteMessage()
                let res = await fetch(`https://pnggilajacn.my.id/api/download/ytmp3?url=`+args[2])
                var result = await res.json()
                var {
                    id,
                    thumbnail,
                    title,
                    size,
                    download
                } = result.result
                let key = "「 YOUTUBE AUDIO 」\n\n"
                key += `• Id: ${id}\n`
                key += `• Title: ${title}\n`
                key += `• Quality: 128kbps\n`
                key += `• Size: ${size}\n\n`
                key += `Audio in progress, please wait...`
                if (size > 20000) return reply(`Ukuran file melebihi batas, silahkan download sendiri ☠️\n\nDownload: https://ytdl.pnggilajacn.my.id/?url=`+id+`&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`)
                    await itsuka.replyWithPhoto({
                        url: thumbnail
                    }, {
                        caption: key
                    })
                    await itsuka.replyWithAudio({
                        url: download,
                        filename: title
                    })
                    }
            break
                case "ytmp4": {
                if (!args[2]) return reply(`*Putting URL YouTube*`)
                if (!isUrl(args[2])) return reply(`Invalid URL\n\nMungkin kamu salah memasukkan url atau memberikan spasi saat menggunakan fitur ini\n\nUsahakan tidak ada spasi.\nContoh: ${prefix+command} url`)
                if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`*Invalid URL*\n\nMungkin kamu salah memasukkan url atau memberikan spasi saat menggunakan fitur ini\n\nUsahakan tidak ada spasi.\nContoh: ${prefix+command} url`)
                await itsuka.deleteMessage()
                let res = await fetch(`https://pnggilajacn.my.id/api/download/ytmp4?url=`+args[2])
                var result = await res.json()
                var {
                    id,
                    thumbnail,
                    title,
                    size,
                    download
                } = result.result
                let key = "「 YOUTUBE VIDEO 」\n\n"
                key += `• Id: ${id}\n`
                key += `• Title: ${title}\n`
                key += `• Quality: 360p\n`
                key += `• Size: ${size}\n\n`
                key += `Video In progress, please wait...`
                if (size > 20000) return reply(`Ukuran file melebihi batas, silahkan download sendiri ☠️\n\nDownload: https://ytdl.pnggilajacn.my.id/?url=`+id+`&filter=audioandvideo&quality=highestvideo&contenttype=video/mp4`)
                    await itsuka.replyWithPhoto({
                        url: thumbnail
                    }, {
                        caption: key
                    })
                    await itsuka.replyWithVideo({
                        url: download
                    }, {
                        caption: lang.ok
                    })
                    }
                break
            }
        } catch (e) {
            console.log(e)
        }
    })
    bot.command('help', async (itsuka) => {
        itsuka.reply(`Halo kak... sebelum menggunakan bot sebaiknya kamu membaca /rules terlebih dahulu yaa..\n\nJika sudah silahkan klik /menu untuk mengetahui lebih lanjut tentang cara penggunaan bot.\n\nOiya ka, jangan lupa donasi ya agar bot tetap gratis seumur hidup`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: 'Saweria',
                                url: "https://saweria.co/anonsecteam"
                            }, {
                                text: 'Facebook',
                                url: "https://facebook.com/cicicyber.squadindo.7/"
                            }, {
                                text: 'Github',
                                url: "https://github.com/DPRRI"
                            }, {
                                text: 'Owner',
                                url: "https://t.me/anonymousindonesianid"
                            }]
                        ]
                    }
                })
            })
    bot.command('start', async (itsuka) => {
        itsuka.reply(`Halo kak... sebelum menggunakan bot sebaiknya kamu membaca /rules terlebih dahulu yaa..\n\nJika sudah silahkan klik /menu untuk mengetahui lebih lanjut tentang cara penggunaan bot.\n\nOiya ka, jangan lupa donasi ya agar bot tetap gratis seumur hidup`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: 'Saweria',
                                url: "https://saweria.co/anonsecteam"
                            }, {
                                text: 'Facebook',
                                url: "https://facebook.com/cicicyber.squadindo.7/"
                            }, {
                                text: 'Github',
                                url: "https://github.com/DPRRI"
                            }, {
                                text: 'Owner',
                                url: "https://t.me/anonymousindonesianid"
                            }]
                        ]
                    }
                })
            })
    bot.on('message', async (itsuka) => {
        require("./index")(itsuka, bot)
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Creator": "https://t.me/anonymousindonesianid"
        })
    })
}
startitsuka()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

require("http").createServer((_, res) => res.end("Uptime!")).listen(8080)