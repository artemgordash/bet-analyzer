import { v4 } from 'uuid';
import Stack from '../components/Stack';
import styled from '@emotion/styled';
import SyncIcon from '@mui/icons-material/Sync';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { shortFirstName } from '../functions/shortFirstName';


const StyledStack = styled(Stack)((props) => ({
  '&': {
    margin: '20px 0'
  },
  '.subtitle': {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: '500'
  },
  '.value': {
    alignSelf: 'end',
    margin: '0 20px',
    fontWeight: '600'
  },
  '.player-card': {
    display: 'flex',
    justifyContent: 'space-between'
  },
  '.icon': {
    fontSize: '20px',
  }
}));

const StatisticBox = (props) => {
  const { data, title, team } = props;

  return (
    <StyledStack
      direction={'column'}
    >
      <span className={'subtitle'}>{title}</span>
      {
        data.map(player =>
          <div
            key={v4()}
            className={'player-card'}
          >
            {player.name}
            <Stack alignSelf={'end'}>
              <span className={'value'}>{player.value}</span>
              {
                (team.lineUp.includes(player.name) || team.lineUp.includes(shortFirstName(player.name))) ? <DoneIcon
                  color={'success'}
                  className={'icon'}
                /> : (team.substitutions.includes(player.name) || team.substitutions.includes(shortFirstName(player.name))) ? <SyncIcon
                  color={'info'}
                  className={'icon'}
                /> : <CloseIcon
                  className={'icon'}
                  color={'error'}
                />
              }
            </Stack>
          </div>)
      }
    </StyledStack>
  );
};

export default StatisticBox;