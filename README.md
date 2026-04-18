# Light Mode Editor

Toggle just the editor and reader pane into light mode while keeping the surrounding UI in dark mode.

*A project of the Leviathan Duck from Leftcoast Media House Inc.*

## How it works

Click the sun icon in the left ribbon to toggle. The document surface (editor and reader) flips to a clean white background with dark text. Sidebar, tabs, settings, command palette — everything else stays in your current theme.

Click again to return to normal.

Also available from the command palette: `Light Mode Editor: Toggle light mode editor`.

## Development

```sh
npm install
npm run dev      # watches main.ts and rebuilds main.js
npm run build    # production build (minified, no sourcemaps)
```

### Install into an Obsidian vault

Either symlink the plugin folder into a vault's `.obsidian/plugins/` directory, or copy `main.js`, `manifest.json`, and `styles.css` into `<vault>/.obsidian/plugins/light-mode-editor/` after a build. Then enable Community Plugins in Obsidian and turn on **Light Mode Editor**.

## Disclaimer

> **Use at your own risk.** This software is provided as-is with no warranty of any kind, express or implied. The author accepts no liability for any damage, data loss, or other consequences arising from its use. See [LICENSE](./LICENSE) for full terms.

## License

MIT. Copyright © 2026 Leftcoast Media House Inc.

---

## Author

<p align="center">
  <a href="https://github.com/LeviathanDuck">
    <img src="./assets/LeviathanDuck.png" width="100" alt="LeviathanDuck" style="border-radius:50%" />
  </a>
</p>

<p align="center">
  Built by <a href="https://github.com/LeviathanDuck">Leviathan Duck</a> — Leftcoast Media House Inc.<br/>
  Licensed under <a href="./LICENSE">MIT</a>.<br/>
  <a href="https://github.com/LeviathanDuck?tab=repositories">More Obsidian plugins &amp; themes</a>
</p>
