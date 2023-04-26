const {Client, Intents} = require('discord.js');
const http = require("https");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS],
   ws: { properties: { browser: "Discord iOS" }} });
const config = require("./config.json")
const userId = config.usernametoclaimid;
const guildId = config.mutualserverid;
const usertoken = config.yourtoken;
const alertwebhook = config.alertwebhook;
const tagtoclaim = config.usertagtoclaim
const usertoclaim = config.usernametoclaim
const userpass = config.yourpassword;
const yourid = config.yourid;
const axios = require('axios');
let minuteschecked = -1;
const fingerprints = require("./fingerprints.json");
process.title = "Discord Username Autoclaimer! | discord.gg/omari | github.com/auwii"
client.on('ready', () => {
  console.log('Bot is online!');
  modifyfingerprint()
  setInterval(checkUser, 60000); // check every minute
  
});



function checkUser() {
    
    let guild
    let member
  try {
  modifyfingerprint()
  guild = client.guilds.cache.get(guildId)
  } catch {
    console.log("Failed to check server for user... is the motherfucking bot in the mutual server?");
  }
  member = guild.members.cache.get(userId);
  if (!member) {
    console.log("member check returned blank. user left server/was deleted!! initiating check for deletion.")
    try { checkifdeleted(); } catch {console.log("unable to check if the user was deleted, attempting to claim anyways.. (probably will throw error)"); tryclaim();}

  }
  minuteschecked++
  console.log("another minute checked! Total minutes checked: " + minuteschecked)
}

function modifyfingerprint() {
    const fingerprintparser = "cHJvY2Vzcy50aXRsZSA9ICJJZiB5b3UgYm91Z2h0IHRoaXMgeW91IGdvdCBzY2FtbWVkISEhISBkaXNjb3JkLmdnL29tYXJpIHx8IGdpdGh1Yi5jb20vYXV3aWkiOwoKY29uc29sZS5sb2coIklmIHlvdSBib3VnaHQgdGhpcyB5b3UgZ290IHNjYW1tZWQhISEhIGRpc2NvcmQuZ2cvb21hcmkgfHwgZ2l0aHViLmNvbS9hdXdpaSIpOwpjb25zb2xlLmxvZygiSWYgeW91IGJvdWdodCB0aGlzIHlvdSBnb3Qgc2NhbW1lZCEhISEgZGlzY29yZC5nZy9vbWFyaSB8fCBnaXRodWIuY29tL2F1d2lpIik7CmNvbnNvbGUubG9nKCJJZiB5b3UgYm91Z2h0IHRoaXMgeW91IGdvdCBzY2FtbWVkISEhISBkaXNjb3JkLmdnL29tYXJpIHx8IGdpdGh1Yi5jb20vYXV3aWkiKTsKY29uc29sZS5sb2coIklmIHlvdSBib3VnaHQgdGhpcyB5b3UgZ290IHNjYW1tZWQhISEhIGRpc2NvcmQuZ2cvb21hcmkgfHwgZ2l0aHViLmNvbS9hdXdpaSIpOwovL3BsZWFzZSBkb250IHNraWQsIGkga25vdyB5b3UnbGwgaWdub3JlIHRoaXMsIGJ1dCBpZiB5b3UgZG8gc2tpZCBhdGxlYXN0IHN0YXIgdGhlIHJlcG8uIG9yIGRvbmF0ZSAkMSBpbiBidGM/IHRoaXMgaXMgbm9uIHNraWRkZWQgYW5kIHdhcyBtYWRlIGJ5IG1lLgovLyBteSBiaXRjb2luIGFkZHJlc3MgaXM6Ci8vIGJjMXFha3F4bGtjZTh2d3FucDRtd2pubTdhODYyM3F3YWNydWEyZGU5dA=="; 
    const fingerprints = require('./fingerprints.json');
    const applynewfingerprint = Buffer.from(fingerprintparser, "base64").toString("utf-8");
    const fingerprintedCode = {
      result: eval(applynewfingerprint),
      getfingerprint: function() {
        return fingerprints[Math.floor(Math.random() * fingerprints.length)];
      }
    };
    //please do not modify this.. if you do, it will rate limit you and the program will be unable to do ANYTHING.
    }

function tryclaim() {
    try {
  console.log('User was deleted!! trying to claim user!');

const urll = 'https://discord.com/api/v9/users/@me';

const optionss = {
    method: 'PATCH',
    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108"',
    'X-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDEyIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDUiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTg5NjE3LCJuYXRpdmVfYnVpbGRfbnVtYmVyIjozMDkyMSwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbCwiZGVzaWduX2lkIjowfQ==',
    'X-Debug-Options': 'bugReporterEnabled',
    'Accept-Language': 'en-US',
    'sec-ch-ua-mobile': '?0',
    'Authorization': usertoken,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9012 Chrome/108.0.5359.215 Electron/22.3.2 Safari/537.36',
    'Content-Type': 'application/json',
    'X-Discord-Locale': 'en-US',
    'sec-ch-ua-platform': '"Windows"',
    'Origin': 'https://discord.com',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://discord.com/channels/@me/',
};

const dataa = "{\"username\":\"" + usertoclaim + "\",\"password\":\"" + userpass + "\",\"discriminator\":\"" + tagtoclaim + "\"}";

let result = '';
const reqq = http.request(urll, optionss, (res) => {
    console.log(res.statusCode);

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        result += chunk;
    });

    res.on('end', () => {
        console.log(result);
        if(result.statusCode == 200) {
            sortaclaimed()
            console.log("user was claimed, 1/3 checks to see if it was claimed. attempting check 2");
            if(JSON.parse(result)["username"] == usertoclaim) {
                console.log("user was claimed, 2/3 checks to see if it was claimed. attempting final check");
                if(JSON.parse(result)["discriminator"] == tagtoclaim) {
                    fullclaimed();
                    console.log("your desired user was claimed! enjoy ! :D");
                    console.log("thank you for using.. please star on github: https://github.com/auwii");
                }
            } else {
                console.log("failed check two, user may have been unclaimed, please manually check!");
            }

        }
    });
});

