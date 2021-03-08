import Modal from 'react-bootstrap/Modal';

const IMG_URL = "http://localhost:8080/image?name="

const RestaurantModal = (props) => {
    return (
        <Modal dialogClassName="modal-container" {...props} centered>
            {props.data && (
                <Modal.Body>
                    <button onClick={props.onHide} type="button" className="close">
                            ×
                    </button>
                    <div className="modal-restaurant-img">
                        <img src={IMG_URL + props.data.mainPicture} alt={props.data.name}/>
                    </div>
                    <div className="modal-restaurant-name-category">
                        <h4>{props.data.name}</h4>
                        <p>{props.data.type}</p>
                    </div>
                    <div className="modal-restaurant-adress-town">
                        <p>{props.data.adress}</p>
                        <p>{props.data.town}.</p>
                    </div>
                    <div className="modal-restaurant-details">
                    {
                        props.data.details.split(',').map(function(item){
                        return (
                                <div className="modal-restaurant-details-icons" key={item}>
                                    <div className="modal-restaurant-details-icons-wrapper" id={item === "France" ? "country" : null } >
                                    <img src={`${IMG_URL + item.split(' ').join('_').toLowerCase()}.svg`} alt={item}/>
                                    </div>
                                    <p>{item}</p>
                                </div>          
                                )
                        })
                    }
                    <div className="modal-restaurant-details-icons">
                    <div className="modal-restaurant-details-icons-wrapper">
                        <img src={props.data.price <= 15 ? IMG_URL + "smallprice.svg" : IMG_URL + "midprice.svg"} alt={props.data.price}/>
                    </div>
                    {props.data.price <= 15 ? <p>Moins de 15€</p> : <p>Entre 30€ et 50€</p>}
                    </div>
                </div>
                </Modal.Body>
            )}
        </Modal>
        );
  }

export default RestaurantModal;