# Cloning and Executing the Repository for Next.js Version 15

Follow these steps to clone and execute the repository using npm for Next.js version 15:

1. **Clone the Repository:**
    Open your terminal and run the following command to clone the repository:
    ```sh
    git clone https://github.com/DANIELSSF/todo-list-front.git
    ```

2. **Navigate to the Project Directory:**
    Change your current directory to the project directory:
    ```sh
    cd todo-list-front
    ```

3. **Install Dependencies:**
    Run the following command to install all the necessary dependencies:
    ```sh
    npm install
    ```

4. **Ensure Compatibility with Next.js Version 15:**
    Make sure your project is set to use Next.js version 15. You can specify the version in your `package.json` file:
    ```json
    {
      "dependencies": {
         "next": "15.x.x",
         // other dependencies
      }
    }
    ```
    If Next.js is already installed, you can update it to version 15 using:
    ```sh
    npm install next@15
    ```

5. **Run the Development Server:**
    Start the development server by running:
    ```sh
    npm run dev
    ```

6. **Open the Application:**
    Open your browser and navigate to `http://localhost:3000` to see your application running.

By following these steps, you should be able to clone and execute the repository using npm for Next.js version 15.