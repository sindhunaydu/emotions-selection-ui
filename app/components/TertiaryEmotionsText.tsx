import { useEffect } from 'react';

interface Emotion {
  name: string
  color: string
}

interface TertiaryEmotionsTextProps {
  emotions: Emotion[]
  onTextGenerated: (text: string) => void
}

export default function TertiaryEmotionsText({ emotions, onTextGenerated }: TertiaryEmotionsTextProps) {
  useEffect(() => {
    const colorToEmoji = (color: string) => {
      switch (color.toLowerCase()) {
      case 'red': return '❤️';
      case 'orange': return '🧡';
      case 'yellow': return '💛';
      case 'green': return '💚';
      case 'blue': return '💙';
      case 'purple': return '💜';
      case 'pink': return '🩷';
      case 'gray': return '🩶';
      default: return '🤍';
      }
    };

    const emotionsListBulletPoints = emotions.map(e => `${colorToEmoji(e.color)} ${e.name}`).join('\n');
    const text = `This is how I feel right now:
${emotionsListBulletPoints}`;
    onTextGenerated(text);
  }, [emotions, onTextGenerated]);
  return null;
}