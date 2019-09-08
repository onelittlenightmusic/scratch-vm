const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3NewBlock {
    constructor (runtime) {
        this.runtime = runtime;
        this.text = "";
        this.changed = 0;
        this.lasthat = false;
    }
    // getHats () {
    //     return {
    //         hat1: {
    //             restartExistingThreads: true,
    //             edgeActivated: true
    //         },
    //     }
    // }

    getInfo () {
        return {
            id: 'newblock',
            name: 'DevSample',
            blocks: [
                {
                    opcode: 'command1',
                    blockType: BlockType.COMMAND,
                    text: 'command [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello",
                            menu: "languages"
                        }
                    }
                },
                {
                    opcode: 'reporter1',
                    blockType: BlockType.REPORTER,
                    text: 'reporter [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello",
                            menu: "languages"
                        }
                    }
                },
                {
                    opcode: 'boolean1',
                    blockType: BlockType.BOOLEAN,
                    text: 'boolean [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello",
                            menu: "languages"
                        }
                    }
                },
                {
                    opcode: 'event1',
                    blockType: BlockType.EVENT,
                    text: 'event [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello",
                            menu: "languages"
                        }
                    }
                },
                {
                    opcode: 'conditional1',
                    blockType: BlockType.CONDITIONAL,
                    text: 'conditional [TEXT]',
                    branchCount: 2,
                    arguments: {
                        TEXT: {
                            type: ArgumentType.BOOLEAN,
                            defaultValue: true
                        }
                    }
                },
                {
                    opcode: 'writeLog5',
                    blockType: BlockType.BUTTON,
                    text: 'button',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello",
                            menu: "languages"
                        }
                    }
                },
                {
                    opcode: 'send1',
                    blockType: BlockType.COMMAND,
                    text: 'send event',
                },
                {
                    opcode: 'hat1',
                    blockType: BlockType.HAT,
                    text: 'hat'
                },
                {
                    opcode: 'writeLog7',
                    blockType: BlockType.LOOP,
                    text: 'loop [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello",
                            menu: "languages"
                        }
                    }
                },
                {
                    opcode: 'writeLogArg1',
                    blockType: BlockType.COMMAND,
                    text: 'argument type: STRING [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                },
                {
                    opcode: 'writeLogArg2',
                    blockType: BlockType.COMMAND,
                    text: 'argument type: BOOLEAN [JUDGE]',
                    arguments: {
                        JUDGE: {
                            type: ArgumentType.BOOLEAN,
                            defaultValue: true
                        }
                    }
                },
                {
                    opcode: 'writeLogArg3',
                    blockType: BlockType.COMMAND,
                    text: 'argument type: EVENT [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.EVENT
                            // defaultValue: 
                        }
                    }
                }
            ],
            menus: {
                languages: {
                    acceptReporters: true,
                    items: [{ text: "test", value: "test"}, {text: "hello", value: "hello"}]
                }
            }
        };
    }


    reporter1(args) {
        return `Argument TEXT is ${args.TEXT}`;
    }

    boolean1(args) {
        return args.TEXT == "hello";
    }

    conditional1(args) {
        return args.TEXT;
    }

    command1(args) {
        this.text = Cast.toString(args.TEXT);
    }

    send1(args) {
        this.changed = true;
    }
    // hat1(args) {
    //     var rtn = this.changed;
    //     this.changed = false;
    //     return rtn;
    // }

    hat1(args) {
        var rtn = this.changed && (!this.lasthat);
        this.changed = false;
        this.lasthat = rtn;
        return rtn;
    }


    event1(args) {
        return this.text == args.TEXT;
    }

    writeLogArg2 (args) {
        const judge = Cast.toBoolean(args.JUDGE);
        if(judge) 
            log.log(judge);
        else
            log.log(judge)
    }
}

module.exports = Scratch3NewBlock;
