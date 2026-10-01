import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, User, Mail, Lock, Phone, ArrowRight, AlertCircle, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const RegisterPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'USER',
    experience: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage('Phone number is required.');
      return;
    }

    if (formData.role === 'TECHNICIAN') {
      const expNum = Number(formData.experience);
      if (!formData.experience || isNaN(expNum) || expNum < 0) {
        setErrorMessage('Please enter a valid number of years of experience (0 or higher).');
        return;
      }
    }

    if (!formData.password || formData.password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        experience: formData.role === 'TECHNICIAN' ? formData.experience : undefined
      });
      setIsLoading(false);
      navigate('/login');
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response?.data?.message || err.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0EA] flex items-center justify-center p-4 py-12 relative overflow-hidden font-sans text-[#1A2332]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#385E72]/15 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
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
            Customer & Specialist Registration
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-soft-card space-y-6 border border-[#EAE5DD]">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#FDF0F0] border border-[#F5C4C4] text-[#7A2A2A] text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#C95B5B]" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="Eleanor Vance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="eleanor@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              icon={Phone}
              placeholder="+1 (555) 234-5678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <Input
              label="Account Type"
              type="select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { label: "Customer", value: "USER" },
                { label: "Technician", value: "TECHNICIAN" }
              ]}
            />

            {formData.role === 'TECHNICIAN' && (
              <Input
                label="Years of Experience"
                type="number"
                icon={Award}
                placeholder="5"
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
              />
            )}

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={ArrowRight}
              className="w-full mt-2 bg-[#385E72] hover:bg-[#2C4B5B]"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#F0ECE3] text-center text-xs text-[#5A6578]">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-[#385E72] hover:text-[#2C4B5B]">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
