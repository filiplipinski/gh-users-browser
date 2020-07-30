export const historyTemplate = ({
  createdAt,
  avatarUrl,
  login,
  actionType,
  actionUrl,
  repoName,
  commentUrl,
}) => {
  const date = new Date(createdAt).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });

  const isPrimary = commentUrl ? 'is-primary' : '';

  return `
  <div class="timeline-item ${isPrimary}">
    <div class="timeline-marker ${isPrimary}"></div>
    <div class="timeline-content">
      <p class="heading">${date}</p>
      <div class="media">
        <figure class="media-left image is-48x48">
          <img src="${avatarUrl}"/>
        </figure>
        <div class="media-content">
          <a href="https://github.com/${login}">${login}</a>
          ${actionType}    
          ${
            commentUrl
              ? `
            <a href="https://github.com/TheSoftwareHouse/Kakunin/pull/41#discussion_r176273897">
              comment
            </a>
            to
            `
              : ''
          }      
          <a href="${actionUrl}">pull request</a>
          <a class="is-block" href="https://github.com/${repoName}">${repoName}</a>            
        </div>
      </div>
    </div>
  </div>
  `;
};
