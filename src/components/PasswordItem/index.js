import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword} = props
  const {
    id,
    name,
    website,
    password,
    initialClassName,
    isActive,
  } = passwordDetails

  const initial = name ? name[0].toUpperCase() : ''

  const deleteParticularPass = () => {
    deletePassword(id)
  }

  let authButton

  if (isActive === true) {
    authButton = <p className="show-pass">{password}</p>
  } else {
    authButton = (
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
          className="stars"
        />
      </div>
    )
  }

  return (
    <li className="one-full-list">
      <div className={initialClassName}>
        <p className="initial">{initial}</p>
      </div>
      <div>
        <p className="website">{website}</p>
        <p className="username">{name}</p>

        {authButton}
      </div>
      <button
        type="button"
        onClick={deleteParticularPass}
        className="delete-button"
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
