module.exports = {

  attributes: {

    name: { type: 'string' },

    teachers: {

      collection: 'teacher',
      via: 'students',
      dominant: true

    } // many to many relation with teacher model

  }

};

