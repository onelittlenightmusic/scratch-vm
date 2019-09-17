const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const nets = require('nets');
const SERVER_TIMEOUT = 10000; // 10 seconds
class Scratch3Slack {
    constructor (runtime) {
        this.runtime = runtime;
        this.icon = ":flower:";
        this.name = "Scratch3.0Customized";
        this.channel = "#general";
        this.webhook = "";
    }
    getInfo () {
        return {
            id: 'slack',
            name: 'Slack',
            blocks: [
                {
                    opcode: 'post',
                    blockType: BlockType.COMMAND,
                    text: 'Post [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello",
                        }
                    }
                },
                {
                    opcode: 'setWebhook',
                    blockType: BlockType.COMMAND,
                    text: 'Set Webhook to [WEBHOOK_URL]',
                    arguments: {
                        WEBHOOK_URL: {
                            type: ArgumentType.STRING,
                            defaultValue: "URL",
                        }
                    }
                },
                {
                    opcode: 'setIcon',
                    blockType: BlockType.COMMAND,
                    text: 'Set Icon to [ICON]',
                    arguments: {
                        ICON: {
                            type: ArgumentType.STRING,
                            defaultValue: ":flower:",
                            menu: "icons"
                        }
                    }
                },
                {
                    opcode: 'setName',
                    blockType: BlockType.COMMAND,
                    text: 'Set Name to [NAME]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: "Scratch3.0Customized"
                        }
                    }
                },
                {
                    opcode: 'setChannel',
                    blockType: BlockType.COMMAND,
                    text: 'Set Channel to [CHANNEL]',
                    arguments: {
                        CHANNEL: {
                            type: ArgumentType.STRING,
                            defaultValue: "#general"
                        }
                    }
                }
            ],
            menus: {
                icons: {
                    acceptReporters: true,
                    items: [
                        { text: "Cat", value: ":cat:"},
                        { text: "Flower", value: ":flower:"},
                        { text: "Ghost", value: ":ghost:"},
                        { text: "Airplane", value: ":airplane:"},
                        { text: "Heart", value: ":heart:"}
                    ]
                }
            }
        };
    }

    setIcon(args) {
        this.icon = args.ICON;
    }

    setName(args) {
        this.name = args.NAME;
    }

    setChannel(args) {
        this.channel = args.CHANNEL;
    }
    
    setWebhook(args) {
        this.webhook = args.WEBHOOK_URL;
    }

    post(args) {
        if(this.webhook == "") {
            log.log("ERROR: Please set webhook URL.");
            return;
        }
        const url = this.webhook;
        // const message = args.TEXT;
        const message = {
            "channel": this.channel, 
            "username": this.name,
            "text": args.TEXT,
            "icon_emoji": this.icon
        };
        // path = url + "?payload=" + encodeURIComponent(message);
        // const webhook = new IncomingWebhook(url);  
        // return webhook.send({text: message});

        return new Promise(resolve => {
            nets({
                url, 
                method: "POST",
                timeout: SERVER_TIMEOUT,
                body: JSON.stringify(message)
            }, (err, res, body) => {
                if (err) {
                    log.warn(err);
                    return resolve();
                }

                if (res.statusCode !== 200) {
                    log.warn(res.statusCode);
                    return resolve();
                }
                return resolve();
            });
        });

    }
}

module.exports = Scratch3Slack;
