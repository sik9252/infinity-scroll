import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  //const [queryClient] = useState(() => new QueryClient());
  const queryClient = new QueryClient();

  return (
    // QueryClientProvider 로 인해 모든 페이지, 컴포넌트에서
    // queryClient 에 접근이 가능해진다.
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

      {/* devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
