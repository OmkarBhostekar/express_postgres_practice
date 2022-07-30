const { Router } = require('express')
const studentController = require('./controller')

const router = Router()

router
    .route('/')
    .get(studentController.getStudents)
    .post(studentController.addStudent)

router.route('/:id')
    .get(studentController.getStudentById)
    .delete(studentController.deleteStudent)
    .patch(studentController.updateStudent)

module.exports = router