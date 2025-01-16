# EventMaster

The most hackable Ticket-Shop!

## How to use

### Prepare development environment

1. Install node.js

```bash
sudo apt install npm

# If outdated version:
sudo npm install -g n
sudo n stable
```

2. Download + extract the project
3. Open the root folder with VS Code (recommended)
4. Open the bash inside VS Code and install all necessary packages:

```bash
npm i
```

### Test/development

There are multiple commands to test parts or the whole project:

- `npm run vite:dev`: Start Vue frontend only
- `npm run server:dev`: Start ExpressJs backend only
- `npm run fullstack:dev`: Start front- and backend

The frontend runs on `http://localhost:5173/` and the backend on `http://localhost:3000/`

### Build

- `npm run vite:build`: Build Vue frontend only
- `npm run server:build`: Build ExpressJs backend only
- `npm run fullstack:build`: Build front- and backend
- `npm run electron:build`: Build front- and backend to an Electron desktop application
- `npm run builder:build`: Build an installer file of the Electron application for current operating system. Electron-build has to run first!
- `npm run builder:win`: Build an installer file of the Electron application for Windows operating systems. Electron-build has to run first!

## Structure

### Database
![database-erm](misc/images/database.png)
