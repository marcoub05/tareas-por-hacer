const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausar, leerInput, listadoBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
require('colors');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasArr(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {

            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleTareas(ids);
                break;
            case '6':
                const id = await listadoBorrar(tareas.listadoArr);

                if (id !== '0') {
                    const confirmacion = await confirmar('¿Está seguro?');
                    if (confirmacion) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                }

                break;
        }

        guardarDB(tareas.listadoArr);
        await pausar();

    }
    while (opt != '0')
}

main();