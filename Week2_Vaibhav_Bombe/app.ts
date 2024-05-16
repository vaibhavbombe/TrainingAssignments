const express = require('express')
import { Application, Request, Response } from 'express';
import { createUser, getUsers, updateUser, deleteUser } from './service';
const { Pool } = require('pg');
const app = express()
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TestOrder',
    password: 'YourPassword1#',
    port: 5432,
});

// Function to filter orders
function filterOrders(orders) {
    return orders.filter(order => 
        !order.OrderBlocks.some(block => block.LineNo % 3 === 0)
    );
}

// Function to store order IDs in the database
async function storeOrderIDs(orders) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (let order of orders) {
            await client.query('INSERT INTO orders (orderID) VALUES ($1)', [order.orderID]);
        }
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

app.post('/orders', async (req, res) => {
    const { orders } = req.body;
    const filteredOrders = filterOrders(orders);
    try {
        await storeOrderIDs(filteredOrders);
        res.status(200).send("Orders processed and stored successfully");
    } catch (error) {
        res.status(500).send("Error storing orders");
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Q2

app.post('/array', (req, res) => {
    const { array } = req.body;

    // Example array functions
    const mappedArray = array.map(item => item * 2);
    const filteredArray = array.filter(item => item > 2);
    const reducedValue = array.reduce((acc, item) => acc + item, 0);

    res.json({
        mappedArray,
        filteredArray,
        reducedValue
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// Q3

app.post('/users', async (req, res) => {
    const { id, name, email } = req.body;
    console.log('Received POST request to /users:', { id, name, email });
    try {
        await createUser(id, name, email);
        console.log('User created successfully');
        res.send("User created successfully");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send("Error creating user");
    }
});

// Additional route handlers and server setup...

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Q4

const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
function filterPassedStudents(students) {
    return students.filter(student => student.grade >= 50);
}

// b. Get student names
function getStudentNames(students) {
    return students.map(student => student.name);
}

// c. Sort students by grade
function sortStudentsByGrade(students) {
    return students.slice().sort((a, b) => a.grade - b.grade);
}

// d. Get average age of students
function getAverageAge(students) {
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    return totalAge / students.length;
}

// Usage
console.log("Passed Students:", filterPassedStudents(students));
console.log("Student Names:", getStudentNames(students));
console.log("Sorted Students by Grade:", sortStudentsByGrade(students));
console.log("Average Age:", getAverageAge(students));