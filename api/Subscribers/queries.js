import Subscribers from './Subscribers';

export default {
  Subscribers: () => Subscribers.find().fetch(),
};
