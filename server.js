const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
require('dotenv').config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const sessionMemory = {};

const pizzas = [
    {
      "id": 1,
      "name": "Chicken Fiesta",
      "description": "Spicy Chipotle Chicken Pizza with grilled chicken, onions, jalapeño, and Heinz Chipotle Sauce.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_1.png"
  },
  {
      "id": 2,
      "name": "Chicken & Mushroom Truffle",
      "description": "Chicken and mushroom pizza with creamy cheese and Heinz Truffle Sauce.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_2.png"
  },
  {
      "id": 3,
      "name": "Spinach Alfredo Chicken Pesto",
      "description": "Spinach Alfredo Sauce pizza with chicken, onions, and Heinz Pesto Sauce.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_3.png"
  },
  {
      "id": 4,
      "name": "Meal for Two Chicken Shawarma",
      "description": "Medium Chicken Shawarma, wedges, and 2 drink cans.",
      "category": "Combo",
      "price": "69.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_4.png"
  },
  {
      "id": 5,
      "name": "Shawarma Pizza",
      "description": "Chicken Shawarma Pizza with pickles, wedges, and garlic sauce.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_5.png"
  },
  {
      "id": 6,
      "name": "Shawarma Potato Wedges",
      "description": "Potato wedges with Shawarma spice and toum sauce.",
      "category": "Side",
      "price": "15.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_6.png"
  },
  {
      "id": 7,
      "name": "Combos",
      "description": "4 small pizzas, Mix Box, and 1.5L drink.",
      "category": "Combo",
      "price": "125.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_7.png"
  },
  {
      "id": 8,
      "name": "Pizza Tower (Small pizzas)",
      "description": "4 small pizzas of your choice.",
      "category": "Pizza",
      "price": "89.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_8.png"
  },
  {
      "id": 9,
      "name": "Deals",
      "description": "Small pizza, potato wedges, and drink can.",
      "category": "Combo",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_9.png"
  },
  {
      "id": 10,
      "name": "Papa's Family Meal",
      "description": "2 medium pizzas, 2 starters, and 1.5L drink.",
      "category": "Combo",
      "price": "119.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_10.png"
  },
  {
      "id": 11,
      "name": "Papa's Party Meal",
      "description": "3 medium pizzas, 2 starters, and 2.26L drink.",
      "category": "Combo",
      "price": "149.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_11.png"
  },
  {
      "id": 12,
      "name": "Papa's Meal for Two",
      "description": "Medium pizza, 2 starters, and 2 drink cans.",
      "category": "Combo",
      "price": "69.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_12.png"
  },
  {
      "id": 13,
      "name": "Trio Plus",
      "description": "3 medium pizzas and 1.5L drink bottle.",
      "category": "Combo",
      "price": "99.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_13.png"
  },
  {
      "id": 14,
      "name": "Duo Plus",
      "description": "2 medium pizzas and 1.5L drink.",
      "category": "Combo",
      "price": "79.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_14.png"
  },
  {
      "id": 15,
      "name": "Papadia Meal for Two",
      "description": "2 Papadias, wedges, and 2 drink cans.",
      "category": "Combo",
      "price": "60.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_15.png"
  },
  {
      "id": 16,
      "name": "Papadia Meal for One",
      "description": "One Papadia, potato wedges, and a soft drink.",
      "category": "Combo",
      "price": "37.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_16.png"
  },
  {
      "id": 17,
      "name": "Vegan Papadia Meal for Two",
      "description": "Two Vegan Papadias, wedges for two, and drinks.",
      "category": "Combo",
      "price": "60.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_17.png"
  },
  {
      "id": 18,
      "name": "Vegan Papadia Meal for One",
      "description": "One Vegan Papadia, wedges, and a soft drink.",
      "category": "Combo",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_18.png"
  },
  {
      "id": 19,
      "name": "Kid's Meals",
      "description": "Cheese pizza and fruit juice.",
      "category": "Kids",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_19.png"
  },
  {
      "id": 20,
      "name": "Mini Cheesesticks Kids Meal",
      "description": "8 mini cheese sticks and fruit juice.",
      "category": "Kids",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_20.png"
  },
  {
      "id": 21,
      "name": "Happy Face Kids Meal",
      "description": "6\" Happy Face pizza and a kid's drink.",
      "category": "Kids",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_21.png"
  },
  {
      "id": 22,
      "name": "Chicken Poppers Kids Meal",
      "description": "5 Chicken Poppers, wedges, and fruit juice.",
      "category": "Kids",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_22.png"
  },
  {
      "id": 23,
      "name": "Grilled Cheddar Cheese",
      "description": "Mozzarella, cheddar cheese, and crispy panko crumbs.",
      "category": "Pizza",
      "price": "31.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_23.png"
  },
  {
      "id": 24,
      "name": "Spicy Chicken Ranch",
      "description": "Chicken pizza with ranch sauce, jalapeños, and tomatoes.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_24.png"
  },
  {
      "id": 25,
      "name": "Margherita",
      "description": "Classic pizza with tomato sauce and mozzarella.",
      "category": "Pizza",
      "price": "27.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_25.png"
  },
  {
      "id": 26,
      "name": "Pepperoni",
      "description": "Loaded with pepperoni and extra mozzarella.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_26.png"
  },
  {
      "id": 27,
      "name": "Super Papa",
      "description": "Pizza with three meats, vegetables, and olives.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_27.png"
  },
  {
      "id": 28,
      "name": "Chicken BBQ",
      "description": "Chicken pizza with BBQ sauce and vegetables.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_28.png"
  },
  {
      "id": 29,
      "name": "Hawaiian",
      "description": "Pizza with turkey ham, pineapple, and mozzarella.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_29.png"
  },
  {
      "id": 30,
      "name": "All The Meats™",
      "description": "Pizza with pepperoni, turkey ham, and sausage.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_30.png"
  },
  {
      "id": 31,
      "name": "Chicken Super Papa's",
      "description": "Chicken pizza with sausage, veggies, and black olives.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_31.png"
  },
  {
      "id": 32,
      "name": "Garden Special",
      "description": "Veggie pizza with tomatoes, mushrooms, olives, and peppers.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_32.png"
  },
  {
      "id": 33,
      "name": "Green Garden Delight",
      "description": "Spinach Alfredo pizza with veggies and mozzarella.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_33.png"
  },
  {
      "id": 34,
      "name": "Garlic Parmesan Chicken",
      "description": "Chicken pizza with garlic parmesan swirl and jalapeños.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_34.png"
  },
  {
      "id": 35,
      "name": "Chicken Florentine",
      "description": "Spinach Alfredo pizza with chicken, tomatoes, and mushrooms.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_35.png"
  },
  {
      "id": 36,
      "name": "Little Italy",
      "description": "Italian pizza with pepperoni, beef sausage, and olives.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_36.png"
  },
  {
      "id": 37,
      "name": "Mexican Ole",
      "description": "Fiery pizza with chicken, jalapeños, and tomatoes.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_37.png"
  },
  {
      "id": 38,
      "name": "Hot & Spicy",
      "description": "Spicy pizza with beef, jalapeños, and veggies.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_38.png"
  },
  {
      "id": 39,
      "name": "Fresh Spinach & Tomato Alfredo",
      "description": "Spinach Alfredo pizza with tomatoes and seasoning.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_39.png"
  },
  {
      "id": 40,
      "name": "Paneer Makhani",
      "description": "Indian-inspired pizza with paneer and Makhani sauce.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_40.png"
  },
  {
      "id": 41,
      "name": "Double Cheddar Cheese Burger",
      "description": "Pizza with cheddar, beef, pickles, and burger sauce.",
      "category": "Pizza",
      "price": "31.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_41.png"
  },
  {
      "id": 42,
      "name": "Cheddar Chicken Club",
      "description": "Chicken pizza with cheddar, turkey ham, and ranch drizzle.",
      "category": "Pizza",
      "price": "31.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_42.png"
  },
  {
      "id": 43,
      "name": "Cheddar Makhani",
      "description": "Indian pizza with Makhani sauce and cheddar.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_43.png"
  },
  {
      "id": 44,
      "name": "Cheddar Cheese Feast",
      "description": "Cheese pizza with mozzarella and cheddar.",
      "category": "Pizza",
      "price": "31.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_44.png"
  },
  {
      "id": 45,
      "name": "Butter Chicken",
      "description": "Indian-inspired pizza with chicken and Makhani sauce.",
      "category": "Pizza",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_45.png"
  },
  {
      "id": 46,
      "name": "Cheddar Mexican Chicken",
      "description": "Chicken pizza with cheddar, jalapeños, and veggies.",
      "category": "Pizza",
      "price": "31.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_46.png"
  },
  {
      "id": 47,
      "name": "Plant Based Chicken Kofta",
      "description": "Vegan pizza with plant-based kofta, chili, and tomatoes.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_47.png"
  },
  {
      "id": 48,
      "name": "Plant Based Chicken BBQ",
      "description": "Vegan pizza with plant-based strips and BBQ drizzle.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_48.png"
  },
  {
      "id": 49,
      "name": "Plant Based Super Papa Chicken",
      "description": "Vegan pizza with plant-based chicken, olives, and veggies.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_49.png"
  },
  {
      "id": 50,
      "name": "Plant Based Chicken Mexican Ole",
      "description": "Vegan pizza with plant-based chicken, jalapeños, and tomatoes.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_50.png"
  },
  {
      "id": 51,
      "name": "Plant Based Cheese Green",
      "description": "Vegan pizza with spinach, mushrooms, and tomatoes.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_51.png"
  },
  {
      "id": 52,
      "name": "Plant Based Cheese Hot Pepper Passion",
      "description": "Vegan pizza with peppers, onions, and chili.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_52.png"
  },
  {
      "id": 53,
      "name": "Plant Based Cheese Margherita",
      "description": "Vegan Margherita pizza with vegan cheese.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_53.png"
  },
  {
      "id": 54,
      "name": "Plant Based Garden Special",
      "description": "Vegan pizza with tomatoes, mushrooms, and olives.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_54.png"
  },
  {
      "id": 55,
      "name": "Plant Based Spicy Garden Special",
      "description": "Vegan pizza with chilies, mushrooms, and olives.",
      "category": "Vegan Pizza",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_55.png"
  },
  {
      "id": 56,
      "name": "Create Your Own",
      "description": "Build your pizza with your favorite toppings.",
      "category": "Pizza",
      "price": "27.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_56.png"
  },
  {
      "id": 57,
      "name": "Starters Mix Box",
      "description": "Chicken wings, potato wedges, jalapeño poppers, and chocolate scrolls.",
      "category": "Starter",
      "price": "39.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_57.png"
  },
  {
      "id": 58,
      "name": "Cheddar Cheesesticks 14 pcs",
      "description": "Garlic dough with mozzarella and cheddar cheese.",
      "category": "Starter",
      "price": "24.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_58.png"
  },
  {
      "id": 59,
      "name": "Cheddar Rolls 4 pcs",
      "description": "Bite-sized rolls with cheddar and mozzarella.",
      "category": "Starter",
      "price": "16.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_59.png"
  },
  {
      "id": 60,
      "name": "Cheddar Rolls 8 pcs",
      "description": "Bite-sized rolls with cheddar and mozzarella.",
      "category": "Starter",
      "price": "24.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_60.png"
  },
  {
      "id": 61,
      "name": "Garlic Parmesan Breadsticks 6 pcs",
      "description": "Breadsticks with garlic sauce and parmesan.",
      "category": "Starter",
      "price": "12.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_61.png"
  },
  {
      "id": 62,
      "name": "Breadsticks 6 pcs",
      "description": "Golden brown oven-baked dough sticks.",
      "category": "Starter",
      "price": "10.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_62.png"
  },
  {
      "id": 63,
      "name": "Spicy Pepperoni Rolls 8 pcs",
      "description": "Pepperoni rolls with jalapeños and ranch sauce.",
      "category": "Starter",
      "price": "26.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_63.png"
  },
  {
      "id": 64,
      "name": "Chili Ranch Saucy Poppers 6 pcs",
      "description": "Chicken poppers tossed in chili ranch sauce.",
      "category": "Starter",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_64.png"
  },
  {
      "id": 65,
      "name": "Chili Ranch Saucy Poppers 12 pcs",
      "description": "Chicken poppers tossed in chili ranch sauce.",
      "category": "Starter",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_65.png"
  },
  {
      "id": 66,
      "name": "Potato Wedges",
      "description": "Golden, crispy oven-baked wedges.",
      "category": "Side",
      "price": "13.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_66.png"
  },
  {
      "id": 67,
      "name": "Pepperoni Rolls 4 pcs",
      "description": "Pepperoni rolls with ranch sauce and mozzarella.",
      "category": "Starter",
      "price": "16.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_67.png"
  },
  {
      "id": 68,
      "name": "Pepperoni Rolls 8 pcs",
      "description": "Pepperoni rolls with ranch sauce and mozzarella.",
      "category": "Starter",
      "price": "24.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_68.png"
  },
  {
      "id": 69,
      "name": "Jalapeño Poppers 4 pcs",
      "description": "Creamy, spicy stuffed dough poppers.",
      "category": "Starter",
      "price": "12.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_69.png"
  },
  {
      "id": 70,
      "name": "Jalapeño Poppers 8 pcs",
      "description": "Creamy, spicy stuffed dough poppers.",
      "category": "Starter",
      "price": "20.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_70.png"
  },
  {
      "id": 71,
      "name": "Spicy Pepperoni Rolls 4 pcs",
      "description": "Pepperoni rolls with jalapeños and ranch sauce.",
      "category": "Starter",
      "price": "18.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_71.png"
  },
  {
      "id": 72,
      "name": "Firecracker Wings 4 pcs",
      "description": "Wings with a fiery chili blend.",
      "category": "Starter",
      "price": "22.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_72.png"
  },
  {
      "id": 73,
      "name": "Firecracker Wings 8 pcs",
      "description": "Wings with a fiery chili blend.",
      "category": "Starter",
      "price": "38.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_73.png"
  },
  {
      "id": 74,
      "name": "Firecracker Wings 12 pcs",
      "description": "Wings with a fiery chili blend.",
      "category": "Starter",
      "price": "52.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_74.png"
  },
  {
      "id": 75,
      "name": "Special Garlic Saucy Poppers 6 pcs",
      "description": "Chicken poppers in special garlic sauce.",
      "category": "Starter",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_75.png"
  },
  {
      "id": 76,
      "name": "Special Garlic Saucy Poppers 12 pcs",
      "description": "Chicken poppers in special garlic sauce.",
      "category": "Starter",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_76.png"
  },
  {
      "id": 77,
      "name": "Chickenstrips 4 pcs",
      "description": "Breaded chicken strips, crispy and golden brown.",
      "category": "Starter",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_77.png"
  },
  {
      "id": 78,
      "name": "Chickenstrips 8 pcs",
      "description": "Breaded chicken strips, crispy and golden brown.",
      "category": "Starter",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_78.png"
  },
  {
      "id": 79,
      "name": "Chicken Wings 4 pcs",
      "description": "Oven-baked, Italian seasoned chicken wings.",
      "category": "Starter",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_79.png"
  },
  {
      "id": 80,
      "name": "Chicken Wings 8 pcs",
      "description": "Oven-baked, Italian seasoned chicken wings.",
      "category": "Starter",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_80.png"
  },
  {
      "id": 81,
      "name": "Chicken Wings 12 pcs",
      "description": "Oven-baked, Italian seasoned chicken wings.",
      "category": "Starter",
      "price": "49.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_81.png"
  },
  {
      "id": 82,
      "name": "Chicken Poppers 6 pcs",
      "description": "Lightly breaded, oven-baked chicken poppers.",
      "category": "Starter",
      "price": "12.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_82.png"
  },
  {
      "id": 83,
      "name": "Chicken Poppers 12 pcs",
      "description": "Lightly breaded, oven-baked chicken poppers.",
      "category": "Starter",
      "price": "22.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_83.png"
  },
  {
      "id": 84,
      "name": "Cheesesticks 8 pcs",
      "description": "Oven-baked dough with garlic and mozzarella.",
      "category": "Starter",
      "price": "15.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_84.png"
  },
  {
      "id": 85,
      "name": "Cheesesticks 14 pcs",
      "description": "Oven-baked dough with garlic and mozzarella.",
      "category": "Starter",
      "price": "20.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_85.png"
  },
  {
      "id": 86,
      "name": "Buffalo Saucy Poppers 6 pcs",
      "description": "Chicken poppers tossed in buffalo sauce.",
      "category": "Starter",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_86.png"
  },
  {
      "id": 87,
      "name": "Buffalo Saucy Poppers 12 pcs",
      "description": "Chicken poppers tossed in buffalo sauce.",
      "category": "Starter",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_87.png"
  },
  {
      "id": 88,
      "name": "BBQ Saucy Poppers 6 pcs",
      "description": "Chicken poppers tossed in BBQ sauce.",
      "category": "Starter",
      "price": "19.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_88.png"
  },
  {
      "id": 89,
      "name": "BBQ Saucy Poppers 12 pcs",
      "description": "Chicken poppers tossed in BBQ sauce.",
      "category": "Starter",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_89.png"
  },
  {
      "id": 90,
      "name": "Papas Vegan Cheese Loaded Wedges",
      "description": "Wedges topped with vegan cheese and a dipping sauce.",
      "category": "Vegan Side",
      "price": "20.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_90.png"
  },
  {
      "id": 91,
      "name": "Vegan Cheese Wedges",
      "description": "Wedges with pizza sauce, vegan cheese, and veggies.",
      "category": "Vegan Side",
      "price": "15.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_91.png"
  },
  {
      "id": 92,
      "name": "Vegan Cheesesticks",
      "description": "14 pieces of dough topped with vegan cheese.",
      "category": "Vegan Side",
      "price": "25.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_92.png"
  },
  {
      "id": 93,
      "name": "Plant Based Pops 12 pcs",
      "description": "Spicy plant-based chicken pops with BBQ sauce.",
      "category": "Vegan Starter",
      "price": "30.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_93.png"
  },
  {
      "id": 94,
      "name": "Plant Based Pops 15 pcs",
      "description": "Spicy plant-based chicken pops with BBQ sauce.",
      "category": "Vegan Starter",
      "price": "35.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_94.png"
  },
  {
      "id": 95,
      "name": "New Year Offers",
      "description": "Buy 1 Medium Pizza, Get 1 Free!",
      "category": "Offer",
      "price": "46.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_95.png"
  },
  {
      "id": 96,
      "name": "New Year Buy1Get1 Large",
      "description": "Buy 1 Large Pizza, Get 1 Free!",
      "category": "Offer",
      "price": "64.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_96.png"
  },
  {
      "id": 97,
      "name": "Veggie Papadia",
      "description": "Fresh dough with ranch, veggies, and mozzarella.",
      "category": "Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_97.png"
  },
  {
      "id": 98,
      "name": "Spicy Italian Papadia",
      "description": "Papadia with sausage, pepperoni, and jalapeños.",
      "category": "Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_98.png"
  },
  {
      "id": 99,
      "name": "BBQ Chicken Papadia",
      "description": "Papadia with chicken, veggies, and BBQ drizzle.",
      "category": "Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_99.png"
  },
  {
      "id": 100,
      "name": "Spicy Chicken Ranch Papadia",
      "description": "Papadia with ranch, chicken, and jalapeños.",
      "category": "Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_100.png"
  },
  {
      "id": 101,
      "name": "Cheddar Chicken Club Papadia",
      "description": "Papadia with cheddar, chicken, and ranch drizzle.",
      "category": "Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_101.png"
  },
  {
      "id": 102,
      "name": "Cheddar Cheeseburger Papadia",
      "description": "Papadia with cheddar, beef, and pickles.",
      "category": "Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_102.png"
  },
  {
      "id": 103,
      "name": "Vegan Chicken Barbeque Papadia",
      "description": "Vegan papadia with BBQ chicken strips.",
      "category": "Vegan Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_103.png"
  },
  {
      "id": 104,
      "name": "Vegan Garden Party Papadia",
      "description": "Vegan papadia with mushrooms, olives, and peppers.",
      "category": "Vegan Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_104.png"
  },
  {
      "id": 105,
      "name": "Cheddar Mexican Chicken Papadia",
      "description": "Papadia with cheddar, chicken, and jalapeños.",
      "category": "Papadia",
      "price": "29.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_105.png"
  },
  {
      "id": 106,
      "name": "Veggie Pasta",
      "description": "Vegetable pasta in creamy Alfredo sauce.",
      "category": "Pasta",
      "price": "22.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_106.png"
  },
  {
      "id": 107,
      "name": "Chicken Florentine Pasta",
      "description": "Pasta with chicken, veggies, and Alfredo sauce.",
      "category": "Pasta",
      "price": "25.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_107.png"
  },
  {
      "id": 108,
      "name": "Chicken Tender Salad",
      "description": "Breaded chicken with greens, tomato, and cucumber.",
      "category": "Salad",
      "price": "25.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_108.png"
  },
  {
      "id": 109,
      "name": "Chocolate Scrolls 4 pcs",
      "description": "Fresh dough with chocolate spread and drizzle.",
      "category": "Dessert",
      "price": "9.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_109.png"
  },
  {
      "id": 110,
      "name": "Apple Pie Scrolls 4 pcs",
      "description": "Dough with apple filling and vanilla icing.",
      "category": "Dessert",
      "price": "9.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_110.png"
  },
  {
      "id": 111,
      "name": "Chocolate Scrolls 8 pcs",
      "description": "Fresh dough with chocolate spread and drizzle.",
      "category": "Dessert",
      "price": "15.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_111.png"
  },
  {
      "id": 112,
      "name": "Apple Pie Scrolls 8 pcs",
      "description": "Dough with apple filling and vanilla icing.",
      "category": "Dessert",
      "price": "15.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_112.png"
  },
  {
      "id": 113,
      "name": "Sprite [300ml]",
      "description": "Refreshing sparkling lemon-lime drink.",
      "category": "Beverage",
      "price": "6.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_113.png"
  },
  {
      "id": 114,
      "name": "Fanta Orange [300ml]",
      "description": "Bright and bubbly orange soda.",
      "category": "Beverage",
      "price": "6.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_114.png"
  },
  {
      "id": 115,
      "name": "Coca-Cola Zero [300ml]",
      "description": "Sugar-free classic Coke taste.",
      "category": "Beverage",
      "price": "6.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_115.png"
  },
  {
      "id": 116,
      "name": "Sprite Zero [300ml]",
      "description": "Zero sugar sparkling lemon-lime soda.",
      "category": "Beverage",
      "price": "6.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_116.png"
  },
  {
      "id": 117,
      "name": "Arwa Water 500ml",
      "description": "Refreshing, low-sodium bottled water.",
      "category": "Beverage",
      "price": "5.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_117.png"
  },
  {
      "id": 118,
      "name": "Coca-Cola [1.5L]",
      "description": "Classic Coke in a larger bottle.",
      "category": "Beverage",
      "price": "12.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_118.png"
  },
  {
      "id": 119,
      "name": "Sprite [1.5L]",
      "description": "Refreshing sparkling lemon-lime drink.",
      "category": "Beverage",
      "price": "12.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_119.png"
  },
  {
      "id": 120,
      "name": "Fanta Orange [1.5L]",
      "description": "Bright and bubbly orange soda.",
      "category": "Beverage",
      "price": "12.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_120.png"
  },
  {
      "id": 121,
      "name": "Coca-Cola [2.26L]",
      "description": "Classic Coke in a family-size bottle.",
      "category": "Beverage",
      "price": "14.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_121.png"
  },
  {
      "id": 122,
      "name": "Sprite [2.26L]",
      "description": "Refreshing sparkling lemon-lime drink.",
      "category": "Beverage",
      "price": "14.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_122.png"
  },
  {
      "id": 123,
      "name": "Fanta Orange [2.26L]",
      "description": "Bright and bubbly orange soda.",
      "category": "Beverage",
      "price": "14.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_123.png"
  },
  {
      "id": 124,
      "name": "Coca-Cola [300ml]",
      "description": "Classic Coke in a handy can.",
      "category": "Beverage",
      "price": "6.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_124.png"
  },
  {
      "id": 125,
      "name": "Pepperoncini 2 pcs",
      "description": "Sweet green pickled chili peppers.",
      "category": "Extras",
      "price": "1.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_125.png"
  },
  {
      "id": 126,
      "name": "Special Garlic Dipping Sauce",
      "description": "Buttery garlic dipping sauce.",
      "category": "Extras",
      "price": "3.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_126.png"
  },
  {
      "id": 127,
      "name": "Pizza Dipping Sauce",
      "description": "Rich tomato-based pizza sauce.",
      "category": "Extras",
      "price": "3.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_127.png"
  },
  {
      "id": 128,
      "name": "Buffalo Dipping Sauce",
      "description": "Tangy, rich, and spicy sauce.",
      "category": "Extras",
      "price": "3.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_128.png"
  },
  {
      "id": 129,
      "name": "BBQ Dipping Sauce",
      "description": "Smoky and sweet BBQ sauce.",
      "category": "Extras",
      "price": "3.00 AED",
      "restaurant": "Papa Jones",
      "image": "/papa_jones_images/image_129.png"
  },
  {
      "id": 130,
      "name": "Ranch Dipping Sauce",
      "description": "Creamy ranch with a herb kick.",
      "category": "Extras",
      "price": "3.00 AED",
      "restaurant": "Papa Jones",
      "image": null
  },
  {
      "id": 131,
      "name": "Thousand Island Dressing",
      "description": "Tangy mayo and tomato dressing.",
      "category": "Extras",
      "price": "3.00 AED",
      "restaurant": "Papa Jones",
      "image": null
  },
  {
      "id": 132,
      "name": "Special Seasoning Packet",
      "description": "Spicy seasoning with garlic and paprika.",
      "category": "Extras",
      "price": "1.00 AED",
      "restaurant": "Papa Jones",
      "image": null
  },
  {
      "id": 133,
      "name": "Crushed Red Pepper Packet",
      "description": "Dried, spicy red chili flakes.",
      "category": "Extras",
      "price": "1.00 AED",
      "restaurant": "Papa Jones",
      "image": null
  },
  {
      "id": 134,
      "name": "Heinz Tomato Ketchup Sachet",
      "description": "Handy ketchup sachet.",
      "category": "Extras",
      "price": "1.00 AED",
      "restaurant": "Papa Jones",
      "image": null
  },
  {
      "id": 135,
      "name": "Choco Overload Collection",
      "description": "Box of 6 donuts with choco overload.",
      "category": "Dessert",
      "price": "41.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_1.png"
  },
  {
      "id": 136,
      "name": "Choco Brownie Overload",
      "description": "Donut with brownie chunks and chocolate drizzle.",
      "category": "Dessert",
      "price": "8.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_2.png"
  },
  {
      "id": 137,
      "name": "Double Choco Overload",
      "description": "Donut with chocolate glaze and sprinkles.",
      "category": "Dessert",
      "price": "8.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_3.png"
  },
  {
      "id": 138,
      "name": "The Viral Pistachio Kunafa Donut",
      "description": "Box of 6 donuts with pistachio kunafa.",
      "category": "Dessert",
      "price": "47.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_4.png"
  },
  {
      "id": 139,
      "name": "The Viral Pistachio Kunafa Donut",
      "description": "Donut with pistachio kunafa and crushed pistachios.",
      "category": "Dessert",
      "price": "9.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_5.png"
  },
  {
      "id": 140,
      "name": "Nutella Collection",
      "description": "Box of 6 Nutella donuts in assorted flavors.",
      "category": "Dessert",
      "price": "45.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_6.png"
  },
  {
      "id": 141,
      "name": "Nutella Munchkins - 10 pieces",
      "description": "Bite-sized delights filled with creamy Nutella.",
      "category": "Dessert",
      "price": "15.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_7.png"
  },
  {
      "id": 142,
      "name": "Nutella Wonder Star",
      "description": "Star-shaped donut filled with Nutella and brownie chunks.",
      "category": "Dessert",
      "price": "9.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_8.png"
  },
  {
      "id": 143,
      "name": "Choco Surprise",
      "description": "Nutella frosted donut topped with a chocolate munchkin.",
      "category": "Dessert",
      "price": "9.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_9.png"
  },
  {
      "id": 144,
      "name": "Dream Cake",
      "description": " cake donut with Nutella frosting and hazelnuts.",
      "category": "Dessert",
      "price": "9.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_10.png"
  },
  {
      "id": 145,
      "name": "Nutella Frappe",
      "description": "Rich Nutella frappe topped with whipped cream.",
      "category": "Beverage",
      "price": "22.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_11.png"
  },
  {
      "id": 146,
      "name": "Nutella Croissant",
      "description": "Golden croissant filled with creamy Nutella.",
      "category": "Dessert",
      "price": "15.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_12.png"
  },
  {
      "id": 147,
      "name": "Nutella Hot Chocolate",
      "description": "Velvety hot chocolate infused with Nutella.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_13.png"
  },
  {
      "id": 148,
      "name": "Bubble Tea",
      "description": "Brown sugar milk tea with boba.",
      "category": "Beverage",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_14.png"
  },
  {
      "id": 149,
      "name": "Hami Melon Bubble Tea",
      "description": "Milk tea with Hami melon and boba.",
      "category": "Beverage",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_15.png"
  },
  {
      "id": 150,
      "name": "Taro Bubble Tea",
      "description": "Milk tea with taro flavor and boba.",
      "category": "Beverage",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_16.png"
  },
  {
      "id": 151,
      "name": "Matcha Bubble Tea",
      "description": "Milk tea with matcha and boba.",
      "category": "Beverage",
      "price": "24.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_17.png"
  },
  {
      "id": 152,
      "name": "Iced Americano",
      "description": "Dairy and sugar-free iced coffee.",
      "category": "Beverage",
      "price": "16.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_18.png"
  },
  {
      "id": 153,
      "name": "Iced Tea",
      "description": "Refreshing iced tea.",
      "category": "Beverage",
      "price": "18.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_19.png"
  },
  {
      "id": 154,
      "name": "Shaken Iced Espresso",
      "description": "Smooth iced espresso shaken for flavor.",
      "category": "Beverage",
      "price": "18.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_20.png"
  },
  {
      "id": 155,
      "name": "Iced Latte",
      "description": "Dairy and sugar-free iced latte.",
      "category": "Beverage",
      "price": "18.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_21.png"
  },
  {
      "id": 156,
      "name": "Iced Coffee (Drip Coffee)",
      "description": "Dairy and sugar-free drip coffee.",
      "category": "Beverage",
      "price": "18.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_22.png"
  },
  {
      "id": 157,
      "name": "Iced Spanish Latte",
      "description": "Creamy iced Spanish latte.",
      "category": "Beverage",
      "price": "22.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_23.png"
  },
  {
      "id": 158,
      "name": "Iced Chocolate",
      "description": "Refreshing iced chocolate drink.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_24.png"
  },
  {
      "id": 159,
      "name": "Iced Caramel Macchiato",
      "description": "Iced coffee with caramel flavor.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_25.png"
  },
  {
      "id": 160,
      "name": "Iced Mocha",
      "description": "Iced coffee with a hint of mocha.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_26.png"
  },
  {
      "id": 161,
      "name": "Iced French Vanilla Latte",
      "description": "Iced latte with French vanilla flavor.",
      "category": "Beverage",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_27.png"
  },
  {
      "id": 162,
      "name": "Iced Matcha Green Tea",
      "description": "Iced tea with matcha flavor.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_28.png"
  },
  {
      "id": 163,
      "name": "Strawberry & Cream Frappe",
      "description": "Strawberry frappe served without whipped cream.",
      "category": "Beverage",
      "price": "22.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_29.png"
  },
  {
      "id": 164,
      "name": "Cookies & Cream Frappe - Made with Oreo",
      "description": "Oreo frappe served without whipped cream.",
      "category": "Beverage",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_30.png"
  },
  {
      "id": 165,
      "name": "Strawberry Cheesecake Crush Frappe",
      "description": "Creamy strawberry cheesecake frappe.",
      "category": "Beverage",
      "price": "22.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_31.png"
  },
  {
      "id": 166,
      "name": "Double Chocolate Frappe",
      "description": "Rich chocolate frappe without whipped cream.",
      "category": "Beverage",
      "price": "22.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_32.png"
  },
  {
      "id": 167,
      "name": "Banana Blueberry Frappe",
      "description": "Fruity frappe with banana and blueberry.",
      "category": "Beverage",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_33.png"
  },
  {
      "id": 168,
      "name": "Boston Kreme Frappe",
      "description": "Boston kreme frappe blended with milk and ice.",
      "category": "Beverage",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_34.png"
  },
  {
      "id": 169,
      "name": "Caramel Frappe",
      "description": "Caramel frappe served without whipped cream.",
      "category": "Beverage",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_35.png"
  },
  {
      "id": 170,
      "name": "Madagascar Vanilla Frappe",
      "description": "Vanilla frappe served without whipped cream.",
      "category": "Beverage",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_36.png"
  },
  {
      "id": 171,
      "name": "Lotus Cheesecake Dream Frappe",
      "description": "Blended Lotus Biscoff with cheesecake and milk.",
      "category": "Beverage",
      "price": "22.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_37.png"
  },
  {
      "id": 172,
      "name": "Dulce De Leche Frappe",
      "description": "Rich and creamy indulgent Dulce De Leche frappe.",
      "category": "Beverage",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_38.png"
  },
  {
      "id": 173,
      "name": "Matcha Frappe",
      "description": "Matcha frappe served without whipped cream.",
      "category": "Beverage",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_39.png"
  },
  {
      "id": 174,
      "name": "Mango Cheesecake Bliss Frappe",
      "description": "Mango cheesecake frappe for fruity delight.",
      "category": "Beverage",
      "price": "22.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_40.png"
  },
  {
      "id": 175,
      "name": "Chicken Tikka Lunch Combo",
      "description": "Sandwich, refresher, and fresh donut combo.",
      "category": "Meal Deal",
      "price": "52.73 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_41.png"
  },
  {
      "id": 176,
      "name": "Spicy Cheese Lunch Combo",
      "description": "Sandwich, refresher, and fresh donut combo.",
      "category": "Meal Deal",
      "price": "52.73 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_42.png"
  },
  {
      "id": 177,
      "name": "Turkey & Cheese Lunch Combo",
      "description": "Sandwich, refresher, and fresh donut combo.",
      "category": "Meal Deal",
      "price": "52.73 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_43.png"
  },
  {
      "id": 178,
      "name": "Chicken Tikka Sourdough Meal",
      "description": "Chicken Tikka sandwich with coffee.",
      "category": "Meal Deal",
      "price": "28.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_44.png"
  },
  {
      "id": 179,
      "name": "Spicy Cheese Sandwich Meal",
      "description": "Paneer Tikka sandwich with coffee.",
      "category": "Meal Deal",
      "price": "28.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_45.png"
  },
  {
      "id": 180,
      "name": "Turkey & Cheese Sourdough Meal",
      "description": "Turkey & cheese sandwich with coffee.",
      "category": "Meal Deal",
      "price": "28.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_46.png"
  },
  {
      "id": 181,
      "name": "Build Your Own Double Egg Sandwich Combo",
      "description": "Egg sandwich and coffee combo.",
      "category": "Meal Deal",
      "price": "25.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_47.png"
  },
  {
      "id": 182,
      "name": "Egg Sandwich Combo",
      "description": "Egg sandwich and any coffee.",
      "category": "Meal Deal",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_48.png"
  },
  {
      "id": 183,
      "name": "Cream Cheese Bagel Combo",
      "description": "Bagel with cream cheese and coffee.",
      "category": "Meal Deal",
      "price": "19.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_49.png"
  },
  {
      "id": 184,
      "name": "Plain Croissant Combo",
      "description": "Plain croissant with any coffee.",
      "category": "Meal Deal",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_50.png"
  },
  {
      "id": 185,
      "name": "Cheese Croissant Combo",
      "description": "Cheese croissant with any coffee.",
      "category": "Meal Deal",
      "price": "21.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_51.png"
  },
  {
      "id": 186,
      "name": "Turkey and Cheese Croissant Combo",
      "description": "Turkey & cheese croissant with coffee.",
      "category": "Meal Deal",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_52.png"
  },
  {
      "id": 187,
      "name": "Happy Birthday Dozen Box",
      "description": "Celebrate with 12 freshly-made donuts.",
      "category": "Gifting Box",
      "price": "58.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_53.png"
  },
  {
      "id": 188,
      "name": "Thank You Dozen Box",
      "description": "Say thanks with 12 handcrafted donuts.",
      "category": "Gifting Box",
      "price": "58.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_54.png"
  },
  {
      "id": 189,
      "name": "Congrats Dozen Box",
      "description": "Celebrate with 12 freshly-handcrafted donuts.",
      "category": "Gifting Box",
      "price": "58.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_55.png"
  },
  {
      "id": 190,
      "name": "2 Dozen Donuts",
      "description": "Enjoy 24 fresh, hand-made donuts.",
      "category": "Special Offers",
      "price": "99.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_56.png"
  },
  {
      "id": 191,
      "name": "Dozen Donuts Buy 8 get 4 Free",
      "description": "12 freshly handcrafted donuts.",
      "category": "Special Offers",
      "price": "56.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_57.png"
  },
  {
      "id": 192,
      "name": "Half Dozen Donuts (Buy 5 get 1 Free)",
      "description": "6 freshly hand-made donuts.",
      "category": "Special Offers",
      "price": "35.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_58.png"
  },
  {
      "id": 193,
      "name": "Assorted Box Of 12 Buy 8 Get 4 Free",
      "description": "12 assorted fresh donuts.",
      "category": "Special Offers",
      "price": "56.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_59.png"
  },
  {
      "id": 194,
      "name": "Assorted Box of 6 (Buy 5 get 1 Free)",
      "description": "6 assorted fresh donuts.",
      "category": "Special Offers",
      "price": "35.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_60.png"
  },
  {
      "id": 195,
      "name": "Box Of 3 Donuts",
      "description": "Enjoy 3 freshly-made donuts.",
      "category": "Special Offers",
      "price": "19.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_61.png"
  },
  {
      "id": 196,
      "name": "Munchkins Bundle 20 pcs",
      "description": "20 munchkins with a medium coffee box.",
      "category": "Catering Bundles",
      "price": "52.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_62.png"
  },
  {
      "id": 197,
      "name": "Family Deal",
      "description": "Perfect meal for the family.",
      "category": "Catering Bundles",
      "price": "59.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_63.png"
  },
  {
      "id": 198,
      "name": "Super Family Deal",
      "description": "12 donuts + 4 coffee servings.",
      "category": "Catering Bundles",
      "price": "71.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_64.png"
  },
  {
      "id": 199,
      "name": "Dunkin' Medium Coffee Box Serves 4",
      "description": "Coffee box for 4 servings.",
      "category": "Catering Bundles",
      "price": "32.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_65.png"
  },
  {
      "id": 200,
      "name": "Dunkin' Large Coffee Box Serves 10",
      "description": "Coffee box for 10 servings.",
      "category": "Catering Bundles",
      "price": "99.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_66.png"
  },
  {
      "id": 201,
      "name": "WOW Deals",
      "description": "Medium coffee with 2 donuts.",
      "category": "Combo",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_67.png"
  },
  {
      "id": 202,
      "name": "Freshly Made Munchkins",
      "description": "10 assorted munchkins in pre-selected flavors.",
      "category": "Snack",
      "price": "12.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_68.png"
  },
  {
      "id": 203,
      "name": "Freshly Made Munchkins 20pcs",
      "description": "20 assorted munchkins with various flavors.",
      "category": "Snack",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_69.png"
  },
  {
      "id": 204,
      "name": "Espresso Double",
      "description": "Rich double espresso shot.",
      "category": "Beverage",
      "price": "13.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_70.png"
  },
  {
      "id": 205,
      "name": "Americano",
      "description": "Smooth, rich Americano coffee.",
      "category": "Beverage",
      "price": "16.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_71.png"
  },
  {
      "id": 206,
      "name": "Tea",
      "description": "Classic tea blend.",
      "category": "Beverage",
      "price": "16.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_72.png"
  },
  {
      "id": 207,
      "name": "Cappuccino",
      "description": "Creamy cappuccino with frothy milk.",
      "category": "Beverage",
      "price": "18.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_73.png"
  },
  {
      "id": 208,
      "name": "Latte",
      "description": "Smooth latte with steamed milk.",
      "category": "Beverage",
      "price": "18.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_74.png"
  },
  {
      "id": 209,
      "name": "Spanish Latte",
      "description": "Rich latte with Spanish flavors.",
      "category": "Beverage",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_75.png"
  },
  {
      "id": 210,
      "name": "Matcha Green Tea Latte",
      "description": "Green tea latte with matcha flavors.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_76.png"
  },
  {
      "id": 211,
      "name": "Hot Chocolate",
      "description": "Rich, creamy hot chocolate.",
      "category": "Beverage",
      "price": "23.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_77.png"
  },
  {
      "id": 212,
      "name": "Dulce De Leche Latte",
      "description": "Sweet latte with Dulce De Leche flavors.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_78.png"
  },
  {
      "id": 213,
      "name": "Dunkin Original Coffee",
      "description": "Classic Dunkin coffee blend.",
      "category": "Beverage",
      "price": "11.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_79.png"
  },
  {
      "id": 214,
      "name": "Caramel Macchiato",
      "description": "Sweet caramel coffee blend.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_80.png"
  },
  {
      "id": 215,
      "name": "French Vanilla Latte",
      "description": "Classic latte with French vanilla.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_81.png"
  },
  {
      "id": 216,
      "name": "Mocha",
      "description": "Rich mocha coffee blend.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_82.png"
  },
  {
      "id": 217,
      "name": "Peach Refresher",
      "description": "Fruity and refreshing peach drink.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_83.png"
  },
  {
      "id": 218,
      "name": "Strawberry Refresher",
      "description": "Fruity and refreshing strawberry drink.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_84.png"
  },
  {
      "id": 219,
      "name": "Blue Lagoon Refresher",
      "description": "Refreshing blue lagoon drink.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_85.png"
  },
  {
      "id": 220,
      "name": "Watermelon Refresher",
      "description": "Fruity watermelon drink.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_86.png"
  },
  {
      "id": 221,
      "name": "Mango Refresher",
      "description": "Tropical mango drink.",
      "category": "Beverage",
      "price": "20.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_87.png"
  },
  {
      "id": 222,
      "name": "Sugared Donut",
      "description": "Classic sugared donut.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_88.png"
  },
  {
      "id": 223,
      "name": "Glazed Donut",
      "description": "Soft glazed donut.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_89.png"
  },
  {
      "id": 224,
      "name": "Choco Frosted Donut",
      "description": "Chocolate frosted donut.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_90.png"
  },
  {
      "id": 225,
      "name": "Strawberry Frosted Donut",
      "description": "Strawberry frosted donut.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_91.png"
  },
  {
      "id": 226,
      "name": "Bavarian Donut",
      "description": "Cream-filled Bavarian donut.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_92.png"
  },
  {
      "id": 227,
      "name": "Chocolate Sprinkles Donut",
      "description": "Donut with chocolate sprinkles.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_93.png"
  },
  {
      "id": 228,
      "name": "Cinnamon Roll",
      "description": "Classic cinnamon roll.",
      "category": "Pastry",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_94.png"
  },
  {
      "id": 229,
      "name": "Blue Marble Donut",
      "description": "Blue marble-styled donut.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_95.png"
  },
  {
      "id": 230,
      "name": "Boston Kreme Donut",
      "description": "Boston Kreme-filled donut.",
      "category": "Donut",
      "price": "7.00 AED",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_96.png"
  },
  {
      "id": 231,
      "name": "Chocolate Eclair",
      "description": "",
      "category": null,
      "price": "AED 8",
      "restaurant": "Dunkin Dubai",
      "image": "/dunkin_dubai_images/image_97.png"
  },
  {
      "id": 232,
      "name": "Vanilla All",
      "description": "",
      "category": "Pastry",
      "price": "AED 7",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_98.png"
  },
  {
      "id": 233,
      "name": "Choco Wacko Donut",
      "description": "Choco Wacko Donut",
      "category": "Donut",
      "price": "AED 7",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_99.png"
  },
  {
      "id": 234,
      "name": "Cookies & Cream Made with Oreo",
      "description": "",
      "category": "Donut",
      "price": "AED 8",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_100.png"
  },
  {
      "id": 235,
      "name": "Choco Butternut Donut",
      "description": "",
      "category": "Donut",
      "price": "AED 8",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_101.png"
  },
  {
      "id": 236,
      "name": "Chicken Tikka Sourdough",
      "description": "Enjoy the bold flavors of our freshly made Chicken Tikka Sourdough Sandwich with juicy chicken tikka, creamy mayonnaise, zesty sriracha, and melted cheese.",
      "category": "Sandwich",
      "price": "AED 23",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_102.png"
  },
  {
      "id": 237,
      "name": "Spicy Cheese Sandwich",
      "description": "Paneer Tikka Sourdough Sandwich with creamy mayonnaise, spicy sriracha, and gooey cheese.",
      "category": "Sandwich",
      "price": "AED 23",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_103.png"
  },
  {
      "id": 238,
      "name": "Egg Sandwich",
      "description": "Egg sandwich with your choice of sauce and optional cheese.",
      "category": "Sandwich",
      "price": "AED 14",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_104.png"
  },
  {
      "id": 239,
      "name": "Double Egg Bagel",
      "description": "",
      "category": "Bagel",
      "price": "AED 18",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_105.png"
  },
  {
      "id": 240,
      "name": "Cream Cheese Bagel",
      "description": "Bagel with cream cheese filling.",
      "category": "Bagel",
      "price": "AED 14",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_106.png"
  },
  {
      "id": 241,
      "name": "Cheese Croissant",
      "description": "Cheese in a flaky buttery croissant.",
      "category": "Pastry",
      "price": "AED 16",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_107.png"
  },
  {
      "id": 242,
      "name": "Double Egg Croissant",
      "description": "",
      "category": "Pastry",
      "price": "AED 18",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_108.png"
  },
  {
      "id": 243,
      "name": "Turkey & Cheese Sourdough",
      "description": "",
      "category": "Sandwich",
      "price": "AED 21",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_109.png"
  },
  {
      "id": 244,
      "name": "Double Egg Potato Bun Sandwich",
      "description": "Choice of double egg sandwich with your choice of sauce and optional cheese.",
      "category": "Sandwich",
      "price": "AED 18",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_110.png"
  },
  {
      "id": 245,
      "name": "Egg Croissant",
      "description": "",
      "category": "Pastry",
      "price": "AED 14",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_111.png"
  },
  {
      "id": 246,
      "name": "Turkey and Cheese Croissant",
      "description": "Turkey and cheese in a flaky buttery croissant.",
      "category": "Pastry",
      "price": "AED 18",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_112.png"
  },
  {
      "id": 247,
      "name": "Plain Croissant",
      "description": "Made with layers of flaky and buttery pastry dough.",
      "category": "Pastry",
      "price": "AED 11",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_113.png"
  },
  {
      "id": 248,
      "name": "Sandwiches",
      "description": "Chicken Caesar Wrap",
      "category": "Sandwich",
      "price": "AED 24",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_114.png"
  },
  {
      "id": 249,
      "name": "Halloumi & Avocado Muffin",
      "description": "",
      "category": "Muffin",
      "price": "AED 24",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_115.png"
  },
  {
      "id": 250,
      "name": "Cheese Toastie",
      "description": "",
      "category": "Toast",
      "price": "AED 24",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_116.png"
  },
  {
      "id": 251,
      "name": "Grilled Chicken Pesto",
      "description": "",
      "category": "Sandwich",
      "price": "AED 24",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_117.png"
  },
  {
      "id": 252,
      "name": "Roasted Beef",
      "description": "",
      "category": "Sandwich",
      "price": "AED 24",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_118.png"
  },
  {
      "id": 253,
      "name": "Tuna Melt",
      "description": "",
      "category": "Sandwich",
      "price": "AED 24",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_119.png"
  },
  {
      "id": 254,
      "name": "Bakery",
      "description": "Walnut Brownies made with walnuts, dense, fudgy, and with a chewy texture. The walnuts add a nutty flavor and crunch.",
      "category": "Bakery",
      "price": "AED 10",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_120.png"
  },
  {
      "id": 255,
      "name": "Chocolate Muffins with Filling",
      "description": "Mixed with chocolate chips and filled with chocolate sauce.",
      "category": "Muffin",
      "price": "AED 13",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_121.png"
  },
  {
      "id": 256,
      "name": "Blueberry Muffins with Filling",
      "description": "",
      "category": "Muffin",
      "price": "AED 13",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_122.png"
  },
  {
      "id": 257,
      "name": "Brew At Home",
      "description": "Dunkin Espresso Capsules - Signature Blend (10 Capsules). Smooth and flavorful medium-dark roast espresso.",
      "category": "Beverages",
      "price": "AED 21.50",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_123.png"
  },
  {
      "id": 258,
      "name": "Dunkin Espresso Capsules - Light Roast (10 Capsules)",
      "description": "Bright and balanced taste. Recommended anytime of the day.",
      "category": "Beverages",
      "price": "AED 21.50",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_124.png"
  },
  {
      "id": 259,
      "name": "Dunkin Espresso Capsules - Bold Roast (10 Capsules)",
      "description": "A deliciously smooth dark-roasted espresso with a robust finish.",
      "category": "Beverages",
      "price": "AED 21.50",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_125.png"
  },
  {
      "id": 260,
      "name": "Hazelnut (Ground)",
      "description": "100% Arabica Coffee.",
      "category": "Beverages",
      "price": "AED 51",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_126.png"
  },
  {
      "id": 261,
      "name": "Original Blend (Whole Bean)",
      "description": "100% Arabica Coffee.",
      "category": "Beverages",
      "price": "AED 51",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_127.png"
  },
  {
      "id": 262,
      "name": "Dark Roast Ground",
      "description": "100% Arabica Coffee.",
      "category": "Beverages",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_128.png"
  },
  {
      "id": 263,
      "name": "Original Blend (Ground)",
      "description": "100% Arabica Coffee.",
      "category": "Beverages",
      "price": "AED 51",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_129.png"
  },
  {
      "id": 264,
      "name": "Other Beverages",
      "description": "Water.",
      "category": "Beverages",
      "price": "AED 6",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_130.png"
  },
  {
      "id": 265,
      "name": "BLU - Sparkling Water",
      "description": "",
      "category": "Beverages",
      "price": "AED 8",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_131.png"
  },
  {
      "id": 266,
      "name": "Fresh Orange Juice",
      "description": "",
      "category": "Beverages",
      "price": "AED 13",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_132.png"
  },
  {
      "id": 267,
      "name": "Coke",
      "description": "",
      "category": "Beverages",
      "price": "AED 7",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_133.png"
  },
  {
      "id": 268,
      "name": "Sprite",
      "description": "",
      "category": "Beverages",
      "price": "AED 7",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_134.png"
  },
  {
      "id": 269,
      "name": "Fanta",
      "description": "",
      "category": "Beverages",
      "price": "AED 7",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_135.png"
  },
  {
      "id": 270,
      "name": "Diet Coke",
      "description": "",
      "category": "Beverages",
      "price": "AED 7",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_136.png"
  },
  {
      "id": 271,
      "name": "Red Bull",
      "description": "",
      "category": "Beverages",
      "price": "AED 17",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_137.png"
  },
  {
      "id": 272,
      "name": "Red Bull - Sugar Free",
      "description": "",
      "category": "Beverages",
      "price": "AED 17",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_138.png"
  },
  {
      "id": 273,
      "name": "Red Bull - Red Edition",
      "description": "",
      "category": "Beverages",
      "price": "AED 17",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_139.png"
  },
  {
      "id": 274,
      "name": "Dunkin' Merchandise",
      "description": "Stainless Thermos Bottle White 500ML",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_140.png"
  },
  {
      "id": 275,
      "name": "Stainless Thermos Bottle Pink 500ML",
      "description": "Water",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_141.png"
  },
  {
      "id": 276,
      "name": "Stainless Thermos Bottle Gold 500ML",
      "description": "",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_142.png"
  },
  {
      "id": 277,
      "name": "Stainless Thermos Bottle Orange 500ML",
      "description": "",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_143.png"
  },
  {
      "id": 278,
      "name": "Double Walled Water Bottle White 500ML",
      "description": "",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": "/dunkin_dubai_images/image_144.png"
  },
  {
      "id": 279,
      "name": "Double Walled Water Bottle Pink 500ML",
      "description": "",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": null
  },
  {
      "id": 280,
      "name": "Double Walled Water Bottle Gold 500ML",
      "description": "",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": null
  },
  {
      "id": 281,
      "name": "Double Walled Water Bottle Orange 500ML",
      "description": "",
      "category": "Bottle Merchandise",
      "price": "AED 61",
      "restaurant": "Dunkin Donut",
      "image": null
  },
]

