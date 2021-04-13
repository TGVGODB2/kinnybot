const db = require('../../../db.js')

module.exports = async(client, user, messageReaction) => {
    let give = await db.give.findOne({guildID: user.message.guild.id})
    if(!give) return;
    if(give.end) return;
    if(give.messageID !== user.message.id) return;
    await db.give.findOneAndUpdate({guildID: user.message.guild.id}, {$pull: {part: messageReaction.id}})
}