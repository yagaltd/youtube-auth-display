import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Index = () => {
  const { user, signIn, signOut } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {user ? (
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name} />
              <AvatarFallback>{user.user_metadata.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mb-4">{user.user_metadata.full_name}</h2>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to YouTube Sign-In</h1>
            <Button onClick={signIn} className="bg-red-600 hover:bg-red-700 text-white">
              Sign in with YouTube
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index