import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import schema from './schema.js';
import Users from 'meteor/vulcan:users';
import Sequences from '../sequences/collection.js';

const options = {
  newCheck: (user, document) => {
    if (!user || !document) return false;
    let parentSequence = Sequences.findOne({_id: document.sequenceId});
    return Users.owns(user, parentSequence) ? Users.canDo(user, 'chapters.new.own') : Users.canDo(user, `chapters.new.all`)
  },

  editCheck: (user, document) => {
    if (!user || !document) return false;
    let parentSequence = Sequences.findOne({_id: document.sequenceId});
    return Users.owns(user, parentSequence) ? Users.canDo(user, 'chapters.edit.own') : Users.canDo(user, `chapters.edit.all`)
  },

  removeCheck: (user, document) => {
    if (!user || !document) return false;
    let parentSequence = Sequences.findOne({_id: document.sequenceId});
    return Users.owns(user, parentSequence) ? Users.canDo(user, 'chapters.remove.own') : Users.canDo(user, `chapters.remove.all`)
  },
}


const Chapters = createCollection({

  collectionName: 'Chapters',

  typeName: 'Chapter',

  schema,

  resolvers: getDefaultResolvers('Chapters'),

  mutations: getDefaultMutations('Chapters', options),
})

export default Chapters;
