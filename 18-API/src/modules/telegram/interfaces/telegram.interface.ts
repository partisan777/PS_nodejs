import { Context, Scenes } from "telegraf";
import type { Message } from "typegram";


interface ExtWizardSession extends Scenes.WizardSessionData {
  email: string;
  nickname: string;
  password: string;
};

export interface ExtContext extends Context {
  scene: Scenes.SceneContextScene<ExtContext, ExtWizardSession>;
  wizard: Scenes.WizardContextWizard<ExtContext>;
};

/*
interface ExtWizardSession<T = undefined> extends Scenes.WizardSessionData {
  sceneData: T;
};

interface MySession<T = undefined> extends Scenes.SceneSession<ExtWizardSession<T>> {};

export interface ExtContext<T = undefined> extends Context {
  scene: Scenes.SceneContextScene<ExtContext, ExtWizardSession>;
  wizard: Scenes.WizardContextWizard<ExtContext>;
};

export type ExtendContext<T extends Message, C = undefined> = ExtContext<C> & {
  message: T;
};
*/


interface ExtWizardSession<T = undefined> extends Scenes.SceneSessionData {
  sceneData: T;
};

interface MySession<T = undefined> extends Scenes.SceneSession<ExtWizardSession<T>> {};

export interface MyContext<T = undefined> extends Context {
  session: MySession<T>;
  scene: Scenes.SceneContextScene<MyContext<T>, ExtWizardSession<T>>;
};

export type ExtendContext<T extends Message, C = undefined> = MyContext<C> & {
  message: T;
};
