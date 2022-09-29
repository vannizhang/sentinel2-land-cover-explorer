import { HistoricalLandCoverData } from '../../services/sentinel-2-10m-landcover/computeHistograms';

export const saveHistoricalLandCoverDataAsCSV = (
    data: HistoricalLandCoverData[]
) => {
    const headers = ['Land Cover Class', 'Year', 'Area in Acres'];

    const lines = ['data:text/csv;charset=utf-8,' + headers.join(',')];

    for (const item of data) {
        const { acresByYear, landCoverClassificationData } = item;

        for (const d of acresByYear) {
            const { year, value } = d;

            const row = [landCoverClassificationData.ClassName, year, value];

            lines.push(row.join(','));
        }
    }

    const csvData = lines.join('\r\n');

    const link = document.createElement('a');
    link.download = 'land-cover-in-acres.csv';
    link.href = encodeURI(csvData);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
