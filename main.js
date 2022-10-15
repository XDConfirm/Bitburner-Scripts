/** @param {NS} ns **/
export async function main(ns) {
	const host = ns.getHostname();

	while (true) {
		let availablemoney = ns.getServerMoneyAvailable(host);
		let maxmoney = ns.getServerMaxMoney(host);
		let security = ns.getServerSecurityLevel(host);
		let minsecurity = ns.getServerMinSecurityLevel(host) + 0.035;

		if (availablemoney <= maxmoney) {
			await ns.grow(host);
		}

		if (security >= minsecurity) {
			await ns.weaken(host);
		}

		await ns.hack(host);
	}
}