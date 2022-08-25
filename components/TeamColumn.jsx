import { v4 } from 'uuid';
import Stack from '../components/Stack';
import styled from '@emotion/styled';
import StatisticBox from '../components/StatisticBox';
import { Checkbox, FormControlLabel } from '@mui/material';

const StyledStack = styled(Stack)((props) => ({
  '.title': {
    fontSize: '20px',
    fontWeight: '600'
  },
}));

const TeamColumn = (props) => {
  const { team, name, chip } = props;

  return (
    <StyledStack
      direction={'column'}
    >
      <span className={'title'}>
        {name}
        {chip}
      </span>
      <Stack
        direction={'column'}
        sx={{
          mt: 3
        }}
      >
        <FormControlLabel
          label={'Нет проблем с составом'}
          control={<Checkbox />}
        />
        <FormControlLabel
          label={'Выше в таблице'}
          control={<Checkbox />}
        />
        <FormControlLabel
          label={'Хорошая форма'}
          control={<Checkbox onClick={(e) => e.target.indeterminate = true} />}
        />
        <FormControlLabel
          label={'Новый тренер'}
          control={<Checkbox />}
        />
      </Stack>
      <StatisticBox
        title={'Top scorers'}
        team={team}
        data={team.topScorers}
      />
      <StatisticBox
        title={'Top assistents'}
        team={team}
        data={team.topAssistents}
      />
      <StatisticBox
        title={'Top created big chances'}
        team={team}
        data={team.topBigChances}
      />
      <StatisticBox
        title={'Top interceptors'}
        team={team}
        data={team.topInterceptions}
      />
      <StatisticBox
        title={'Top clearance'}
        team={team}
        data={team.topClearance}
      />
    </StyledStack>
  );
};

export default TeamColumn;