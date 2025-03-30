import { MODULE_ID } from "../sockets.js";

export class MacroBuilder extends Application {
  constructor() {
    super();
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "bkns-macro-builder",
      title: "BKNS Effect Macro Builder",
      template: `modules/${MODULE_ID}/templates/macro-builder.html`,
      width: 400,
      height: "auto",
    });
  }

  getData() {
    return {};
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("#generate-macro").on("click", () => {
      const target = html.find("#target-select").val();
      const primaryEffect = html.find("#primary-effect-uuid").val();
      const secondaryEffect = html.find("#secondary-effect-uuid").val();

      const macroText = 
`const target = '${target}';
const primaryEffect = '${primaryEffect}';
${secondaryEffect ? `const secondaryEffect = '${secondaryEffect}';` : ''}
game.modules.get("${MODULE_ID}").api.applyEffects({ target, primaryEffect${secondaryEffect ? ', secondaryEffect' : ''} });`;

      html.find("#macro-output").val(macroText);
    });

    html.find("#copy-macro").on("click", () => {
      const output = html.find("#macro-output")[0];
      output.select();
      document.execCommand("copy");
      ui.notifications.info("Macro copied to clipboard!");
    });
  }
}
