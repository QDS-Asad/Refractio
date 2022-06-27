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
  return text.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');;
}

const decodeUrl = (text) => {
  return text.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
}

module.exports = {
  crypto_encrypt,
  crypto_decrypt,
  encodeUrl,
  decodeUrl,
}