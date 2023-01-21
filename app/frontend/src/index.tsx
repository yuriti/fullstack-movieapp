import "./index.css";

import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createQueryClient } from "app/api";

// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const Main: React.FC = () => {
    const client = createQueryClient();

    return (
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    );
};

root.render(<Main />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
