import { Scenes, Composer } from "telegraf";
import { CMD_TEXT } from "../cmd_text/cmd_text";
import { mainMenu, backButtonMenu } from "../buttons/buttons";
import { ExtContext } from "../interfaces/telegram.interface";
import { message } from "telegraf/filters";
import { ITelegramBotScene } from "../interfaces/bot.scene.interface";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import { IPromotionService } from "../../promotions";
import { IUserService } from "../../users";


export class PromoScene extends Scenes.WizardScene<ExtContext> implements ITelegramBotScene {
    public sceneName: string;
    constructor(
        @inject(TYPES.PromotionService) private promotionServise: IPromotionService,
        @inject(TYPES.UserService) private userService: IUserService,
    ) {
        super(
            'promo',
            Composer.on(message('text'), async ctx => {
                const msg = ctx.message.text;
                const userId = ctx.update.message.from.id;
                const user = await this.userService.getUserInfo({telegramUserId: userId});
                if (!user) {
                    ctx.scene.leave();
                    ctx.reply(`произошла ошибка определения пользователя`)
                    ctx.reply(`⛳ Ты находишься в меню`)
                };
                //@ts-ignore
                const promo = await this.promotionServise.getPromotions({name: msg}, {}, user);
                if (promo && promo.length > 0) {
                    const itemStr = promo.map((item) => {
                        const str =
                        `Наименование: ${item.name}
                         Опиасание: ${item.description}
                        `;
                        return str;
                    }).join();
                    ctx.reply(`Доступны акции:
                        ${itemStr}
                    `, {
                        ...backButtonMenu
                    });
                } else {
                    ctx.reply(`По Вашему запросу промоакций не найдено`, {
                        ...backButtonMenu
                    });
                }
            })
        );
        this.sceneName = 'promo';
        this.init();
    }

    init() {
        this.enter(async (ctx) => {
            ctx.reply(`введите наименование товара`, {
            ...backButtonMenu
            });
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
