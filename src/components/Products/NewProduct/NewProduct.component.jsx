import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectUploadProductError,
    selectUploadProductStatus,
} from "../../../store/products/products-selector";
import { updateProduct, uploadProduct } from "../../../store/products/products-actions";

import imgPlaceholder from "../../../assets/images/img-placeholder.jpg";
import "./NewProduct.styles.scss";

const NewProduct = ({ currentProductEdit = {}, onHide }) => {
    const {
        brand,
        color,
        currentQuantity: stock,
        imageUrl,
        name,
        price,
        type,
        volume,
        volumeValue,
    } = currentProductEdit;

    // console.log(currentProductEdit);

    const actionType = Object.keys(currentProductEdit).length > 0 ? "edit" : "add";

    const dispatch = useDispatch();

    const uploadProductStatus = useSelector(selectUploadProductStatus);
    const uploadProductError = useSelector(selectUploadProductError);

    const [imgFileInput, setImgFileInput] = useState(imageUrl);
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

        if (uploadProductStatus === "idle" && actionType === "add") {
            dispatch(uploadProduct({ product, imgFileInput })).then(response => {
                const { requestStatus } = response.meta;
                if (requestStatus === "fulfilled") {
                    brandRef.current.value = "";
                    nameRef.current.value = "";
                    typeRef.current.value = "";
                    colorRef.current.value = "";
                    priceRef.current.value = "";
                    stockRef.current.value = "";
                    volumeValueRef.current.value = "";
                    volumeRef.current.value = "";
                    setImgFileReaderInput("");
                }
            });
        } else if (actionType === "edit") {
            const newEditProduct = { ...product, id: currentProductEdit.id, imageUrl };

            // check if img has been changed
            if (imageUrl !== imgFileInput) {
                dispatch(updateProduct({ product: newEditProduct, imgFileInput })).then(
                    response => {
                        console.log("response: ", response);
                    }
                );
            } else {
                dispatch(updateProduct({ product: newEditProduct, imgFileInput: "retain" })).then(
                    response => {
                        console.log("response: ", response);
                    }
                );
            }
        }
    };

    const uploadProductStatusMessage =
        uploadProductStatus === "succeeded"
            ? "Product added successfully."
            : uploadProductError.message;

    console.log("uploadProductStatusMessage: ", uploadProductStatusMessage);

    let productStyleDisplayImg;
    if (imgFileReaderInput) {
        productStyleDisplayImg = imgFileReaderInput;
    } else if (imageUrl) {
        productStyleDisplayImg = imageUrl;
    } else {
        productStyleDisplayImg = imgPlaceholder;
    }

    return (
        <div className="new-item-container" id="new-product">
            {uploadProductStatus && (
                <div className={`request-status-msg  ${uploadProductStatus}`}>
                    <p>{uploadProductStatusMessage}</p>
                </div>
            )}

            <form onSubmit={submitHandler}>
                <div
                    className="form-control img-upload-container"
                    style={{
                        backgroundImage: `url(${productStyleDisplayImg})`,
                    }}
                >
                    <input onChange={imgChangeHandler} type="file" accept="image/png, image/jpeg" />
                </div>
                <div className="form-control">
                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" ref={brandRef} defaultValue={brand} />
                </div>

                <div className="form-group">
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" ref={nameRef} defaultValue={name} required />
                    </div>

                    <div className="form-control">
                        <label htmlFor="type">Type</label>
                        <input type="text" id="type" ref={typeRef} defaultValue={type} />
                    </div>

                    <div className="form-control">
                        <label htmlFor="color">Color</label>
                        <input type="text" id="color" ref={colorRef} defaultValue={color} />
                    </div>
                </div>

                <div className="form-group divide">
                    <div className="form-group__child-group">
                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                min={1}
                                id="price"
                                ref={priceRef}
                                defaultValue={price}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                min={1}
                                id="stock"
                                ref={stockRef}
                                defaultValue={stock}
                                required
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="form-group__child-group">
                        <div className="form-control">
                            <label htmlFor="volume-value">Volume value</label>
                            <input
                                type="number"
                                min={1}
                                id="volume-value"
                                defaultValue={volumeValue}
                                ref={volumeValueRef}
                            />
                        </div>

                        <div className="form-control">
                            <label htmlFor="volume">
                                Volume{" "}
                                <small style={{ textTransform: "none" }}>(L, ml, pc, can)</small>
                            </label>
                            <input type="text" id="volume" ref={volumeRef} defaultValue={volume} />
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button type="button" className="cancel-btn" onClick={onHide}>
                        Cancel
                    </button>
                    <button type="submit" style={{ textTransform: "capitalize" }}>
                        {actionType} Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProduct;
