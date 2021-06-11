import { csv_to_json } from "../../fakebackend/dbaccess"
import { authenticated } from "./middleware"
import { promises as fs } from "fs"
import path from "path"

export default authenticated(async (req, res) => {
    try {
        const dbDir = path.join(process.cwd(), '/fakebackend/db')
        const dbPath = path.join(dbDir, 'seqdata.csv')
        if (req.method === 'GET') {
            const content = await fs.readFile(dbPath, 'utf-8')
            const nullabor = csv_to_json(content)
            res.status(200).json(nullabor)
        }
    } catch (err) {
        res.status(403).json({ message: 'API is not available' })
    }
})