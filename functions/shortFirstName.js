export const shortFirstName = (name) => {
  let res = name.split(' ');
  res[0] = res[0][0] + '.';
  return (
    res.join(' ')
  );
};
