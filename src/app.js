import './assets/scss/app.scss';
import $ from 'cash-dom';
import { getUserAsync, getUserHistoryAsync } from './services/api';
import { historyTemplate } from './templates/userHistory';

export class App {
  constructor() {
    this.$userNameInput = $('#js-username');
  }

  initializeApp() {
    $('#js-load-username').on('click', () => this.searchUser());
  }

  async searchUser() {
    const userName = this.$userNameInput.val();
    const userNamePattern = new RegExp(/^[a-z0-9_-]+$/);

    if (userNamePattern.test(userName)) {
      this.$userNameInput.removeClass('is-danger');

      const profile = await getUserAsync(userName);

      if (profile) {
        this.profile = profile;
        this.updateProfile();

        this.userHistory = await getUserHistoryAsync(userName);
        this.updateHistory();
      }
    } else {
      this.$userNameInput.addClass('is-danger');
    }
  }

  updateHistory() {
    if (this.userHistory && this.userHistory.length) {
      const htmlToAppend = this.userHistory.reduce((acc, e) => {
        const historyItem = historyTemplate({
          createdAt: e.created_at,
          avatarUrl: e.actor.avatar_url,
          login: e.actor.login,
          actionType: e.payload.action,
          actionUrl: e.payload.pull_request.html_url,
          repoName: e.repo.name,
          commentUrl: e.type === 'PullRequestReviewCommentEvent' && e.payload.comment.html_url,
        });
        return acc + historyItem;
      }, '');
      $('#js-events-container').html(htmlToAppend);
    } else $('#js-events-container').html('(no information)');
  }

  updateProfile() {
    $('#profile-name').text(this.$userNameInput.val());
    $('#profile-image').attr('src', this.profile.avatar_url);
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login);
    $('#profile-bio').text(this.profile.bio || '(no information)');
  }
}
