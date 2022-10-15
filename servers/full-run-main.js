/** @param {NS} ns */
export async function main(ns) {
	let command = ns.flags([
		['help', false]
	])

	if (command.help === true) {
		return ns.tprint('"full-run-main.js" is a script that is used to run the file "main.js" across all possible servers.')
	}

	let servers = ['home'];
	// Getting All Reachable Servers
	for (let i = 0; i < servers.length; i++) {
		var currentScan = ns.scan(servers[i]);

		await ns.asleep(10);

		for (let ii = 0; ii < currentScan.length; ii++) {
			if (servers.indexOf(currentScan[ii]) === -1 || servers.includes(currentScan[ii]) === false && ns.getServerMaxRam(currentScan[ii]) !== 0) {
				servers.push(currentScan[ii]);
			}
		}
	}

	ns.clear("Servers-Not-Running-Main.txt");

	//Running Main
	for (let ii = 0; ii < 5; ii++) {
		ns.toast(`servers/full-run-main.js \n Loop ${ii}`, "info", 2500);

		for (let i = 0; i < servers.length; i++) {
			const s = servers[i];

			const root = ns.getServer(s).hasAdminRights;
			const ram = ns.getServerMaxRam(s);
			const threads = Math.floor(ram / 2.45);
			// const backdoor = ns.getServer(s).backdoorInstalled;
			const playerhack = ns.getPlayer().skills.hacking;
			const hackreq = ns.getServerRequiredHackingLevel(s);
			const existence = ns.fileExists("main.js", s);
			const running = ns.scriptRunning("main.js", s);

			//Ports
			const portsreq = ns.getServerNumPortsRequired(s);
			const portsopen = ns.getServer(s).openPortCount;
			const sshport = ns.getServer(s).sshPortOpen === true ? 1 : 0;
			const sshfile = ns.fileExists("BruteSSH.exe", 'home');
			const ftpport = ns.getServer(s).ftpPortOpen === true ? 1 : 0;
			const ftpfile = ns.fileExists("FTPCrack.exe", 'home');
			const smtpport = ns.getServer(s).smtpPortOpen === true ? 1 : 0;
			const smtpfile = ns.fileExists("relaySMTP.exe", 'home');
			const httpport = ns.getServer(s).httpPortOpen === true ? 1 : 0;
			const httpfile = ns.fileExists("HTTPWorm.exe", 'home');
			const sqlport = ns.getServer(s).sqlPortOpen === true ? 1 : 0;
			const sqlfile = ns.fileExists("SQLInject.exe", 'home');

			await ns.sleep(25);

			//Nuke
			if (root === false && playerhack >= hackreq && portsopen >= portsreq) {
				ns.tprint(`Nuking ${s}...`);
				ns.nuke(s);
			}

			await ns.sleep(25);

			//Copy
			if (existence === false && running === false) {
				ns.tprint(`Copying "main.js" to ${s}...`);
				let copied = ns.scp("main.js", s, "home");
				ns.tprint(copied === true ? 'Copy Successful' : 'Copy Failed');
			}

			await ns.sleep(25);

			//Port
			if (portsopen < portsreq) {
				if (sshport === 0 && sshfile === true) {
					ns.tprint(`Opening ${s}'s SSH Port...`);
					ns.brutessh(s);
				}

				await ns.sleep(25);

				if (ftpport === 0 && ftpfile === true) {
					ns.tprint(`Opening ${s}'s FTP Port...`);
					ns.ftpcrack(s);
				}

				await ns.sleep(25);

				if (smtpport === 0 && smtpfile === true) {
					ns.tprint(`Opening ${s}'s SMTP Port...`);
					ns.relaysmtp(s);
				}

				await ns.sleep(25);

				if (httpport === 0 && httpfile === true) {
					ns.tprint(`Opening ${s}'s HTTP Port...`);
					ns.httpworm(s);
				}

				await ns.sleep(25);

				if (sqlport === 0 && sqlfile === true) {
					ns.tprint(`Opening ${s}'s SQL Port...`);
					ns.sqlinject(s);
				}
			}

			await ns.sleep(25);

			//Zero Ram
			if (ram === 0 & threads === 0) {
				ns.tprint(`${s} consists of 0 RAM...`);
				continue;
			}

			//Low Hack
			if (playerhack < hackreq) {
				ns.tprint(`Your hacking level (${playerhack}) is lower than ${s}'s required hacking level (${hackreq})...`);
				continue;
			}

			await ns.sleep(25);

			//Running main.js
			if (root === true && ram !== 0 && playerhack >= hackreq && portsopen >= portsreq && running === false && existence === true) {
				ns.tprint(`Running "main.js" on ${s}...`);
				ns.exec("main.js", s, threads);
			}
		}
	}
}
//MadeByXDConfirmed
