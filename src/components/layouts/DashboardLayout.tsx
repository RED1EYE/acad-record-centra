
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Graduation, Building2, LandmarkIcon, Users, User, LogOut, Menu, X, 
  Home, BarChart, FileText, Search, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserRole, useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const getNavigationItems = (role: UserRole): NavigationItem[] => {
  switch (role) {
    case 'student':
      return [
        { name: 'Dashboard', href: '/student/dashboard', icon: Home },
        { name: 'Academic Profile', href: '/student/profile', icon: User },
      ];
    case 'institute':
      return [
        { name: 'Dashboard', href: '/institute/dashboard', icon: Home },
        { name: 'Students', href: '/institute/students', icon: Users },
      ];
    case 'government':
      return [
        { name: 'Dashboard', href: '/government/dashboard', icon: Home },
        { name: 'Search Students', href: '/government/students', icon: Search },
      ];
    default:
      return [];
  }
};

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'student':
      return <Graduation className="h-6 w-6" />;
    case 'institute':
      return <Building2 className="h-6 w-6" />;
    case 'government':
      return <LandmarkIcon className="h-6 w-6" />;
    default:
      return <User className="h-6 w-6" />;
  }
};

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case 'student':
      return 'text-edu-primary';
    case 'institute':
      return 'text-edu-secondary';
    case 'government':
      return 'text-edu-dark';
    default:
      return 'text-primary';
  }
};

const getRoleName = (role: UserRole) => {
  switch (role) {
    case 'student':
      return 'Student';
    case 'institute':
      return 'Institute';
    case 'government':
      return 'Government';
    default:
      return 'User';
  }
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    navigate('/');
    return null;
  }

  const navigationItems = getNavigationItems(user.role);
  const roleIcon = getRoleIcon(user.role);
  const roleColor = getRoleColor(user.role);
  const roleName = getRoleName(user.role);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account.',
    });
    navigate('/');
  };

  const userInitials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open sidebar</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <div className="flex items-center mb-6">
                    <div className={cn("p-2 rounded-md", roleColor)}>
                      {roleIcon}
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-medium">
                        ABC<span className={roleColor}>id</span> Portal
                      </h2>
                      <p className="text-sm text-muted-foreground">{roleName} Portal</p>
                    </div>
                  </div>
                  <nav className="space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center px-3 py-2 text-base font-medium rounded-md",
                          window.location.pathname === item.href
                            ? `bg-primary/10 ${roleColor}`
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="pt-6 mt-6 border-t border-border">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Log out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="hidden lg:flex items-center">
                <div className={cn("p-2 rounded-md", roleColor)}>
                  {roleIcon}
                </div>
                <h1 className="ml-3 text-xl font-semibold">
                  ABC<span className={roleColor}>id</span> Portal
                </h1>
              </div>
            </div>

            <div className="hidden lg:flex space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md flex items-center",
                    window.location.pathname === item.href
                      ? `bg-primary/10 ${roleColor}`
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={cn('bg-primary/10', roleColor)}>
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                  {user.name}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-4"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
