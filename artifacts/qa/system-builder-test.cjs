const wsUrl = process.argv[2];

if (!wsUrl) {
  console.error("Missing WebSocket URL");
  process.exit(1);
}

const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const call = { id: ++id, method, params };
    pending.set(call.id, { resolve, reject });
    ws.send(JSON.stringify(call));
  });
}

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.id && pending.has(msg.id)) {
    const entry = pending.get(msg.id);
    pending.delete(msg.id);

    if (msg.error) {
      entry.reject(msg.error);
      return;
    }

    entry.resolve(msg.result);
  }
};

ws.onopen = async () => {
  try {
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Page.navigate", { url: "http://127.0.0.1:3012" });
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const result = await send("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: String.raw`
        (async () => {
          const builder = document.querySelector("#system-builder-title");
          builder?.scrollIntoView();
          await new Promise((resolve) => setTimeout(resolve, 250));
          const group = document.querySelector('[aria-label="System type"]');
          const buttons = [...(group?.querySelectorAll("button") ?? [])];
          const backends = buttons.find((button) =>
            button.textContent.toLowerCase().includes("backends")
          );
          const ai = buttons.find((button) =>
            button.textContent.toLowerCase().includes("ai systems")
          );

          if (!backends || !ai) {
            return {
              buttonCount: buttons.length,
              buttonText: buttons.map((button) => button.textContent.trim())
            };
          }

          backends.click();
          await new Promise((resolve) => setTimeout(resolve, 100));
          const clickSelected = [...document.querySelectorAll('[aria-pressed="true"]')]
            .map((button) => button.textContent.trim())
            .join("|");

          ai.focus();
          ai.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
          ai.click();
          await new Promise((resolve) => setTimeout(resolve, 100));
          const keySelected = [...document.querySelectorAll('[aria-pressed="true"]')]
            .map((button) => button.textContent.trim())
            .join("|");

          return {
            buttonCount: buttons.length,
            clickSelected,
            keySelected,
            flowVisible: document.body.innerText.includes("AI Systems flow")
          };
        })()
      `
    });

    console.log(JSON.stringify(result));
    ws.close();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
    ws.close();
  }
};
