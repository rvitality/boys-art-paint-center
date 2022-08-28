import React, { useRef, useState } from "react";

import { uploadNewProduct } from "../../utils/firebase/firebase.utils";

import imgPlaceholder from "../../assets/images/img-placeholder.jpg";

import "./NewProduct.styles.scss";

const NewProduct = ({ showNewItemForm, onHide }) => {
    const [imgFileInput, setImgFileInput] = useState();
    const [imgFileReaderInput, setImgFileReaderInput] = useState();

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

        console.log(imgFileInput);

        uploadNewProduct(product, imgFileInput);
    };

    return (
        <section className={`new-item-container ${showNewItemForm ? "show" : ""}`}>
            <form onSubmit={submitHandler}>
                <div
                    className="form-control img-upload-container dog"
                    style={{
                        backgroundImage: `url(${
                            imgFileReaderInput ? imgFileReaderInput : imgPlaceholder
                        })`,
                    }}
                >
                    <input onChange={imgChangeHandler} type="file" accept="image/png, image/jpeg" />
                    {/* <img className="product-img" src={imgFileReaderInput} alt="" /> */}
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
                    <button type="submit">Add Item</button>
                </div>
            </form>
        </section>
    );
};

export default NewProduct;
