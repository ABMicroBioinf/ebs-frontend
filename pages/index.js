import Link from 'next/link'
import { Container } from "semantic-ui-react";
import TopNav from "../components/TopNav";

export default function Home() {
  return (
    <>
      <TopNav />
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
      </Container>
    </>
  )
}
