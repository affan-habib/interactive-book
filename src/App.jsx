import React from "react";
import AllRoutes from "./routes/AllRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Notification from "./components/Notification";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
    return (
        <main className="App  relative">
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <AllRoutes />
            </QueryClientProvider>
        </main>
    );
}

export default App;
