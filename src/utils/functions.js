export function getLoop(loopKey, loops) {
  return loops.find((loop) => loop.properties.key === loopKey);
}

// This is beautiful
export function getContributionAreaEmoji(key) {
  switch (key) {
    case 'ai':
      return '🧠';
    case 'business':
      return '💼';
    case 'database':
      return '🗄️';
    case 'design':
      return '🎨';
    case 'doc':
      return '📖';
    case 'financial':
      return '💵';
    case 'hardware':
      return '🔨';
    case 'infra':
      return '🚇';
    case 'mobile':
      return '📱';
    case 'networking':
      return '📡';
    case 'projectManagement':
      return '📆';
    case 'research':
      return '🤔';
    case 'web':
      return '🕸️';
    default:
      return '';
  }
}

export function getContributionAreaLabel(key) {
  switch (key) {
    case 'ai':
      return 'AI';
    case 'business':
      return 'Business';
    case 'database':
      return 'Database';
    case 'design':
      return 'Design';
    case 'doc':
      return 'Documentation';
    case 'financial':
      return 'Financial';
    case 'infra':
      return 'Infrastructure';
    case 'hardware':
      return 'Hardware';
    case 'mobile':
      return 'Mobile';
    case 'networking':
      return 'Networking';
    case 'projectManagement':
      return 'Project Management';
    case 'research':
      return 'Research';
    case 'web':
      return 'Web';
    default:
      return '';
  }
}
