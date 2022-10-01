import axios from "axios";

const fetchData = async()=>{
    const { data } = await axios.get('https://www.arcgis.com/sharing/rest/content/items/739b8a9dcf4246d3af7197878b7ec052/data?f=json')
    return data;
}

(async()=>{
    try {
        const data = await fetchData()

        const { bookmarks } = data;

        const points = []

        for(const bookmark of bookmarks){
            const { extent } = bookmark
            const { xmin, xmax, ymin, ymax} = extent;
           
            const xCenter = xmin + (xmax-xmin) / 2;
            const yCenter = ymin + (ymax-ymin) / 2

            points.push([xCenter, yCenter])
        }

        console.log(points)

    } catch(err){
        console.log(err)
    }
    
})()