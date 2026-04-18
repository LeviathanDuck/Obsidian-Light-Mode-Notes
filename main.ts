import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

interface LightModeSettings {
  editorFontSize: number | null; // null = use Obsidian default
}

const DEFAULT_SETTINGS: LightModeSettings = {
  editorFontSize: null,
};

const STEP = 1; // px per increment

export default class LightModeEditorPlugin extends Plugin {
  private active = false;
  private ribbonIcon: HTMLElement | null = null;
  settings: LightModeSettings = { ...DEFAULT_SETTINGS };

  async onload() {
    await this.loadSettings();

    this.ribbonIcon = this.addRibbonIcon(
      "sun",
      "Toggle light mode editor",
      () => this.toggleLightMode()
    );
    this.updateRibbonState();

    this.addCommand({
      id: "toggle-light-editor",
      name: "Toggle light mode editor",
      callback: () => this.toggleLightMode(),
    });

    this.addCommand({
      id: "increase-editor-font-size",
      name: "Increase editor font size",
      callback: () => this.changeEditorFontSize(STEP),
    });

    this.addCommand({
      id: "decrease-editor-font-size",
      name: "Decrease editor font size",
      callback: () => this.changeEditorFontSize(-STEP),
    });

    this.addCommand({
      id: "reset-editor-font-size",
      name: "Reset editor font size to default",
      callback: () => this.resetEditorFontSize(),
    });

    this.addSettingTab(new LightModeSettingTab(this.app, this));
    this.applyEditorFontSize();
  }

  private toggleLightMode() {
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

  private getCurrentFontSize(): number {
    if (this.settings.editorFontSize != null) return this.settings.editorFontSize;
    const computed = getComputedStyle(document.body).getPropertyValue("--font-text-size");
    const parsed = parseInt(computed, 10);
    return isNaN(parsed) ? 16 : parsed;
  }

  changeEditorFontSize(delta: number) {
    const current = this.getCurrentFontSize();
    const next = Math.max(8, Math.min(48, current + delta));
    this.settings.editorFontSize = next;
    this.applyEditorFontSize();
    void this.saveSettings();
  }

  private resetEditorFontSize() {
    this.settings.editorFontSize = null;
    this.applyEditorFontSize();
    void this.saveSettings();
  }

  applyEditorFontSize() {
    if (this.settings.editorFontSize == null) {
      document.body.style.removeProperty("--lme-editor-font-size");
    } else {
      document.body.style.setProperty(
        "--lme-editor-font-size",
        `${this.settings.editorFontSize}px`
      );
    }
  }

  async loadSettings() {
    const loaded = (await this.loadData()) ?? {};
    this.settings = { ...DEFAULT_SETTINGS, ...loaded };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload() {
    document.body.classList.remove("light-mode-editor-active");
    document.body.style.removeProperty("--lme-editor-font-size");
  }
}

class LightModeSettingTab extends PluginSettingTab {
  plugin: LightModeEditorPlugin;

  constructor(app: App, plugin: LightModeEditorPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    const current = this.plugin.settings.editorFontSize;
    const label = current == null ? "Default (Obsidian setting)" : `${current}px`;

    new Setting(containerEl)
      .setName("Editor font size")
      .setDesc(
        `Override the font size for just the editor and reader pane. Currently: ${label}. ` +
        'Bind "Increase editor font size" and "Decrease editor font size" to Cmd+Plus and Cmd+Minus in Obsidian\'s Hotkeys settings.'
      )
      .addSlider(slider =>
        slider
          .setLimits(8, 48, 1)
          .setValue(current ?? 16)
          .setDynamicTooltip()
          .onChange(value => {
            this.plugin.settings.editorFontSize = value;
            this.plugin.applyEditorFontSize();
            void this.plugin.saveSettings();
          })
      )
      .addButton(btn =>
        btn.setButtonText("Reset").onClick(() => {
          this.plugin.settings.editorFontSize = null;
          this.plugin.applyEditorFontSize();
          void this.plugin.saveSettings();
          this.display();
        })
      );

    // ---- Author block ----
    const authorBlock = containerEl.createDiv({ cls: "lme-author-block" });
    const nameDiv = authorBlock.createEl("div", { cls: "lme-author-name" });
    const nameLink = nameDiv.createEl("a", {
      text: "Leviathan Duck",
      href: "https://github.com/LeviathanDuck",
    });
    nameLink.setAttr("target", "_blank");
    nameLink.setAttr("rel", "noopener");
    authorBlock.createEl("div", {
      cls: "lme-author-meta",
      text: "Leftcoast Media House Inc.",
    });
    const moreP = authorBlock.createEl("div", { cls: "lme-author-meta" });
    const moreLink = moreP.createEl("a", {
      text: "More Obsidian plugins & themes",
      href: "https://github.com/LeviathanDuck?tab=repositories",
    });
    moreLink.setAttr("target", "_blank");
    moreLink.setAttr("rel", "noopener");
  }
}
