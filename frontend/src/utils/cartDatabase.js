import * as SQLite from 'expo-sqlite';
import { getItem } from '../services/authService';

let db;

// Initialize the database and create tables
export const initCartDB = async () => {
  try {
    db = await SQLite.openDatabaseAsync('teknorig.db');
    
    // Create cart_items table if it doesn't exist
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        productId TEXT NOT NULL,
        productName TEXT NOT NULL,
        price REAL NOT NULL, 
        imageUrl TEXT,
        quantity INTEGER DEFAULT 1,
        timestamp INTEGER
      );
    `);
    
    return true;
  } catch (error) {
    console.error('Error initializing cart database:', error);
    return false;
  }
};

// Add item to cart
export const addToCart = async (product) => {
  try {
    if (!db) {
      await initCartDB();
    }
    
    // Get the userId (will work even if logged out since we no longer delete it)
    const userId = await getItem('userId') || 'guest';
    
    // Calculate the discounted price if applicable
    const hasDiscount = product.discount > 0;
    const priceToUse = hasDiscount ? product.price * (1 - product.discount / 100) : product.price;
    
    // Check if the product already exists in the cart
    const existingItem = await db.getFirstAsync(
      'SELECT * FROM cart_items WHERE userId = ? AND productId = ?',
      userId,
      product._id
    );
    
    if (existingItem) {
      // Product exists, update quantity and price (to get the latest discount)
      const newQuantity = existingItem.quantity + 1;
      await db.runAsync(
        'UPDATE cart_items SET quantity = ?, price = ? WHERE id = ?', 
        newQuantity, 
        priceToUse,
        existingItem.id
      );
    } else {
      // Product doesn't exist, insert new item with calculated price
      await db.runAsync(
        'INSERT INTO cart_items (userId, productId, productName, price, imageUrl, quantity, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
        userId,
        product._id,
        product.product_name,
        priceToUse, // Use the discounted price when applicable
        product.product_images[0]?.url || 'https://via.placeholder.com/150/222222/FFFFFF?text=No+Image',
        1,
        Date.now()
      );
    }
    
    return true;
  } catch (error) {
    console.error('Error in addToCart:', error);
    return false;
  }
};

// Get all cart items
export const getCartItems = async () => {
  try {
    if (!db) {
      await initCartDB();
    }
    
    const userId = await getItem('userId') || 'guest';
    
    const items = await db.getAllAsync(
      'SELECT * FROM cart_items WHERE userId = ? ORDER BY timestamp DESC',
      userId
    );
    
    return items;
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

// Get cart items by IDs
export const getCartItemsByIds = async (itemIds) => {
  try {
    if (!db) {
      await initCartDB();
    }
    
    if (!itemIds || itemIds.length === 0) {
      return [];
    }
    
    // Create placeholders for SQL query
    const placeholders = itemIds.map(() => '?').join(',');
    
    // Get cart items by IDs
    const items = await db.getAllAsync(
      `SELECT * FROM cart_items WHERE id IN (${placeholders})`,
      ...itemIds
    );
    
    return items;
  } catch (error) {
    console.error('Error getting cart items by IDs:', error);
    return [];
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (itemId, newQuantity) => {
  try {
    if (!db) {
      await initCartDB();
    }
    
    await db.runAsync(
      'UPDATE cart_items SET quantity = ? WHERE id = ?',
      newQuantity,
      itemId
    );
    
    return true;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return false;
  }
};

// Remove item from cart
export const removeCartItem = async (itemId) => {
  try {
    if (!db) {
      await initCartDB();
    }
    
    await db.runAsync(
      'DELETE FROM cart_items WHERE id = ?',
      itemId
    );
    
    return true;
  } catch (error) {
    console.error('Error removing cart item:', error);
    return false;
  }
};

// Remove multiple items from cart after placing an order
export const removeCartItems = async (itemIds) => {
  try {
    if (!db) {
      await initCartDB();
    }
    
    if (!itemIds || itemIds.length === 0) {
      return true; // Nothing to delete
    }
    
    // Create placeholders for SQL query
    const placeholders = itemIds.map(() => '?').join(',');
    
    // Delete all items by IDs
    await db.runAsync(
      `DELETE FROM cart_items WHERE id IN (${placeholders})`,
      ...itemIds
    );
    
    return true;
  } catch (error) {
    console.error('Error removing multiple cart items:', error);
    return false;
  }
};
