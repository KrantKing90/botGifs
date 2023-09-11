const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ] })

const config = require("./config.json");

const randomGifs = async (client) => {

    const guild = client.guilds.cache.get(config.guild);
    const channelGifs = guild.channels.cache.get(config.channelAvatarGifs);
    const channelIcons = guild.channels.cache.get(config.channelAvatarIcons);

    if (!guild || !channelGifs || !channelIcons) return;

    await guild.members.fetch().then((member => {

        const membersGifs = member.filter(m => {
            return m.user.displayAvatarURL({ dynamic: true }).endsWith(".gif");
        });

        const membersIcons = member.filter(m => {
            return m.user.displayAvatarURL({ dynamic: true }).endsWith(".webp");
        });

        if (!membersGifs.size || !membersIcons.size) return;

        const randomGifsUrl = membersGifs.random();
        const randomIconsUrl = membersIcons.random();

        const embGifs = new EmbedBuilder()
            .setImage(randomGifsUrl.user.displayAvatarURL({ dynamic: true }));

        const embIcons = new EmbedBuilder()
            .setImage(randomIconsUrl.user.displayAvatarURL());

        channelGifs.send({ embeds: [embGifs] });
        channelIcons.send({ embeds: [embIcons] });

    })).catch(() => { });
}

setInterval(randomGifs, 250 * 60, client); 

  client.once("ready", () => {
    console.log("online!");
   })
   client.login("MTE1MDgz")
   
