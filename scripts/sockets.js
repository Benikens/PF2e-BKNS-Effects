import { handleApplyEffects } from "./api.js";

export const MODULE_ID = "pf2e-bkns-effects";
export let socket;

export function registerSocketHandlers() {
  socket = socketlib.registerModule(MODULE_ID);
  socket.register("applyEffects", handleApplyEffects);
  game.modules.get(MODULE_ID).socket = socket;
}