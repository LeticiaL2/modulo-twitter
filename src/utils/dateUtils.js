export function formatDate(dateString) {
  const date = new Date(dateString);

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const timeStr = date.toLocaleTimeString('en-US', timeOptions);

  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  let dateStr = date.toLocaleDateString('pt-BR', dateOptions);

  dateStr = dateStr.replace('.', '');

  return `${timeStr} · ${dateStr}`;
}

export function formatDateForComments(dateString) {
  const now = new Date();
  const dateFormat = new Date(dateString);
  const diffMs = now - dateFormat;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);

  if (diffHours < 24) {
    if (diffHours < 1) {
      if (diffMins < 1) {
        return ' · ' + diffSecs + ' s';
      }
      return ' · ' + diffMins + ' min';
    } else {
      return ' · ' + diffHours + ' h';
    }
  } else {
    const options = { day: 'numeric', month: 'short' };
    let date = new Date(dateString);
    date = date.toLocaleDateString('pt-BR', options);
    date = date.replace('.', '');
    date = ' · ' + date;
    return date;
  }
}
