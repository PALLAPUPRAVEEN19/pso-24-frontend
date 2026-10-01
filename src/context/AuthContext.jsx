import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
import {
  initialServices,
  initialTechnicians
} from '../data/mockData';

const AuthContext = createContext();

export const normalizeRole = (role) => {
  if (!role) return 'customer';
  const r = role.toLowerCase().replace('role_', '');
  if (r === 'user') return 'customer';
  return r; // 'customer', 'technician', 'admin'
};

export const AuthProvider = ({ children }) => {
  // Always initialize token and user as null. Do not trust localStorage blindly on initial render.
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [services] = useState(initialServices);
  const [technicians] = useState(initialTechnicians);

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    console.log('[AUTH_TRACE] AuthProvider mounted. Validating initial session...');

    const validateTokenOnLoad = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      // One-time cleanup check for malformed or unvalidated session data
      if (!storedToken || !storedUser) {
        console.log('[AUTH_TRACE] Missing stored token or user data. Cleaning up session.');
        clearSession();
        setAuthLoading(false);
        return;
      }

      let parsedUser = null;
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (e) {
        console.log('[AUTH_TRACE] Malformed user JSON found in localStorage. Cleaning up session.');
        clearSession();
        setAuthLoading(false);
        return;
      }

      if (!parsedUser || typeof parsedUser !== 'object') {
        console.log('[AUTH_TRACE] Invalid user object found in localStorage. Cleaning up session.');
        clearSession();
        setAuthLoading(false);
        return;
      }

      console.log('[AUTH_TRACE] Stored token found. Calling API validation endpoint /gateway/authservice/api/auth/test...');
      try {
        const res = await API.get('/gateway/authservice/api/auth/test');
        console.log('[AUTH_TRACE] API validation response received:', res?.status);

        if (res && res.status === 200) {
          console.log('[AUTH_TRACE] API validation success (200 OK). Setting authenticated user state.');
          const displayName = (parsedUser?.fullName && parsedUser.fullName.trim() !== '')
            ? parsedUser.fullName
            : (parsedUser?.email || 'User');

          setUser({ ...parsedUser, name: displayName });
          setToken(storedToken);
        } else {
          console.log('[AUTH_TRACE] API validation returned non-200 status. Clearing session.');
          clearSession();
        }
      } catch (err) {
        console.log('[AUTH_TRACE] API validation failed (backend unreachable or invalid token):', err?.message || err);
        console.log('[AUTH_TRACE] Clearing stale session and staying logged out.');
        clearSession();
      } finally {
        console.log('[AUTH_TRACE] validateTokenOnLoad completed. Setting authLoading to false.');
        setAuthLoading(false);
      }
    };

    validateTokenOnLoad();
  }, []);

  const loginWithCredentials = async (email, password) => {
    const res = await API.post('/gateway/authservice/api/auth/login', { email, password });
    if (res.data && res.data.success && res.data.data) {
      const { token: jwtToken, userEmail, role, fullName } = res.data.data;
      const normalizedRole = normalizeRole(role);
      const displayName = (fullName && fullName.trim() !== '') ? fullName : userEmail;
      const userData = {
        email: userEmail,
        fullName: fullName || null,
        role: normalizedRole,
        name: displayName,
        token: jwtToken
      };
      setToken(jwtToken);
      setUser(userData);
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthLoading(false);
      return userData;
    } else {
      throw new Error(res.data?.message || 'Login failed');
    }
  };

  const registerUser = async ({ fullName, email, phone, password, role, experience }) => {
    const backendRole = role ? role.toUpperCase() : 'USER';
    const payload = {
      fullName,
      userEmail: email,
      phone,
      password,
      role: backendRole,
      ...(experience ? { experience: String(experience) } : {})
    };
    const res = await API.post('/gateway/authservice/api/auth/register', payload);
    return res.data;
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      authLoading,
      loginWithCredentials,
      registerUser,
      logout,
      services,
      technicians
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
