const express = require('express');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer middleware for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Sample posts data
let posts = [
    { id: '1', title: 'First Post', body: 'This is the first post.', userId: 1 },
    { id: '2', title: 'Second Post', body: 'This is the second post.', userId: 1 }
];

// Route to get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Route to create a new post with image upload
app.post('/posts', upload.single('image'), (req, res) => {
    const { title, body, userId } = req.body;
    const image = req.file; // This will contain information about the uploaded image
    // You can save the image path to your database or file system
    const newPost = { id: Date.now().toString(), title, body, userId, imageUrl: image ? image.path : null };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Route to delete a post by ID
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(post => post.id !== id);
    res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
