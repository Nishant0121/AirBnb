import { useNavigate } from 'react-router-dom';
import { logout } from '../service/auth';
import { Button } from '../components/ui/button';

export default function IndexPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div>
            Hello
            <Button onClick={handleLogout} className="mt-4">
                Logout
            </Button>
        </div>
    );
}

