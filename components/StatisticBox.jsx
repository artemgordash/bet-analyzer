import { v4 } from 'uuid';
import Stack from '../components/Stack';
import styled from '@emotion/styled';
import SyncIcon from '@mui/icons-material/Sync';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { shortFirstName } from '../functions/shortFirstName';
import { useMemo } from 'react';


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
  const totalValue = useMemo(() => data.reduce((acc, curr) => {
    if (typeof curr.value !== 'undefined') {
      return (
        acc + Number(curr.value)
      );
    } else {
      return (acc + 0);
    }
  }, 0));
  const startTotalValue = useMemo(() => data.reduce((acc, curr) => {
    const isInStartLineup = team.lineUp.includes(curr.name) || team.lineUp.includes(shortFirstName(curr.name));
    if (typeof curr.value !== 'undefined' && isInStartLineup) {
      return (
        acc + Number(curr.value)
      );
    } else {
      return (acc + 0);
    }
  }, 0));

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
                (team.lineUp.includes(player.name) || team.lineUp.includes(shortFirstName(player.name))) ?
                  <DoneIcon
                    color={'success'}
                    className={'icon'}
                  /> : (team.substitutions.includes(player.name) || team.substitutions.includes(shortFirstName(player.name))) ?
                    <SyncIcon
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