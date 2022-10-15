/** @param {NS} ns */
export async function main(ns) {
	const hook = document.getElementById("overview-extra-hook-0");
	const hook1 = document.getElementById("overview-extra-hook-1");

	hook.style.fontWeight = "1000";
	hook.style.textDecoration = "underline";
	hook1.style.fontWeight = "1000";
	hook1.style.color = "White";

	const servers = ['home'];

	for (let i = 0; i < servers.length; i++) {
		var currentScan = ns.scan(servers[i]);

		await ns.asleep(10);

		for (let ii = 0; ii < currentScan.length; ii++) {
			if (servers.indexOf(currentScan[ii]) === -1 || servers.includes(currentScan[ii]) === false && ns.getServerMaxRam(currentScan[ii]) !== 0) {
				servers.push(currentScan[ii]);
			}
		}
	}

	const headers = ["Money => ", "All Inc. => ", "All Avg Inc. => ", "Total Script Inc. => ", "Avg Script Inc. => ", "Total Script Exp. => ", "Avg Script Exp. => ", "Total Hacknet Inc. => ", "Avg Hacknet Inc. =>", "Avg Hacknet RAM =>", "All Hacknet Inc. => ", "Servers Running => ", "Servers Not Running => ", "Zero RAM Servers => "];

	hook.innerText = headers.join(" \n ");

	while (true) {
		let totalincome = 0;
		let income = 0;
		let xp = 0;
		let hacknetincome = 0;
		let hacknetram = 0;
		let hacknetincomemade = 0;
		let serversrunning = 0;
		let serversnotrunning = 0;
		let ram0servers = 0;

		for (let t = 0; t < servers.length; t++) {
			if (ns.scriptRunning("main.js", servers[t])) {
				income = income + ns.getScriptIncome("main.js", servers[t]);
				xp = xp + ns.getScriptExpGain("main.js", servers[t]);

				serversrunning++;
			}

			else {
				serversnotrunning++;
			}

			if (ns.getServerMaxRam(servers[t]) === 0) {
				ram0servers++;
			}
		}

		for (let i = 0; i < ns.hacknet.numNodes(); i++) {
			hacknetincome = hacknetincome + ns.hacknet.getNodeStats(i).production;
			hacknetram = hacknetram + ns.hacknet.getNodeStats(i).ram;
			hacknetincomemade = hacknetincomemade + ns.hacknet.getNodeStats(i).totalProduction;
		}

		totalincome = income + hacknetincome;

		var values = [new Intl.NumberFormat('en-US').format(ns.getPlayer().money), new Intl.NumberFormat('en-US').format(totalincome), new Intl.NumberFormat('en-US').format((totalincome / (serversrunning + ns.hacknet.numNodes()))), new Intl.NumberFormat('en-US').format(income), new Intl.NumberFormat('en-US').format((income / serversrunning)), new Intl.NumberFormat('en-US').format(xp), new Intl.NumberFormat('en-US').format((xp / serversrunning)), new Intl.NumberFormat('en-US').format(hacknetincome), new Intl.NumberFormat('en-US').format((hacknetincome / serversrunning)), new Intl.NumberFormat('en-US').format((hacknetram / ns.hacknet.numNodes)), new Intl.NumberFormat('en-US').format(hacknetincomemade), serversrunning, serversnotrunning - ram0servers, ram0servers];

		hook1.innerText = values.join(" \n ")
		await ns.sleep(1);
	}
}