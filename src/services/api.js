const API_URL = 'https://api.github.com/';

export const getUserAsync = async (userName) => {
  return fetch(`${API_URL}users/${userName}`)
    .then((response) => response.json())
    .catch(() => undefined);
};

export const getUserHistoryAsync = async (userName) => {
  return fetch(`${API_URL}users/${userName}/events/public`)
    .then((response) => response.json())
    .then((body) =>
      body.filter(
        (event) =>
          event.type === 'PullRequestEvent' || event.type === 'PullRequestReviewCommentEvent',
      ),
    )
    .catch(() => []);
};
