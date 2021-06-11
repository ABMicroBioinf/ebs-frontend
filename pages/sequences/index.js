/**
 * Author: Jongil Yoon
 */

import EBSDatatable from "../../components/backups/prototype/EBSDataTable"
import TopNav from "../../components/TopNav"

// Temporary
import axios from "axios"
import _ from 'lodash'


export default function Sequences({ data, primary }) {

    return (
        <>
            <TopNav />
            {data &&
                <EBSDatatable data={data} primary={primary} />
            }
        </>
    )

}

// Temporary
// SSR
// export async function getStaticProps() {
//     /**
//      * *****************************************************
//      * DO NOT FORGET to delete 'browser' from packages.json
//      * *****************************************************
//      */
//     const dbDir = path.join(process.cwd(), 'fakebackend/db')
//     const dbPath = path.join(dbDir, 'seqdata.csv')
//     const content = await fs.readFile(dbPath, 'utf-8')

//     const nullabor = csv_to_json(content)

//     return {
//         props: {
//             data: await Promise.resolve(nullabor),
//             primary: 0,
//         },
//     } // Javascript Object

// }

// CSR
export async function getServerSideProps(context) {

    const cookie = _.isEmpty(context.req.cookies) ? '' : context.req.cookies.auth

    const url = 'http://localhost:3000/api/sequences'
    const config = {
        headers: {
            cookies: cookie.toString()
        }
    }
    const res = await axios.get(
        url,
        config
    )
        .then(res => res)
        .catch(err => err.response)

    if (res.status === 401 && !context.req) {
        return {
            redirect: {
                destination: '/login',
                statusCode: 401
            }
        }
    }

    if (res.status === 401 && context.req) {
        return {
            redirect: {
                destination: '/login',
                statusCode: 302
            }
        }
    }

    return {
        props: {
            data: _.isEmpty(res.data) ? null : res.data,
            primary: 0,
        },
    }
}