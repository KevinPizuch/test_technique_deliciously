import React, { useState, useEffect, useRef } from "react";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import { Upload } from 'antd';
import DataService from "../services/data.service"
import Toast from 'light-toast';

const IMG_URL = "http://localhost:8080/image?name="

const { Dragger } = Upload;

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

const BoardAdmin = () => {
    const [restaurantsNamesData, setRestaurantsNamesData] = useState("")
    const [restaurantContent, setRestaurantContent] = useState("")
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const checkBtn = useRef();

    const props = {
        name: 'photo',
        multiple: false,
        action: 'http://localhost:8080/photo',
        onChange(info) {
            const { status } = info.file;

            if (status === 'done') {
                Toast.success(`${info.file.name} file uploaded successfully.`, 2000);
                setRestaurantContent({
                    ...restaurantContent,
                    mainPicture : info.file.name
                }) 
            } else if (status === 'error') {
                Toast.fail(`${info.file.name} file upload failed.`, 2000);
            }
        },
    };

    const getRestaurantContent = (name) =>{
        DataService.getRestaurantContent(name).then(
            (response) => {
                setRestaurantContent(response.data)
            }
        )
    }

    const onChangeName = (e) => {
        const name = e.target.value;
        setRestaurantContent({
            ...restaurantContent,
            name: name
        })
      };

    const onChangeType = (e) => {
        const type = e.target.value;
        setRestaurantContent({
            ...restaurantContent,
            type: type
        })
    };

    const onChangeAdress = (e) => {
        const adress = e.target.value;
        setRestaurantContent({
            ...restaurantContent,
            adress: adress
        })
    };

    const onChangeTown = (e) => {
        const town = e.target.value;
        setRestaurantContent({
            ...restaurantContent,
            town: town
        })
    };

    const onChangePrice = (e) => {
        const price = e.target.value;
        setRestaurantContent({
            ...restaurantContent,
            price: price
        })
    };

    const handleModify = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            Toast.loading("Loading...");
            DataService.updateRestaurant(restaurantContent).then(
                () => {
                    DataService.getAllRestaurantName().then(
                        (response) => {
                            setRestaurantsNamesData(response.data)
                    })
                    setLoading(false);
                    Toast.hide();
                    Toast.success("Success !", 2000);
                  },
                  (error) => {
                        console.log(error.response)
                        setLoading(false);
                  }
            )
        }else{
            Toast.hide();
            setLoading(false)
        }
    }

    useEffect(() => {
        DataService.getAllRestaurantName().then(
            (response) => {
                setRestaurantsNamesData(response.data)
        })
    },[]);
    

    return (
            <div className="board-admin-container">
                <div className="board-admin-restaurant-list">
                    <div className="board-admin-restaurant-title">
                        <h3>Restaurants</h3>
                    </div>
                    <div>
                        {restaurantsNamesData &&
                            restaurantsNamesData.map(function(item){
                            return (
                                    <div className="board-admin-restaurant-list-content" key={item.name}>
                                        <p onClick={() => getRestaurantContent(item.name)}>{item.name}</p>
                                    </div>          
                                    )
                            })
                        }
                    </div>
                </div>
                <div className="board-admin-restaurant-content">
                    {restaurantContent &&
                        <>
                            <div className="board-admin-restaurant-content-modify">
                            <Form className="modal-form" ref={form} onSubmit={handleModify}>
                                <Dragger {...props}>
                                    <div style={{width: '80%', height: '100px', margin:'auto', backgroundColor:'lightgray'}}>
                                        <p className="ant-upload-text" style={{textAlign: 'center'}}>Click or drag image to this area to upload</p>
                                    </div>
                                </Dragger>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={restaurantContent.name}
                                    onChange={onChangeName}
                                    validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="type">Type</label>
                                    <Input
                                    type="text"
                                    className="form-control"
                                    name="type"
                                    value={restaurantContent.type}
                                    onChange={onChangeType}
                                    validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="adress">Adress</label>
                                    <Input
                                    type="text"
                                    className="form-control"
                                    name="adress"
                                    value={restaurantContent.adress}
                                    onChange={onChangeAdress}
                                    validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="town">Town</label>
                                    <Input
                                    type="text"
                                    className="form-control"
                                    name="town"
                                    value={restaurantContent.town}
                                    onChange={onChangeTown}
                                    validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <Input
                                    type="text"
                                    className="form-control"
                                    name="price"
                                    value={restaurantContent.price}
                                    onChange={onChangePrice}
                                    validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Confirm changes</span>
                                    </button>
                                </div>
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                        </div>
                            <div className="board-admin-restaurant-content-preview">
                                <div className="modal-restaurant-img">
                                    <img src={IMG_URL + restaurantContent.mainPicture} alt={restaurantContent.name}/>
                                </div>
                                <div className="board-admin-restaurant-wrapper-preview">
                                    <div className="modal-restaurant-name-category">
                                        <h4>{restaurantContent.name}</h4>
                                        <p>{restaurantContent.type}</p>
                                    </div>
                                    <div className="modal-restaurant-adress-town">
                                        <p>{restaurantContent.adress}</p>
                                        <p>{restaurantContent.town}.</p>
                                    </div>
                                    <div className="modal-restaurant-details">
                                        {
                                            restaurantContent.details.split(',').map(function(item){
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
                                                <img src={restaurantContent.price <= 15 ? IMG_URL + "smallprice.svg" : IMG_URL + "midprice.svg"} alt={restaurantContent.price}/>
                                            </div>
                                            {restaurantContent.price <= 15 ? <p>Moins de 15€</p> : <p>Entre 30€ et 50€</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </>   
                    }
                </div>
            </div>
    )
}

export default BoardAdmin;