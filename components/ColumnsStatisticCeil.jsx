import Stack from './Stack';
import StatisticBox from './StatisticBox';

const ColumnsStatisticCeil = (props) => {
  const { title, firstTeam, secondTeam, value, disableCeil } = props;

  return (
    <Stack justifyContent={'space-around'}>
      <StatisticBox
        title={title}
        team={firstTeam}
        data={firstTeam[value]}
        disableCeilForValue={disableCeil}
      />
      <StatisticBox
        title={title}
        team={secondTeam}
        data={secondTeam[value]}
        disableCeilForValue={disableCeil}
      />
    </Stack>
  );
};

export default ColumnsStatisticCeil;