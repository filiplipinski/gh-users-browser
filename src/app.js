import './assets/scss/app.scss';
import $ from 'cash-dom';

export class App {
  constructor() {
    this.$userNameInput = $('#js-username');
  }

  initializeApp() {
    $('#js-load-username').on('click', () => this.searchUser());
  }

  searchUser() {
    const userName = this.$userNameInput.val();
    const userNamePattern = new RegExp(/^[a-z0-9_-]+$/);

    if (userNamePattern.test(userName)) {
      this.$userNameInput.removeClass('is-danger');

      fetch(`https://api.github.com/users/${userName}`)
        .then((response) => response.json())
        .then((body) => {
          this.profile = body;
          this.updateProfile();
        });
    } else {
      this.$userNameInput.addClass('is-danger');
    }
  }

  updateProfile() {
    $('#profile-name').text(this.$userNameInput.val());
    $('#profile-image').attr('src', this.profile.avatar_url);
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login);
    $('#profile-bio').text(this.profile.bio || '(no information)');
  }
}
