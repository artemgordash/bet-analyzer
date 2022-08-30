import { v4 } from 'uuid';
import Stack from '../components/Stack';
import styled from '@emotion/styled';
import SyncIcon from '@mui/icons-material/Sync';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { shortFirstName } from '../functions/shortFirstName';


const StyledStack = styled(Stack)((props) => ({
  '&': {
    margin: '20px 0',
    width: '25%'
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
  const { data, title, team, disableCeilForValue } = props;
  const totalValue = data.reduce((acc, curr) => acc + Number(curr.value), 0);
  const startTotalValue = data.reduce((acc, curr) =>
    team.lineUp.includes(curr.name) || team.lineUp.includes(shortFirstName(curr.name)) ?
      acc + Number(curr.value)
      : acc + 0, 0);

  return (
    <StyledStack
      direction={'column'}
    >
      <Stack
        className={'subtitle'}
        justifyContent={'space-between'}
      >
        <span>{title}</span>
        <Stack>
          <span style={{ marginLeft: '20px', marginRight: '5px' }}>
            {disableCeilForValue ? totalValue.toFixed(1) : Math.ceil(totalValue)}
          </span>
          {' / '}
          <span style={{ marginLeft: '5px' }}>
            {disableCeilForValue ? startTotalValue.toFixed(1) : Math.ceil(startTotalValue)}
          </span>
        </Stack>
      </Stack>
      {
        data.map((player, i) =>
          <div
            key={v4()}
            className={'player-card'}
            style={{
              display: i < 6 ? '' : 'none'
            }}
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