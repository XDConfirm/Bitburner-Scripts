/** @param {NS} ns */
export async function main(ns) {
	let file = ns.args[0];

	let servers = ['home'];

	// Getting All Reachable Servers
	for (let i = 0; i < servers.length; i++) {
		var currentScan = ns.scan(servers[i]);

		for (let ii = 0; ii < currentScan.length; ii++) {
			if (servers.indexOf(currentScan[ii]) === -1 || servers.includes(currentScan[ii]) === false && ns.getServerMaxRam(currentScan[ii]) !== 0) {
				servers.push(currentScan[ii]);
			}
		}
	}

	for (let i = 0; i < servers.length; i++) {
		ns.tprint(`Removing ${file} from ${servers[i]}...`);
		let remove = ns.rm(file, servers[i]);
		ns.tprint(remove ? `Remove Successful` : `Remove Failed`);
	}
}
//MadeByXDConfirmed
