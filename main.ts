import { Plugin } from "obsidian";

export default class LightModeEditorPlugin extends Plugin {
  private active = false;
  private ribbonIcon: HTMLElement | null = null;

  async onload() {
    this.ribbonIcon = this.addRibbonIcon(
      "sun",
      "Toggle light mode editor",
      () => this.toggle()
    );
    this.updateRibbonState();

    this.addCommand({
      id: "toggle-light-editor",
      name: "Toggle light mode editor",
      callback: () => this.toggle(),
    });
  }

  private toggle() {
    this.active = !this.active;
    document.body.classList.toggle("light-mode-editor-active", this.active);
    this.updateRibbonState();
  }

  private updateRibbonState() {
    if (!this.ribbonIcon) return;
    if (this.active) {
      this.ribbonIcon.addClass("is-active");
      this.ribbonIcon.setAttribute("aria-label", "Turn off light mode editor");
    } else {
      this.ribbonIcon.removeClass("is-active");
      this.ribbonIcon.setAttribute("aria-label", "Toggle light mode editor");
    }
  }

  onunload() {
    document.body.classList.remove("light-mode-editor-active");
  }
}
