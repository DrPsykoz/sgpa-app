module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        publish: ['github'],
        nsis: {
          allowElevation: false,
          allowToChangeInstallationDirectory: true,
          oneClick: false,
          perMachine: true
        }
      }
    },
  },
};
