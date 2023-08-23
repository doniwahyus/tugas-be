const express = require('express');
const router = express.Router();
const helper = require(__class_dir + '/helper.class.js');
const m$todo = require(__module_dir + '/todo.module.js');
const restrict = require(__class_dir + '/restrict.class.js');

router.post('/', restrict, async function (req, res, next) {
    const addTodo = await m$todo.add(req.body, req.users)
    helper.sendResponse(res, addTodo);
});

router.put('/', restrict, async function (req, res, next) {
    const updateTodo = await m$todo.updated(req.body)
    helper.sendResponse(res, updateTodo);
});
router.get('/', async function (req, res, next) {
    const getTodo = await m$todo.getAll(req.body)
    helper.sendResponse(res, getTodo);
});
router.get('/user', restrict, async function (req, res, next) {
    const getbyIdTodo = await m$todo.getbyUser(req.body, req.users)
    helper.sendResponse(res, getbyIdTodo);
});
router.delete('/', restrict, async function (req, res, next) {
    const deleteTodo = await m$todo.deleted(req.body)
    helper.sendResponse(res, deleteTodo);
});
module.exports = router;
