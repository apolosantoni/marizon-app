import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Apolo Oxosse',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: "Nike Slim Shirt",
            category: "Shirt",
            image: "/image/p1.jpg",
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 2.5,
            numReviews: 10,
            description: "high quality product"
        },
        {
            name: "Adidas Shirt",
            category: "Shirt",
            image: "/image/p2.jpg",
            price: 100,
            countInStock: 0,
            brand: "Adidas",
            rating: 3.0,
            numReviews: 10,
            description: "high quality product"
        },
        {
            name: "Laciste Free Shirt",
            category: "Shirt",
            image: "/image/p3.jpg",
            price: 120,
            countInStock: 5,
            brand: "Lacoste",
            rating: 4.8,
            numReviews: 17,
            description: "high quality product"
        },
        {
            name: "Nike Slim Pants",
            category: "Pants",
            image: "/image/p4.jpg",
            price: 78,
            countInStock: 7,
            brand: "Nike",
            rating: 5,
            numReviews: 14,
            description: "high quality product"
        },
        {
            name: "Puma Slim Pant",
            category: "Pants",
            image: "/image/p5.jpg",
            price: 65,
            countInStock: 10,
            brand: "Puma",
            rating: 2,
            numReviews: 10,
            description: "high quality product"
        },
        {
            name: "Adidas Slim Pant",
            category: "Pants",
            image: "/image/p6.jpg",
            price: 139,
            countInStock: 20,
            brand: "Adidas",
            rating: 4.5,
            numReviews: 15,
            description: "high quality product"
        },
    ],
};
export default data;