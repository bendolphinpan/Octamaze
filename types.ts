export interface GameProject {
  id: string;
  title: string; // Shared title
  year: string;  // Shared year
  
  // Data for the small preview card on the grid
  card: {
    imageUrl: string;
    subtitle: string;
    description: string;
  };

  // Data for the full detail modal (Dossier)
  info: {
    subtitle: string;
    description: string; // Full length description
    gallery?: string[];
    techSpecs: string[]; // Array of strings for the specs box
    devNote: string;     // Specific text for the sticky note
  };
}

export interface ArtifactCardProps {
  number: string;
  artifact: GameProject;
  rotation?: string;
  className?: string;
  onClick?: () => void;
}