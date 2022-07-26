import { Meteor } from 'meteor/meteor';
import sendEmail from '../../../modules/server/sendEmail';

const getEmailOptions = (options) => {
  const { emailAddress, user } = options;
  try {
    const productName = 'GamesNight';
    const supportEmail = 'care@gamesnight.fun';

    return {
      to: emailAddress,
      from: supportEmail,
      subject: `Welcome, to the ${productName}!`,
      template: 'welcome',
      templateVars: {
        title: `You have been invited!`,
        subtitle: `You just recieved the invitation from ${user.profile.name.first} ${user.profile.name.last} of ${productName}`,
        productName,
        firstName: '',
        welcomeUrl: Meteor.absoluteUrl('auth/login'), // e.g., returns http://localhost:3000/documents
      },
    };
  } catch (exception) {
    throw new Error(`[sendInvitationEmail.getEmailOptions] ${exception.message}`);
  }
};

export default (options) => {
  try {
    const emailOptions = getEmailOptions(options);

    sendEmail(emailOptions).catch((error) => {
      throw new Error(error);
    });
  } catch (exception) {
    throw new Error(`[sendInvitationEmail] ${exception.message}`);
  }
};
