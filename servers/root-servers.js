/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	ns.clearLog();

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

	for (let i = 0; i < servers.length; i++) {
		if (ns.fileExists("BruteSSH.exe")) {
			ns.tprint(`Opening ${servers[i]}'s SSH Port...`);
			ns.brutessh(servers[i]);
		}

		if (!ns.fileExists("BruteSSH.exe")) {
			ns.tprint(`'BruteSSH.exe' does not exist!`);
		}

		await ns.sleep(75);

		if (ns.fileExists("FTPCrack.exe")) {
			ns.tprint(`Opening ${servers[i]}'s FTP Port...`);
			ns.ftpcrack(servers[i]);
		}

		if (!ns.fileExists("FTPCrack.exe")) {
			ns.tprint(`'FTPCrack.exe' does not exist!`);
		}

		await ns.sleep(75);

		if (ns.fileExists("relaySMTP.exe")) {
			ns.tprint(`Opening ${servers[i]}'s SMTP Port...`);
			ns.relaysmtp(servers[i]);
		}

		if (!ns.fileExists("relaySMTP.exe")) {
			ns.tprint(`'relaySMTP.exe' does not exist!`);
		}

		await ns.sleep(75);

		if (ns.fileExists("HTTPWorm.exe")) {
			ns.tprint(`Opening ${servers[i]}'s HTTP Port...`);
			ns.httpworm(servers[i]);
		}

		if (!ns.fileExists("HTTPWorm.exe")) {
			ns.tprint(`'HTTPWorm.exe' does not exist!`);
		}

		await ns.sleep(75);

		if (ns.fileExists("SQLInject.exe")) {
			ns.tprint(`Opening ${servers[i]}'s SQL Port...`);
			ns.sqlinject(servers[i]);
		}

		if (!ns.fileExists("SQLInject.exe")) {
			ns.tprint(`'SQLInject.exe' does not exist!`);
		}
	}
}