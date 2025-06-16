import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { register } from '../service/auth';

export default function RegisterPage() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        isHost: false,
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = await register(form, navigate);
        if (err) {
            setError(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label>Username</Label>
                    <Input
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                    />
                </div>
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
                <div className="flex items-center gap-2">
                    <Label>{form.isHost ? 'Host' : 'Guest'}</Label>
                    <Switch
                        checked={form.isHost}
                        onCheckedChange={(v) => setForm({ ...form, isHost: v })}
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">Register</Button>
            </form>
            <p className="text-sm text-center mt-4">
                Already have an account? <Link to="/login" className="underline">Login</Link>
            </p>
        </div>
    );
}
