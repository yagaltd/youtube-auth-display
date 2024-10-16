import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./contexts/AuthContext"
import Index from "./pages/Index"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AuthProvider>
        <Index />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App