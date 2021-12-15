import Crypto, { createHmac, createDecipheriv, randomBytes } from 'crypto'

export type TLogonErrorId = "ACCOUNT_UNCONFIRMED" | "ACCOUNT_NOT_FOUND" | "BAD_LOGIN" | "BAD_PASSWORD"
export type TRegisterErrorId = "ALREADY_REGISTER" | "CRYPT_PASSWORD_ERROR" | "EMAIL_SEND_ERROR_ACTIVATION_LINK"
export type TConfirmErrorId = "TOKEN_EXPIRED" | "TOKEN_UNAVAILABLE" | "UNABLE_TO_SAVE_VERIFICATION_DATE" | "UNABLE_TO_EXPIRE_TOKEN"
export type TResetSuccessId = "EMAIL_WITH_TOKEN_SENDS" | "TOKEN_IS_VALID" | "NEW_PASSWORD_SAVED"
export type TResetErrorId = "ACCOUNT_NOT_FOUND" | "TOKEN_NOT_FOUND" | "TOKEN_EXPIRED" | "TOKEN_ADD_ERROR" | "SYSTEM_ERROR" | "EMAIL_SEND_ERROR_PASSWORD_RESET_LINK" | "SAVE_PASSWORD_DB_ERROR"
export type TUsernameReqErrorId = "EMPTY" | "TOO_SHORT" | "REQUIRED_EMAIL" | "REQURED_LETTERS" | "NOT_ENOUGH_LETTERS" | "REQURED_UPPERCASE" | "NOT_ENOUGH_UPPERCASE" | "REQURED_NUMBERS" | "NOT_ENOUGH_NUMBERS" | "REQURED_SPECIAL" | "NOT_ENOUGH_SPECIAL"
export type TPasswordReqErrorId = "EMPTY" | "TOO_SHORT" | "REQURED_LETTERS" | "NOT_ENOUGH_LETTERS" | "REQURED_UPPERCASE" | "NOT_ENOUGH_UPPERCASE" | "REQURED_NUMBERS" | "NOT_ENOUGH_NUMBERS" | "REQURED_SPECIAL" | "NOT_ENOUGH_SPECIAL"

export interface IUser {
    username: string
    password: string
}

export interface IUserLogon {
    logonSuccess?: boolean
    logonError?: boolean
    logonErrorId?: TLogonErrorId
    logonErrorDetails?: string
    sessionToken?: string
}

export interface IUsernameComplexityStrategy {
    isEmail: number
    minLength: number
    letters: number
    numbers: number
    special: number
    specialChars: string
    uppercase: number
}

interface IPasswordComplexityStrategy {
    minLength: number
    letters: number
    numbers: number
    special: number
    specialChars: string
    uppercase: number
}

/* ------------------
USERNAME
------------------*/

export var usernameComplexityStrategy : IUsernameComplexityStrategy = {
    isEmail: 1,
    minLength: 0,
    letters: 0,
    numbers: 0,
    special: 1,
    specialChars: "@",
    uppercase: 0
}

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function checkUsernameRequirements(plainUsername: string): Array<TUsernameReqErrorId> {
    
    var strategy = usernameComplexityStrategy
    var result: Array<TUsernameReqErrorId> = []

    if(typeof plainUsername != "string")
        result.push("EMPTY")

    if(plainUsername.length == 0)
        result.push("EMPTY")

    if(plainUsername.length < strategy.minLength)
        result.push("TOO_SHORT")

    if(strategy.isEmail && validateEmail(plainUsername) == false)
        result.push("REQUIRED_EMAIL")

    if(strategy.letters && new RegExp("[a-z]", "gi").test(plainUsername) == false)
        result.push("REQURED_LETTERS")

    if(strategy.letters && new RegExp("[a-z]{" + strategy.letters + ",}", "gi").test(plainUsername) == false)
        result.push("NOT_ENOUGH_LETTERS")

    if(strategy.uppercase && new RegExp("[A-Z]", "g").test(plainUsername) == false)
        result.push("REQURED_UPPERCASE")

    if(strategy.uppercase && new RegExp("[A-Z]{" + strategy.uppercase + ",}", "g").test(plainUsername) == false)
        result.push("NOT_ENOUGH_UPPERCASE")

    if(strategy.numbers && new RegExp("[0-9]", "g").test(plainUsername) == false)
        result.push("REQURED_NUMBERS")

    if(strategy.numbers && new RegExp("[0-9]{" + strategy.numbers + ",}", "g").test(plainUsername) == false)
        result.push("NOT_ENOUGH_NUMBERS")

    if(strategy.special && new RegExp("[" + strategy.specialChars + "]").test(plainUsername) == false)
        result.push("REQURED_SPECIAL")

    if(strategy.special && new RegExp("[" + strategy.specialChars + "]{" + strategy.special + ",}").test(plainUsername) == false)
        result.push("NOT_ENOUGH_SPECIAL")

    return result
}


/* ------------------
PASSWORD
------------------*/

