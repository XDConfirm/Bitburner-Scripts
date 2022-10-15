/** @param {NS} ns */
export async function main(ns) {
	let servers = ['home'];
	// Getting All Reachable Servers
	for (let i = 0; i < servers.length; i++) {
		var currentScan = ns.scan(servers[i]);

		await ns.asleep(10);

		for (let ii = 0; ii < currentScan.length; ii++) {
			if (servers.indexOf(currentScan[ii]) === -1 || servers.includes(currentScan[ii]) === false) {
				servers.push(currentScan[ii]);
			}
		}
	}

	if (ns.args.length === 0) {
		for (let i = 0; i < servers.length; i++) {
			let killedall = ns.killall(servers[i]);

			await ns.sleep(75);

			ns.tprint(killedall ? `Scripts on server ${servers[i]} have been killed...` : `Scripts on server ${servers[i]} failed to have been killed...`);
		}
	}

	if (ns.args.length === 1) {
		for (let i = 0; i < servers.length; i++) {
			let script = ns.args[0];
			let killed = ns.scriptKill(script, servers[i]);

			await ns.sleep(75);

			ns.tprint(killed ? `'${script}'' has been killed on server ${servers[i]}...` : `'${script}' has failed to be killed on server ${servers[i]}...`);
		}
	}
}
//MadeByXDConfirmed
