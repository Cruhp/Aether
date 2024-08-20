const { MessageEmbed } = require("discord.js");
const moment = require("moment");

// Define Discord badges emojis
const DISCORD_EMPLOYEE = '<:discord_employe:1258402699364270133>';
const DISCORD_PARTNER = '<:DiscordPartner:1258402830570491978>';
const BUGHUNTER_LEVEL_1 = '<:bughunterl1:1258402926523846778>';
const BUGHUNTER_LEVEL_2 = '<:LoveBugs_bughunter2:1257924637476524063>';
const HYPESQUAD_EVENTS = '<:hypesquadevents:1258403063379660811>';
const HOUSE_BRAVERY = '<:DiscordHypesquadBravery:1258403137824489473>';
const HOUSE_BRILLIANCE = '<:hypesquad_brilliance:1258403344775381042>';
const HOUSE_BALANCE = '<:hypesquad_balance:1258403507988467712>';
const EARLY_SUPPORTER = '<:early_supportter_badge:1257128190288203837>';
const TEAM_USER = '<:Users:1256966508119199849>';
const SYSTEM = '<:system:1258403745746653195>';
const VERIFIED_BOT = '<:Verified_bot:1258403831184752782>';
const VERIFIED_DEVELOPER = '<:Developer:1257193352789758022>';
const ACTIVE_DEVELOPER = '<:active_developer:1258404100899602455>';

module.exports = {
    name: "userinfo",
    aliases: ['ui', 'whois'],
    category: 'info',
    description: "Get information about a user.",
    run: async (client, message, args) => {
        let user;
        
        // Check if a user is mentioned or use message author
        if (!args[0]) {
            user = message.author;
        } else {
            user = message.mentions.users.first() || client.users.cache.get(args[0]);
        }
        
        // Fetch the guild member if available
        let member = message.guild.members.cache.get(user.id);

        // Check if the user is found in the guild
        if (member) {
            let flags = user.flags.toArray().map(flag => {
                switch (flag) {
                    case 'DISCORD_EMPLOYEE': return DISCORD_EMPLOYEE;
                    case 'DISCORD_PARTNER': return DISCORD_PARTNER;
                    case 'BUGHUNTER_LEVEL_1': return BUGHUNTER_LEVEL_1;
                    case 'BUGHUNTER_LEVEL_2': return BUGHUNTER_LEVEL_2;
                    case 'HYPESQUAD_EVENTS': return HYPESQUAD_EVENTS;
                    case 'HOUSE_BRAVERY': return HOUSE_BRAVERY;
                    case 'HOUSE_BRILLIANCE': return HOUSE_BRILLIANCE;
                    case 'HOUSE_BALANCE': return HOUSE_BALANCE;
                    case 'EARLY_SUPPORTER': return EARLY_SUPPORTER;
                    case 'TEAM_USER': return TEAM_USER;
                    case 'SYSTEM': return SYSTEM;
                    case 'VERIFIED_BOT': return VERIFIED_BOT;
                    case 'VERIFIED_DEVELOPER': return VERIFIED_DEVELOPER;
                    case 'ACTIVE_DEVELOPER': return ACTIVE_DEVELOPER;
                    default: return '';
                }
            }).join(' ');

            if (!flags) flags = '<a:Cross:1265733965180960849> No Badges';

            // Construct the embed
            const embed = new MessageEmbed()
                .setColor('#000000')
                .setAuthor(`${member.user.tag}'s Information`, member.user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '__General Information__', value: `**Username**: ${member.user.username}\n**User ID**: ${member.user.id}\n**Nickname**: ${member.nickname || 'None'}\n**Bot?**: ${member.user.bot ? 'Yes' : 'No'}\n**Discord Badges**: ${flags}\n**Account Created**: ${moment(member.user.createdAt).format('llll')}\n**Joined Server**: ${moment(member.joinedAt).format('llll')}` },
                    { name: '__Roles Info__', value: `**Highest Role**: ${member.roles.highest}\n**Roles [${member.roles.cache.size}]:** ${member.roles.cache.size > 0 ? member.roles.cache.sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`).join(', ') : 'No Roles'}` },
                    { name: '__Key Permissions__', value: `${member.permissions.toArray().sort().join(', ')}` },
                    { name: '__Acknowledgement__', value: `${member.user.id === message.guild.ownerId ? 'Server Owner' : 'Server Member'}` }
                )
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

            message.channel.send({ embeds: [embed] });
        } else {
            // If user not found in the guild
            const embed = new MessageEmbed()
                .setColor('#000000')
                .setDescription(`<a:Cross:1265733965180960849> User not found in this server.`);

            message.channel.send({ embeds: [embed] });
        }
    },
};
