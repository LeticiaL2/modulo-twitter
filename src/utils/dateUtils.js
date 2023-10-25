export function formatTimeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo}s`;
    } else {
      const minutesAgo = Math.floor(secondsAgo / 60);
      if (minutesAgo < 60) {
        return `${minutesAgo}m`;
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
          return `${hoursAgo}h`;
        } else {
          const options = { day: 'numeric', month: 'short' };
          return date.toLocaleDateString(undefined, options);
        }
      }
    }
  }