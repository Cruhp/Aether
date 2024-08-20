
const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'serverbanner',
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        if (message.guild.banner) {
            let embed = new MessageEmbed()
                .setTitle(`${message.guild.name} **SERVER BANNER**`)
                .setColor(`#FFFFF`)
                .setImage(message.guild.bannerURL({ size: 4096 }))
            message.channel.send({ embeds: [embed] })
        } else {
            let embed = new MessageEmbed()
                .setDescription(`**This Server has no Banner!**`)
                .setColor(client.color)

            message.channel.send({ embeds: [embed] })
        }
    }
}
