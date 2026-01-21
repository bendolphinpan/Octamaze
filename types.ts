export interface GameProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: string;
  subtitle: string; // Was origin
}

export interface ArtifactCardProps {
  number: string;
  artifact: GameProject;
  rotation?: string;
  className?: string;
}