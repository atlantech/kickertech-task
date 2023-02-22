const toolkit = require('@reduxjs/toolkit');
const {
  readdir
} = require('fs/promises');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.env.SCAN_PATH || '.');

const content = fs.readdirSync(dir);

const initialState = {
  dir,
  files: content.reduce((files, name) => {
    files[name] = true;
    return files;
  }, {})
}

const scan = toolkit.createAsyncThunk('files/scan', async () => {
  const latestFiles = await readdir(dir);

  return latestFiles;
});

const filesSlice = toolkit.createSlice({
  name: 'files',
  initialState,
  reducers: {
    update: (state, action) => {
      state.files = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(scan.fulfilled, (state, action) => {
      const latestFiles = action.payload;
      const previousState = state.files;

      const files = latestFiles.reduce((files, name) => {
        files[name] = true;
        return files;
      }, {});

      for (const name in previousState) {
        if (files.hasOwnProperty(name)) {
          continue
        }

        files[name] = false;
      }

      state.files = files;
    });
  }
});

const store = toolkit.configureStore({
  reducer: {
    files: filesSlice.reducer
  }
});

module.exports = {
  store,
  scan
}
