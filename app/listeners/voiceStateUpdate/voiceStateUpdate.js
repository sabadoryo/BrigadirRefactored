module.exports = async (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if(oldUserChannel === undefined && newUserChannel !== undefined) {

      console.log('oppa')
 
    } else if(newUserChannel === undefined){
 
      console.log('hoppa')
 
    }
}