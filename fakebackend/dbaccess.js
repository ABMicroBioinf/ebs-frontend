/**
 * Author: Jongil Yoon
 */

export const csv_to_json = csv => {
    let lines = csv.split('\n')
    let data = []

    // An array of header
    let headers = lines[0].split(',')

    // An array of object
    for (let i = 1; i < lines.length; i++) { // interate over rows
        // get rid of blank lines
        const pattern = /((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm
        if (!pattern.test(lines[i])) {
            let obj = {}
            let currentline = lines[i].split(',')

            for (let j = 0; j < headers.length; j++) { // interate over columns
                obj[headers[j]] = currentline[j]
            }

            data.push(obj)
        }
    }

    return { 'headers': headers, 'rows': data }
}
