/**
 * Author: Jongil Yoon
 */

import EBSDatatable from "../../components/backups/prototype/EBSDataTable"
import TopNav from "../../components/TopNav"

// Temporary
import { promises as fs } from "fs"
import path from "path"
import { csv_to_json } from "../../fakebackend/dbaccess"


export default function Sequences({ data, primary }) {

    return (
        <>
            <TopNav />
            <EBSDatatable data={data} primary={primary} />
        </>
    )

}

// Temporary
export async function getStaticProps() {

    /**
     * *****************************************************
     * DO NOT FORGET to delete 'browser' from packages.json
     * *****************************************************
     */
    const dbDir = path.join(process.cwd(), 'fakebackend/db')
    const dbPath = path.join(dbDir, 'seqdata.csv')
    const content = await fs.readFile(dbPath, 'utf-8')

    const nullabor = csv_to_json(content)

    return {
        props: {
            data: await Promise.resolve(nullabor),
            primary: 0,
        },
    } // Javascript Object

}