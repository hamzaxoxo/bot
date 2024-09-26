const { collection, onSnapshot, deleteDoc } = require('firebase/firestore');
const { db } = require('../services/firebase');

const sentMessage = (client, MessageMedia) => {
    let delay = 0;
    onSnapshot(collection(db, 'fbmessage'), (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {

                const { body, groupId, imageURL } = change.doc.data();
                if (!groupId) {
                    console.log('groupId is required');
                    return;
                }

                const docRef = change.doc.ref;
                let media;
                if (imageURL) {
                    media = await MessageMedia.fromUrl(imageURL);
                } else {
                    const demoImageURL = 'https://uptownprinters.ca/assets/no_image_placeholder.png';
                    media = await MessageMedia.fromUrl(demoImageURL);
                }
                delay += 1000;
                setTimeout(async () => {
                    const sent = await client.sendMessage(groupId, media, { caption: body });
                    if (sent) {
                        console.log('Message sent:', sent.id.id, new Date().toLocaleString()
                        );
                        return deleteDoc(docRef);
                    }
                }, delay)
            }
        });
    });
}

module.exports = { sentMessage };
