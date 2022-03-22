require('colors');

const mostrarMenu = ()=>{


    return new Promise((resolve,reject)=>{

        
    
        console.log(`${'1.'.green}Crear tarea`);
        console.log(`${'2.'.green}Listar tareas`);
        console.log(`${'3.'.green}Listar tareas completadas`);
        console.log(`${'4.'.green}Listar tareas pendientes`);
        console.log(`${'5.'.green}Completar tarea(s)`);
        console.log(`${'6.'.green}Borrar tarea`);
        console.log(`${'0.'.green}Salir \n`);
    
        const readLine = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        readLine.question('Seleccione una opción: ',(opt)=>{
            readLine.close();
            resolve(opt);
        });
    })
    
}

const pausar = () =>{

    return new Promise((resolve,reject)=>{
        const readLine = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        readLine.question(`\nPresione la tecla ${'ENTER'} para continuar`,(opt)=>{
            readLine.close();
            resolve();
        });
    })
    
}

module.exports = {
    mostrarMenu,
    pausar
}