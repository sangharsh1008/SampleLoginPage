import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.cartData.map((data, i) => {
            return (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>
                  {(Math.round(data.price * data.qty * 100) / 100).toFixed(2)}
                </td>
                <td>{data.qty}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      props.dispatch({ type: 'increase', payload: data.id });
                    }}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      props.dispatch({ type: 'decrease', payload: data.id });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
function stateToProps(state) {
  console.log(state);
  return {
    cartData:state.reducer.cartData,
  };
}

export default connect(stateToProps)(Cart);
// export default Cart;
