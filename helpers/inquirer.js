const inquirer = require('inquirer');
require('colors');

const opcionesMenu = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '7',
                name: `${'7.'.green} Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();

    console.log('====================='.green);
    console.log('Seleccione una opción'.white);
    console.log('=====================\n'.green);

    const { opcion } = await inquirer.prompt(opcionesMenu);

    return opcion;
}

const pausar = async () => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione la tecla ${'enter'.green} para continuar`
        }
    ]
    await inquirer.prompt(pregunta);
}


const leerInput = async (message) => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingresar un valor'
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(pregunta);
    return desc;
}

const listadoBorrar = async(tareas=[])=>{

   
    const choices = tareas.map((tarea,i)=>{
        const id = `${i+1}.`.green;
        return{
            value:tarea.id,
            name:`${id} ${tarea.desc}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const mostrarListadoCheckList = async(tareas=[])=>{

   
    const choices = tareas.map((tarea,i)=>{
        const id = `${i+1}.`.green;
        return{
            value:tarea.id,
            name:`${id} ${tarea.desc}`,
            checked:(tarea.completadoEn) ? true : false
        }
    });


    const preguntas = [
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}

const confirmar = async(mensaje)=>{

    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message:mensaje
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausar,
    leerInput,
    listadoBorrar,
    confirmar,
    mostrarListadoCheckList
}