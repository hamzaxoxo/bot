
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    req.client = req.app.get('client');
    next();
});

router.post('/send-message', async (req, res) => {
    const { groupId, message } = req.body;

    if (!message || !groupId) {
        return res.status(400).send('Please provide both groupId and message');
    }

    try {
        await req.client.sendMessage(groupId, message);
        res.status(200).send('Message sent to group');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message');
    }
});

module.exports = router;
