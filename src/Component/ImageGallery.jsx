

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const reorder = (list, startIndex, endIndex) => {

    console.log(list,"list")
    console.log(startIndex,"startIndex")
    console.log(endIndex,"endIndex")
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(result)
    return result;
};

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    useEffect(() => {
        // Fetch images from the API
        axios.get('https://api.slingacademy.com/v1/sample-data/blog-posts')
            .then(response => {
                const fetchedImages = response.data.blogs; // Adjust according to your API response
                console.log(fetchedImages,"fetchedImages")
                const savedOrder = localStorage.getItem('imageOrder');
                if (savedOrder) {
                    const order = JSON.parse(savedOrder);
                    setImages(order.map(id => fetchedImages.find(img => img.id === id)));
                } else {
                    setImages(fetchedImages);
                }
                setFilteredImages(fetchedImages);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedCategory === 'ALL') {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.category === selectedCategory));
        }
    }, [images, selectedCategory]);

    const onDragEnd = (result) => {
        console.log("onDragEnd")
        if (!result.destination) {
            return;
        }
    
        const newImages = reorder(
            images,
            result.source.index,
            result.destination.index
        );

        setImages(newImages);
        localStorage.setItem('imageOrder', JSON.stringify(newImages.map(img => img.id)));
    };

    const resetOrder = () => {
        localStorage.removeItem('imageOrder');
        window.location.reload(); // Refresh the page to reset the order
    };

    return (
        <div>
            <button onClick={resetOrder}>Reset Order</button>
           
                <button value="ALL">All</button>
                <button   onClick={(e) => setSelectedCategory(e.target.value)} value="math">Math</button>
                <button   onClick={(e) => setSelectedCategory(e.target.value)} value="love">Love</button>
                <button  onClick={(e) => setSelectedCategory(e.target.value)} value="gaming">Gaming</button>
           
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ display: 'flex', flexWrap: 'wrap' }}
                        >
                            {filteredImages.map((img, index) => (
                                <Draggable key={img.id} draggableId={(img.id).toString()+"dragndrop"} index={index}>
                                    {(provided) => (

                                        
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{ margin: '8px' }}
                                        >
                                          
                                            <img src={img.photo_url} alt={img.alt} style={{ width: '100px', height: '100px' }} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default ImageGallery;
