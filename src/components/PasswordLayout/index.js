import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordLayout extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isShowPasswordActive: false,
  }

  deletePassword = id => {
    const {passwordsList} = this.state

    this.setState({
      passwordsList: passwordsList.filter(each => each.id !== id),
    })
  }

  onAddPassword = event => {
    event.preventDefault()
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      isShowPasswordActive,
    } = this.state
    const initialContainerBackgroundClassName = `initial-Container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPassword = {
      id: v4(),
      website: websiteInput,
      name: usernameInput,
      password: passwordInput,
      initialClassName: initialContainerBackgroundClassName,
      isActive: isShowPasswordActive,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  hideOrShow = event => {
    const {isShowPasswordActive} = this.state
    const res = event.target.checked

    if (res) {
      this.setState(prevState => ({
        isShowPasswordActive: !prevState.isShowPasswordActive,
      }))
    }
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
      isShowPasswordActive,
    } = this.state

    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    let checking
    if (searchResults.length > 0) {
      checking = (
        <ul className="pass-card-container">
          {searchResults.map(eachResult => (
            <PasswordItem
              key={eachResult.id}
              passwordDetails={eachResult}
              deletePassword={this.deletePassword}
            />
          ))}
        </ul>
      )
    } else {
      checking = (
        <div className="no-pass-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-password-image"
          />
          <p className="no-pass">No Passwords</p>
        </div>
      )
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="content-container">
          <div className="top-container">
            <form className="input-container" onSubmit={this.onAddPassword}>
              <h1 className="heading"> Add new Password</h1>

              <div className="typing-container">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icon"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={websiteInput}
                />
              </div>

              <div className="typing-container">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icon"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={usernameInput}
                />
              </div>

              <div className="typing-container">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icon"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>

              <button type="submit" className="add-button">
                {' '}
                Add{' '}
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="image-for-small-device"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="image-for-medium-device"
            />
          </div>

          <div className="bottom-container">
            <div className="count-search-container">
              <div className="heading-count-container">
                <h1 className="bottom-heading"> Your Passwords </h1>
                <div className="count-container">
                  <p className="count"> {searchResults.length} </p>
                </div>
              </div>

              <div className="search-container">
                <div className="search-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </div>

                <input
                  type="search"
                  className="search-input"
                  placeholder="search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
              </div>
            </div>
            <br />
            <span className="linee">
              {' '}
              <hr className="line" />{' '}
            </span>

            <div className="show-passwords-container">
              <input
                type="checkbox"
                id="checkbox-1"
                className="checkbox-input"
                onChange={this.hideOrShow}
              />
              <label htmlFor="checkbox-1" className="para">
                Show Passwords{' '}
              </label>
            </div>
            {checking}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordLayout
