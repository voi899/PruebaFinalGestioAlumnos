// Conexión a la BD
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'escolar'
});

connection.connect((err)=>{
  if(err) throw err
  cosole.log('la conexion fue un exito')
})

// Agregar alumno
function addStudent() {

  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let edad = document.getElementById('edad').value;
  let materia = document.getElementById('materia').value;
  let calificacion = document.getElementById('calificacion').value;
  let grupo = document.getElementById('grupo').value;

  let insertQuery = "INSERT INTO estudiantes (nombre, apellido, edad, materia, calificacion, grupo) VALUES (?,?,?,?,?,?)";

  connection.query(insertQuery, [nombre, apellido, edad, materia, calificacion, grupo], (err, result) => {
    if(err) throw err;
    console.log("Alumno insertado");
    fetchStudents();
  });

}

// Buscar por nombre 
function searchByName() {
  let name = document.getElementById('searchName').value;
  
  let query = "SELECT * FROM estudiantes WHERE nombre = ?";

  connection.query(query, [name], (err, result) => {
    // Mostrar resultados de búsqueda
  });

}

// Buscar por apellido
function searchByLastname() {
  let lastname = document.getElementById('searchLastname').value;

  let query = "SELECT * FROM estudiantes WHERE apellido = ?";

  connection.query(query, [lastname], (err, result) => {
    // Mostrar resultados de búsqueda
  });

}

// Obtener promedio de alumno
function getStudentAvg(studentId) {
  
  let query = "SELECT AVG(calificacion) AS promedio FROM estudiantes WHERE id = ?";

  connection.query(query, [studentId], (err, result) => {
    let avg = result[0].promedio;
    // Mostrar promedio
  });

}

// Obtener promedio de grupo
function getGroupAvg(grupo) {

  let query = "SELECT AVG(calificacion) AS promedio FROM estudiantes WHERE grupo = ?";

  connection.query(query, [grupo], (err, result) => {
    let avg = result[0].promedio;
    // Mostrar promedio
  });

} 

// Buscar promedio por nombre
function searchAvgByName() {

    let name = document.getElementById('searchNameAvg').value;
  
    let query = "SELECT AVG(calificacion) AS promedio FROM estudiantes WHERE nombre = ?";
  
    connection.query(query, [name], (err, result) => {
  
      let avg = result[0].promedio;
  
      document.getElementById('studentAvg').innerHTML = `
        Promedio de ${name}: ${avg}
      `;
  
    });
  
  }
  
  // Buscar promedio por apellido
  function searchAvgByLastname() {
  
    // código similar a searchAvgByName
    
  }
  
  // Obtener promedio de grupo 
  function getAvgByGroup() {
  
    let grupo = document.getElementById('grupoAvg').value;  
  
    let query = "SELECT AVG(calificacion) AS promedio FROM estudiantes WHERE grupo = ?";
  
    connection.query(query, [grupo], (err, result) => {
      
      let avg = result[0].promedio;
  
      document.getElementById('groupAvg').innerHTML = `
        Promedio de Grupo ${grupo}: ${avg}
      `;
  
    });
  
  }
  
  // Obtener lista ordenada
  function getListAsc(){
  
    let query = "SELECT nombre, apellido, AVG(calificacion) AS promedio FROM estudiantes GROUP BY id ORDER BY promedio ASC";
  
    connection.query(query, (err, result) => {
  
      let list = document.getElementById('sortedList');
      list.innerHTML = ''; //limpiar lista
  
      // recorrer resultados y agregar a lista
      result.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `${item.nombre} ${item.apellido}: ${item.promedio}`;
        list.appendChild(li);
      });
  
    });
  
  }


connection.end()