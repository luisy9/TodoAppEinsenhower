import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    horizontalListSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { SortableItem } from '../hooks'

import { DATA } from '../data/DATA';

export const StatesTodos = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Code JS', category: 1 },
        { id: 2, name: 'Code React', category: 2 },
        { id: 3, name: 'Code Angular', category: 3 },
        { id: 4, name: 'Code Vue', category: 1 },
        { id: 5, name: 'Code Astro', category: 4 },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className='flex gap-20 h-40'>
                {DATA.map(data => (
                    <div className='border rounded-lg px-10' key={data.id}>
                        <h1 className={`text-4xl ${data.color}`}>{data.name}</h1>
                        <SortableContext
                            items={items.filter(task => task.category === data.id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {items
                                .filter(task => task.category === data.id)
                                .map(task => (
                                    <SortableItem key={task.id} id={task.id}>
                                        {task.name}
                                    </SortableItem>
                                ))}
                        </SortableContext>
                    </div>
                ))}
            </div>
        </DndContext>
    );

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems(items => {
                const updatedItems = items.map(item =>
                    item.id === active.id ? { ...item, category: over.id } : item
                );

                return updatedItems;
            });
        }
    }
};

export default StatesTodos;
