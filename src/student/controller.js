const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req,res) => {
    pool.query(queries.getStudents, (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows)
    })
}

const getStudentById = (req,res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (err, results) => {
        if(err) throw err;
        res.status(200).json(results.rows)
    })
}

const addStudent = (req,res) => {
    const { name, email, age, dob,  } = req.body
    pool.query(queries.checkEmailExists, [email], (err, results) => {
        if(err) throw err
        if(results.rows.length)
            res.send('Email already exists')
        pool.query(queries.addStudent, [name, email, age, dob], (err,results) => {
            if(err) throw err
            res.send({'message': "Student added successfully"})
        })
    })
}

const deleteStudent = (req,res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (err, results) => {
        const noStudentFound = !results.rows.length
        if(noStudentFound)
            res.send({'message': 'No student found with given id'})
        
        pool.query(queries.deleteStudent, [id], (err, results) => {
            if(err) throw err
            res.send({'message': 'Student deleted successfully'})
        })
    })
}

const updateStudent = (req,res) => {
    const id = parseInt(req.params.id)
    const {name} = req.body
    pool.query(queries.getStudentById, [id], (err, results) => {
        const noStudentFound = !results.rows.length
        if(noStudentFound)
            res.send({'message': 'No student found with given id'})
        
        pool.query(queries.updateStudent, [name,id], (err, results) => {
            if(err) throw err
            res.status(200).json(results.rows)
        })
    })
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent
}