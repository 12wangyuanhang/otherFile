import { ChatGPTAPI } from 'chatgpt';
// console.log(1)
// const OPENAI_API_KEY = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..-018CshAJNkHwtVn.lBT5vIVD81P-td22e41M6zDuBkPUq0ocLrT06xnL_CXJscMSLafl_Ep2LD2hz38KVxO6Mpj15NeovcbitNmGGu-oYFVRvhlxt3MvKE7WF1SRW_pmfSbQeva2AgsmhLJH5lhqruhUJS0IGSWxhYZEtEaruCSky_0PlducJGDEiy7-SOAU3m5PBBur7CZr9flNHyV33phn8bS-Dnin-w2ZEh2SAxEact4WBD6jNY9kfgdJJFQ6nhsR3WZ405nonNdFoGdS2bXKwMeGiEogQqpTbxoHxf8dPglmszwPOtrFdjjxByU16gUBzxyFwMdt28-41yXC4ucGEA4ey1Mmgs6NbFRtV6PZ053usY54u8z1dAcYjKNdlmhi_CRH-HREWFthZusLozauaJ_gT7UH8uacvOcgs9qVo5U05uxhxK-4VohhLxJ6F5QM65datav4hLL2mtt5DpQ8tnPxJ4YWTam1dpzdi835uzjp__AO9LIHAuK5oM--AkkLxvF8zpkFihVWvnYb5ZU82vzJbUNNSdSujebel3a2en2LXL5uo3R1FdvFMOMRLagQmOxiwIwH_Uf_DOPnxVcm96wKYzk3MRvuNSNweTVgQgeCQeZH3ezyWDXqbC8ao2MzuaMEwxEFhn6WVQrSTFo2zCnm-000GpN5fncWuTU52dHkfhRkKSNQR2FzxseFerLPOnZi1jTLGOiGJH_ojxOyiR9y06AdbsIxq2izJAEzPKKtKX66dzKtUBxv_II6LlTBwtMKGHMotjdocnBzwokA1aWAPRBNlQskOPIk67XdJ59ToVASvm5EhOhMG0lj28Wx1-KyWxBMREhX49Ms7C25LWH5o1hMPsZwEgVy2rTMURAwL1ztunC72Mj6a5QV5YsCfrT9KiSnw69-sRYbhKVG9RAYsghif5otVAsV3jXx_B-hc6pUjuNmfeH2PghJsVt6-lBfykHzujr7nztBIAv2dgRNzuh_ZtFzgZgDm7gi6-sXniAMNfysqGP4h9FSbufILBWN2292qh3kAz_v1-9AMhYkftg1yFaSuhwxNGVQ34P3Z3AUzWEn2PStepPdvan7IcQ2dyfO3qL7RrhaPX7cYl9jbWD1OlsxZuNbInGUeK2VnlSPFfMj5WASIlgoMH1MNZqW3T5GUFNQFHT8XTCeFiAst9pv1Q8ny89t8Gtwzha6GeXc6ntRbazEnkTT4vdVp5VqponmOggJ39a7Ifc3UZCRmJ-OttHhE1NmdQJ6D6KEeoyzhLpsXmV8HOCgFk-_9jehljcb83cBXAi30iLe9sew9t0YISjdBFpEbdxLrreH4tRT_2BSuDES_PxyiAZMptATnV4g7EJZYxUxKyZfFSIklWtSaLt8IIdsR7hbfyjPNA84EKaVOsSN2q1T_-y7BYU8mXFAEJWq3DEScs51jiCaM1WmXIFUi9qdbOqGGgOw-wZAoIR6z2IWCvTBBhw_7OVbk8vvyOBRYnQypq4-2iNn1-l4Zuhgmop2Oil07CXceqKHDpGphGO6ho5mQ4M9xglj3a2QNBcV4S9XFxRhBrq9UBh39HjdbyBpCZNvGhh8pkmIyhjw_Lca9v85n5SBTWLmtx5BAg98Wz3CzAZ5bNgcF5OVlS-s_OAbj8bCWuUPZhONeW3_bM8cjSme9eG5zEBEadIekEd5IXgG8t8dd618erXSAVCcYv6b5K0IWcxMcaPvaaFxBqq-rbVoCalBpqHCApXZ2BsLLHXLwR89Mc4El35YvQIroJkrxc1dfwPYbVRrAm6nIiDN4qaYn1MMEHDSch8AXEXyFspLsTG1NfjqTLH5Cxp26Q1zkTx-xPMXfSZELm4aD3ocBrm8ay8aRAESUU00dT-YcYnI3h3MtNy1bb4a7rvD-NIaGaPD3L_pw2dquPHBtNtoSWcuUv4PYMwOzMEj-2MvaIiGoUJBe5VDbb79S-4aA6W5gXmkxMOE6WQUqMy9q6XtOXZgw3I0fNAoZTgMEq-itoLExM';
// // const http = require('http');
// import http from 'http';
// // import { ChatGPTAPI } from 'chatgpt'
// /**
//  * @name:
//  * @description: promise扁平处理
//  * @return {*}
//  */
//  const defer = () => {
//     let resolve, reject;
//     return {
//       promise: new Promise((_resolve, _reject) => {
//         resolve = _resolve;
//         reject = _reject;
//       }),
//       resolve,
//       reject,
//     };
//   };
// const sendChatGPTMsg = async ({ msg, sessionToken }) => {
//     const { promise, resolve, reject } = defer();
//     const api = new ChatGPTAPI({
//       apiKey:sessionToken,
//     //   markdown: false,
//     });
//     // await api.ensureAuth().catch(reject); // 校验令牌
//     api.sendMessage(msg).catch(reject).then(resolve);
//     return promise;
//   };

// http
//   .createServer((req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*"); //设置响应头解决跨域
//     if (req.url !== "/sendMsg") return sendRes(res, "not find", 404);
//     let _data = "";
//     req.on("data", (d) => {
//       _data += d;
//     });
//     req.on("end", () => {
//       const data = JSON.parse(_data);
//       sendChatGPTMsg(data)
//         .then((r) => {
//           res.writeHead(200, {
//             "Content-Type": "text/plain",
//             "Access-Control-Allow-Origin": "*",
//           });
//           console.log(r)
//           res.write(r);
//           res.end();
//         })
//     });
//   })
//   .listen(1024, () => {
//     console.log("服务开启！");
//   });
console.log(process.env.OPENAI_API_KEY)
async function example() {
    const api = new ChatGPTAPI({
        apiKey: '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'
    })

    try {
        const res = await api.sendMessage('Hello World!')
        console.log(res.text)
    } catch (e) {
        console.log(e)
    }
}

example();
// const { ChatGPTAPI } = require('chatgpt');

// http.createServer((req, res) => {
//         res.setHeader("Access-Control-Allow-Origin", "*"); //设置响应头解决跨域
//         if (req.url !== "/sendMsg") return sendRes(res, "not find", 404);
//         let _data = "";
//         req.on("data", (d) => {
//             _data += d;
//         });
//         req.on("end", async () => {
//             res.writeHead(200, {
//                 "Content-Type": "text/plain",
//                 "Access-Control-Allow-Origin": "*",
//             });
//             const api = new ChatGPTAPI({
//                 apiKey: OPENAI_API_KEY,
//             //   markdown: false,
//             })
        
//             const result = await api.sendMessage('Hello World!')
//             console.log(result.text)
//             res.write(result.text);
//             res.end();
//             // async function example() {
                
//             // }
//             // example()
//         });
//     })
//     .listen(1024, () => {
//         console.log("服务开启！");
//     });
