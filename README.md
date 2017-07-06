# XtraBYtes Electron Wallet

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:


```bash
# Clone this repository
git clone https://github.com/lestshad/xtrabytes-electron
# Go into the repository
cd xtrabytes-electron
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## License

[GNU GPLv3](LICENSE)


## Compilation

# Win32

You'll want to have all the prereqs in place:
*Windows 7 / Server 2008 R2 or higher
*Visual Studio 2015 Update 3 - download VS 2015 Community Edition for free
*Python 2.7
*Node.js
*Git
*Debugging Tools for Windows if you plan on creating a full distribution since symstore.exe is used for creating a symbol store from .pdb files.

use git bash:
 
$ electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/xtrabytes256_icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"XBY Wallet\"

# OSX:
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds

# Linux
electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds