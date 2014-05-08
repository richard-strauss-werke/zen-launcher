zen-launcher
============

Local application launcher extension for Firefox

This firefox extension provides a means for web applications to launch an application stored in the local file system with a parameter read from the DOM of the web application. For security reasons, the application path has to be provided in the preferences menu of the extension and the parameter is checked against a regular expression.

Build
-----

On Windows, simply run `build.bat` in the root directory to create a new build in the `build` folder. For a manual build, add the contents of the `src` folder to a zip file and rename the file name extension from `zip` to `xpi`.

Install
-------

In order to install the extension, double click on the `xpi` file in the `build` folder or drag it to your Firefox window.

Usage
-----

Configure the extension in Firefox by selecting `Tools` `Plug-ins` `Extensions` `zenLauncher`.

- `Event Name` the name of the event. You can choose any name, but it is required that the event name matches the name of the event fired from the JavaScript on the web page. Defaults to  `runlocaloxygen`.
- `Program Path` the path to the application you want to launch from the web page. Defaults to `C:\\Program files\\Oxygen XML Editor 15\\oxygen15.0.exe`. Change this according to your system; on Ubuntu, the path might be `/home/myusername/Oxygen XML Editor 15/oxygen15.0`.
- `Parameter Variable` the variable on the web page from which the extension reads the parameter passed to the application. This value is required to be a String. Like with the event name, you are free to choose your own location. Defaults to `Zen.app.oxyLoadQueue`.
- `Parameter Regex` the regular expression the parameter variable is tested against. Matching the whole string by starting with ^ and ending with $ is recommended. Defaults to `^\/db\/(\w|\.(?!\.)|\/)+$`.
- `Parameter Prefix` a string to be added to the beginning of each parameter variable read from the web page. Defaults to `oxygen:/exist-zen$zen`. 
- `Parameter Suffix` a string to be added to the end of each parameter variable read from the web page. Defaults to an empty string.

For an example of a web page firing an event caught by the extension, see `demo/demo.html`.

Compatibility
-------------
Tested with Firefox 32.0 in Windows 7 and Ubuntu 12.4 LTS
