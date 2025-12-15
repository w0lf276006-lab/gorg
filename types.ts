export enum AppSection {
  HOME = 'HOME',
  STORY = 'STORY',
  FAL = 'FAL',
  CHECKLIST = 'CHECKLIST'
}

export interface CharacterProps {
  name: string;
  imageSrc: string;
  isRobot?: boolean;
  mood?: 'happy' | 'thinking' | 'excited';
  className?: string;
}

export interface EnergyTask {
  id: string;
  text: string;
  completed: boolean;
  points: number;
}

export interface GeneratedStory {
  title: string;
  content: string;
}

export interface FalResult {
  poem: string;
  interpretation: string;
}
