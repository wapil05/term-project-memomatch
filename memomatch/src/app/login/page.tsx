import styles from '../page.module.css'

export default function Login() {
  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold underline">Hello User!</h1>
      <button className="btn bg-primary w-64 rounded-full">Login</button>
    </main>
  )
}
