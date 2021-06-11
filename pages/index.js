/**
 * Author: Jongil Yoon
 */

import axios from "axios"
// import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
// import { Container } from "semantic-ui-react"
// import TopNav from "../components/TopNav"


/**
 * Next.js recommend to handle redirection in backend 
 * following code needs to be fixed
 * @returns 
 */
export default function Home() {

  // const [isLogin, setLogin] = useState(false)
  const router = useRouter()

  const checkLogIn = useCallback((e) => {
    const url = '/api/verify'
    axios.get(
      url,
    )
      .then(res => {
        if (res.status === 200) {
          router.push('/sequences')
          // setLogin(res.data.available)
        } else {
          router.push('/login')
          // setLogin(false)
        }
      }).catch(err => {
          router.push('/login')
        // setLogin(false)
      })
  }, [])

  useEffect(() => {
    checkLogIn()
  }, [])

  return (
    <>
      {/* <TopNav />
      <Container>
        <br />
        <br />
        <br />
        <h1>HOME</h1>
        <br />
        <div>
          <h3>Examples</h3>
          <ul>
            <li><Link href={'/examples/single_upload/'}>Single File Upload</Link></li>
            <li><Link href={'/examples/multiple_upload/'}>Multiple Files Upload</Link></li>
            <li><Link href={'/examples/uniqueness'}>Guaranteed Uniqueness of Files (working on)</Link></li>
          </ul>
        </div>
      </Container> */}
    </>
  )
}
