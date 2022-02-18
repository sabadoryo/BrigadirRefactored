module.exports = async msg => {
  if (msg.author.bot) return;

  if (msg.content.startsWith(process.env.COMMAND_SUFFIX)) {
    console.log("Nachinaet rabotat' COmmandProcessor")
  } else {
    console.log("Not command")
  }
}