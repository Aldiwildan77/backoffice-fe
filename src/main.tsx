import ReactDOM from "react-dom/client";
import { ChakraBaseProvider } from "@chakra-ui/react";
import theme from "./themes/theme.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import QRResultPage from "./pages/QRResultPage.tsx";
import QRScanPage from "./pages/QRScanPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/qr/result",
    element: <QRResultPage />,
  },
  {
    path : "/qr/scan",
    element : <QRScanPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraBaseProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraBaseProvider>
);
