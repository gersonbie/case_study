import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TOKEN_LOCAL_STORAGE, USER_LOCAL_STORAGE } from "../constants";
import { APIKit } from "../services/api";
const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(!!localStorage.getItem(USER_LOCAL_STORAGE));
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE) || '{}'));

  const setUser = () => {
    APIKit.get('/auth/me')
      .then(({ data }) => {
        setUsuario(data)
        setAuth(true);
        localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(data))
      })
      .catch((err) => {
        toast.error("Erro ao Buscar dados do perfil!")
        APIKit.patch('/auth').then(resp => {
          setToken(resp.data.token);
          toast.success("Sessão atualizada!")
        }).catch((err) => {
          toast.error("Sua sessão expirou!")
          logout()
          console.log(err)
        })
      })
  };
  const logout = () => {
    localStorage.removeItem(USER_LOCAL_STORAGE)
    localStorage.removeItem(TOKEN_LOCAL_STORAGE)
    APIKit.defaults.headers.Authorization = null
    setUsuario(null)
    setAuth(false)
  }
  const setToken = (token) => {
    APIKit.defaults.headers.Authorization = `Bearer ${token}`
    localStorage.setItem(TOKEN_LOCAL_STORAGE, token)
    setUser()
  }

  const initialize = () => {
    console.log('init')
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE)
    if (token) {
      setToken(token)
    }
  }

  useEffect(() => {
    APIKit.interceptors.response.use(res => res, err => {
      const code = err.response.status
      const message = err.response.data || err.message
      console.log(code, 'Message => ', message)
      if (code === 401) {
        if (message?.inspiredToken) {
          APIKit.patch('/auth').then(resp => {
            setToken(resp.data.token);
            toast.success("Sessão atualizada!")
          }).catch((err) => {
            toast.error("Sua sessão expirou!")
            logout()
            console.log(err)
          })
        } else { toast.error(typeof message !== 'string' ? "Rota não autorizada!" : message) }

      }
      if (code === 404) {
        if (message)
          toast.error(message || 'Nenhum registo Encontrado!')
      }
      if (code === 403) {
        toast.error("Sua sessão expirou!")
        logout()
      }
    })
  }, [])

  const data = { auth, usuario, logout, setToken, initialize, toast };
  return <AuthContext.Provider value={data}>
    <Toaster />
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth can only be used inside AuthProvider");
  }
  return context;
};
