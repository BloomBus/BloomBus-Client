type ContributionArea =
  | 'ai'
  | 'business'
  | 'financial'
  | 'database'
  | 'design'
  | 'doc'
  | 'hardware'
  | 'infra'
  | 'mobile'
  | 'networking'
  | 'projectManagement'
  | 'research'
  | 'web';

interface Contributor {
  /* Contributor's name */
  name: string;
  /* Avatar URL */
  avatar: string;
  /* Contribution areas that the contributor participated in */
  contributionAreas: ContributionArea[];
  /* Custom descriptions of primary contributions */
  contributions: string[];
}

export function getContributionAreaEmoji(contributionArea: ContributionArea) {
  switch (contributionArea) {
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

export function getContributionAreaLabel(contributionArea: ContributionArea) {
  switch (contributionArea) {
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
  }
}

export const contributors: Contributor[] = [
  {
    name: 'Dan Pany',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Fdanpany.jpg?alt=media&token=dc3700c9-82ab-44a6-9307-f45d55c98ada',
    contributionAreas: ['research', 'hardware', 'networking'],
    contributions: [
      'Research',
      'Arduino Development',
      'ZigBee Radio Networking'
    ]
  },
  {
    name: 'Rio Weber',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Frioweber.jpg?alt=media&token=48f39885-491e-4ff5-a182-32a30a9b4e93',
    contributionAreas: ['research', 'web', 'database'],
    contributions: ['Research', 'Web Development', 'Firebase']
  },
  {
    name: 'John Gibson',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Fjohngibson.jpeg?alt=media&token=95235a74-1033-42f7-a49c-03e4d9fb6611',
    contributionAreas: ['web', 'mobile', 'database', 'design', 'doc', 'infra'],
    contributions: [
      'Web Development',
      'Mobile Development',
      'Firebase',
      'UI Design',
      'Documentation',
      'Infrastructure'
    ]
  },
  {
    name: 'Nelson Maher',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Fnelsonmaher.jpg?alt=media&token=947e140a-71d1-42d2-9d8e-5f75f9cb27b6',
    contributionAreas: ['hardware', 'networking'],
    contributions: ['ESP8266 Development', 'WiFi Networking']
  },
  {
    name: 'Dr. Robert Montante',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Frobertmontante.jpg?alt=media&token=24672b26-7c48-4c56-b37e-d3b932e81e9a',
    contributionAreas: ['projectManagement', 'financial'],
    contributions: ['Project Management', 'Support with Research Grants']
  },
  {
    name: 'Colin McIntyre',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Fcolinmcintyre.jpg?alt=media&token=5620f290-722a-43f9-9dd1-1a11ea7a310b',
    contributionAreas: ['business', 'projectManagement'],
    contributions: ['Shuttle Bus Committee Chair', 'Project Management']
  },
  {
    name: 'Nicholas Ashenfelter',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Fnickashenfelter.jpg?alt=media&token=4dde56f2-1ca6-4e26-8f3c-712ba1493d9a',
    contributionAreas: ['web', 'design'],
    contributions: ['Web Development', 'Design']
  },
  {
    name: "Michael O'Donnel",
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Fmichaelodonnel.jpg?alt=media&token=badcf748-0123-4421-a4ee-b206c72c1be3',
    contributionAreas: ['research', 'ai', 'mobile'],
    contributions: ['Research', 'Neural Network Development']
  },
  {
    name: 'Community Governance Assocation (CGA)',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/bloombus-163620.appspot.com/o/avatars%2Fcga.png?alt=media&token=af666331-9069-47f6-b4f7-84f404eb57dd',
    contributionAreas: ['business', 'financial'],
    contributions: ['Business', 'Funding']
  }
];
