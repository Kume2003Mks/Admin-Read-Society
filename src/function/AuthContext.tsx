/* eslint-disable react-refresh/only-export-components */
// AuthContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import authentication from './authentication';
import {
  UserCredential,
} from "firebase/auth";
import Swal from 'sweetalert2';

const auth = new authentication();

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserCredential | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstname: string, lastname: string, username: string) => Promise<void>;
  logout: () => void;
  getAuthStatus: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.getAuthStatus());
  const [userData, setUserData] = useState<UserCredential | null>(null);

  useEffect(() => {
    const user = auth.getAuthStatus();
    setIsLoggedIn(!!user);
    setUserData(user); // เพิ่มการตั้งค่าข้อมูลผู้ใช้ใน state ใหม่

  }, []);

  const login = async (email: string, password: string) => {
    await auth.login(email, password);
    setIsLoggedIn(auth.getAuthStatus());
  };

  const register = async (email: string, password: string, firstname: string, lastname: string, username: string) => {
    await auth.register(email, password, firstname, lastname, username);
    setIsLoggedIn(auth.getAuthStatus());
  };

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confrim'
    }).then((result) => {
      if (result.isConfirmed) {
        auth.logout();
        setIsLoggedIn(false);
      }
    })
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, userData, logout, getAuthStatus: auth.getAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
