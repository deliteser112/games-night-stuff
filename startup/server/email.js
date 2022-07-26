import { Meteor } from 'meteor/meteor';

process.env.MAIL_URL = 'smtps://4165cf816743c426a58ec2e5d1577682:741164e84c9232a7d59ddfe5d536bc93@in-v3.mailjet.com:465';

if (Meteor.isDevelopment) {
  if (Meteor.settings.private && Meteor.settings.private.MAIL_URL) {
    process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
  } else {
    console.warn(
      'Woof! Email settings are not configured. Emails will not be sent. See documentation for configuration instructions.',
    );
  }
}
