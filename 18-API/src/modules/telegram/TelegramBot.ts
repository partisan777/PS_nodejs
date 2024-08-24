import { Telegraf, session } from "telegraf";
import { IConfigService } from "../../config/config.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ExtContext } from "./interfaces/telegram.interface";
import { ITelegramBot } from "./interfaces/ibot.interfaces";
import { IUserService } from "../users";
import { Command } from "./commands/command.class";
import { BotStartCommand } from "./commands/start.command";
import { Scenes } from "telegraf";
import { ProfileScene } from "./scenes/ProfileScene";
import { CMD_TEXT } from "./cmd_text/cmd_text";
import { IItemService } from "../items";
import { ItemScene } from "./scenes/ItemScene";
import { PromoScene } from "./scenes/PromoScene";
import { IPromotionService } from "../promotions";

@injectable()
export class TelegramBot implements ITelegramBot {
    bot: Telegraf<ExtContext>;
    commands: Command[] = [];
    scenes: Scenes.WizardScene<ExtContext>[] = [];
    stage: Scenes.Stage<ExtContext, Scenes.SceneSessionData>;

    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.UserService) private userService: IUserService,
        @inject(TYPES.ItemService) private itemService: IItemService,
        @inject(TYPES.PromotionService) private promotionServise: IPromotionService,
    ) {
        this.bot = new Telegraf<ExtContext>(this.configService.get('TELEGRAM_TOKEN'));
        this.bot.use(session());
        this.init();
    }

    init() {
        this.commands = [new BotStartCommand(this.bot, this.userService)];

        for (const command of this.commands) {
            command.handle();
        };
        this.scenes = [
            new ProfileScene(this.userService),
            new ItemScene(this.itemService),
            new PromoScene(this.promotionServise, this.userService)
        ];
        this.stage = new Scenes.Stage(this.scenes);
        this.bot.use(this.stage.middleware());
        this.bot.hears(CMD_TEXT.profile, (ctx)=> ctx.scene.enter('profile'));
        this.bot.hears(CMD_TEXT.items, (ctx)=> ctx.scene.enter('items'));
        this.bot.hears(CMD_TEXT.promo, (ctx)=> ctx.scene.enter('promo'));
    };
};
