import { Telegraf } from "telegraf";
import { ExtContext } from "../interfaces/telegram.interface";

export abstract class Command {
    constructor(bot: Telegraf<ExtContext>) {
    }
    abstract handle(): void;
};
