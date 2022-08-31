import Stack from '../components/Stack';
import styled from '@emotion/styled';
import { Checkbox, FormControlLabel } from '@mui/material';

const StyledStack = styled(Stack)((props) => ({
  '.title': {
    fontSize: '20px',
    fontWeight: '600'
  },
}));

const TeamColumn = (props) => {
  const { name, chip } = props;

  return (
    <StyledStack
      direction={'column'}
      sx={{
        width: '25%'
      }}
    >
      <span className={'title'}>
        {name}
        {chip}
      </span>
    </StyledStack>
  );
};

export default TeamColumn;