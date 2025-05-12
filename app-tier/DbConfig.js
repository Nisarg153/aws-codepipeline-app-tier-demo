const AWS = require('aws-sdk');

// Hardcoded DB host
const DB_HOST = 'bootcamp1-aurora-writer.czys8q4cwgnz.us-east-1.rds.amazonaws.com';
const DB_DATABASE = 'webappdb'
const secretName = 'bootcamp1/rdsCredentials'; // Your secret name
const region = 'us-east-1';

// Initialize Secrets Manager client
const client = new AWS.SecretsManager({ region });

async function getDbConfig() {
  try {
    const data = await client.getSecretValue({ SecretId: secretName }).promise();
    let secret;

    if ('SecretString' in data) {
      secret = JSON.parse(data.SecretString);
    } else {
      const buff = Buffer.from(data.SecretBinary, 'base64');
      secret = JSON.parse(buff.toString('ascii'));
    }

    return Object.freeze({
      DB_HOST,
      DB_USER: secret.username,
      DB_PWD: secret.password,
      DB_DATABASE,
    });
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
}

module.exports = getDbConfig;
