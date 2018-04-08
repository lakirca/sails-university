module.exports = {
  addTeacher: function (req, res) {
    res.view('addTeacher');
  },
  getClass: function (req, res) {
    Teacher.findOne({ id: req.params.id }).exec(function (req, res) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      } else {
        res.view('getStudent', { teacher: teachers });
      }
    })
  },
  add: function (req, res) {
    var teacherId = Number(req.body.teacherId);
    var studentId = Number(req.body.studentId);

    Teacher.findOne(teacherId).populate('students')
      .exec(function (err, teacher) {
        teacher.students.add(studentId);
        teacher.save(function (err) {
          if (err) console.error(err);
        });
        return res.view('studentList', { teacher: teacher });
      });
  },
  list: function (req, res) {
    Teacher.find({}).exec(function (err, teachers) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      }
      res.view('listTeacher', { teachers: teachers });
    });
  },
  create: function (req, res) {
    var name = req.body.name;
    var className = req.body.className;
    Teacher.create({ name: name, className: className }).exec(function (err) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      }
      res.redirect('/teacher/list');
    });
  },
  edit: function (req, res) {
    Teacher.findOne({ id: req.params.id }).exec(function (err, teacher) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      } else {
        Student.find().where({})
          .exec(function (err, students) {
            if (err) {
              res.send(500, { error: 'Database Error' });
            }

            res.view('editTeacher', { teacher: teacher, students: students });
          })
      }
    });
  },
  update: function (req, res) {
    var name = req.body.name;
    var className = req.body.className;
    Teacher.update({ id: req.params.id }, { name: name, className: className })
      .exec(function (err) {
        if (err) {
          res.send(500, { error: 'Database Error' });
        }
        res.redirect('/teacher/list');
      });

    return false;
  },
  delete: function (req, res) {
    Teacher.destroy({ id: req.params.id }).exec(function (err) {
      if (err) {
        res.send(500, { error: 'Database Error' });
      }
      res.redirect('/teacher/list');
    });
    return false;
  }
};
