import { Context, Scenes } from "telegraf";

interface ExtWizardSession extends Scenes.WizardSessionData {
  email: string;
  nickname: string;
  password: string;
};

export interface ExtContext extends Context {
  scene: Scenes.SceneContextScene<ExtContext, ExtWizardSession>;
  wizard: Scenes.WizardContextWizard<ExtContext>;
};