const categoryRoles = {
    main: ['pizza', 'burger', 'combo', 'pasta'],
    beverage: ['beverage','Cold beverage','Hot beverage', 'drink', 'soda', 'juice', 'water'],
    sideOrDessert: ['side', 'dessert', 'appetizer', 'snack', 'sweet']
};

// Helper function to categorize items
const categorizeItems = (resolvedItems) => {
    const categories = {
        main: null,
        beverage: null,
        sideOrDessert: null,
    };

    resolvedItems.forEach(item => {
        const itemCategory = item.category.toLowerCase();
        if (categoryRoles.main.includes(itemCategory) && !categories.main) {
            categories.main = item;
        } else if (categoryRoles.beverage.includes(itemCategory) && !categories.beverage) {
            categories.beverage = item;
        } else if (categoryRoles.sideOrDessert.includes(itemCategory) && !categories.sideOrDessert) {
            categories.sideOrDessert = item;
        }
    });

    return categories;
};

// Helper: Validate recommendations
const validateRecommendations = (recommendations, pizzas) => {
    const validItems = recommendations.map(itemId => pizzas.find(pizza => pizza.id === itemId));

    if (validItems.some(item => !item)) {
        throw new Error('Invalid item ID in recommendations.');
    }

    const restaurants = validItems.map(item => item.restaurant);
    if (new Set(restaurants).size > 1) {
        throw new Error('Recommendations contain items from multiple restaurants.');
    }

    const totalPrice = validItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    if (totalPrice < 20 || totalPrice > 200) {
        throw new Error('Total price of recommendations is out of range (20-100 AED).');
    }

    return validItems;
};

