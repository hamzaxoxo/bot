const getAllGroups = async (client) => {
    try {
        const chats = await client.getChats();
        const groups = chats.filter(chat => chat.isGroup);
        if (groups.length > 0) {
            console.log('Groups found:');
            groups.forEach(group => {
                console.log(`- ${group.name} (ID: ${group.id._serialized})`);
            });
        } else {
            console.log('No groups found.');
        }

        return groups;
    } catch (err) {
        console.error('Error fetching group ID:', err);
    }
};


module.exports = { getAllGroups };