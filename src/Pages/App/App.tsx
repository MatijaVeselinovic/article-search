import { QueryClient, QueryClientProvider } from "react-query";
import { ArticlesContainer } from '../../Components/ArticlesContainer/ArticlesContainer';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ArticlesContainer />
    </QueryClientProvider>
  );
}
