const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        let prefix = message.guild?.prefix;

        // Create a MessageSelectMenu
        const selectMenu = new MessageSelectMenu()
            .setCustomId('categorySelect')
            .setPlaceholder('Browse Commands of Ather')
            .addOptions([
                {
                    label: 'Moderation',
                    value: 'mod',
                    emoji: '<:Ban:1265733957698453585>',
                },
                {
                    label: 'Utility',
                    value: 'info',
                    emoji: '<:Custom:1265733968297197579>',
                },
                {
                    label: 'Welcomer',
                    value: 'welcomer',
                    emoji: '<:MekoJoin:1266027872951468094>',
                },
                {
                    label: 'Automod',
                    value: 'automod',
                    emoji: '<:Automod:1265733962605789256>',
                },
                {
                    label: 'Custom Role',
                    value: 'customrole',
                    emoji: '<:Greet:1265734005530165289>',
                },
                {
                    label: 'Logging',
                    value: 'logging',
                    emoji: '<:MekoRuby:1266028948303777893>',
                },
                {
                    label: 'Fun',
                    value: 'fun',
                    emoji: '<:MekoSearch:1266027859559059598>',
                },
                {
                    label: 'Social',
                    value: 'social',
                    emoji: '<:StatusRole:1265734031102840964>',
                },
            ]);

        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('mod')
                .setLabel('Moderation')
                .setStyle('SECONDARY')
                .setEmoji('1245602859458756649'),
            new MessageButton()
                .setCustomId('info')
                .setLabel('Utility')
                .setStyle('SECONDARY')
                .setEmoji('1245602736813248522'),
            new MessageButton()
                .setCustomId('welcomer')
                .setLabel('Welcomer')
                .setStyle('SECONDARY')
                .setEmoji('1245605497462325298'),
        );

        const row2 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('automod')
                .setLabel('Automod')
                .setStyle('SECONDARY')
                .setEmoji('1245603108298424381'),
            new MessageButton()
                .setCustomId('customrole')
                .setLabel('Custom Role')
                .setStyle('SECONDARY')
                .setEmoji('1245603173973102602'),
            new MessageButton()
                .setCustomId('logging')
                .setLabel('Logging')
                .setStyle('SECONDARY')
                .setEmoji('1245606546759618622'),
            new MessageButton()
                .setCustomId('fun')
                .setLabel('Fun')
                .setStyle('SECONDARY')
                .setEmoji('1245606546759618622'),
            new MessageButton()
                .setCustomId('utility')
                .setLabel('Utility')
                .setStyle('SECONDARY')
                .setEmoji('1263031662137311384'),
            new MessageButton()
                .setCustomId('social')
                .setLabel('Social')
                .setStyle('SECONDARY')
                .setEmoji('1265734031102840964'),
        );

        const embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(
                "> ## <a:time_nick:1064407267165880392> **[`Help  Panel`](https://discord.gg/teamkronix)**"
            )
            .setImage("https://media.discordapp.net/attachments/1264636593143287960/1266298310319280229/image.png?ex=66a4a3b3&is=66a35233&hm=2b0140ac96b0001ba2eeaed790fcde2f9404c09af44f9d6c0da8935ca619a203&=&format=webp&quality=lossless&width=654&height=245")
            .addField(
                ' ',
                `
                > <:Ban:1265733957698453585> **・** **[Moderation](https://discord.gg/teamkronix)**\n > <:Custom:1265733968297197579> **・** **[Utility](https://discord.gg/teamkronix)**\n > <:MekoJoin:1266027872951468094>  **・** **[Welcomer](https://discord.gg/teamkronix)**\n > <:Automod:1265733962605789256> **・** **[Automod](https://discord.gg/teamkronix)**\n > <:Greet:1265734005530165289> **・** **[Custom Role](https://discord.gg/teamkronix)**\n > <:MekoRuby:1266028948303777893> **・** **[Logging](https://discord.gg/teamkronix)**\n > <:MekoSearch:1266027859559059598> **・** **[Fun](https://discord.gg/teamkronix)**\n > <:StatusRole:1265734031102840964> **・** **[Social](https://discord.gg/teamkronix)**
                `,
                true 
         
            );

        const helpMessage = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents(selectMenu)] });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user && (i.isButton() || i.isSelectMenu()),
        });

        collector.on('collect', async (i) => {
            if (i.isButton()) {
                const category = i.customId;
                let commands = [];
                switch (category) {
                    case 'mod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'mod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'info':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'info')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'welcomer':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'welcomer')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'automod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'automod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'customrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'customrole')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'logging':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'logging')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'fun':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'fun')
                            .map((x) => `\`${x.name}\``);
                        break; 
                    case 'utility':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'utility')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'social':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'social')
                            .map((x) => `\`${x.name}\``);
                        break;
                }
                const categoryEmbed = new MessageEmbed()
                    .setColor(client.color)
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setThumbnail(i.guild.iconURL({ dynamic: true }))
                    .setDescription(`**${i.customId.charAt(0).toUpperCase() + i.customId.slice(1)} Commands**\n${commands.join(', ')}`);
                i.reply({ embeds: [categoryEmbed], ephemeral: true });
            } else if (i.isSelectMenu()) {
                const category = i.values[0];
                let commands = [];
                if (category === 'all') {
                    commands = client.commands
                        .map((x) => `\`${x.name}\``);
                    const allCommandsEmbed = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setDescription(`**All Commands**\n${commands.join(', ')}`);
                    helpMessage.edit({ embeds: [allCommandsEmbed], components: [] });
                } else {
                    switch (category) {
                        case 'mod':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'mod')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'info':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'info')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'welcomer':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'welcomer')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'automod':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'automod')
                                .map((x) => `\`${x.name}\``);
                            break;   
                        case 'customrole':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'customrole')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'logging':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'logging')
                                .map((x) => `\`${x.name}\``);
                            break;  
                        case 'fun':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'fun')
                                .map((x) => `\`${x.name}\``);
                            break;    
                        case 'utility':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'utility')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'social':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'social')
                                .map((x) => `\`${x.name}\``);
                            break;
                    }
                    const categoryEmbed = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setThumbnail(i.guild.iconURL({ dynamic: true }))
                        .setDescription(`**${category.charAt(0).toUpperCase() + category.slice(1)} Commands**\n${commands.join(', ')}`);
                    i.reply({ embeds: [categoryEmbed], ephemeral: true });
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                helpMessage.edit({ components: [] });
            }
        });
    }
};
