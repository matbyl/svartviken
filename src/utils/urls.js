const episodeUrl = id => id !== null ? '/episodes/' + id : null
const campaignUrl = id => id !== null ? '/campaigns/' + id : null
const oneshotUrl = id => id !== null ? '/oneshots/' + id : null

export {
    episodeUrl,
    campaignUrl,
    oneshotUrl
}