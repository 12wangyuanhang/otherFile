// const { Bot, Message } = require('mirai-js');
import pkg from 'mirai-js';
const { Bot, Message,Middleware } = pkg;
// const http = require('http');
import http from 'http';
import https from 'https';
import request from 'request';
import URL from 'url';
import querystring from 'querystring';
// const https = require('https');
// const request = require('request');
// const querystring = require('querystring');
// import URL from 'url'
import { ChatGPTAPI } from 'chatgpt';
// const URL = require('url');
const bot = new Bot();


async function botHandle(){
    try {
        // 连接到一个 mirai-api-http 服务
        await bot.open({
            baseUrl: 'http://0.0.0.0:7777',
            verifyKey: 'INITKEYApGKCGii',
            // 要绑定的 qq，须确保该用户已在 mirai-console 登录
            qq: 2545774296,
        });
        // await bot.sendMessage({
        //     // 好友 qq 号
        //     friend: '1019933576',
        //     // Message 实例，表示一条消息
        //     message: new Message().addText('hello world!').addImageUrl('http://exapmle/image.jpg')
        // });
        bot.on('FriendMessage', new Middleware()
            .textProcessor()
            .done(async data => {
            const api = new ChatGPTAPI({
                apiKey: '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'
            })
            // let setText = myText.slice(3).trim();
            try {
                const res = await api.sendMessage(data.text)
                await bot.sendMessage({
                    friend: data.sender.id,
                    // quote: messageId,
                    message: new Message().addText(res.text),
                });
                // console.log(res.text)
            } catch (e) {
                await bot.sendMessage({
                    friend: fromQQ,
                    message: new Message().addText('我寄了~~~'),
                })
            }
        }));
        // bot.on('FriendMessage', async ({
        //     messageChain,
        //     sender: {
        //         id: fromQQ,
        //         nickname: fromQQNickName,
        //         remark
        //     }
        // }) => {
        //     const { id: messageId } = messageChain[0];
        //     console.log(messageChain[1])
        //     const msg = messageChain[1];
        //     if(msg.type == 'Plain'){
        //         const api = new ChatGPTAPI({
        //             apiKey: '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'
        //         })
        //         // let setText = myText.slice(3).trim();
        //         try {
        //             const res = await api.sendMessage(setText)
        //             await bot.sendMessage({
        //                 friend: fromQQ,
        //                 // quote: messageId,
        //                 message: new Message().addText(res.text),
        //             });
        //             // console.log(res.text)
        //         } catch (e) {
        //             await bot.sendMessage({
        //                 friend: fromQQ,
        //                 message: new Message().addText('我寄了~~~'),
        //             })
        //         }
        //         // let queryUrl = 'https://api.uomg.com/api/rand.qinghua?format=json';
        //         // try {
        //         //     request(queryUrl, async function (error, response, body) {
        //         //         if (!error && response.statusCode == 200) {
                            
        //         //             var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
        //         //             if (jsonObj) {
        //         //                 await bot.sendMessage({
        //         //                     friend: fromQQ,
        //         //                     // quote: messageId,
        //         //                     message: new Message().addText(jsonObj.content),
        //         //                 });
        //         //             } else{
        //         //                 console.log('解析JSON异常');
        //         //             }
        //         //         } else {
        //         //             console.log('请求异常');
        //         //             await bot.sendMessage({
        //         //                 friend: fromQQ,
        //         //                 message: new Message().addAt(fromQQ).addText('我寄了~~~'),
        //         //             })
        //         //         }
        //         //     })
        //         // }catch(e){
        //         //     console.log(e)
        //         //     await bot.sendMessage({
        //         //         group: groupQQ,
        //         //         message: new Message().addAt(fromQQ).addText('我寄了~~~'),
        //         //     })
        //         // }
        //     }
            
        // });
        bot.on('GroupMessage', async ({
            messageChain,
            sender: {
                id:fromQQ,
                memberName,
                permission:permission1,
                group: {
                    id:groupQQ,
                    name,
                    permission:permission2
                }
            }
        }) => {
            const { id: messageId } = messageChain[0];
            console.log(messageChain)
            const { type, text, target } = messageChain[1];
            let myText = text;
            if(type == 'Plain'){
                let textArr = text.split(' ');
                if(text.includes('获取个人信息')){
                    let str;
                    let qq = text.replace(/[^\d]/g, "")
                    if(qq){
                        try{
                            const profile = await bot.getUserProfile({ qq: Number(qq) });
                            console.log(profile,3445)
                            let genderObj = {
                                MALE: '男',
                                FEMALE: '女',
                                UNKNOWN: '未知',
                            }
                            
                            str = `来自QQ<<${qq}>>的个人信息\n姓名：${profile.nickname}\n邮箱：${profile.email}\n年龄：${profile.age}\n等级：${profile.level}\n性别：${genderObj[profile.sex]}\n个性签名：${profile.sign}
                            `
                        } catch (e) {
                            str = `暂时获取不到,请检查是否输入正确`
                        }
                        
                    }else {
                        str = '请输入要查询的QQ号码'
                    }
                    await bot.sendMessage({
                        group: groupQQ,
                        quote: messageId,
                        message: new Message().addText(str),
                    });
                } else if(text.includes('设置群昵称')) {
                    let groupName = text.split(' ')[2];
                    let qq = text.replace(/[^\d]/g, "")
                    
                    try{
                        await bot.setMemberInfo({ group: groupQQ, qq: Number(qq), name: groupName,});
                        await bot.sendMessage({
                            group: groupQQ,
                            quote: messageId,
                            message: new Message().addText('设置成功'),
                        });
                    } catch(e) {
                        await bot.sendMessage({
                            group: groupQQ,
                            quote: messageId,
                            message: new Message().addText('设置失败，请检查是否输入错误！'),
                        });
                    }
                } else if (text.includes('发送群公告')){
                    let groupNotice = text.split(' ')[1];
                    try {
                        await bot.publishAnno({ 
                            group: groupQQ,
                            content: groupNotice,
                            pinned: true 
                        });
                    }catch {
                        await bot.sendMessage({
                            group: groupQQ,
                            quote: messageId,
                            message: new Message().addText('设置失败，请检查。'),
                        });
                    }
                }else if(textArr[0] == '禁言'){
                    if(Bot.groupPermission.ADMINISTRATOR || Bot.groupPermission.OWNER){
                        let time = 3600;
                        if(textArr&&Array.isArray(textArr)&&textArr.length == 3){
                            switch (textArr[2].replace(/[\d]/g,'')) {
                                case 'h':
                                    time = parseFloat(textArr[2].replace(/[^\d]/g,''))*60*60;
                                    break;
                                case 'min':
                                    time = parseFloat(textArr[2].replace(/[^\d]/g,''))*60;
                                    break;
                                case '天':
                                    time = parseFloat(textArr[2].replace(/[^\d]/g,''))*24*60*60;
                                    break;
                                default:
                                    time = parseFloat(textArr[2])
                                    break;
                            }
                            try {
                                await bot.mute({ group: groupQQ, qq: Number(textArr[1]), time: time});
                            } catch(e) {
                                await bot.sendMessage({
                                    group: groupQQ,
                                    quote: messageId,
                                    message: new Message().addText(e+""),
                                });
                            }
                        } else if(textArr&&Array.isArray(textArr)&&textArr.length == 2) {
                            try {
                                await bot.mute({ group: groupQQ, qq: Number(textArr[1]), time: time});
                            } catch (e) {
                                console.dir(e)
                                await bot.sendMessage({
                                    group: groupQQ,
                                    quote: messageId,
                                    message: new Message().addText(e+""),
                                });
                            }
                        } else {
                            await bot.sendMessage({
                                group: groupQQ,
                                quote: messageId,
                                message: new Message().addText('输入格式错误。'),
                            });
                        }
                        
                    }else {
                        await bot.sendMessage({
                            group: groupQQ,
                            quote: messageId,
                            message: new Message().addText('无权限'),
                        });
                    }
                    
                }else if(text.includes('解除禁言')){
                    if(Bot.groupPermission.ADMINISTRATOR || Bot.groupPermission.OWNER){
                        let relieve = text.split(' ')[1];
                        try {
                            await bot.unmute({ group: groupQQ, qq: Number(relieve)});
                        } catch {
                            await bot.sendMessage({
                                group: groupQQ,
                                quote: messageId,
                                message: new Message().addText('解除禁言失败，请检查。'),
                            });
                        }
                    }else {
                        await bot.sendMessage({
                            group: groupQQ,
                            quote: messageId,
                            message: new Message().addText('无权限'),
                        });
                    }
                    
                }
            } else if(type == 'At') {
                if(target == '2545774296'){
                    console.log(messageChain)
                    // if(messageChain.length == 2){
                    //     let news = ['艾特我干嘛！', '_(:3」∠❀)_菊花碎了一地','小玉正在路上', '有什么着急的事情呢？', '(✪ω✪)', '如果有事情的话，跟我说吧！', '(σﾟ∀ﾟ)σ..:*☆哎哟不错哦','你觉得，你能杀死我？！！！', '哈哈哈哈哈哈啊？', '!!!∑(ﾟДﾟノ)ノ',];
                    //     let random = Math.floor(Math.random()*10);
                    //     await bot.sendMessage({
                    //         group: groupQQ,
                    //         // quote: messageId,
                    //         message: new Message().addText(news[random]),
                    //     });
                    // } else 
                    if(messageChain.length > 2) {
                        let { type, text } = messageChain[2]
                        myText = text;
                        
                    } else {
                        let queryUrl = 'https://api.uomg.com/api/rand.qinghua?format=json';
                        try {
                            request(queryUrl, async function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    console.log(body)
                                    
                                    var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                                    if (jsonObj) {
                                        await bot.sendMessage({
                                            group: groupQQ,
                                            // quote: messageId,
                                            message: new Message().addText(jsonObj.content),
                                        });
                                    } else{
                                        console.log('解析JSON异常');
                                    }
                                } else {
                                    console.log('请求异常');
                                    await bot.sendMessage({
                                        group: groupQQ,
                                        message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                                    })
                                }
                            })
                        }catch(e){
                            console.log(e)
                            await bot.sendMessage({
                                group: groupQQ,
                                message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                            })
                        }
                    }
                }
            }
            if(myText){
                if(myText.includes('天气')){
                    try{
                        let queryUrl = 'https://api.vvhan.com/api/weather'
                        request(queryUrl, async function (error, response, body) {
                            console.log(body)
                            if (!error && response.statusCode == 200) {
                                var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                                if (jsonObj) {
                                    let str = `城市：${jsonObj.city};  日期：${jsonObj.info.date+' '+jsonObj.info.week};\n天气:${jsonObj.info.type+' '+jsonObj.info.fengxiang}气温:${jsonObj.info.high+'-'+jsonObj.info.low}`
                                    await bot.sendMessage({
                                        group: groupQQ,
                                        // quote: messageId,
                                        message: new Message().addText(str),
                                    });
                                } else{
                                    console.log('解析JSON异常');
                                }
                            } else {
                                console.log('请求异常');
                                await bot.sendMessage({
                                    group: groupQQ,
                                    message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                                })
                            }
                        })
                        
                    }catch(e) {
                        console.log(e)
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }else if(myText.includes('壁纸')) {
                    let myArr = myText.split(' ');
                    let queryUrl = 'https://api.vvhan.com/api/lolskin';
                    // if(myArr[1]){
                    //     queryUrl = `https://api.uomg.com/api/rand.img?format=json&?sort=${myArr[1]}`;
                    // }
                    try {
                        await bot.sendMessage({
                            group: groupQQ,
                            // quote: messageId,
                            message: new Message().addImageUrl(queryUrl),
                        });
                        // request(queryUrl, async function (error, response, body) {
                        //     console.log(body)
                        //     if (!error && response.statusCode == 200) {
                        //         var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                        //         if (jsonObj) {
                        //             console.log(jsonObj.imgurl)
                        //             await bot.sendMessage({
                        //                 group: groupQQ,
                        //                 // quote: messageId,
                        //                 message: new Message().addImageUrl(jsonObj.imgurl),
                        //             });
                        //         } else{
                        //             console.log('解析JSON异常');
                        //         }
                        //     } else {
                        //         console.log('请求异常');
                        //         await bot.sendMessage({
                        //             group: groupQQ,
                        //             message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        //         })
                        //     }
                        // })
                    }catch(e){
                        console.log(e)
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }else if(myText.includes('骚话')){
                    let queryUrl = 'https://api.vvhan.com/api/sao?type=json';
                    try {
                        request(queryUrl, async function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                                console.log(jsonObj)
                                if (jsonObj) {
                                    let ishan = jsonObj.ishan;
                                    // let voiceUrl = 'https://api.vvhan.com/api/song?txt='+ ishan;
                                    let a = 'https://api.vvhan.com/api/song?per=1&txt=%E6%88%91%E6%98%AF%E7%9C%9F%E7%9A%84%E5%96%9C%E6%AC%A2%E4%BD%A0'
                                    await bot.sendMessage({
                                        group: groupQQ,
                                        // quote: messageId,
                                        message: new Message().addText(ishan),
                                    });
                                } else{
                                    console.log('解析JSON异常');
                                }
                            } else {
                                console.log('请求异常');
                                await bot.sendMessage({
                                    group: groupQQ,
                                    message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                                })
                            }
                        })
                    }catch(e){
                        console.log(e)
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }else if(myText.includes('热评')){
                    let queryUrl = 'https://api.uomg.com/api/comments.163?format=text';
                    try {
                        request(queryUrl, async function (error, response, body) {
                            console.log(body)
                            if (!error && response.statusCode == 200) {
                                if (body) {
                                    await bot.sendMessage({
                                        group: groupQQ,
                                        // quote: messageId,
                                        message: new Message().addText(body),
                                    });
                                } else{
                                    console.log('解析JSON异常');
                                }
                            } else {
                                console.log('请求异常');
                                await bot.sendMessage({
                                    group: groupQQ,
                                    message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                                })
                            }
                        })
                    }catch(e){
                        console.log(e)
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }else if(myText.includes('买家秀')){
                    let queryUrl = 'https://api.uomg.com/api/rand.img3?&format=json';
                    console.log(queryUrl)
                    try {
                        request(queryUrl, async function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                                if (jsonObj) {
                                    console.log(jsonObj.imgurl)
                                    await bot.sendMessage({
                                        group: groupQQ,
                                        // quote: messageId,
                                        message: new Message().addImageUrl(jsonObj.imgurl),
                                    });
                                } else{
                                    console.log('解析JSON异常');
                                }
                            } else {
                                console.log('请求异常');
                                await bot.sendMessage({
                                    group: groupQQ,
                                    message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                                })
                            }
                        })
                    }catch(e){
                        console.log(e)
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }else if(myText.includes('土味情话')){
                    let queryUrl = 'https://api.uomg.com/api/rand.qinghua?format=json';
                    try {
                        request(queryUrl, async function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.log(body)
                                
                                var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                                if (jsonObj) {
                                    await bot.sendMessage({
                                        group: groupQQ,
                                        // quote: messageId,
                                        message: new Message().addText(jsonObj.content),
                                    });
                                } else{
                                    console.log('解析JSON异常');
                                }
                            } else {
                                console.log('请求异常');
                                await bot.sendMessage({
                                    group: groupQQ,
                                    message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                                })
                            }
                        })
                    }catch(e){
                        console.log(e)
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }else if(/涩图|色图|黄图|颜色/g.test(text)){
                    try{
                        // 'https://api.lolicon.app/setu/v2'
                        let urlObj = 'https://api.vvhan.com/api/girl'
                        // https.get({
                        //     ...urlObj,
                        //     rejectUnauthorized: false, // 忽略https安全性
                        //     method: 'GET',
                        //     headers: {
                        //         referer: '',    // 如果资源有防盗链，则清空该属性
                        //     },
                        // },res => {
                        //     let data = ''
                        //     res.on('data', chunk => {
                        //         data += chunk
                        //     })
                        //     res.on('end', async (chunk) => {
                        //         // resolve(data)
                        //         let res = JSON.parse(data);
                        //         console.log(res.data[0].urls.original)
                        //         await bot.sendMessage({
                        //             group: groupQQ,
                        //             // quote: messageId,
                        //             message: new Message().addImageUrl(res.data[0].urls.original),
                        //         });
                        //     })
                        // })
                        await bot.sendMessage({
                            group: groupQQ,
                            // quote: messageId,
                            message: new Message().addImageUrl(urlObj),
                        });
                    }catch(e) {
                        console.log(e)
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText(' 身体已经被掏空了>.<'),
                        })
                    }
                }else if(/^gpt/.test(myText)){
                    const api = new ChatGPTAPI({
                        apiKey: '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'
                    })
                    let setText = myText.slice(3).trim();
                    try {
                        const res = await api.sendMessage(setText)
                        await bot.sendMessage({
                            group: groupQQ,
                            quote: messageId,
                            message: new Message().addText(res.text),
                        });
                        // console.log(res.text)
                    } catch (e) {
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }else if(myText.includes('二维码制作')){
                    let res = myText.split(' ')[1]
                    let queryUrl = 'https://api.vvhan.com/api/qr?text='+ res;
                    try {
                        await bot.sendMessage({
                            group: groupQQ,
                            // quote: messageId,
                            message: new Message().addImageUrl(queryUrl),
                        });
                    }catch(e){
                        console.log('请求异常');
                        await bot.sendMessage({
                            group: groupQQ,
                            message: new Message().addAt(fromQQ).addText('我寄了~~~'),
                        })
                    }
                }
            }
            // 你可以像这样来判断群成员的权限
            // switch (permission2) {
            //     case Bot.groupPermission.OWNER:
            //         // 群主
            //         break;
            //     case Bot.groupPermission.ADMINISTRATOR:
            //         // 管理员
            //         break;
            //     case Bot.groupPermission.MEMBER:
            //         // 普通群成员
            //         break;
            // }
        });
    } catch (err) {
        console.log(err);
    }
}
botHandle()