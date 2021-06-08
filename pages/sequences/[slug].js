import { useRouter } from "next/router"
import TopNav from "../../components/TopNav"


export async function getServerSideProps(context) {
}

export default function Sequence() {

    const router = useRouter()
    const { slug } = router.query

    return (
        <>
            <TopNav />
            {slug}
        </>
    )

}