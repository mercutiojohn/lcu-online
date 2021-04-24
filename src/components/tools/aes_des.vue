npm install crypto-js

var aseKey = "12345678"     //秘钥必须为：8/16/32位
var message = "80018000142";
//加密
var encrypt = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aseKey), {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}).toString();
console.log(encrypt);

// 使用DES的时候只需要把AES换成DES就行了


//解密 
var decrypt = CryptoJS.AES.decrypt(encrypt, CryptoJS.enc.Utf8.parse(aseKey), {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}).toString(CryptoJS.enc.Utf8);
console.log(decrypt);