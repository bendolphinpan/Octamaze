export interface GameProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: string;
  subtitle: string; // Was origin
  gallery?: string[]; // New: For the modal carousel
}

export interface ArtifactCardProps {
  number: string;
  artifact: GameProject;
  rotation?: string;
  className?: string;
  onClick?: () => void; // Added onClick support
}