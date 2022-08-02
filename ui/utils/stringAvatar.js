function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function stringAvatar(name) {
  let avatarName = '';
  const tmpName = name.split(' ');
  if (tmpName[1][0]) {
    avatarName = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  } else {
    avatarName = `${name[0]}${name[1]}`;
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${avatarName}`,
  };
}
