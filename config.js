module.exports = {
    port: process.env.port || 3000,
    db: process.env.db || 'mongodb://localhost:27017/shop',
    SECRET_TOKEN: 'miclavedetokens'
}