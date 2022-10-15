/** @param {NS} ns */
export async function main(ns) {
	let money = ns.getPlayer().money >= 100000000000 ? true : false;
	// let augmentation = ns.singularity.getOwnedAugmentations();
	let hacking = ns.getPlayer().skills.hacking >= 2500 ? true : false;
	let csec = ns.getServer('CSEC').backdoorInstalled;
	let nitesec = ns.getServer('avmnite-02h').backdoorInstalled;
	let iiii = ns.getServer('I.I.I.I').backdoorInstalled;

	ns.tprint(`\n${money ? `You have enough money (${ns.getPlayer().money}) for progressing...` : `You do not have enough money (${ns.getPlayer().money}) for progressing...`}\n${hacking ? `You have enough hacking skill (${ns.getPlayer().skills.hacking}) for progressing...)` : `You do not have enough hacking skill (${ns.getPlayer().skills.hacking}) for progressing...`}\n${csec ? `You have CSEC's Backdoor installed...` : `You do not have CSEC's Backdoor Installed...`}\n${nitesec ? `You have avmnite-02h's Backdoor installed...` : `You do not have avmnite-02h's Backdoor installed...`}\n${iiii ? `You have I.I.I.I's Backdoor installed...` : `You do not have I.I.I.I Backdoor installed...`}`)
}