
const {launcher} = require('@wdio/static-server-service')

new launcher({folders: [
    { mount: '/', path: './dist' },
    { mount: '/', path: './fixtures' }
]}).onPrepare({})