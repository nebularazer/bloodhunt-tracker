const { loadStats } = require('./stats');
const fs = require('fs');

process.on('SIGINT', () => {
    console.log('exiting...')
    process.exit(0)
})

async function main(chromePath, interval = 2) {
    const stats = await loadStats(chromePath);
    console.log(`writing current stats: ${JSON.stringify(stats)}`)

    Object.entries(stats).forEach(([stat, value]) => {
        fs.writeFileSync(`${stat}.txt`, value)
    })
    setTimeout(main, interval * 60 * 1000, chromePath, interval);
}

(async () => {
    const chromePath = process.argv[2];

    if (!chromePath) {
        console.error('Path to chrome executable missing.')
        process.exit(1)
    }

    await main(chromePath)
})();