// Helper: Filter available menu items
const filterAvailableItems = (recommendations, pizzas) => {
    return recommendations.filter(itemId => pizzas.some(pizza => pizza.id === itemId));
};

// Helper: Restrict recommendations to available menu items
const restrictToMenu = (recommendations, menu) => {
    return recommendations.every(itemId => menu.some(menuItem => menuItem.id === itemId));
};

// API: Pizza Recommendations
app.post('/api/pizza-recommendations', async (req, res) => {
    try {
        const userId = req.body.userId || 'default';
        const userQuery = req.body.query || '';
        console.log(`User Query Received: ${userQuery}`);
        console.log(`Current Session Memory: ${JSON.stringify(sessionMemory, null, 2)}`);

        // Initialize session memory for the user
        if (!sessionMemory[userId]) {
            console.log(`Initializing new session for User ID: ${userId}`);
            sessionMemory[userId] = { lastRecommendation: null, chatHistory: [] };
        }

        const userSession = sessionMemory[userId];
        userSession.chatHistory.push(userQuery);

        // Prepare system prompt
        const lastRecommendation = userSession.lastRecommendation || [];
        const resolvedItems = lastRecommendation.map(itemId => pizzas.find(pizza => pizza.id === itemId));
        const categorizedItems = categorizeItems(resolvedItems);

        let systemPrompt;

        if (userSession.lastRecommendation && /change|add|remove/i.test(userQuery)) {
            systemPrompt = `
            You are a charismatic Food Recommendation Assistant with memory of the last recommendation:
- Last Recommendation: ${JSON.stringify(lastRecommendation)}
- Main Item: ${categorizedItems.main ? JSON.stringify(categorizedItems.main) : 'None'}
- Beverage: ${categorizedItems.beverage ? JSON.stringify(categorizedItems.beverage) : 'None'}
- Side/Dessert: ${categorizedItems.sideOrDessert ? JSON.stringify(categorizedItems.sideOrDessert) : 'None'}

The user wants to modify the recommendation based on this input: "${userQuery}".
IMPORTANT: All recommended items must come from the same restaurant. Violating this rule will result in rejection of the recommendations.
BUNDLE COMPOSITION RULES:
1. Each bundle must contain exactly 3 items total:
   - 1 main item (pizza, burger, pasta, etc.)
   - 1 beverage (required)
   - 1 additional item (dessert/side/appetizer)

CONSTRAINTS:
- Price: 50-100 AED total.
- All items from the same restaurant.
- Excluded: Papa John's, Dunkin' Donuts.
- Drinks must match weather context.
- NO REPETITIVE RECOMMENDATIONS.
- Restrict items to the available menu.

VARIETY RULES:
- Never repeat main dishes in follow-up requests.
- Rotate between different drink types.
- Mix up flavor profiles.
- Balance meal styles.
- If the user doesn't like a bundle, suggest a completely different cuisine type.

EXPLANATION STYLE:
-make sure to use the name of the dishes only in the recommendations.
- Short and punchy (2-3 sentences).
- Include context and standout features.
- Use standard ASCII characters only.
- NO special characters or quotes that could break JSON.
- Keep it exciting but JSON-safe.

IMPORTANT: Your response must be EXACTLY in this format - no additional text, no special characters, just valid JSON:
{
    "recommendations": [item_ids],
    "explanation": "Your explanation here "
}`;
        } else {
            systemPrompt = `
You are a charismatic Food Recommendation Assistant. You must return ONLY valid JSON with properly escaped strings.

IMPORTANT: All recommended items must come from the same restaurant. Violating this rule will result in rejection of the recommendations.
BUNDLE COMPOSITION RULES:
1. Each bundle must contain exactly 3 items total:
   - 1 main item (pizza, burger, pasta, etc.)
   - 1 beverage (required)
   - 1 additional item (dessert/side/appetizer)

CONSTRAINTS:
- Price: 50-100 AED total.
- All items from the same restaurant.
- Excluded: Papa John's, Dunkin' Donuts.
- Drinks must match weather context.
- NO REPETITIVE RECOMMENDATIONS.
- Restrict items to the available menu.

VARIETY RULES:
- Never repeat main dishes in follow-up requests.
- Rotate between different drink types.
- Mix up flavor profiles.
- Balance meal styles.
- If the user doesn't like a bundle, suggest a completely different cuisine type.

EXPLANATION STYLE:
- Short and punchy (2-3 sentences).
- Include context and standout features.
- Use standard ASCII characters only.
- NO special characters or quotes that could break JSON.
- Keep it exciting but JSON-safe.

IMPORTANT: Your response must be EXACTLY in this format - no additional text, no special characters, just valid JSON:
{
    "recommendations": [item_ids],
    "explanation": "Your explanation here"
}

Available items: ${JSON.stringify(pizzas)}
User Query: "${userQuery}"
`;
        }

        const requestBody = {
            model: 'deepseek-ai/DeepSeek-V3',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userQuery },
            ],
            max_tokens: null,
            temperature: 0.3,
            top_p: 0.7,
            top_k: 50,
        };

        console.log('Request Body Sent to Together AI:', JSON.stringify(requestBody, null, 2));

        const response = await axios.post('https://api.together.xyz/v1/chat/completions', requestBody, {
            headers: {
                'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const rawContent = response.data.choices[0]?.message?.content || '{}';
        console.log('Raw Content from Together AI:', rawContent);

        try {
            const jsonMatch = rawContent.match(/{[\s\S]*}/);
            if (!jsonMatch) {
                throw new Error('Response does not contain valid JSON.');
            }
        
            const recommendations = JSON.parse(jsonMatch[0]);
        
            if (!restrictToMenu(recommendations.recommendations, pizzas)) {
                console.error(`Invalid recommendations: ${JSON.stringify(recommendations.recommendations)}`);
                throw new Error('One or more recommended items are not available in the menu.');
            }
        
            console.log('Parsed Recommendations:', recommendations);
        
            const validItems = validateRecommendations(recommendations.recommendations, pizzas);
        
            userSession.lastRecommendation = recommendations.recommendations;
            console.log(`Updated Last Recommendation for User ID (${userId}): ${JSON.stringify(userSession.lastRecommendation, null, 2)}`);
            res.json(recommendations);
        } catch (parseError) {
            console.error('Failed to parse JSON or validate recommendations:', parseError.message, 'Raw Content:', rawContent);
            res.status(500).json({ error: 'Failed to parse or validate response from Together AI.', rawResponse: rawContent });
        }
    } catch (error) {
        console.error('Error Response from Together AI:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
