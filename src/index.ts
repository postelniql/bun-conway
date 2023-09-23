import { startGame, stopGame } from "./game";

const server = Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch: fetchHandler,
});

console.info(`Bun Todo running on ${server.hostname}:${server.port}`);

async function fetchHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "" || url.pathname === "/") {
    return new Response(Bun.file("public/index.html"));
  }

  if (url.pathname === "/startGame") {
    const reqData = await request.formData();
    const gridSizeUserInput = Number(reqData.get("matrixSize"));

    const gameData = startGame(gridSizeUserInput);
    return new Response(gameData, {
      headers: { "Content-Type": "text/html" },
    });
  }

  if (url.pathname === "/stopGame") {
    const gameData = stopGame();
    return new Response(gameData, {
      headers: { "Content-Type": "text/html" },
    });
  }

  if (url.pathname === "/styles.css") {
    return new Response(Bun.file("public/styles.css"), {
      headers: { "Content-Type": "text/css" },
    });
  }

  return new Response("Not Found", { status: 404 });
}
