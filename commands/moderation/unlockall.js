const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
} = require('discord.js')

module.exports = {
    name: 'unlockall',
    category: 'mod',
    premium: false,

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            let error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `You must have \`Manage Channels\` permission to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        if (client.util.hasHigher(message.member) == false) {
            let error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `Your highest role must be higher than my highest role to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        let locked = 0
        const channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]) ||
            message.channel
        message.guild.channels.cache
            .filter((c) => c.name)
            .forEach((channel) => {
                if (channel.manageable) {
                    setTimeout(() => {
                        channel.permissionOverwrites.edit(message.guild.id, {
                            SEND_MESSAGES: true,
                            reason: `UNLOCKALL BY ${message.author.tag} (${message.author.id})`
                        })
                    }, 5000)
                    locked++
                }
            })
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(
                        `Successfully **unlocked** ${locked} channels from this server.`
                    )
            ]
        })
    }
}