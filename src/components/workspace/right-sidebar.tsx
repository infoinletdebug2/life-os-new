import { useIntl } from 'react-intl';
import { cn } from '@/lib/utils';
import { TrendingUp, Users, Calendar, Clock, ChartBar, Activity, Target, Award, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface RightSidebarProps {
  isCollapsed: boolean;
  currentView?: string;
}

export function RightSidebar({ isCollapsed, currentView }: RightSidebarProps) {
  const intl = useIntl();

  if (isCollapsed) return null;

  return (
    <div className="w-80 glass backdrop-blur-xl flex flex-col animate-fadeInLeft">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Activity Graph */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity className="w-3 h-3" />
            Live Activity
          </h4>
          <GlassCard gradient="cyan" className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Real-time Activity</span>
              <span className="text-xs text-cyan-600 dark:text-cyan-400 animate-pulse">● Live</span>
            </div>
            <div className="h-32 flex items-end justify-between gap-1">
              {[40, 70, 45, 80, 55, 90, 65, 75, 85, 60, 95, 70].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-cyan rounded-t opacity-80"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                />
              ))}
            </div>
          </GlassCard>
        </div>
        {/* Quick Stats */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Stats
          </h4>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-3 group cursor-pointer hover:scale-[1.02] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <Users className="w-4 h-4 text-cyan-500" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                    </div>
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <span className="text-sm font-semibold">12 online</span>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-3 group cursor-pointer hover:scale-[1.02] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <Target className="w-4 h-4 text-emerald-500" />
                    </div>
                    <span className="text-sm font-medium">Goals Today</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">8/10</span>
                    <Award className="w-3 h-3 text-yellow-500" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-3 group cursor-pointer hover:scale-[1.02] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-500/10 rounded-full flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                      <Zap className="w-4 h-4 text-teal-500" />
                    </div>
                    <span className="text-sm font-medium">Performance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">+15%</span>
                    <TrendingUp className="w-3 h-3 text-teal-500" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Today's Overview */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <ChartBar className="w-3 h-3" />
            Today's Overview
          </h4>
          <Card className="glass-card space-y-3 p-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Tasks Progress</span>
                <span className="text-xs font-semibold">12/16</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-cyan rounded-full transition-all shimmer" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Sprint Progress</span>
                <span className="text-xs text-cyan-600 dark:text-cyan-400">Day 8/14</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-emerald rounded-full transition-all" style={{ width: '57%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Team Capacity</span>
                <span className="text-xs text-teal-600 dark:text-teal-400">85%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-teal rounded-full transition-all" style={{ width: '85%' }}></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            Upcoming Events
          </h4>
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-3 group cursor-pointer hover:scale-[1.01] transition-all">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Team Meeting
                    </p>
                    <p className="text-xs text-muted-foreground">In 30 minutes</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    Join
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard className="p-3 group cursor-pointer hover:scale-[1.01] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Design Review
                    </p>
                    <p className="text-xs text-muted-foreground">Today at 3:00 PM</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-3 group cursor-pointer hover:scale-[1.01] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      Client Presentation
                    </p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <Button variant="gradient" size="sm" className="w-full">
            View All Activities
          </Button>
        </div>
      </div>
    </div>
  );
}