import { clearGameGrid, generateGameGrid } from "./game";

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
type EmptyMessage = {};

type WsSendCallback = (data: string) => void;

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
  | StopGameMessage
  | EmptyMessage;

type CommandHandler<T> = (message: T, sendData: WsSendCallback) => void;

const generateGridHandler = (
  message: GenerateGridMessage,
  sendData: WsSendCallback
) => {
  const gridSizeUserInput = Number(message.generateGrid);

  const gameData = generateGameGrid(gridSizeUserInput);
  sendData(gameData);
};
const clearGridHandler = (
  message: ClearGridMessage,
  sendData: WsSendCallback
) => {
  const gridSizeUserInput = Number(message.clearGrid);
  const gameData = clearGameGrid(gridSizeUserInput);
  sendData(gameData);
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

export const parseWsMessage = (rawMessage: string | Buffer): Message => {
  if (rawMessage instanceof Buffer) {
    return {};
  }

  const message = JSON.parse(rawMessage);

  if (message && typeof message.generateGrid === "string")
    return message as GenerateGridMessage;
  if (message && typeof message.clearGrid === "string")
    return message as ClearGridMessage;
  if (message && typeof message.startGame === "string")
    return message as StartGameMessage;
  if (message && typeof message.stopGame === "string")
    return message as StopGameMessage;

  return {};
};
