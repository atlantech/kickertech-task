const express = require('express');
const router = express.Router();
const {
  store,
  scan
} = require('../store');

function serialize(files) {
  const result = [];

  for (const name in files) {
    result.push({
      name,
      active: files[name]
    });
  }

  return result;
}

router.get(
  '/list',
  function(req, res) {
    const {
      files
    } = store.getState().files;

    const result = serialize(files)

    return res.json(result);
  }
);

router.get('/download-state', function(req, res) {});

router.post('/scan', function(req, res) {
  store.dispatch(scan()).finally(() => res.end());
});

module.exports = router;
