class Settings {

  /* GENERAL CONFIG SETTINGS */
  static get DEBUG() { return false; }


  /* SETTING SAVE AND LOAD */
  static loadSetting(setting) {
    if(window.localStorage.getItem(setting) == null)
        return "true"; // default settings to 'on'

    return window.localStorage.getItem(setting);
  }

  static saveSetting(setting, value) {
    window.localStorage.setItem(setting, value);
  }
}

export default Settings;
