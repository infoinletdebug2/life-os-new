import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  task: string;
  priority: string;
  time: string;
  status: string;
}

interface TodayTasksProps {
  tasks: Task[];
}

export function TodayTasks({ tasks }: TodayTasksProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-500" />
          Today's Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 cursor-pointer"
          >
            <div className={cn(
              "w-3 h-3 rounded-full",
              task.status === 'completed' ? 'bg-green-500' : 
              task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
            )} />
            
            <div className="flex-1">
              <p className="text-sm font-medium">{task.task}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{task.time}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  task.priority === 'high' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                  'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                )}>
                  {task.priority}
                </span>
              </div>
            </div>

            {task.status === 'completed' && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
            {task.status === 'in-progress' && (
              <Clock className="w-4 h-4 text-yellow-500" />
            )}
            {task.status === 'pending' && (
              <AlertCircle className="w-4 h-4 text-gray-400" />
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}