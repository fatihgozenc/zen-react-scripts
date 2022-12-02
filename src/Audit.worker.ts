declare const self: DedicatedWorkerGlobalScope;
export default {} as typeof Worker & { new(): Worker; };

self.onmessage = async (e) => {
	console.log(`(WORKER)`, e.data, e.data ? true : false);
};
