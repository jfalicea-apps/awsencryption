//bring in dependencies
const AWS = require('aws-sdk');

//AWS credentials
//point to region where databases reside
AWS.config.update({ region: 'us-east-2' });
AWS.config.getCredentials(function (err) {
  if (err) {
    console.log(err);
  }
  console.log('AWS Connected: ', AWS.config.credentials.accessKeyId);
});

//Initiate a new RDS instance
const rds = new AWS.RDS({ apiVersion: '2014-10-31' });

module.exports = {
  rds,
};
