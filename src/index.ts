import { Command, commandHandlers, parseWsMessage } from "./commands";

const server = Bun.serve({
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      console.info(`Bun server upgraded to ws`);
      return undefined;
    }

    const url = new URL(req.url);

    if (url.pathname === "" || url.pathname === "/") {
      return new Response(Bun.file("public/index.html"));
    }

    if (url.pathname === "/styles.css") {
      return new Response(Bun.file("public/styles.css"), {
        headers: { "Content-Type": "text/css" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
  websocket: {
    async message(ws, message) {
      const jsonMessage = parseWsMessage(message);
      const commandKey = Object.keys(jsonMessage).find((key) =>
        Object.values(Command).includes(key)
      );
      if (commandKey && commandHandlers[commandKey]) {
        commandHandlers[commandKey](jsonMessage);
      } else {
        ws.send("Unknown command");
      }
    },
  },
});

console.info(`Bun running on ${server.hostname}:${server.port}`);
