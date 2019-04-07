const express = require('express');
const bodyParser = require('body-parser');

//database
const db = require('./db');
const app = express();
const port = process.env.PORT || 3000;

const aux  = require('./auxiliar');

app.use(bodyParser.urlencoded({ extended : false } ));
app.use(bodyParser.json());

//obtener detalle usuario
app.get('/user/:name' , (req,res) => {
    db.query(`SELECT u.id_user ,u.name ,t.id_task, u.lastname , t.description_task 
        FROM users u INNER JOIN tasks t ON t.id_user = 
        u.id_user AND u.id_user = ${req.params.name}
    `, (err, rows) => {
      if(err) throw err;
      
      res.send(aux.formatter(rows)).status(200);  
    });
});


// listar todas las tareas

app.get('/task', (req,res) => {
    db.query("SELECT * FROM tasks", (err,rows) => {
        if(err) throw err;

        res.send(rows).status(200);
    })
});

// agregar tarea
app.post('/task' , (req, res) => {
    const task = { id_user : req.body.id_user , description_task : req.body.description_task}
    db.query("INSERT INTO tasks SET ?", task , (err, resp) => {
        if(err) throw err;
        
        res.send({message:"Tarea guardada correctamente"}).status(200);
    });
}) ;

// editar tarea
app.put("/task/:id" , (req, res) => {
    db.query("UPDATE tasks SET description_task = ? WHERE id_task = ?" , 
    [req.body.description, req.params.id], (err, result) => {
        if(err) throw err;

        res.send({message:"Tarea editada correctamente"}).status(200);
    });
});

// eliminar tarea
app.delete("/task/:id" , (req, res) => {
    db.query("DELETE FROM tasks WHERE id_task = ?" , [req.params.id], (err, result) => {
        console.log(result);
        res.send({message : "Tarea eliminada correctamente"}).status(200);
    });
});

// server config
app.listen(port, () => {
    console.log("Api corriendo");
});