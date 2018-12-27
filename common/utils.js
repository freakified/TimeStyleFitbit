// Add zero in front of numbers < 10
export function zeroPad(i, spacer = '0') {
  if (i < 10) {
    i = spacer + i;
  }
  return "" + i;
}

// export function digi