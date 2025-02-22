import Login from '../Login'
import styles from './Authentication.module.css'
import PageTitle from "../../../PageTitle"
import Register from '../Register'

const Authentication = () => {
  return (
    <>
      <PageTitle>Login</PageTitle>
      <Login className={styles.login} />
      {/* <Register className={styles.register} /> */}
    </>
  )
}

export default Authentication