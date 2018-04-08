module.exports = {

  attributes: {

    name: { type: 'string' },

    className: { type: 'string' },

    students: {

      collection: 'student',
      via: 'teachers'
  
    } // many to many relation with student model
  
  }

};

