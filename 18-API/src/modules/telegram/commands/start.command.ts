import { Telegraf } from "telegraf";
import { TYPES } from "../../../types";
import { inject, injectable } from "inversify";
import { ExtContext } from "../interfaces/telegram.interface";
import { IUserService } from "../../users";
import { mainMenu } from "../buttons/buttons";
import { Command } from "./command.class";


@injectable()
export class BotStartCommand extends Command {
    private bot: Telegraf<ExtContext>;
    constructor(
        bot: Telegraf<ExtContext>,
        @inject(TYPES.UserService) private userService: IUserService,
    ) {
        super(bot);
        this.bot = bot;
    }

    handle(): void {
        this.bot.start(async (ctx) => {
            console.log(ctx);
            const userId = ctx.update.message.from.id;
            const userName = ctx.update.message.from.username? ctx.update.message.from.username : 'empty';
            const createdUser = await this.userService.createUserFromTelegram(userId, userName)
            ctx.reply(`Добрый день, ${ctx.update.message.from.first_name}!
                ${createdUser? 'Добро пожаловать в магазин' : 'Рады видеть Вас снова!'}
                `, {
                    parse_mode: 'HTML',
                    ...mainMenu
            });
        });
    };
};


