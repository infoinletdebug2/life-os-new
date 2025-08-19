export interface SubCategory {
  id: string;
  name: string;
  description: string;
  route: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
    color: 'bg-blue-500',
    subcategories: [
      {
        id: 'event-ticketing',
        name: 'Event Ticketing System',
        description: 'Event service vertical',
        route: '/travel/event-ticketing'
      },
      {
        id: 'hotel-booking',
        name: 'Hotel Management System',
        description: 'Complete hotel management for single property',
        route: '/hotel'
      },
      {
        id: 'home-stay',
        name: 'Home Stay Sharing',
        description: 'Alternative accommodation',
        route: '/travel/home-stay'
      }
    ]
  },
  {
    id: 'life-os',
    name: 'LIFE OS',
    icon: '🤖',
    color: 'bg-purple-500',
    subcategories: [
      {
        id: 'ai-resume',
        name: 'AI Resume Builder',
        description: 'Professional resume creation',
        route: '/life-os/ai-resume'
      },
      {
        id: 'e-learning',
        name: 'E-learning Platform',
        description: 'Online education system',
        route: '/life-os/e-learning'
      },
      {
        id: 'ai-logo',
        name: 'AI Logo Maker',
        description: 'Immediate visual impact & brand foundation',
        route: '/life-os/ai-logo'
      },
      {
        id: 'ai-captions',
        name: 'AI Social Media Captions',
        description: 'Daily usage driver & content creation',
        route: '/life-os/ai-captions'
      }
    ]
  },
  {
    id: 'medical',
    name: 'Medical',
    icon: '🏥',
    color: 'bg-red-500',
    subcategories: [
      {
        id: 'appointment',
        name: 'Medical Appointment System',
        description: 'Healthcare service vertical',
        route: '/medical/appointment'
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    color: 'bg-green-500',
    subcategories: [
      {
        id: 'money-management',
        name: 'Money Management',
        description: 'Personal finance essential',
        route: '/finance/money-management'
      },
      {
        id: 'fundraising',
        name: 'Fundraising Donation System',
        description: 'Non-profit service vertical',
        route: '/finance/fundraising'
      }
    ]
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: '💪',
    color: 'bg-orange-500',
    subcategories: [
      {
        id: 'nutrition',
        name: 'AI Nutrition Tracker',
        description: 'Health trend alignment',
        route: '/health/nutrition'
      },
      {
        id: 'workout',
        name: 'AI Workout Planner',
        description: 'Fitness integration',
        route: '/health/workout'
      },
      {
        id: 'health-platform',
        name: 'Health and Fitness Platform',
        description: 'Comprehensive health platform',
        route: '/health/platform'
      }
    ]
  },
  {
    id: 'food',
    name: 'Food & Restaurant',
    icon: '🍔',
    color: 'bg-yellow-500',
    subcategories: [
      {
        id: 'food-delivery',
        name: 'Food Delivery',
        description: 'Meal planning to delivery',
        route: '/food/delivery'
      },
      {
        id: 'restaurant-management',
        name: 'Restaurant Management System',
        description: 'Food service B2B',
        route: '/food/restaurant'
      },
      {
        id: 'recipe-generator',
        name: 'AI Recipe Generator',
        description: 'Daily usage potential',
        route: '/food/recipes'
      }
    ]
  },
  {
    id: 'home',
    name: 'Home Services',
    icon: '🏠',
    color: 'bg-indigo-500',
    subcategories: [
      {
        id: 'laundry',
        name: 'Laundry Management System',
        description: 'Household service',
        route: '/home/laundry'
      },
      {
        id: 'home-design',
        name: 'AI Home Design',
        description: 'Lifestyle aspiration tool',
        route: '/home/design'
      }
    ]
  }
];