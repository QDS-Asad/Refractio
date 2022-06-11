const CryptoJS = require("crypto-js");
const { CRYPTO_KEY } = require('../lib/constants');

const crypto_encrypt = function (originalText) {
  const ciphertext = CryptoJS.AES.encrypt(originalText, CRYPTO_KEY).toString();
  return ciphertext;
}

const crypto_decrypt = function (ciphertext) {
  let bytes = CryptoJS.AES.decrypt(ciphertext, CRYPTO_KEY);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

module.exports = {
  crypto_encrypt: crypto_encrypt,
  crypto_decrypt: crypto_decrypt
}