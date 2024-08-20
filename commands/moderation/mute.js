



const { MessageEmbed } = require('discord.js')
const ms = require(`ms`)
module.exports = {
    name: 'mute',
    aliases: ['mute','kys'],
    category: 'mod',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | You must have \`Timeout Members\` permissions to use this command.`
                        )
                ]
            })
        }
        if (!message.guild.me.permissions.has('MODERATE_MEMBERS')) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | I must have \`Timeout Members\` permissions to run this command.`
                        )
                ]
            })
        }


        let user = await getUserFromMention(message, args[0])
        if (!user) {
            try {
                user = await message.guild.members.fetch(args[0])
            } catch (error) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<a:Cross:1265733965180960849> | You didn't mentioned the member whom you want to mute.\n${message.guild.prefix}mute \`<member>\` \`<time>\` \`<reason>\``
                                )
                    ]
                })
            }
        }      
        let reason = args.slice(2).join(' ')
        if (!reason) reason = `No Reason given`

        let time = args[1]
        if (!time) time = '27days'

        let dur = ms(time)

        if (!dur) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | You didn't mentioned the member whom you want to mute.\n${message.guild.prefix}mute \`<member>\` \`<time>\` \`<reason>\``
                        )
                ]
            })
        }
        if (user.isCommunicationDisabled())
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | <@${user.user.id}> is already muted!`
                        )
                ]
            })
        if (user.permissions.has('ADMINISTRATOR'))
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | <@${user.user.id}> is having \`Administrator\` Perms!`
                        )
                ]
            })
        if (user.id === client.user.id)
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | You cant mute me`
                        )
                ]
            })
        if (user.id === message.guild.ownerId)
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | You Can't Mute Server Owner!`
                        )
                ]
            })
        if (user.id === message.member.id)
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | You Can't Mute Yourself..!`
                        )
                ]
            })
        if (!user.manageable)
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | I don't have enough permissions to Mute <@${user.user.id}>`
                        )
                ]
            })
        const banmess = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
                `You Have Been Muted From ${message.guild.name} \nExecutor : ${message.author.tag} \nReason : \`${reason}\``
            )
            .setColor(client.color)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))

        await user
            .timeout(dur, `${message.author.tag} | ${reason}`)
            .then((user) => user.send({ embeds: [banmess] }))
            .catch((err) => null)
        return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(
                        `<a:Check:1265733979085078610> | Successfully muted <@${user.user.id}>!`
                    )
            ]
        })
    }
}

function getUserFromMention(message, mention) {
    if (!mention) return null

    const matches = mention.match(/^<@!?(\d+)>$/)
    if (!matches) return null

    const id = matches[1]
    return message.guild.members.fetch(id)
}