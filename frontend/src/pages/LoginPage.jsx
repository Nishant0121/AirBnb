import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { login } from '../service/auth';


export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const error = await login(form, navigate);
        if (error) {
            setError(error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">Login</Button>
            </form>
            <p className="text-sm text-center mt-4">
                Don&apos;t have an account? <Link to="/register" className="underline">Register</Link>
            </p>
        </div>
    );
}
