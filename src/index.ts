import { startGame, stopGame } from "./game";

const server = Bun.serve({
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      console.info(`Bun server upgraded to ws`);
      return undefined;
    }

    const url = new URL(req.url);

    if (url.pathname === "" || url.pathname === "/") {
      console.log("returns index");
      return new Response(Bun.file("public/index.html"));
    }

    if (url.pathname === "/styles.css") {
      console.log("returns css");
      return new Response(Bun.file("public/styles.css"), {
        headers: { "Content-Type": "text/css" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
  websocket: {
    async message(ws, message) {
      console.log(`Received ${message} from ${JSON.stringify(ws)}}`);
      let jsonMessage;
      if (typeof message === "string") {
        jsonMessage = JSON.parse(message);
      } else if (message instanceof Buffer) {
        jsonMessage = JSON.parse(message.toString("utf8"));
      }
      if ("startGame" in jsonMessage) {
        const gridSizeUserInput = Number(jsonMessage.startGame);

        const gameData = startGame(gridSizeUserInput);
        ws.send(gameData);
      } else if ("stopGame" in jsonMessage) {
        const gameData = stopGame();
        ws.send(gameData);
      } else {
        ws.send("Unknown command");
      }
    },
  },
});

console.info(`Bun running on ${server.hostname}:${server.port}`);
