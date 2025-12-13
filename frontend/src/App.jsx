// import AppRouter from "./router";
// import { AuthProvider } from "./context/AuthContext";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <AppRouter />
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

import AppRouter from "./router";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />   {/* ✔ Navbar lives inside BrowserRouter */}
    </AuthProvider>
  );
}

