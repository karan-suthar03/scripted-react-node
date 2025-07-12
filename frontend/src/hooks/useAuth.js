// src/hooks/useAuth.js
import { useState } from 'react';
import { loginUser, registerUser } from '../api/user';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const data = await loginUser(email, password);
            const { token, user } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true, user };
        } catch (err) {
            return { success: false, message: err };
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, name) => {
        try {
            setLoading(true);
            const data = await registerUser(email, password, name);
            console.log(data);
            const { token, user } = data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true, user };
        } catch (err) {
            return { success: false, message: err };
        } finally {
            setLoading(false);
        }
    };

    return { login, register, loading };
};
