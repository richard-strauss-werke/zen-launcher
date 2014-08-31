(function () {

  var launcherExtension = {

    init : function () {
      this.prefs =
      Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.zenlauncher.");
      this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch);
      this.prefs.addObserver("", this, false);

      this.config = {
        event : this.prefs.getCharPref("event"),
        programPath : this.prefs.getCharPref("programPath"),
        parameterPrefix : this.prefs.getCharPref("parameterPrefix"),
        parameterSuffix : this.prefs.getCharPref("parameterSuffix"),
        parameterVariable : this.prefs.getCharPref("parameterVariable"),
        parameterRegex : this.createRegex()
      };

      this.listener = this.onEventFired.bind(this);

      this.addEventListener();
    },

    observe : function (subject, topic, data) {
      if (topic != "nsPref:changed") {
        return;
      }
      switch (data) {
        case "event":
          this.removeEventListener();
          this.config.event = this.prefs.getCharPref("event");
          this.addEventListener();
          break;
        case 'programPath':
          this.config.programPath = this.prefs.getCharPref("programPath");
          break;
        case 'parameterPrefix':
          this.config.parameterPrefix = this.prefs.getCharPref("parameterPrefix");
          break;
        case 'parameterSuffix':
          this.config.parameterSuffix = this.prefs.getCharPref("parameterSuffix");
          break;
        case 'parameterVariable':
          this.config.parameterVariable = this.prefs.getCharPref("parameterVariable");
          break;
        case 'parameterRegex':
          this.config.parameterRegex = this.createRegex();
          break;
      }
    },

    createRegex : function () {
      try {
        return new RegExp(this.prefs.getCharPref("parameterRegex"));
      } catch (e) {
        return null;
      }
    },

    getParameters : function () {
      var tokens, path, i, regexTest;
      if (this.config.parameterVariable === '') {
        return [this.config.parameterPrefix + this.config.parameterSuffix];
      }
      tokens = this.config.parameterVariable.split('.');
      //.Zen.app.oxyLoadQueue
      path = window.top.getBrowser().selectedBrowser.contentWindow.wrappedJSObject;
      for (i = 0; i < tokens.length; i += 1) {
        path = path[tokens[i]];
        if (typeof path === 'undefined') {
          throw {
            name : 'pathnotfounderror'
          }
        }
      }
      if (typeof path !== 'string') {
        throw {
          name : 'nostringerror'
        }
      }
      try {
        regexTest = this.config.parameterRegex.test(path);
      } catch (e) {
        regexTest = false;
      }
      if (!regexTest) {
        throw {
          name : 'regexerror',
          value : path
        }
      }
      return [this.config.parameterPrefix + path + this.config.parameterSuffix];
    },

    onEventFired : function (evt) {
      var parameters, program, process;
      try {
        parameters = this.getParameters();
        program = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
        program.initWithPath(this.config.programPath);
        process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
        process.init(program);
        process.run(false, parameters, parameters.length);
      } catch (e) {
        var errorString, stringsBundle = document.getElementById("zen-string-bundle");
        if (e.name === 'pathnotfounderror' || e.name === 'nostringerror') {
          errorString = stringsBundle.getFormattedString(e.name, [this.config.parameterVariable]);
        } else if (e.name === 'regexerror') {
          errorString = stringsBundle.getFormattedString(e.name, [e.value]);
        } else {
          errorString = stringsBundle.getFormattedString('launchError', [
            this.config.programPath,
            parameters.join(', ')
          ]);
        }
        window.alert(errorString);
      }
    },

    addEventListener : function () {
      var me = this;
      document.addEventListener(me.config.event, me.listener, false, true);
    },

    removeEventListener : function () {
      var me = this;
      document.removeEventListener(me.config.event, me.listener, false);
    }
  };

  launcherExtension.init();

})();
