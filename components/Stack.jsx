import { Box as MuiBox } from '@mui/material';
import styled from '@emotion/styled';

const StyledStack = styled(MuiBox)((props) => ({
  display: 'flex',
  flexDirection: props.direction,
  justifyContent: props.justifyContent,
  alignItems: props.alignItems,
  alignSelf: props.alignSelf,
  flexGrow: props.flexGrow,
}));

const Stack = (props) => {
  const { children, ...otherProps } = props;

  return (
    <StyledStack
      {...otherProps}
    >
      {children}
    </StyledStack>
  );
};

export default Stack;