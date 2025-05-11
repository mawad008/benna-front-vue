
import { defineStore } from 'pinia';
import { AxiosError } from 'axios';

interface User {
    id: number;
    name: string;
    verification_code: number;
    email: string;
    phone: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
}


interface ApiResponse<T> {
    data: T;
    errors: any;
}


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null, 
        token: null as string | null, 
        pendingLogin: false,
        errorsLogin: undefined,
        errorsRegister: undefined,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token, 
    },
    actions: {
        async login(form: any) {
            const router = useRouter();
            this.pendingLogin = true;
            let formData = new FormData();
            formData.append("email", form.email);
            formData.append("password", form.password);
            try {
                const api = useApi();
                const localePath = useLocalePath();
                const response = await api.post<ApiResponse<AuthState>>('login', form);
                const { user, token } = response.data.data;
                if (user && token) {
                    this.pendingLogin = false;
                    this.setUser(user, token);
                    this.errorsLogin = undefined; 
                    router.push(localePath('/'));
                }
            } catch (error) {
                this.pendingLogin = false;
                const axiosError = error as AxiosError; 
                this.errorsRegister = axiosError.response?.data?.errors;
            
            }
        },
      
        setUser(user: User, token: string) {
            this.user = user;
            this.token = token;
            if (process.client) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        clearAuth() {
            this.user = null;
            this.token = null;
            if (process.client) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            const router = useRouter();
            const localePath = useLocalePath();
            router.push(localePath('/'));
        },
        initializeAuth() {
           
            if (process.client) {
                const token = localStorage.getItem('token');
                const user = localStorage.getItem('user');
                if (token && user) {
                    this.token = token;
                    this.user = JSON.parse(user);
                   
                }
            }
        },
    },
});