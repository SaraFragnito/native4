export function getFormattedDate(date){
//  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  return date.toISOString().slice(0,10)
}

// getMonth parte da 0, quindi gennaio sarebbe 0 e non 1, per questo motivo ho scritto getMonth()+1

export function getDateMinusDays(date, days){
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days )
}