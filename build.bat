rd /s/q build

md build
cd src

..\tools\7za920\7za.exe a ..\build\zenlauncher.zip . -r
cd ..\build

ren zenlauncher.zip zenlauncher.xpi
cd ..