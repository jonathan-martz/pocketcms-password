import * as openpgp from 'openpgp';

export const generatePGPKeyPair = async () => {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa', // Type of the key, RSA
        rsaBits: 4096,
        userIDs: [{ name: 'Jon Doe', email: 'jon.doe@example.com' }], // User identity details
        passphrase: 'password' // Optional passphrase to protect the private key
    });

    return {
        privateKey,
        publicKey
    };
};

export async function validateArmoredKey(key) {
    try {
        // Try to read as private key
        await openpgp.readPrivateKey({ armoredKey: key });
        return true;
    } catch (e1) {
        try {
            // Try to read as public key
            await openpgp.readKey({ armoredKey: key });
            return true;
        } catch (e2) {
            return false;
        }
    }
}

export const decryptMessage = async (
    encryptedMessage: string,
    privateKeyArmored: string,
    passphrase: string
) => {
    // Read the armored private key
    const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });

    // Decrypt the private key (returns a new key object)
    const decryptedPrivateKey = await openpgp.decryptKey({ privateKey, passphrase });

    // Read the encrypted message
    const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });

    // Decrypt the message with the decrypted private key
    const { data: decrypted } = await openpgp.decrypt({
        message,
        decryptionKeys: decryptedPrivateKey
    });

    return decrypted;
};

/**
 * Checks if the provided passphrase is correct for decrypting the private key.
 * @param {string} privateKeyArmored - The armored private key.
 * @param {string} passphrase - The passphrase to check.
 * @returns {Promise<boolean>} - True if the passphrase is correct, false otherwise.
 */
export const isPassphraseCorrect = async (privateKeyArmored, passphrase, passwordCorrect: Ref) => {
    try {
        const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
        await openpgp.decryptKey({ privateKey, passphrase });
        passwordCorrect.value = true;
    } catch (error) {
        passwordCorrect.value = false;
    }
};

export const convertPrivateKeyToRef = async (privateKeyArmored, passphrase) => {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
    const decryptedPrivateKey = await openpgp.decryptKey({
        privateKey,
        passphrase
    });

    return ref(decryptedPrivateKey);
};

export const encryptMessage = async (plainText, publicKey) => {
    const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
    const message = await openpgp.createMessage({ text: plainText });
    const encrypted = await openpgp.encrypt({
        message,
        encryptionKeys: publicKeyObj
    });

    return encrypted; // Return the encrypted message as a string
};