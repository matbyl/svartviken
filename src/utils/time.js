const hours = time => Math.floor(time / 3600)
const minutes = time => Math.floor(time / 60) % 60
const seconds = time => Math.floor(time % 60)

export const formatSeconds = totalSeconds => {
  const h = hours(totalSeconds)
  const m = minutes(totalSeconds)
  const s = seconds(totalSeconds)

  const padLeft = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length)

  return (
    (h ? padLeft(h, '0', 2) + ':' : '') +
    padLeft(m, '0', 2) +
    ':' +
    padLeft(s, '0', 2)
  )
}
