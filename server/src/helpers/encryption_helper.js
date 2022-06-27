const CryptoJS = require("crypto-js");
const { CRYPTO_KEY } = require('../lib/constants');

const crypto_encrypt = function (originalText) {
  const ciphertext = CryptoJS.AES.encrypt(originalText, CRYPTO_KEY).toString();
  console.log(ciphertext, encodeUrl(ciphertext));
  return encodeUrl(ciphertext);
}

const crypto_decrypt = function (ciphertext) {
  let bytes = CryptoJS.AES.decrypt(decodeUrl(ciphertext), CRYPTO_KEY);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

const encodeUrl = (text) => {
  return text.toString().replace('+','--').replace('/','__').replace('=','_');
}

const decodeUrl = (text) => {
  return text.toString().replace('--', '+' ).replace('__', '/').replace('_', '=');
}

module.exports = {
  crypto_encrypt,
  crypto_decrypt,
  encodeUrl,
  decodeUrl,
}