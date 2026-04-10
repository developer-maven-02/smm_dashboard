import { useEffect, useState } from 'react';

export default function GreetingHeader() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
        {greeting}, <span className="brand-gradient-text">Lovekush</span> 👋
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Here's your social media command center. Let's make today productive.
      </p>
    </div>
  );
}
