import { Scenes, Composer } from "telegraf";
import { CMD_TEXT } from "../telegram.command.text/telegram.command.text";
import { mainMenu, backButtonMenu } from "../telegram.buttons/telegram.buttons";
import { ExtContext } from "../interfaces/telegram.interface";
import { message } from "telegraf/filters";
import { ITelegramBotScene } from "../interfaces/bot.scene.interface";
import { IUserService } from "../../users";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import { ETelegramSceneNames } from "../enums/enums";

export class ProfileScene extends Scenes.WizardScene<ExtContext> implements ITelegramBotScene {
    public sceneName: string;
    constructor(
        @inject(TYPES.UserService) private userService: IUserService,
    ) {
        super(
            ETelegramSceneNames.profile,
            Composer.on(message('text'), async ctx => {
                const msg = ctx.message;
            })
        );
        this.sceneName = ETelegramSceneNames.profile;
        this.init();
    }

    init() {
        this.enter(async (ctx) => {
            //@ts-ignore
            const userId = ctx.update.message.from.id;
            const user = await this.userService.getUserInfo({telegramUserId: userId});
            if (user) {
                ctx.reply(`
                    telegram login: ${user.telegramUserName}
                    `, {
                ...backButtonMenu
            })
            }
         });
        this.hears(CMD_TEXT.leaveToMenu, (ctx: ExtContext) => {
            ctx.scene.leave();
            ctx.reply(`⛳ Ты находишься в меню`, {
                parse_mode: 'HTML',
                ...mainMenu
            });
        });
    };
};
