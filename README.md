zen-launcher
============

Local application launcher extension for Firefox

This firefox extension provides a means for web applications to launch an application stored in the local file system with a parameter read from the DOM of the web application. For security reasons, the application path has to be provided in the preferences menu of the extension and the parameter is checked against a regular expression.

Build
-----

On Windows, simply run `build.bat` in the root directory to create a new build in the `build` folder. For a manual build, add the contents of the `src` folder to a zip file and rename the suffix of the zip from `zip` to `xpi`.

Install
-------

In order to install the extension, double click on the `xpi` file in the `build` folder or drag it to your Firefox window.

Usage
-----

For an example of a web page firing an event caught by the extension, see `demo/demo.html`. Configure the extension in Firefox by selecting `Tools` `Plug-ins` `Extensions` `zenLauncher`.

Compatibility
-------------
Tested with Firefox 32.0 in Windows 7
