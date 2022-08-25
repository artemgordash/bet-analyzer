import axios from 'axios';
import TeamColumn from '../components/TeamColumn';
import Stack from '../components/Stack';
import { Badge } from '@mui/material';

export default function Home(props) {
  const { teamOne, teamTwo } = props;
  return (
    <Stack justifyContent={'space-around'}>
      <TeamColumn
        team={teamOne}
        chip={<Badge
          badgeContent={'Home'}
          sx={{ left: 30, bottom: 3 }}
          color={'success'}
        />}
        name={teamOne.name}
      />
      <TeamColumn
        chip={<Badge
          badgeContent={'Guest'}
          sx={{ left: 30, bottom: 3 }}
          color={'error'}
        />}
        team={teamTwo}
        name={teamTwo.name}
      />
    </Stack>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/teams');

  return {
    props: {
      teamOne: data.firstTeam,
      teamTwo: data.secondTeam
    }
  };
};
