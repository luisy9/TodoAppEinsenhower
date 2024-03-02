import { useDroppable } from '@dnd-kit/core';

export const Droppable = (props) => {
    // console.log(props)
    const { isOver, setNodeRef } = useDroppable({
        id: props.idCategory,
    });

    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className='border rounded-lg flex w-96 gap-20 h-40'>
            {props.children}
        </div>
    );
}