// eslint-disable-next-line no-undef
const Election = artifacts.require('Election');

module.exports = function(deployer) {
    deployer.deploy(Election);
};