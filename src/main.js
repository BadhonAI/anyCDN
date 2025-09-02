import plugin from '../plugin.json';

class AcodePlugin {

  async init() {
    // plugin initialisation 
  }

  async destroy() {
    // plugin clean up
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();acode.setPluginInit('com.example.plugin', (baseUrl, $page, cache) => {
  const { commands } = editorManager.editor;
  commands.addCommand({
    name: 'example-plugin',
    bindKey: { win: 'Ctrl-Alt-E', mac: 'Command-Alt-E' },
    exec: () => {
      $page.innerHTML = `
        <h1>Example Plugin</h1>
        <p>This is an example plugin.</p>
      `;
      $page.show();
    },
  });
});

  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
