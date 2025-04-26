import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
interface AuthContextType {
    user: User | null;
    signInWithGitHub: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setUser(session?.user ?? null)
        });
        const { data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => {
            listener.subscription.unsubscribe()
        }

    }, [])

    const signInWithGitHub = async () => {
        supabase.auth.signInWithOAuth({provider: 'github'})
  
    };

    const signOut = async () => {
        supabase.auth.signOut();
    }

    return (
    <AuthContext.Provider value={{user, signInWithGitHub, signOut}}>
        {children} 
    </AuthContext.Provider>
    );
};

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}