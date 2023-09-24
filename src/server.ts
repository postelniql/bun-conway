import {
  Command,
  commandHandlers,
  existsHandlerForKey,
  getCommandKey,
  parseWsMessage,
} from "./commands";

const server = Bun.serve({
  fetch: (req, server) => {
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
    message: async (ws, message) => {
      const command = parseWsMessage(message);
      const commandKey = getCommandKey(command) as Command;

      if (commandKey && existsHandlerForKey(commandKey)) {
        const handle = commandHandlers[commandKey];
        handle(command as any, (data) => ws.send(data));
      } else {
        ws.send("Unknown command");
      }
    },
  },
});

console.info(`Bun running on ${server.hostname}:${server.port}`);
