var config = {}

config.development = {
    env: 'DEVELOPMENT',
    port: '3000',
    hashingSecret: 'aBeautifulEncryptionSecret'
}
config.staging = {
    env: 'STAGING',
    port: '5000',
    hashingSecret: 'notSoBeautifulEncryptionSecret'
}
config.production = {
    env: 'PRODUCTION',
    port: '8000',
    hashingSecret: 'anUglyEncryptionSecret'
}
config.maintainence = {
    env: 'MAINTAINENCE',
    port: '1000',
    hashingSecret: 'thisIsNotAnEncryptionSecret'
}


module.exports = process.env.NODE_ENV !== undefined ? config[process.env.NODE_ENV] : config.development