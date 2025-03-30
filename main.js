import { registerSocketHandlers, socket } from "./scripts/sockets.js";
import { registerApi } from "./scripts/api.js";
import { MacroBuilder } from "./scripts/ui/MacroBuilder.js";

Hooks.once("socketlib.ready", () => {
  registerSocketHandlers();
  registerApi();
  console.log("pf2e-bkns-effects | initialized.");
});

Hooks.on("ready", () => {
  game.modules.get("pf2e-bkns-effects").api.openBuilder = () => {
    new MacroBuilder().render(true);
  };
});
