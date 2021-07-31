import { useSocialMediaLinks } from '../hooks/use-social-media-links'
import { socialMediaIcon } from './SocialIcon'
import DiscordIcon from './../assets/icons/discord.svg'

const DiscordLink = () => {
  const { discordInviteUrl } = useSocialMediaLinks()

  return socialMediaIcon(DiscordIcon, discordInviteUrl, 'discord')
}

export default DiscordLink
