
import React from 'react';

// Define event category enum as string union type
type EventCategory =
  | 'yoga'
  | 'meditation'
  | 'fitness'
  | 'nutrition'
  | 'workshop'
  | 'retreat'
  | 'online';

// Simple label map for categories
const getCategoryLabel = (category: EventCategory): string => {
  switch (category) {
    case 'yoga':
      return 'Yoga';
    case 'meditation':
      return 'Meditation';
    case 'fitness':
      return 'Fitness';
    case 'nutrition':
      return 'Nutrition';
    case 'workshop':
      return 'Workshop';
    case 'retreat':
      return 'Retreats';
    case 'online':
      return 'Online';
    default:
      return '';
  }
};

const categories: { id: EventCategory; icon: string; description: string }[] = [
  {
    id: 'yoga',
    icon: '🧘‍♀️',
    description: 'Find local yoga classes for all levels'
  },
  {
    id: 'meditation',
    icon: '🧠',
    description: 'Discover guided meditation and mindfulness sessions'
  },
  {
    id: 'fitness',
    icon: '💪',
    description: 'Stay active with fitness classes and outdoor activities'
  },
  {
    id: 'nutrition',
    icon: '🥗',
    description: 'Learn about healthy eating and cooking workshops'
  },
  {
    id: 'workshop',
    icon: '🧪',
    description: 'Develop new skills in wellness-focused workshops'
  },
  {
    id: 'retreat',
    icon: '🏞️',
    description: 'Escape to local wellness retreats and getaways'
  },
  {
    id: 'online',
    icon: '💻',
    description: 'Join virtual events from the comfort of home'
  }
];

const HomeCategories: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect wellness activity based on your interests and needs
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#category-${category.id}`}
              className="group flex flex-col items-center p-6 rounded-xl bg-sage-50 hover:bg-purple-50 text-center transition-colors"
            >
              <span className="text-4xl mb-4">{category.icon}</span>
              <h3 className="font-medium text-lg mb-2 transition-colors group-hover:text-primary">
                {getCategoryLabel(category.id)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
