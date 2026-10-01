import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const LoginPage = () => {
  const { loginWithCredentials } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await loginWithCredentials(email, password);
      setIsLoading(false);
      navigate(`/${userData.role}`);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response?.data?.message || err.message || 'Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0EA] flex items-center justify-center p-4 py-12 relative overflow-hidden font-sans text-[#1A2332]">
      {/* Soft ambient background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#385E72]/15 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Header Logo & Business Wordmark */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[#385E72] flex items-center justify-center shadow-soft group-hover:bg-[#2C4B5B] transition-colors">
              <Wrench className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-[#1A2332] tracking-tight font-heading">
            PrecisionAuto Care
          </h2>
          <p className="text-xs font-semibold text-[#5A6578] uppercase tracking-wider">
            Service & Maintenance Portal
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-soft-card space-y-6 border border-[#EAE5DD]">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#FDF0F0] border border-[#F5C4C4] text-[#7A2A2A] text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#C95B5B]" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={ArrowRight}
              className="w-full mt-2 bg-[#385E72] hover:bg-[#2C4B5B]"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Log In'}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#F0ECE3] text-center text-xs text-[#5A6578]">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#385E72] hover:text-[#2C4B5B]">
              Create Customer Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
