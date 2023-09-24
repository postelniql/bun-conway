import { generateGameGrid } from "./game";

export enum Command {
  GenerateGrid = "generateGrid",
  ClearGrid = "clearGrid",
  StartGame = "startGame",
  StopGame = "stopGame",
}

type GenerateGridMessage = {
  generateGrid: string;
};
type ClearGridMessage = { clearGrid: string };
type StartGameMessage = { startGame: string };
type StopGameMessage = { stopGame: string };

type CommandToMessageMapping = {
  [Command.GenerateGrid]: GenerateGridMessage;
  [Command.ClearGrid]: ClearGridMessage;
  [Command.StartGame]: StartGameMessage;
  [Command.StopGame]: StopGameMessage;
};

export type Message =
  | GenerateGridMessage
  | ClearGridMessage
  | StartGameMessage
  | StopGameMessage;

type CommandHandler<T> = (message: T) => void;

const generateGridHandler = (message: GenerateGridMessage) => {
  console.log("generate");
};
const clearGridHandler = (message: ClearGridMessage) => {
  console.log("clear");
};
const startGameHandler = (message: StartGameMessage) => {
  console.log("start");
};
const stopGameHandler = (message: StopGameMessage) => {
  console.log("stop");
};

export const commandHandlers: {
  [K in Command]: CommandHandler<CommandToMessageMapping[K]>;
} = {
  [Command.GenerateGrid]: generateGridHandler,
  [Command.ClearGrid]: clearGridHandler,
  [Command.StartGame]: startGameHandler,
  [Command.StopGame]: stopGameHandler,
};

export const parseWsMessage = (rawMessage: string): Message | null => {
  const message = JSON.parse(rawMessage);

  if (message && typeof message.generateGrid === "string")
    return message as GenerateGridMessage;
  if (message && typeof message.clearGrid === "string")
    return message as ClearGridMessage;
  if (message && typeof message.startGame === "string")
    return message as StartGameMessage;
  if (message && typeof message.stopGame === "string")
    return message as StopGameMessage;

  return null;
};
