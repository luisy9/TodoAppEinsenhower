
export const useDragDrop = ({ items, setItems, addTask, setAddTask, nameTask, setNameTask }) => {

  //Tenemos que diferenciar cual es el ultimo elemento escrito en el textarea
  //Habrimos el div para añadir una tarea
  const addTaskClick = (id) => {
    setAddTask((task) => [...task, { id: { [id]: 'hidden' } }]);
  };

  //Close el Div para añadir una tarea
  const closeTaskClick = (id) => {
    console.log(addTask, id)
    //Si Object.keys(id)[0] recibe undefined si utilizara el id;

    // const idBox = Object.keys(id)[0] | id;
    // console.log(idBox, id)
    setAddTask(addTask.filter((t) => Object.keys(t.id)[0] != id));
    resetInputTask(id);
  };

  const resetInputTask = (idBox) => {
    setNameTask({ ...nameTask, [idBox]: { idBox, text: '' } });
  };

  //Añadimos una tarea al state, y tenemes que diferenciar bien que textarea se tiene que cerrar
  const addTaskState = (event, id) => {
    event.preventDefault();
    const previusTasks = nameTask[id]?.text;
    const itemToClose = nameTask[id]?.boxId;
    setItems((items) => {
      if (nameTask[id].text.length > 0) {
        return [
          ...items,
          {
            id: items.sort((e, a) => a.id - e.id)[0].id + 1,
            name: previusTasks,
            category: id,
          },
        ].sort((a, b) => a.id - b.id);
      }
    });

    closeTaskClick(itemToClose);
  };

  const onChangeValuesTextArea = (event, boxId) => {
    event.preventDefault();
    /* No se añade uno nuevo porque lo que pasa es que en el 
    boxId es como que mira que no haya un [boxId] con el mismo boxId y por eso se modifica si se cumple este caso */
    setNameTask({ ...nameTask, [boxId]: { boxId, text: event.target.value } });
  };

  return {
    addTaskClick,
    closeTaskClick,
    resetInputTask,
    addTaskState,
    onChangeValuesTextArea,
  };
};

export default useDragDrop;
