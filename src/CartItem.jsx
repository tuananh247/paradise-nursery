import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Tính tổng tiền toàn bộ giỏ hàng
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const costNumber = parseFloat(item.cost.replace('$', ''));
      return total + (costNumber * item.quantity);
    }, 0);
  };

  // Tính tiền từng sản phẩm
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace('$', ''));
    return costNumber * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h2 style={{textAlign: 'center', fontSize: '2rem'}}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div>
        {cartItems.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0', padding: '15px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '5px' }} />
            <div className="cart-item-details" style={{flexGrow: 1, paddingLeft: '20px'}}>
              <div className="cart-item-name" style={{fontWeight: 'bold', fontSize: '1.2rem'}}>{item.name}</div>
              <div className="cart-item-cost" style={{margin: '5px 0'}}>{item.cost}</div>
              <div className="cart-item-quantity" style={{marginTop: '10px', display: 'flex', alignItems: 'center'}}>
                <button onClick={() => handleDecrement(item)} style={{padding: '5px 15px', cursor: 'pointer', fontSize: '1.2rem', borderRadius: '5px', border: '1px solid #ccc'}}>-</button>
                <span style={{ margin: '0 15px', fontWeight: 'bold', fontSize: '1.2rem' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{padding: '5px 15px', cursor: 'pointer', fontSize: '1.2rem', borderRadius: '5px', border: '1px solid #ccc'}}>+</button>
              </div>
              <div className="cart-item-total" style={{marginTop: '10px', fontWeight: 'bold'}}>
                Total: ${calculateTotalCost(item)}
              </div>
            </div>
            <button onClick={() => handleRemove(item)} style={{ color: 'white', backgroundColor: '#f44336', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }} className="cart-actions">
        <button onClick={onContinueShopping} className="continue-shopping-btn" style={{padding: '15px 30px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem'}}>
          Continue Shopping
        </button>
        <button onClick={() => alert('Functionality to be added for future reference')} className="checkout-btn" style={{padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem'}}>
          Checkout (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default CartItem;
