var keen_client = new Keen({
	projectId: "551a578a59949a707edddef9",   // String (required always)
	writeKey: "03b5cc8377693458b62fee06f5baa023c1a4f209ecc14c3905097237f55f8a6d37047728af7c157df05890d4ad11854bf27de9c0e9f2e6d989e85c824ab0cbcefb626bb0411764448010348b26f9e4956951c24742f42cf93bab72900c7473077a3c439fa06590dfdee3cfeb10e89324",     // String (required for sending data)
	readKey: "adc447acf0f5e461d01ec818b1fa8b7a26490530e3bb760dd271e6b7f5a1483694454c6eaf821805c53a178dc37586a9560c52f84af0d9506e8e806048d2922bf758d0dcf1ecccbdac8c057618eb2691f036a0953ad7861fc239f452a23ae766ed6766865cbb80740b720132d907051c",       // String (required for querying data)
	protocol: "https",              // String (optional: https | http | auto)
	host: "api.keen.io/3.0",        // String (optional)
	requestType: "jsonp"            // String (optional: jsonp, xhr, beacon)
});