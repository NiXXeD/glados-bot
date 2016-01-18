import {GladosBot} from './lib/GladosBot'
import * as SlackToken from './slacktoken.json'

// create a bot
var bot = new GladosBot(SlackToken)
bot.run()

