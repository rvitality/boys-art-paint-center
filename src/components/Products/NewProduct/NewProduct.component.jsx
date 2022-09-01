import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { uploadNewProduct } from "../../../utils/firebase/firebase.utils";

import imgPlaceholder from "../../../assets/images/img-placeholder.jpg";

import "./NewProduct.styles.scss";
import { productsActions } from "../../../store/products/products-slice";

const NewProduct = ({ onHide }) => {
    const dispatch = useDispatch();

    const [imgFileInput, setImgFileInput] = useState();
    const [imgFileReaderInput, setImgFileReaderInput] = useState();

    const [requestData, setRequestData] = useState({});

    const brandRef = useRef();
    const nameRef = useRef();
    const typeRef = useRef();
    const colorRef = useRef();
    const priceRef = useRef();
    const stockRef = useRef();
    const volumeValueRef = useRef();
    const volumeRef = useRef();

    const fileReader = new FileReader();

    const imgChangeHandler = e => {
        const file = e.target.files[0];

        if (!file) return;

        setImgFileInput(file);

        fileReader.onload = e => {
            const { result } = e.target;
            setImgFileReaderInput(result);
        };

        fileReader.readAsDataURL(file);
    };

    const submitHandler = e => {
        e.preventDefault();

        const brand = brandRef.current.value;
        const name = nameRef.current.value;
        const type = typeRef.current.value;
        const color = colorRef.current.value;
        const price = +priceRef.current.value;
        const currentQuantity = +stockRef.current.value;
        const volumeValue = +volumeValueRef.current.value || "";
        const volume = volumeRef.current.value;

        const product = {
            brand,
            color,
            currentQuantity,
            name,
            price,
            type,
            volume,
            volumeValue,
        };

        uploadNewProduct(product, imgFileInput)
            .then(response => {
                dispatch(productsActions.addProduct({ ...product, id: response.id }));

                setRequestData(prevState => {
                    if (response.id) {
                        brandRef.current.value = "";
                        nameRef.current.value = "";
                        typeRef.current.value = "";
                        colorRef.current.value = "";
                        priceRef.current.value = "";
                        stockRef.current.value = "";
                        volumeValueRef.current.value = "";
                        volumeRef.current.value = "";
                        setImgFileReaderInput("");

                        return {
                            ...prevState,
                            id: response.id,
                            status: "success",
                            msg: "Product added successfully.",
                        };
                    }

                    return { ...prevState, status: "error", msg: "Request ID doesn't exist." };
                });
            })
            .catch(err =>
                setRequestData(prevState => ({ ...prevState, status: "error", msg: err.message }))
            );
    };

    return (
        <section className="new-item-container">
            {requestData && (
                <div className={`request-status-msg  ${requestData.status}`}>
                    <p>{requestData.msg}</p>
                </div>
            )}

            <form onSubmit={submitHandler}>
                <div
                    className="form-control img-upload-container"
                    style={{
                        backgroundImage: `url(${
                            imgFileReaderInput ? imgFileReaderInput : imgPlaceholder
                        })`,
                    }}
                >
                    <input onChange={imgChangeHandler} type="file" accept="image/png, image/jpeg" />
                </div>
                <div className="form-control">
                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" ref={brandRef} />
                </div>

                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" ref={nameRef} required />
                    </div>

                    <div className="form-control">
                        <label htmlFor="type">Type</label>
                        <input type="text" id="type" ref={typeRef} />
                    </div>

                    <div className="form-control">
                        <label htmlFor="color">Color</label>
                        <input type="text" id="color" ref={colorRef} />
                    </div>
                </div>

                <div className="form-group divide">
                    <div className="form-group__child-group">
                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input type="number" min={1} id="price" ref={priceRef} required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="stock">Stock</label>
                            <input type="number" min={1} id="stock" ref={stockRef} required />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="form-group__child-group">
                        <div className="form-control">
                            <label htmlFor="volume-value">Volume value</label>
                            <input type="number" min={1} id="volume-value" ref={volumeValueRef} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="volume">
                                Volume{" "}
                                <small style={{ textTransform: "none" }}>(L, ml, pc, can)</small>
                            </label>
                            <input type="text" id="volume" ref={volumeRef} />
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button type="button" className="cancel-btn" onClick={onHide}>
                        Cancel
                    </button>
                    <button type="submit"> Add Item</button>
                </div>
            </form>
        </section>
    );
};

export default NewProduct;
