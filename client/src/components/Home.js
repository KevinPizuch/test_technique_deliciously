import React, { useState, useEffect } from "react";
import RestaurantModal from './RestaurantModal'
import DataService from "../services/data.service"

const Home = () => {
    const [modalShow, setModalShow] = useState(false);
    const [restaurantModal, setRestaurantModal] = useState(false)
    const [restaurantInfos, setRestaurantInfos] = useState(null)
    const [data, setData] = useState(null)

    const openModal = (value) =>{
        setData(restaurantInfos[value])
        setRestaurantModal(true)
        setModalShow(true)
    }
    
    useEffect(() => {
        DataService.getAllRestaurant().then(
            (response) => {
                setRestaurantInfos(response.data)
        })
    },[]);


    return (
        <section>
        <div className="body-main">
            <div className="body-main-container">
            <div><button className="body-container-button" onClick={() => openModal(0)}>Bouton</button></div>
            <div><button className="body-container-button" onClick={() => openModal(1)}>Bouton</button></div>
            </div>
        </div>

        {restaurantModal && 
            <RestaurantModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={data}
            />
        }
        
        </section>
    )
}

export default Home;