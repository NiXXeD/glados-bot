var _ = require('lodash')
var Bot = require('slackbots')
var quotes = require('../quotes')

export class GladosBot extends Bot {
    constructor(settings) {
        settings.name = 'glados'
        super(settings)
    }

    run() {
        console.log('Bot started.')
        this.on('message', this.onMessage)
    }

    onMessage(data) {
        if (data.text && data.type === 'message' && _.startsWith(data.text.toLowerCase(), 'glados quote')) {
            let searchCriteria = data.text.match(/^glados\squote\s?(.+)?/i)[1]
            let quote
            if (searchCriteria) {
                let regex = new RegExp(searchCriteria, 'gi')
                let filtered = _.filter(quotes, quote => regex.test(quote))
                quote = _.sample(filtered)
            } else {
                quote = _.sample(quotes)
            }

            //log who did it, where
            let user = this.getUserById(data.user)
            let channel = this.getChannelById(data.channel) || {}
            console.log(`${user.name} requested a quote in ${channel.name || 'private'}.`)

            //post it
            this.postMessage(data.channel, quote, {as_user: true})
        }
    }

    getChannelById(id) {
        return _.find(this.channels, {id})
    }

    getUserById(id) {
        return _.find(this.users, {id})
    }
}
