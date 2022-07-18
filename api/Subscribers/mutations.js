import Subscribers from './Subscribers';

export default {
  addSubscriber: (root, args) => {
    return Subscribers.insert({
      name: args.name,
      email: args.email,
    });
  },
};
