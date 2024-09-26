const express = require('express');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messagesRouter = require('./routes/message');
const { sentMessage } = require('./controllers/sentMessage');
const { getAllGroups } = require('./controllers/getAllGroups');


const app = express();
const port = 3000;
require('dotenv').config();
app.use(express.json());


const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
    authStrategy: new LocalAuth({
        clientId: "client-one"
    })
});


client.on('ready', async () => {
    console.log('Client is ready!');
    // await getAllGroups(client);
    sentMessage(client, MessageMedia);
});




app.use('/api', messagesRouter);

// client.on('ready', async () => {
//     console.log('Client is ready! Listening to Firestore for new messages...');
//     const groups = await getAllGroups(client);
//     sentMessage(client, MessageMedia);
// });


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});


client.initialize();


