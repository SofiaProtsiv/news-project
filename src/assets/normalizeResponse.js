import noFoundImage from '../images/no_found.png'

export default function normalizeResponse(type, data) {

    if (type === 'fetchPopularNews') {
        const result = data.reduce((acc, element) => {
            const obj = {
                description: element["abstract"].length > 110 ? element["abstract"].slice(0, 110) + "..." : element["abstract"],
                created_date: element["published_date"].split("-").reverse().join("/"),
                media: element["media"].length ? element["media"][0]["media-metadata"][2].url : noFoundImage,
                category: element["section"],
                title: element["title"],
                resourse: element["url"],
                id: element["uri"]
            }
            acc.push(obj);
            return acc;
        }, []);

        return result
    }

    if (type === 'fetchNews') {
        const result = data.reduce((acc, element) => {
            const obj = {
                description: element["abstract"].length > 110 ? element["abstract"].slice(0, 110) + "..." : element["abstract"],
                created_date: element["pub_date"].split("T")[0].split("-").reverse().join("/"),
                media: element["multimedia"].length ? "https://www.nytimes.com/" + element["multimedia"][0].url : noFoundImage,
                category: element["section_name"],
                title: element["lead_paragraph"],
                resourse: element["web_url"],
                id: element["uri"]
            }
            acc.push(obj);
            return acc;
        }, []);
        return result
    }

    if (type === 'fetchNewsByCategory') {
        const result = data.reduce((acc, element) => {
            const obj = {
                description: element["abstract"].length > 110 ? element["abstract"].slice(0, 110) + "..." : element["abstract"],
                created_date: element["created_date"].split("T")[0].split("-").reverse().join("/"),
                media: element["multimedia"] ? element["multimedia"][2].url : noFoundImage,
                category: element["section"],
                title: element["title"],
                resourse: element["url"],
                id: element["uri"]
            }
            acc.push(obj);
            return acc;
        }, []);
        return result;
    }
}

// const queryrProps = [
//     'abstract',
//     'web_url',
//     'lead_paragraph',
//     'multimedia',
//     'pub_date',
//     'section_name',
//     'uri',
// ];

// const popularProps = ['abstract', 'media', 'published_date', 'section', 'title', 'url', 'uri'];

// const byCategoriesProps = [
//     'abstract',
//     'created_date',
//     'multimedia',
//     'section',
//     'title',
//     'uri',
//     'url',
// ];

