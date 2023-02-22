# Kickertech test task

### Installation:

1. `git clone git@github.com:atlantech/kickertech-task.git && cd kickertech-task`
2. `npm install`
3. `npm start`

By default, server read files inside current working directory at startup, optionally you can change this behavior by passing `SCAN_PATH` environment variable. Default application port is 3000

### Exposed APIs:

1. `GET /list` read current state 
2. `GET /download-state` send current state as downloadable attachment
3. `POST /scan` trigger scan
