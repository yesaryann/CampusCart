const Chat = require('../models/Chat');
const User = require('../models/User');

// @desc    Access or create a one-on-one chat
// @route   POST /api/chat
// @access  Private
exports.accessChat = async (req, res) => {
    const { userId, productId } = req.body; // UserId of the person you want to chat with

    if (!userId) {
        return res.status(400).json({ message: 'UserId param not sent with request' });
    }

    // Check if chat exists
    let isChat = await Chat.find({
        participants: { $all: [req.user.id, userId] },
        productContext: productId || null
    })
        .populate('participants', '-password')
        .populate('messages.sender', 'username avatar email');

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            participants: [req.user.id, userId],
            productContext: productId || undefined
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                'participants',
                '-password'
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400).json({ message: 'Error creating chat', error: error.message });
        }
    }
};

// @desc    Fetch all chats for a user
// @route   GET /api/chat
// @access  Private
exports.fetchChats = async (req, res) => {
    try {
        Chat.find({ participants: { $in: [req.user.id] } })
            .populate('participants', '-password')
            .populate({
                path: 'productContext',
                select: 'title images price'
            })
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching chats', error: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/chat/message
// @access  Private
exports.sendMessage = async (req, res) => {
    const { chatId, content } = req.body;

    if (!content || !chatId) {
        return res.status(400).json({ message: 'Invalid data passed into request' });
    }

    var newMessage = {
        sender: req.user.id,
        content: content,
    };

    try {
        let chat = await Chat.findByIdAndUpdate(chatId, {
            $push: { messages: newMessage },
            lastMessage: content,
            lastMessageTime: new Date()
        }, { new: true })
            .populate('participants', '-password')
            .populate('messages.sender', 'username avatar');

        res.json(chat);
    } catch (error) {
        res.status(400).json({ message: 'Error sending message', error: error.message });
    }
};
