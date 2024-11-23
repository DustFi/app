const fs = require('fs'); 
const poolsData = require('../../public/dedustPools.json'); 

// Function to filter pools based on the presence of metadata
const filterPoolsWithMetadata = () => {
    const filteredPools = poolsData.filter(pool => {
        const asset0HasMetadata = pool.assets[0]?.metadata !== null;
        const asset1HasMetadata = pool.assets[1]?.metadata !== null;
        return asset0HasMetadata && asset1HasMetadata;
    });

    return filteredPools;
};

// Main function to create a file with filtered pools
const createFilteredPoolsFile = () => {
    const filteredPools = filterPoolsWithMetadata(); // Get filtered pools
    const fileName = 'filteredPools.json'; 

    // Write filtered pools to the JSON file
    fs.writeFile(fileName, JSON.stringify(filteredPools, null, 2), (err) => {
        if (err) {
            console.error('Error writing filtered pools to file:', err);
        } else {
            console.log(`Filtered pools have been saved to ${fileName}`);
        }
    });
};

// Execute the script
createFilteredPoolsFile();
