module.exports = {
  addStudent: function (req, res) {
    res.view('addStudent');
  },
  getClass: function (req, res) {
    Student.findOne({ id: req.params.id }).exec(function (req, res) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      } else {
        res.view('getClass', { student: students });
      }
    })
  },
  add: function (req, res) {
    var studentId = Number(req.body.studentId);
    var teacherId = Number(req.body.teacherId);

    Student.findOne(studentId).populate('teachers')
      .exec(function (err, student) {
        student.teachers.add(teacherId);
        student.save(function (err) {
          if (err) console.error(err);
        });
        return res.view('listClass', { student: student });
      });
  },
  list: function (req, res) {
    Student.find({}).exec(function (err, students) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      }
      res.view('listStudent', { students: students });
    });
  },
  userClass: function (req, res) {
    Student.findOne({ id: req.params.id }).exec(function (req, res) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      } else {
        res.view('usersClasses', { student: students });
      }
    })
  },
  create: function (req, res) {
    var name = req.body.name;
    Student.create({ name: name }).exec(function (err) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      }
      res.redirect('/student/list');
    });
  },
  edit: function (req, res) {
    Student.findOne({ id: req.params.id }).exec(function (err, student) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      } else {
        Teacher.find().where({})
          .exec(function (err, teachers) {
            if (err) {
              res.send(500, { error: 'Database Error' });
            }

            res.view('editStudent', { student: student, teachers: teachers });
          })
      }
    });
  },
  update: function (req, res) {
    var name = req.body.name;
    Student.update({ id: req.params.id }, { name: name })
      .exec(function (err) {
        if (err) {
          res.send(500, { error: 'Database Error' });
        }
        res.redirect('/student/list');
      });

    return false;
  },
  delete: function (req, res) {
    Student.destroy({ id: req.params.id }).exec(function (err) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      }
      res.redirect('/student/list');
    });
    return false;
  }
};
