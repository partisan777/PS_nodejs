// кнопки для бота
import { Markup } from 'telegraf';
import { CMD_TEXT } from '../cmd_text/cmd_text';

export const mainMenu =
    Markup.keyboard([
        [CMD_TEXT.profile],
        [CMD_TEXT.promo],
        [CMD_TEXT.items],
    ]).resize();


export const backButtonMenu =
    Markup.keyboard([
        [CMD_TEXT.leaveToMenu],
    ]).resize();
