import React, { useState } from 'react';




const styleObj = {
    border: '1px solid black',
    width: '200px',
}

export const ProductListComponent = ({ ProductList, toggle }) => {

    const [userData, setUser] = useState(false)
    if (userData) {
        return (<div style={{ border: '1px solid black', display: 'flex', flexDirection: 'column' }} >
            <button onClick={() => setUser(false)} style={{ ...styleObj, background: 'lightgreen', borderRadius: "15px" }}> 'Back To User' </button>
            <span style={styleObj}>{userData.name.firstname}</span>
            <span style={styleObj}>{userData.name.lastname}</span>
            <span style={styleObj} >{userData.address.city}</span>
            <span style={styleObj}>{userData.phone}</span>
            <span style={styleObj}>{userData.email}</span>
        </div>)
    }

    const showProductList = ProductList.map((product) => {

        return (
            <div style={{ border: '1px solid black', width: '300px' }} >
                <div>
                    {product.category}
                </div>
                <img src={product.image} width='200px' height='200px' />
            </div>
        )
    })
    return <>
        <button style={{position: "absolute",    left: "10px"  , background: "lightgreen"}} onClick={() => toggle()}>{'<== back'}</button>
        <div className="ProductList" style={{ display: 'grid', gridRowGap: "20px" }}>{showProductList}</div>
    </>

}