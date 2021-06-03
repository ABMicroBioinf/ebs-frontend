import EBSDatatable from "../components/backups/prototype/EBSDataTable"
import TopNav from "../components/TopNav"

import { promises as fs } from "fs"
import path from "path"
import { csv_to_json } from "../fakebackend/dbaccess"


export default function Sequences({data}) {

    return (
        <>
            <TopNav />
            <EBSDatatable data={data}/>
        </>
    )

}

// Temporary
// fake users DB =  "../../../fakebackend/db/users.json"
// nullabor DB = "../../../fakebackend/db/seqdata.csv"
// GCA DB = "../../../fakebackend/db/GCA_000534695.1.json"
export async function getStaticProps() {

    /**
     * DO NOT FORGET to delete 'browser' from packages.json
     */
    const dbDir = path.join(process.cwd(), 'fakebackend/db')
    const dbPath = path.join(dbDir, 'seqdata.csv')
    const content = await fs.readFile(dbPath, 'utf-8')

    const nullabor = csv_to_json(content)

    return {
        props: {
            data: await Promise.resolve(nullabor),
        },
    } // Javascript Object

}