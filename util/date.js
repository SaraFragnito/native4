export function getFormattedDate(date){
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

// getMonth parte da 0, quindi gennaio sarebbe 0 e non 1, per questo motivo ho scritto getMonth()+1