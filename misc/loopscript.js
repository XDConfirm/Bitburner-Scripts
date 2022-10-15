/** @param {NS} ns */
export async function main(ns) {
	let script = ns.args[0];
	let server = ns.args[1]
	let wait = ns.args[2];

	while (true) {
		ns.exec(script, server);
		await ns.sleep(wait);
	}
}