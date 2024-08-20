const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const ricky = ['1092374628556615690', '1092374628556615690']
module.exports = {
    name: 'reload',
    aliases: ['rlcmd'],
    category: 'Owner',
    run: async (client, message, args) => {
        if (!ricky.includes(message.author.id)) return
        try {
            let reload = false
            for (let i = 0; i < client.categories.length; i += 1) {
                let dir = client.categories[i]
                try {
                    if (!args[0]) {
                        const opp = new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<a:Cross:1265733965180960849> | You didn't provided the command name.`
                            )
                        return message.channel.send({ embeds: [opp] })
                    }
                    delete require.cache[
                        require.resolve(`../../commands/${dir}/${args[0]}.js`)
                    ]
                    client.commands.delete(args[0])
                    const pull = require(`../../commands/${dir}/${args[0]}.js`)
                    client.commands.set(args[0], pull)
                    reload = true
                } catch {}
            }
            if (reload) {
                const op = new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(
                        `<a:Check:1265733979085078610> | Successfully reloaded \`${args[0]}\``
                    )
                return message.channel.send({ embeds: [op] })
            }
            const notop = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `<a:Cross:1265733965180960849> | I was unable to reload \`${args[0]}\``
                )
            return message.channel.send({ embeds: [notop] })
        } catch (e) {
            const emesdf = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `<a:Cross:1265733965180960849> | I was unable to reload \`${args[0]}\``
                )
            return message.channel.send({ embeds: [emesdf] })
        }
    }
}
