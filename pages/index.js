import axios from 'axios';
import TeamColumn from '../components/TeamColumn';
import Stack from '../components/Stack';
import { Badge } from '@mui/material';
import ColumnsStatisticCeil from '../components/ColumnsStatisticCeil';

export default function Home(props) {
  const { teamOne, teamTwo } = props;
  return (
    <>
      <Stack justifyContent={'space-around'}>
        <TeamColumn
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
          name={teamTwo.name}
        />
      </Stack>
      <ColumnsStatisticCeil
        title={'Top scorers'}
        firstTeam={teamOne}
        secondTeam={teamTwo}
        value={'topScorers'}
      />
      <ColumnsStatisticCeil
        title={'Top assistents'}
        firstTeam={teamOne}
        secondTeam={teamTwo}
        value={'topAssistents'}
      />
      <ColumnsStatisticCeil
        title={'Top big chances'}
        firstTeam={teamOne}
        secondTeam={teamTwo}
        value={'topBigChances'}
      />
      <ColumnsStatisticCeil
        disableCeil
        title={'Top key passes'}
        firstTeam={teamOne}
        secondTeam={teamTwo}
        value={'topKeyPasses'}
      />
      <ColumnsStatisticCeil
        disableCeil
        title={'Top interceptions'}
        firstTeam={teamOne}
        secondTeam={teamTwo}
        value={'topInterceptions'}
      />
      <ColumnsStatisticCeil
        disableCeil
        title={'Top clearances'}
        firstTeam={teamOne}
        secondTeam={teamTwo}
        value={'topClearance'}
      />
      <ColumnsStatisticCeil
        disableCeil
        title={'Top tackles'}
        firstTeam={teamOne}
        secondTeam={teamTwo}
        value={'topTackles'}
      />
    </>
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
