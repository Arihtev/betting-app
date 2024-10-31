import BasketballIcon from '../components/icons/BasketballIcon';
import SoccerballIcon from '../components/icons/SoccerballIcon';
import SportsIcon from '@mui/icons-material/Sports';

export const getSportIcon = (sport: string, isDarkMode: boolean = false) => {
  if (sport === 'Soccer') return <SoccerballIcon isDarkMode={isDarkMode} />;
  if (sport === 'Basketball') return <BasketballIcon isDarkMode={isDarkMode} />;
  return <SportsIcon />;
};
