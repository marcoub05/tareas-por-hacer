const Tarea = require('./tarea');

class Tareas{

    listado={};

    get listadoArr(){

        const listado = [];
        Object.keys(this.listado).forEach(key=>{
            const tarea = this.listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor(){
        this.listado = {};
    }

    cargarTareasArr(tareas=[]){

        tareas.forEach(tarea=>{
            this.listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc=''){
        
        const tarea = new Tarea(desc);

        this.listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        this.listadoArr.forEach((tarea,id)=>{

            const idx = `${id+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);

        });
    }

    listarPendientesCompletadas(completadas=true){

        let contador = 0;
        this.listadoArr.forEach((tarea)=>{

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if(completadas){
                if(completadoEn){
                    contador+=1;
                    console.log(`${contador.toString().green} ${desc} :: ${completadoEn}`);
                }
            }
            else{
                if(!completadoEn){
                    contador+=1;
                    console.log(`${contador.toString().red} ${desc} :: ${estado}`);
                }
                
            }
        })
    }

    borrarTarea(id){
        if(this.listado[id]){
            delete this.listado[id];
        }
    }

    toggleTareas(ids=[]){
        ids.forEach(id=>{
            const tarea = this.listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea=>{

            if(!ids.includes(tarea.id)){
                this.listado[tarea.id].completadoEn = null;
                
            }
        });
    }
}

module.exports = Tareas;