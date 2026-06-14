import {
  Apple,
  BarChart3,
  LayoutDashboard,
  Plus,
  TrendingUp,
  User,
  Utensils
} from 'lucide-react'
import { getGreeting, getTodayLabel, getTodayOrdinalLabel } from '../utils/dateLabels'

export const proNavItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/log-food', label: 'Log Food', icon: Plus },
  { to: '/app/meal-planner', label: 'Meal Planner', icon: Utensils },
  { to: '/app/progress', label: 'Progress', icon: TrendingUp },
  { to: '/app/nutrition', label: 'Nutrition', icon: BarChart3 },
  { to: '/app/foods', label: 'Foods', icon: Apple },
  { to: '/app/community', label: 'Community', icon: User }
]

export const proPageMeta = {
  '/app/dashboard': { title: `${getGreeting()}, Alex`, subtitle: getTodayLabel(), search: 'Search foods...' },
  '/app/log-food': { title: 'Daily Food Log', subtitle: getTodayOrdinalLabel(), search: 'Search foods...' },
  '/app/meal-planner': { title: 'Meal Architecture', subtitle: 'Weekly Plan', search: 'Search recipes or ingredients...' },
  '/app/progress': { title: 'Weight Journey', subtitle: "You've lost 2.4kg in the last 30 days. Stay consistent!", search: 'Search data...' },
  '/app/nutrition': { title: 'Nutrition Analysis', subtitle: 'Macro, vitamin, mineral, and hydration', search: 'Search nutrients...' },
  '/app/foods': { title: 'Food Database', subtitle: 'Browse, filter, favorite, and add foods', search: 'Search foods...' },
  '/app/foods/gado-gado': { title: 'Food Detail', subtitle: 'Nutrition facts and portion calculator', search: 'Search foods...' },
  '/app/community': { title: 'Community Hub', subtitle: getTodayLabel(), search: 'Search buddies or challenges...' },
  '/app/profile': { title: 'Profile Detail', subtitle: 'Alex Rivera', search: 'Search metrics, meals, or friends...' },
  '/app/settings': { title: 'Settings', subtitle: 'Atur preferensi akun dan pengalaman NutriTrack Anda.', search: 'Search settings...' },
  '/app/notifications': { title: 'Notifications', subtitle: 'Activity Hub', search: 'Search notifications...' },
  '/help': { title: 'Help Center', subtitle: 'Apa yang bisa kami bantu?', search: 'Cari di pusat bantuan...' }
}
