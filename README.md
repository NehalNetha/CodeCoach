# CodeCoad

CodeCoad is an open-source Data Structures and Algorithms (DSA) Socratic learning platform. It uses MongoDB for data storage, Gemini Pro as the language model, Next.js for the frontend, and Express for the backend.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (usually comes with Node.js)
- MongoDB
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/codecoad.git
   cd codecoad
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_pro_api_key
   ```
   Replace `your_mongodb_connection_string` and `your_gemini_pro_api_key` with your actual MongoDB connection string and Gemini Pro API key.

## Running the Application

1. Start the backend server:
   ```bash
   npm run server
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to use CodeCoad.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Happy coding with CodeCoad!
