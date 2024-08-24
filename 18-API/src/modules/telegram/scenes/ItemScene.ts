import { Scenes, Composer } from "telegraf";
import { CMD_TEXT } from "../cmd_text/cmd_text";
import { mainMenu, backButtonMenu } from "../buttons/buttons";
import { ExtContext } from "../interfaces/telegram.interface";
import { message } from "telegraf/filters";
import { ITelegramBotScene } from "../interfaces/bot.scene.interface";
import { inject } from "inversify";
import { TYPES } from "../../../types";
import { IItemService } from "../../items";


export class ItemScene extends Scenes.WizardScene<ExtContext> implements ITelegramBotScene {
    public sceneName: string;
    constructor(
        @inject(TYPES.ItemService) private itemService: IItemService,
    ) {
        super(
            'items',
            Composer.on(message('text'), async ctx => {
                const msg = ctx.message.text;
                const items = await this.itemService.getItems({name: msg}, {});
                if (items) {
                    const itemStr = items.map((item) => {
                        const str =
                        `Наименование: ${item.name}
                         Опиасание: ${item.description}
                         Цена: ${item.price}
                        `;
                        return str;
                    }).join();
                    ctx.reply(`Доступны товары:
                        ${itemStr}
                    `, {
                        ...backButtonMenu
                    });
                } else {
                    ctx.reply(`По Вашему запросу отваров не найдено`, {
                        ...backButtonMenu
                    });
                }
            })
        );
        this.sceneName = 'items';
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
