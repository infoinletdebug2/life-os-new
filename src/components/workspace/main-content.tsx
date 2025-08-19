import { useIntl } from 'react-intl';
import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelRightClose, Sun, Moon, Globe, Plus, Bot, Search, Bell, Settings } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { motion } from 'framer-motion';

interface MainContentProps {
  currentView?: string;
  onToggleSidebar: (side: 'left' | 'right') => void;
  isRightSidebarCollapsed: boolean;
  isLeftSidebarCollapsed: boolean;
  children?: React.ReactNode;
}

export function MainContent({
  currentView,
  onToggleSidebar,
  isRightSidebarCollapsed,
  isLeftSidebarCollapsed,
  children,
}: MainContentProps) {
  const intl = useIntl();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background">
      {/* Header */}
      <header className="h-16 glass backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 animate-fadeInUp">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleSidebar('left')}
            title="Toggle left sidebar"
          >
            <PanelLeftClose className={cn(
              "w-5 h-5 transition-transform",
              isLeftSidebarCollapsed && "rotate-180"
            )} />
          </Button>
          <div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              {intl.formatMessage({ id: 'app.welcome' })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-9 pr-3 py-1.5 bg-card border border-input rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
     
          <Button variant="outline" size="sm" className="gap-2">
            <Bot className="w-4 h-4" />
            {intl.formatMessage({ id: 'user.askAI' })}
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <Globe className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleSidebar('right')}
            title="Toggle right sidebar"
          >
            <PanelRightClose className={cn(
              "w-5 h-5 transition-transform",
              isRightSidebarCollapsed && "rotate-180"
            )} />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children || (
          <div className="p-6 space-y-6">
            {/* Dashboard Filters */}
            <div className="flex gap-4 items-center animate-fadeInUp">
              <select className="px-3 py-2 bg-card border border-input rounded-lg text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
              <select className="px-3 py-2 bg-card border border-input rounded-lg text-sm">
                <option>Daily View</option>
                <option>Weekly View</option>
                <option>Monthly View</option>
              </select>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-6 border-b border-white/10">
              <motion.button
                className="pb-3 px-1 text-sm font-medium border-b-2 border-primary text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Overview
              </motion.button>
              <motion.button
                className="pb-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Activity
              </motion.button>
              <motion.button
                className="pb-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Analytics
              </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[
                { icon: '👥', value: '24', label: 'Total Members', gradient: 'cyan' },
                { icon: '📹', value: '3', label: 'Events', gradient: 'emerald' },
                { icon: '✓', value: '8', label: 'Pending Tasks', gradient: 'teal' },
                { icon: '✉️', value: '51', label: 'Messages', gradient: 'cyan' },
                { icon: '📁', value: '13', label: 'Files', gradient: 'emerald' },
                { icon: '📋', value: '2', label: 'Projects', gradient: 'teal' },
              ].map((stat, index) => (
                <GlassCard
                  key={index}
                  gradient={stat.gradient as any}
                  className="p-4 text-center animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </GlassCard>
              ))}
            </div>

            {/* Activity Chart */}
            <Card className="glass-card animate-fadeInUp">
              <CardHeader>
                <CardTitle className="text-lg bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  Activity Trend
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  All activity patterns including messages, tasks, files, meetings, notes, integrations, and video calls
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-teal-500/10" />
                  <div className="relative h-full flex items-end justify-between gap-2 p-4">
                    {[65, 85, 55, 75, 90, 70, 80, 95, 60, 88, 78, 92].map((height, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-cyan-500 to-emerald-500 rounded-t opacity-80"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span>Tasks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span>Activity</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="text-base">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'Grand Hotel Palace', date: '2 hours ago', status: 'confirmed', color: 'cyan' },
                    { name: 'Beach Resort Villa', date: '5 hours ago', status: 'pending', color: 'emerald' },
                    { name: 'Mountain View Lodge', date: '1 day ago', status: 'confirmed', color: 'teal' },
                  ].map((booking, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlassCard className="p-3 cursor-pointer group hover:scale-[1.01] transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">
                              {booking.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{booking.date}</p>
                          </div>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            booking.status === 'confirmed'
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          )}>
                            {booking.status}
                          </span>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card animate-fadeInUp">
                <CardHeader>
                  <CardTitle className="text-base">Team Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { user: 'Sarah Chen', action: 'Updated booking #1234', time: '5 min ago', avatar: '👩' },
                    { user: 'Mike Johnson', action: 'Added new property', time: '15 min ago', avatar: '👨' },
                    { user: 'Emma Wilson', action: 'Completed review task', time: '1 hour ago', avatar: '👩‍💼' },
                  ].map((activity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center text-lg">
                          {activity.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.action}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}