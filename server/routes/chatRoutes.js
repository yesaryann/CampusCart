const express = require('express');
const router = express.Router();
const { accessChat, fetchChats, sendMessage } = require('../controllers/chatController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', authMiddleware, accessChat);
router.get('/', authMiddleware, fetchChats);
router.post('/message', authMiddleware, sendMessage);

module.exports = router;