//const algorithm = 'aes-256-ctr';
const algorithm = 'aes-256-cbc';
const ENCRYPTION_KEY = '09SekretnyKluczDoGenerowaniaHasla05'; // or generate sample key Buffer.from('FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=', 'base64');
const IV_LENGTH = 16;

export var passwordComplexityStrategy : IPasswordComplexityStrategy = {
    minLength: 8,
    letters: 1,
    numbers: 1,
    special: 1,
    specialChars: "!@#$%^&*",
    uppercase: 1
}

export function checkPassword(textPlain: string, textCrypted: string): boolean {
    return decryptPassword(textCrypted) == textPlain
}

export function encryptPassword(textPlain: string): string {
    let iv = Crypto.randomBytes(IV_LENGTH)
    let cipher = Crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv)
    let encrypted = cipher.update(textPlain)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decryptPassword(textCrypted: string): string {
    if(textCrypted.indexOf(':')) {
        let textParts = textCrypted.split(':')
        let iv = Buffer.from(textParts.shift()!, 'hex')
        let encryptedText = Buffer.from(textParts.join(':'), 'hex')
        let decipher = createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv)
        let decrypted = decipher.update(encryptedText)
        console.log(1)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return decrypted.toString()
    }
    return ""
}




// A node demo program for creating the ECDH
// Tutorial: https://www.tutorialspoint.com/crypto-createdecipheriv-method-in-node-js

// Importing the crypto module
const crypto = require('crypto');

// Initializing the algorithm
//const algorithm = 'aes-256-cbc';

// Defining and initializing the password
const password = '123456789'

// Initializing the key
const key = crypto.randomBytes(32);

// Initializing the iv vector
const iv = crypto.randomBytes(16);

// Encrypt function to encrypt the data
export function encrypt(text: string) {

    // Creating the cipher with the above defined parameters
    let cipher = Crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    
    // Updating the encrypted text...
    let encrypted = cipher.update(text);
    
    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    // Returning the iv vector along with the encrypted data
    return { iv: iv.toString('hex'),
       encryptedData: encrypted.toString('hex') };
}
    
//Decrypt function for decrypting the data
export function decrypt(text: any) {
    
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    
    // Creating the decipher from algo, key and iv
    let decipher = crypto.createDecipheriv(
       'aes-256-cbc', Buffer.from(key), iv);
    
    // Updating decrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    // returning response data after decryption
    return decrypted.toString();
}









/**
 * checkPasswordRequirements zwraca tablicę z informacjami, których regółek nie spełnia wpisany ciąg znaków
 *
 * @param {string} [plainPassword] hasło wpisane w otwarty sposób (nie zaszyfrowane)
 * @param {StrategyInterface} [strategy] Zmienna definiująca, które z regółek mają zostać wzięte pod uwagę
 * @returns {Array<string>}
 */

 export function checkPasswordRequirements(plainPassword: string): Array<TPasswordReqErrorId> {

    var strategy = passwordComplexityStrategy
    var result: Array<TPasswordReqErrorId> = []

    if(typeof plainPassword != "string")
        result.push("EMPTY")

    if(plainPassword.length == 0)
        result.push("EMPTY")

    if(plainPassword.length < strategy.minLength)
        result.push("TOO_SHORT")

    if(strategy.letters && new RegExp("[a-z]", "gi").test(plainPassword) == false)
        result.push("REQURED_LETTERS")

    if(strategy.letters && new RegExp("[a-z]{" + strategy.letters + ",}", "gi").test(plainPassword) == false)
        result.push("NOT_ENOUGH_LETTERS")

    if(strategy.uppercase && new RegExp("[A-Z]", "g").test(plainPassword) == false)
        result.push("REQURED_UPPERCASE")

    if(strategy.uppercase && new RegExp("[A-Z]{" + strategy.uppercase + ",}", "g").test(plainPassword) == false)
        result.push("NOT_ENOUGH_UPPERCASE")

    if(strategy.numbers && new RegExp("[0-9]", "g").test(plainPassword) == false)
        result.push("REQURED_NUMBERS")

    if(strategy.numbers && new RegExp("[0-9]{" + strategy.numbers + ",}", "g").test(plainPassword) == false)
        result.push("NOT_ENOUGH_NUMBERS")

    if(strategy.special && new RegExp("[" + strategy.specialChars + "]").test(plainPassword) == false)
        result.push("REQURED_SPECIAL")

    if(strategy.special && new RegExp("[" + strategy.specialChars + "]{" + strategy.special + ",}").test(plainPassword) == false)
        result.push("NOT_ENOUGH_SPECIAL")

    return result
}

/**
 * randomString returns a random alphanumeric string of the specified length.
 *
 * @param {number} [length]
 * @param {boolean} [special]
 * @returns {string}
 */
 function randomString(length = 10, special = false): string {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (special) chars += '-_%!@#$^&*';
    let cLength = chars.length,
        sRandom = '';
    for (let i = 0; i < length; i++) {
        sRandom += chars[Math.floor(Math.random() * cLength)];
    }
    return sRandom;
}
