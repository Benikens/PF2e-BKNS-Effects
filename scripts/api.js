import { socket, MODULE_ID } from "./sockets.js";

// This is called by GM via socket
export async function handleApplyEffects({ actorUuid, effectUuids }) {
  const actor = await fromUuid(actorUuid);
  if (!actor) return ui.notifications.warn("Invalid target actor.");

  for (const uuid of effectUuids) {
    const effect = await fromUuid(uuid);
    if (!effect) {
      ui.notifications.warn(`Effect not found: ${uuid}`);
      continue;
    }
    await actor.createEmbeddedDocuments("Item", [effect.toObject()]);
  }

  ui.notifications.info(`${actor.name} now has effect(s) applied.`);
}

// This is exposed to macro calls
export async function applyEffects({ target = "self", primaryEffect, secondaryEffect }) {
  const user = game.user;
  const controlled = canvas.tokens.controlled[0];
  const selectedActor = controlled?.actor;
  const targeted = Array.from(user.targets)[0];
  const targetActor = target === "self" ? selectedActor : targeted?.actor;

  if (!targetActor) {
    ui.notifications.warn(`No valid ${target === "self" ? "controlled token" : "target"} selected.`);
    return;
  }

  const effectUuids = [primaryEffect];
  if (secondaryEffect) effectUuids.push(secondaryEffect);

  await socket.executeAsGM("applyEffects", {
    actorUuid: targetActor.uuid,
    effectUuids,
  });
}

// Register the public API
export function registerApi() {
  game.modules.get(MODULE_ID).api = {
    applyEffects
  };
}
