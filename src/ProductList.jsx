import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false); 
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1628170385459-7f9af6328c11", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1616049281702-86370bb2317b", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509680-1a1ab553e1b4", cost: "$20" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1604762512613-2d250811e2f7", cost: "$10" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1605389659020-6d43505c8d0d", cost: "$25" },
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", cost: "$18" }
      ]
    },
    {
      category: "Succulents",
      plants: [
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9fc5d8d428ce", cost: "$10" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09", cost: "$14" },
        { name: "Echeveria", image: "https://images.unsplash.com/photo-1551893665-f843f600794e", cost: "$8" },
        { name: "Zebra Plant", image: "https://images.unsplash.com/photo-1601004863336-db181e18501e", cost: "$12" },
        { name: "Burro's Tail", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e", cost: "$15" },
        { name: "String of Pearls", image: "https://images.unsplash.com/photo-1596225439589-fc2b5ea912eb", cost: "$16" }
      ]
    },
    {
      category: "Foliage Plants",
      plants: [
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d40", cost: "$18" },
        { name: "Bird's Nest Fern", image: "https://images.unsplash.com/photo-1598887142487-3c854dca39c0", cost: "$20" },
        { name: "Maidenhair Fern", image: "https://images.unsplash.com/photo-1600411333336-7c05b8287391", cost: "$22" },
        { name: "Fiddle Leaf Fig", image: "https://images.unsplash.com/photo-1597055900599-52d3eb0f95b3", cost: "$30" },
        { name: "Monstera", image: "https://images.unsplash.com/photo-1614594805320-e69df658cb02", cost: "$35" },
        { name: "Calathea", image: "https://images.unsplash.com/photo-1632207691060-61d0f5ee84df", cost: "$28" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isItemInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={{display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#333', color: 'white'}}>
        <h2 style={{margin: 0}}>Paradise Nursery</h2>
        <div className="nav-links">
          <span style={{cursor: 'pointer', margin: '0 15px'}} onClick={() => window.location.reload()}>Home</span>
          <span style={{cursor: 'pointer', margin: '0 15px'}} onClick={() => setShowCart(false)}>Plants</span>
          <span style={{cursor: 'pointer', margin: '0 15px', fontWeight: 'bold'}} onClick={() => setShowCart(true)}>
            🛒 Cart ({totalCartItems})
          </span>
        </div>
      </div>

      {!showCart ? (
        <div className="product-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h3 style={{textAlign: 'center', marginTop: '30px', fontSize: '2rem'}}>{categoryObj.category}</h3>
              <div className="product-grid" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px'}}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex} style={{border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '220px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }}/>
                    <h4 style={{margin: '15px 0 5px 0'}}>{plant.name}</h4>
                    <p style={{margin: '0 0 15px 0', fontSize: '1.2rem', fontWeight: 'bold'}}>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isItemInCart(plant.name)}
                      style={{padding: '10px 20px', backgroundColor: isItemInCart(plant.name) ? '#9e9e9e' : '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: isItemInCart(plant.name) ? 'not-allowed' : 'pointer', width: '100%'}}
                    >
                      {isItemInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
