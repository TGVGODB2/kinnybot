module.exports = async(client, interaction) => {
    if (!interaction.isCommand()) return;
    const comandoInfo = client.commands.get(interaction.commandName) || client.commands.get(client.aliases.get(interaction.commandName))
	if (comandoInfo) {
		let args = []
		comandoInfo.run(client, interaction, args)
	}
}