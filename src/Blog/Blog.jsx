import React, { Component } from 'react';
import '../style.css';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            title: '',
            content: ''
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/posts');
            const data = await response.json();
            this.setState({ posts: data });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content } = this.state;
        try {
            await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body: content })
            });
            this.fetchPosts();
            this.setState({ title: '', content: '' });
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE',
            });
            this.setState((prevState) => ({
                posts: prevState.posts.filter((post) => post.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    handleContentChange = (e) => {
        this.setState({ content: e.target.value });
    };

    render() {
        const { posts, title, content } = this.state;
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="blog-content">
                    <h1 className="text-3xl font-bold mb-6">My Blog</h1>
                    <form onSubmit={this.handleSubmit} className="space-y-4 mb-6">
                        <div>
                            <label htmlFor="title" className="block mb-1">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={this.handleTitleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block mb-1">Content:</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={this.handleContentChange}
                                className="w-full p-2 border rounded"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Create Post</button>
                    </form>
                    <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id} className="mb-4">
                                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                                <p>{post.body}</p>
                                <button onClick={() => this.handleDelete(post.id)} className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Blog;
