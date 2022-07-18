import Wishes from './Wishes';

export default {
  wishes: () => Wishes.find().fetch(),
};