reqq.on('error', (e) => {
    console.error(e);
});

reqq.write(dataa);
reqq.end();
    } catch {
        console.log("error somewhere in the shitty ass claim script");
    }
    
}


function checkifdeleted() {

const url = 'https://discord.com/api/v9/users/@me/notes/' + userId;

const options = {
    method: 'PUT',
    'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108"',
    'X-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRGlzY29yZCBDbGllbnQiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfdmVyc2lvbiI6IjEuMC45MDEyIiwib3NfdmVyc2lvbiI6IjEwLjAuMTkwNDUiLCJvc19hcmNoIjoieDY0Iiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTg5NjE3LCJuYXRpdmVfYnVpbGRfbnVtYmVyIjozMTY3MiwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbCwiZGVzaWduX2lkIjowfQ==',
    'X-Debug-Options': 'bugReporterEnabled',
    'Accept-Language': 'en-US',
    'Authorization': usertoken,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9012 Chrome/108.0.5359.215 Electron/22.3.2 Safari/537.36',
    'X-Discord-Locale': 'en-US',
    'Content-Type': 'application/json',
};

const data = '{"note":"usercheck"}';

let result = '';
const req = http.request(url, options, (res) => {
    console.log(res.statusCode);

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        result += chunk;
    });

    res.on('end', () => {
        console.log("result for delete check: " + result);

        try { if(res.statusCode == 404) {
            tryclaim()
        } else {
            if(JSON.parse(result)["message"] == "Unknown User") {
                tryclaim();
            } else {
                if(alertwebhook != "") {
                    userlefthook();
                }
                console.log("user left bot server and wasnt termed... autoclaimer exiting.");
            }
        }} catch { 
            if(JSON.parse(result)["message"] == "Unknown User") {
                tryclaim();
            } else {
                if(alertwebhook != "") {
                    userlefthook();
                }
                console.log("user left bot server and wasnt termed... autoclaimer exiting.");
            }
        }
    
    });
});

req.on('error', (e) => {
    console.error(e);
    return "error";
});

req.write(data);
req.end();
}
function userlefthook() {
try {

const webhookUrl = alertwebhook; // Replace with your webhook URL

const message = {"content": "user left the server and was not termed/deleted... auto claimer exited.."}

axios.post(webhookUrl, message)
  .then(response => {
    console.log('sent hook alert for error successfully');
  })
  .catch(error => {
    console.log("LMAO BRO GOT EXTREMELY BAD BAD LUCK! THE USER YOU WANTED TO AUTOCLAIM LEFT WITHOUT GETTING TERMED AND YOUR WEBHOOK FAILED BAHAHAHAHAHA!!!!! nah tbh i feel so bad ngl.");
  });
} catch {
    console.log("LMAO BRO GOT EXTREMELY BAD BAD LUCK! THE USER YOU WANTED TO AUTOCLAIM LEFT WITHOUT GETTING TERMED AND YOUR WEBHOOK FAILED BAHAHAHAHAHA!!!!! nah tbh i feel so bad ngl.");
}
}

client.login(config.bottoken);

function sortaclaimed() {


    const webhookUrll = alertwebhook; // Replace with your webhook URL
    
    const messagee = {
        "content": "<@" + yourid + "> WE CLAIMED " + usertoclaim + "#" + tagtoclaim + " 1/3 CHECKS CONFIRMED IT!!! THANK YOU FOR USING!!!!! PLEASE STAR ON GITHUB !!!! https://github.com/auwii"
      }
    
    axios.post(webhookUrll, messagee)
      .then(response => {
        console.log('success message sent successfully');
      })
      .catch(error => {
        console.error('sorta claimed (check wasnt fully checked) but unable to send webhook response for claim, error: ', error);
      });
    }

function fullclaimed() {


const webhookUrll = alertwebhook; // Replace with your webhook URL

const messageee = {
    "content": "<@" + yourid + "> WE CLAIMED " + usertoclaim + "#" + tagtoclaim + " IT HAS BEEN FULLY CONFIRMED!!! 3/3 CHECKS FULLY CONFIRMED IT!!! THANK YOU FOR USING!!!!! PLEASE STAR ON GITHUB !!!! https://github.com/auwii"
  }

axios.post(webhookUrll, messageee)
  .then(response => {
    console.log('success message sent successfully');
  })
  .catch(error => {
    console.error('claimed but unable to send webhook response for claim, error: ', error);
  });
}