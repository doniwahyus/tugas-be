const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$users = require(__module_dir + '/users.module.js');
const restrict = require(__class_dir + '/restrict.class.js');

router.post('/register', async function (req, res, next) {
    const regisUsers = await m$users.register(req.body)
    helper.sendResponse(res, regisUsers);
});
router.post('/login', async function (req, res, next) {
    const loginUsers = await m$users.login(req.body)
    helper.sendResponse(res, loginUsers);
});
router.get('/', async function (req, res, next) {
    const getUsers = await m$users.getUser(req.body)
    helper.sendResponse(res, getUsers);
});
router.get('/:id', async function (req, res, next) {
    const getbyIdUser = await m$users.getByIdUser(req.params)
    helper.sendResponse(res, getbyIdUser);
});
router.delete('/', async function (req, res, next) {
    const deleteUser = await m$users.deleted(req.body)
    helper.sendResponse(res, deleteUser);
});
module.exports = router;