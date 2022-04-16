import { parseISO, format } from 'date-fns'

export default function Date(
  { dateString, timeString, title }: { dateString: string, timeString?: string, title?: string }
) : JSX.Element {
  const date = parseISO(`${dateString}`);

  console.log(date)

  let formatString = '';
  try {
    formatString = format(date, 'LLLL d, yyyy');
  } catch (e) {
    throw new Error(`Get error to parse dateString: ${dateString}, title: ${title}`)
  }

  // TODO: Add time in UTC +10.
  return <time dateTime={dateString}>{formatString}</time>
}
